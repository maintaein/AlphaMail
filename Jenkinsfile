pipeline {
  agent any

  environment {
    COMPOSE_FILE = 'docker-compose.yml'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Deploy with Docker Compose') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE pull || true' // optional
        sh 'docker compose -f $COMPOSE_FILE up -d --build'
      }
    }
  }

  post {
    success {
      echo '✅ 배포 성공!'
    }
    failure {
      echo '❌ 배포 실패...'
    }
  }
}
