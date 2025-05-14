# 1. Node.js 공식 이미지 사용 (버전은 프로젝트에 맞게 조정)
FROM node:21

# 2. 작업 디렉토리 생성 및 설정
WORKDIR /app

# 3. package.json, package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스 코드 복사
COPY . .


EXPOSE 3000

CMD ["node", "server.mjs"]