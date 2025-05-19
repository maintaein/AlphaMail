FROM python:3.11

WORKDIR /app

# 요구사항 파일만 먼저 복사하고 설치
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# ChromaDB 데이터 디렉토리 명시적 생성 및 권한 설정
RUN mkdir -p /app/db && chmod -R 777 /app/db

# 그다음 나머지 코드 복사
COPY . /app 

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]