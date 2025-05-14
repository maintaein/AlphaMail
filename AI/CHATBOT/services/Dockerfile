FROM python:3.12

WORKDIR /app

# requirements.txt 복사 및 의존성 설치
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# 소스 코드 전체 복사
COPY . .

# Flask 서버 포트 오픈
EXPOSE 5001

# Flask 앱 실행 (main.py)
CMD ["python", "main.py"] 