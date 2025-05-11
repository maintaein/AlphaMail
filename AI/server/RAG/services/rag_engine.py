import requests
from services.vector_db import VectorDBHandler

LLM_API_URL = "http://localhost:8000/v1/chat/completions"
LLM_MODEL = "mistralai/Mathstra-7B-v0.1"

class RAGEngine:
    @staticmethod
    def generate_email_summary(thread_id):
        try:
            docs = VectorDBHandler.retrieve_thread_data(thread_id)
            if not docs:
                return "No email content found to summarize."

            email_docs = [d for d in docs if d["metadata"].get("doc_type") == "email"]
            attachment_docs = [d for d in docs if d["metadata"].get("doc_type") == "attachment"]

            email_content = "\n".join(d["content"] for d in email_docs)
            attachment_content = "\n".join(
                f"[{d['metadata'].get('filename', 'Unknown')}] {d['content']}" for d in attachment_docs
            )

            text_to_summarize = email_content
            if attachment_content.strip():
                text_to_summarize += f"\n{attachment_content}"

            prompt = f"다음 이메일 및 첨부파일 내용을 요약해줘:\n{text_to_summarize}"

            response = requests.post(
                LLM_API_URL,
                json={
                    "model": LLM_MODEL,
                    "messages": [
                        {"role": "system", "content": "너는 이메일 요약을 잘하는 비서야."},
                        {"role": "user", "content": prompt}
                    ],
                    "max_tokens": 200
                }
            )
            response.raise_for_status()
            summary = response.json()["choices"][0]["message"]["content"].strip()
            return summary

        except Exception as e:
            print(f"[ERROR] Error generating summary: {str(e)}")
            import traceback
            traceback.print_exc()
            return "Error generating email summary. Please try again."

    @staticmethod
    def generate_email_draft(thread_id, template):
        try:
            content_req = template.get("pdf 내용 추출", "")
            format_req = template.get("작성 유형", "")

            docs = VectorDBHandler.retrieve_thread_data(thread_id, query=content_req, top_k=5)
            if not docs:
                return "No content found to draft email from."

            context = "\n".join([d["content"] for d in docs])

            prompt = f"""
아래 참고 내용을 바탕으로 이메일 초안을 작성해줘.

참고 내용:
{context}

요구사항:
- 내용 중심: {content_req}
- 형식: {format_req}

작성된 이메일:
"""

            response = requests.post(
                LLM_API_URL,
                json={
                    "model": LLM_MODEL,
                    "messages": [
                        {"role": "system", "content": "너는 이메일 초안 작성을 잘하는 비서야."},
                        {"role": "user", "content": prompt}
                    ],
                    "max_tokens": 300
                }
            )
            response.raise_for_status()
            draft = response.json()["choices"][0]["message"]["content"].strip()
            return draft

        except Exception as e:
            print(f"[ERROR] Error generating email draft: {str(e)}")
            import traceback
            traceback.print_exc()
            return "Error generating email draft. Please try again."