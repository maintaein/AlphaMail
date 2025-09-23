
 
# 백엔드 아키텍처

## 기술 스택 세부사항
### 핵심 프레임워크

- Spring Boot 3.4.5 (Java 17)
- Spring Security - 인증/인가
- Spring Data JPA - ORM
- Spring Data Redis - 캐싱/세션 관리
- Spring WebFlux - WebClient용 리액티브 프로그래밍

### 데이터베이스 & 저장소

- PostgreSQL - 메인 데이터베이스
- Redis - 캐싱 및 세션 스토어

### 이메일 & 클라우드 서비스

- AWS SES (Simple Email Service) - 이메일 발송
- AWS S3 - 파일 저장
- Jakarta Mail API - 이메일 처리

### 보안 & 인증

- JWT (JJWT 0.11.5) - JSON Web Token 기반 인증
- Spring Security - 보안 프레임워크

### 유틸리티 & 도구

- MapStruct 1.5.5 - 객체 매핑
- Lombok - 보일러플레이트 코드 제거
- P6Spy - SQL 쿼리 로깅
- Jackson - JSON 처리
- Checkstyle - 코딩 컨벤션 (네이버 스타일)

### 빌드 & 배포

- Gradle 8.13 - 빌드 도구
- Docker - 컨테이너화
- Eclipse Temurin JDK 17 - 런타임
  
## 기술 스택 선택 배경

### Spring Boot 3.4.5 + Java 17 도입
기업용 이메일 시스템은 **대용량 트래픽과 복잡한 비즈니스 로직**을 안정적으로 처리해야 했습니다. 이를 위해 **Spring Boot 3.4.5와 Java 17**을 선택하여 가상 스레드와 향상된 GC 성능을 통해 **동시성 처리 능력을 극대화**했습니다.

### PostgreSQL + Redis 듀얼 저장소
이메일 메타데이터는 **복잡한 관계형 쿼리**가 필요하고, 세션과 캐시는 **빠른 접근 속도**가 요구되었습니다. 따라서 **PostgreSQL을 메인 DB로, Redis를 캐싱 및 세션 스토어**로 구성하여 데이터 특성에 맞는 최적화를 달성했습니다.

## DDD 아키텍처 적용

### 복잡한 도메인 분리 필요성
이메일, AI 자동화, ERP 연동이라는 **서로 다른 비즈니스 컨텍스트**가 하나의 시스템에 공존해야 했습니다. 이를 해결하기 위해 **DDD의 바운디드 컨텍스트**를 적용하여 각 도메인을 독립적으로 설계했습니다.

```
api/
├── email/          # 이메일 도메인 - RFC 표준 준수, 스레드 관리
├── assistants/     # AI 자동화 도메인 - 임시 데이터 → 승인 워크플로우  
├── user/           # 사용자 도메인 - 인증, 권한 관리
├── organization/   # 조직 도메인 - 회사, 그룹 구조
└── erp/           # ERP 도메인 - 실제 비즈니스 데이터
```

### 헥사고날 아키텍처로 의존성 관리
외부 시스템(AWS SES, Claude AI, OCR)에 대한 **의존성을 격리**하고 테스트 가능성을 확보해야 했습니다. **포트/어댑터 패턴**을 통해 도메인 로직과 인프라스트럭처를 분리하여 **외부 변경에 견고한 시스템**을 구축했습니다.

```java
// 도메인 포트 정의
public interface EmailSenderPort {
    String send(Email email, List<MultipartFile> multipartFiles);
}

// 인프라 어댑터 구현
@Component
public class EmailSenderPortImpl implements EmailSenderPort {
    private final AmazonSimpleEmailService sesClient;
    // AWS SES 구현 로직
}
```

## AI 통합 아키텍처

### 리액티브 프로그래밍 도입
Claude AI, OCR, 벡터 검색 등 **다수의 외부 AI 서비스 호출**이 동시에 발생하는 상황에서 성능 저하를 방지해야 했습니다. **Spring WebFlux와 리액티브 프로그래밍**을 도입하여 **논블로킹 비동기 처리**로 시스템 처리량을 향상시켰습니다.

```java
// 이메일 수신 시 병렬 AI 처리
public void excute(ReceiveEmailRequest request) {
    // 벡터 DB 저장
    emailVectorUseCase.execute(...)
        .onErrorContinue((error, item) -> log.warn("벡터 저장 실패"))
        .subscribe();
    
    // MCP 처리
    Flux.just(request)
        .flatMap(req -> emailMCPUseCase.execute(req, savedEmail.getEmailId()))
        .subscribe();
    
    // OCR 처리
    Flux.fromIterable(ocrTargets)
        .concatMap(attachment -> emailOCRRespository.registOCR(...))
        .subscribe();
}
```

