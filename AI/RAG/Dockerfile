FROM python:3.11

WORKDIR /app

# 요구사항 파일만 먼저 복사하고 설치
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# 그다음 나머지 코드 복사
COPY . /app 

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]