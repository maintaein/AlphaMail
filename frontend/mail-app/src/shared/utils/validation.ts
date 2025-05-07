/**
 * 이메일 주소의 유효성을 검사합니다.
 * @param email 검사할 이메일 주소
 * @returns 유효성 검사 결과와 오류 메시지
 */
export const validateEmail = (email: string): { isValid: boolean; message?: string } => {
    // 기본 검사: 빈 문자열 또는 공백만 있는 경우
    if (!email || email.trim() === '') {
      return { isValid: false, message: '이메일 주소를 입력해주세요.' };
    }
  
    // @ 기호 존재 여부 확인
    if (!email.includes('@')) {
      return { isValid: false, message: '이메일 주소에는 @ 기호가 포함되어야 합니다.' };
    }
  
    // 정규식을 사용한 상세 검사
    const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, message: '유효하지 않은 이메일 형식입니다.' };
    }
  
    // 로컬 파트 검사 (@ 앞부분)
    const localPart = email.split('@')[0];
    
    // 연속된 점(.) 검사
    if (localPart.includes('..')) {
      return { isValid: false, message: '이메일 주소에 연속된 점(.)이 포함될 수 없습니다.' };
    }
  
    // 도메인 파트 검사 (@ 뒷부분)
    const domainPart = email.split('@')[1];
    
    // 도메인에 최소 하나의 점(.)이 있어야 함
    if (!domainPart.includes('.')) {
      return { isValid: false, message: '도메인에는 최소 하나의 점(.)이 포함되어야 합니다.' };
    }
    
    // TLD(최상위 도메인) 길이 검사
    const tld = domainPart.split('.').pop() || '';
    if (tld.length < 2) {
      return { isValid: false, message: '최상위 도메인은 최소 2자 이상이어야 합니다.' };
    }
  
    // 전체 길이 제한 (RFC 5321에 따르면 최대 254자)
    if (email.length > 254) {
      return { isValid: false, message: '이메일 주소는 254자를 초과할 수 없습니다.' };
    }
  
    return { isValid: true };
  };