### 임시 데이터 승인 워크플로우
AI가 생성한 데이터를 **무분별하게 시스템에 반영하면 안 된다**는 비즈니스 요구사항이 있었습니다. **Temporary 엔티티 패턴**을 도입하여 AI 생성 데이터를 사용자가 검토/수정한 후 실제 ERP 시스템에 반영하는 **승인 기반 워크플로우**를 구현했습니다.

```java
// 사업자등록증 OCR → 임시 고객 생성 → 사용자 승인 → 정식 고객 등록
public static TemporaryClient from(TemporaryClientRequest request, Integer userId, Email email) {
    return TemporaryClient.builder()
        .licenseNum(request.licenseNum())  // OCR 인식 데이터
        .corpName(request.corpName())
        .businessLicense(request.businessLicense())  // 원본 파일 경로
        .build();
}
```

## 이메일 시스템 설계

### RFC 표준 준수 필요성
기존 이메일 클라이언트와의 **호환성 확보**와 **답장/전달 기능의 정확한 동작**이 필요했습니다. **RFC 2822 표준을 완전히 준수**하는 이메일 헤더 처리와 **UUID 기반 스레드 관리**를 구현했습니다.

```java
public static ThreadId fromEmailHeaders(String references, String inReplyTo, String currMessageId) {
    // 1. References 헤더의 첫 번째 메시지 ID 사용
    if(references != null && !references.isEmpty()) {
        String firstMessageId = extractFirstMessageId(references);
        return new ThreadId(extractIdFromMessageId(firstMessageId));
    }
    // 2. In-Reply-To 헤더 사용  
    // 3. 새 메시지면 UUID 생성
}
```

### 대용량 첨부파일 처리
비즈니스 문서는 **40MB까지의 대용량 파일**이 필요했습니다. **AWS S3 연동과 스트리밍 다운로드**를 구현하여 메모리 효율적인 파일 처리를 실현했습니다.

## 보안 아키텍처

### 다층 보안 체계
기업용 시스템에서는 **데이터 유출 방지**가 핵심 요구사항이었습니다. **JWT 토큰 인증, 사용자별 데이터 격리, BCrypt 12라운드 암호화**를 조합하여 다층 보안 체계를 구축했습니다.

```java
// 모든 쿼리에 사용자 격리 조건 강제
Optional<EmailEntity> findByIdAndUserUserId(Integer id, Integer userId);

// 커스텀 인증 어노테이션으로 보안 추상화
public ResponseEntity<EmailDetailResponse> getEmail(@PathVariable Integer mailId, @Auth Integer userId)
```

### 첨부파일 보안
첨부파일 다운로드 시 **3단계 권한 검증**을 구현하여 무단 접근을 방지했습니다:
1. 첨부파일 존재 확인
2. 이메일 소유자 확인  
3. 첨부파일-이메일 연관성 확인

## 성능 최적화

### N+1 문제 해결
복잡한 연관관계에서 발생하는 **N+1 쿼리 문제**를 해결하기 위해 **@Query와 JOIN FETCH**를 활용한 배치 로딩을 구현했습니다.

```java
@Query("""
    SELECT DISTINCT e FROM EmailEntity e
    LEFT JOIN FETCH e.attachments
    WHERE e.folder.emailFolderId = :folderId AND e.user.userId = :userId
""")
List<EmailEntity> findAllWithAttachmentsByFolderIdAndUserId(...)
```

### MapStruct 컴파일 타임 매핑
런타임 리플렉션 오버헤드를 제거하고 **타입 안전성을 보장**하기 위해 **MapStruct를 활용한 컴파일 타임 매핑**을 전면 도입했습니다. 이를 통해 **매핑 성능을 대폭 향상**시키고 개발 시점에 매핑 오류를 발견할 수 있게 되었습니다.

## 기술 스택

| 분야 | 기술 | 버전 |
|------|------|------|
| **Framework** | Spring Boot | 3.4.5 |
| **Language** | Java | 17 |
| **Database** | PostgreSQL | - |
| **Cache** | Redis | - |
| **Authentication** | JWT | - |
| **ORM** | JPA/Hibernate | - |
| **Mapping** | MapStruct | 1.5.5 |
| **Cloud** | AWS SES/S3 | - |
| **AI Integration** | Claude API | - |
| **Build** | Gradle | 8.13 |

이러한 아키텍처 선택들을 통해 **확장 가능하고, 안전하며, 성능이 뛰어난** 기업용 이메일 자동화 플랫폼을 구축할 수 있었습니다.
