from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch
from services.vector_db import VectorDBHandler

device = "cuda" if torch.cuda.is_available() else "cpu"

model_id = "digit82/kobart-summarization"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16 if device == "cuda" else torch.float32
).to(device)

llm = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    device=0 if device == "cuda" else -1
)

MAX_LENGTH = 800  # LLM 입력 최대 토큰 수
MAX_ATTACH_SIZE = 10 * 1024 * 1024  # 10MB

class RAGEngine:

    @staticmethod
    def truncate_prompt(prompt: str, max_input_tokens: int) -> str:
        input_ids = tokenizer.encode(prompt, truncation=False, add_special_tokens=False)
        if len(input_ids) > max_input_tokens:
            input_ids = input_ids[:max_input_tokens]
        return tokenizer.decode(input_ids, skip_special_tokens=True)
    
    @staticmethod
    def generate_email_summary(thread_id):
        try:
            email_docs = VectorDBHandler.retrieve_thread_data(thread_id)
            if not email_docs:
                print(f"[WARNING] No documents found for thread {thread_id}")
                return "No email content found to summarize."

            full_content = "\n".join(d["content"] for d in email_docs if d.get("content"))
            max_input_tokens = 900

            # 수정 후 (중복 제거)
            prompt = f"지시사항 : 메일 내용 요약, 한국어, 3줄로 요약 : {full_content}"
            prompt = RAGEngine.truncate_prompt(prompt, max_input_tokens)
            print(f"[DEBUG] Prompt tokens: ~{len(tokenizer.tokenize(prompt))}")
            result = llm(
                prompt,
                max_new_tokens=150,
                do_sample=False,
                repetition_penalty=1.3,
                pad_token_id=tokenizer.pad_token_id or tokenizer.eos_token_id
            )

            summary = result[0]["generated_text"].strip()
            return summary

        except Exception as e:
            print(f"[ERROR] Error generating summary: {str(e)}")
            import traceback
            traceback.print_exc()
            return "Error generating email summary. Please try again."

    @staticmethod
    async def generate_email_draft(template, attachment_text, user_prompt):
        try:
            # 빈 값 방지
            template_str = "\n".join(f"{k}: {v}" for k, v in template.items() if v)
            user_prompt = user_prompt or ""
            attachment_text = attachment_text or ""

            # Make the prompt much simpler and shorter
            combined_prompt = f"이메일 초안: {template_str} {user_prompt}"
            
            # Use a much lower safe token limit - kobart models often have issues with longer sequences
            safe_max_length = 500  # Much more conservative limit
            
            # Check token count after initial formatting
            token_count = len(tokenizer.tokenize(combined_prompt))
            print(f"[DEBUG] Initial prompt length: {len(combined_prompt)} chars, ~{token_count} tokens")
            
            # Always truncate to be safe
            combined_prompt = RAGEngine.truncate_prompt(combined_prompt, safe_max_length)
            
            token_count_after = len(tokenizer.tokenize(combined_prompt))
            print(f"[DEBUG] Truncated prompt length: {len(combined_prompt)} chars, ~{token_count_after} tokens")
            
            # Use much safer generation parameters
            result = llm(
                combined_prompt,
                max_new_tokens=500,  # Generate fewer tokens
                do_sample=False,
                temperature=1.0,
                pad_token_id=tokenizer.pad_token_id or tokenizer.eos_token_id,
                truncation=True  # Enable truncation during generation too
            )

            draft = result[0]["generated_text"].strip()
            print(f"[DEBUG] Draft length: {len(draft)}")
            return draft

        except Exception as e:
            print(f"[ERROR] Error generating email draft: {str(e)}")
            import traceback
            traceback.print_exc()
            return "Error generating email draft. Please try again."