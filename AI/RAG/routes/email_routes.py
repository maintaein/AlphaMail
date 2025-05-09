from fastapi import APIRouter, Request, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from services.email_processor import EmailProcessor
from services.vector_db import VectorDBHandler
from services.rag_engine import RAGEngine
import uuid
import base64
import traceback
import json
from typing import List, Optional

router = APIRouter()

MAX_LENGTH = 2048  # LLM 모델의 최대 토큰 수
MAX_ATTACH_SIZE = 10 * 1024 * 1024  # 최대 첨부파일 크기 (10MB)

# 모든 메일에 대해서 db벡터 저장용
@router.post("/sendmail")
async def send_mail(
    email_content: str = Form(...),
    thread_id: Optional[str] = Form(None),
):
    try:

        print(f"[DEBUG] Email content sample: {email_content[:100]}")


        # 메일에서 메타 데이터 / 본문 추출, 한국어로 파싱
        parsed_email = EmailProcessor.parse_email_content(email_content)
        if not parsed_email["body"]:
            raise HTTPException(status_code=400, detail="Failed to parse email content")

        print(f"[DEBUG] Parsed email body sample: {parsed_email['body'][:100]}")


        # 벡터 db에 스레드 id 별로 메일 내용 저장
        VectorDBHandler.store_email_data(thread_id, parsed_email)


        return JSONResponse({
            'status': 'success',
            'thread_id': thread_id,
            'message': 'Email and attachments processed and stored successfully'
        })
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# 이메일 요약
@router.post("/summarizemail")
async def summarize_mail(request: Request):
    try:
        data = await request.json()
        thread_id = data.get('thread_id')
        if not thread_id:
            raise HTTPException(status_code=400, detail="Thread ID is required")

        print(f"[INFO] Generating summary for thread_id: {thread_id}")


        summary = RAGEngine.generate_email_summary(thread_id)
        if not summary or summary.isspace():
            raise HTTPException(status_code=500, detail="Failed to generate summary. Summary is empty.")

        return JSONResponse({
            'status': 'success',
            'thread_id': thread_id,
            'summary': summary
        })
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# 이메일 작성
@router.post("/writeemail")
async def write_email(request: Request, thread_id: str = Form(...), template: str = Form(...), 
                       attachments: List[UploadFile] = File(default=[]), user_prompt: str = Form(...)):
    try:
        # 템플릿 파싱
        template_data = json.loads(template)
        
    
        # # 스레드 데이터 가져오기
        # docs = VectorDBHandler.retrieve_thread_data(thread_id)
        # if not docs:
        #     raise HTTPException(status_code=404, detail="No data found for thread ID")
        

       # 첨부파일 처리
        attachments_data = []
        for file in attachments:
            filename = file.filename
            content = await file.read()
            # base64_content = base64.b64encode(content).decode("utf-8")
            if len(await file.read()) > MAX_ATTACH_SIZE:
                raise HTTPException(status_code=400, detail="Attachment exceeds the size limit.")
            attachments_data.append({
                "filename": filename,
                "content": content
            })
            print(f"[DEBUG] Processed attachment: {filename}")
  

        # 파일에서 텍스트 추출
        attachment_text = await EmailProcessor.process_attachments(attachments_data)
        
        # 이메일 초안 생성
        email_draft = await RAGEngine.generate_email_draft(template_data, attachment_text, user_prompt)
        
        if not email_draft or email_draft.isspace():
            raise HTTPException(status_code=500, detail="Failed to generate email draft. Draft is empty.")

        return JSONResponse({
            'status': 'success',
            'thread_id': thread_id,
            'email_draft': email_draft
        })
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# 디버깅용 - 스레드 별로 데이터 확인
@router.get("/debug/thread-data")
async def debug_thread_data(thread_id: str):
    try:
        documents = VectorDBHandler.retrieve_thread_data(thread_id)
        email_docs = [d for d in documents if d["metadata"].get("doc_type") == "email"]
        attachment_docs = [d for d in documents if d["metadata"].get("doc_type") == "attachment"]
        return JSONResponse({
            'status': 'success',
            'thread_id': thread_id,
            'document_count': len(documents),
            'email_docs_count': len(email_docs),
            'attachment_docs_count': len(attachment_docs),
            'documents': documents
        })
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    
# 디버깅용 - 첨부파일 제대로 변환되었는지 확인
@router.post("/debug/attachment-preview")
async def debug_attachment_preview(file: UploadFile = File(...)):
    try:
        filename = file.filename
        content = await file.read()
        ext = filename.split('.')[-1].lower()

        if ext == "pdf":
            text = EmailProcessor.extract_text_from_pdf(content)
        elif ext in ["xls", "xlsx"]:
            text = EmailProcessor.extract_text_from_excel(content)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}")

        text = EmailProcessor.clean_text(text)
        return JSONResponse({
            "status": "success",
            "filename": filename,
            "text_preview": text[:1000],
            "text_length": len(text)
        })
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
