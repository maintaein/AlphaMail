export function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ');
  }

//여러 Tailwind 클래스명을 조건부로 병합해주는 유틸리티 함수
//조건부로 병합해주는 이유는 클래스명을 조건부로 적용하기 위해서
//...classes에 전달된 값 중 falsy(false, null, undefined, '')가 아닌 것만 골라서
//공백 한 칸(' ')으로 합쳐주는 함수
