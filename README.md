# 임신 주차에 따른 체크리스트


## 1. 폴더/파일 구조
전체적으로 `api`와 `global`로 나누어져 있습니다.
### api
api에선 각 도메인별로 분리 후 계층형 아키텍처로 폴더 구조 설계했습니다.
- application: 서비스 로직을 포함합니다.
- domain: 엔티티와 도메인을 포함합니다.
- infrastructure: 데이터베이스와 같은 인프라 관련 코드를 포함합니다.
  - 인프라의 분리를 위해 data mapper패턴 사용
  - typeorm0.3.x 에선 datamapper 패턴을 지양하며 repo패턴을 deprecated 했으며 active record 패턴을 권장함
- presentation: 컨트롤러 및 리졸버와 같은 클라이언트 인터페이스 로직을 포함합니다.
### global
전역적으로 사용되는 모듈과 설정을 포함합니다.
- config: 전역 설정 파일을 포함합니다 (예: GraphQL 및 TypeORM 설정).
- decorators: 커스텀 데코레이터를 포함합니다.
- dto: 전역적으로 사용될 수 있는 DTO를 포함합니다.
- guards: 인증 및 권한 검사를 위한 가드를 포함합니다.
- util: date 파싱과 같은 유틸리티 함수를 포함합니다.
```
├── api/
│   ├── checklist/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   └── user/
│       ├── application/
│       ├── domain/
│       ├── presentation/
├── global/
│   ├── config/
│   │   ├── graphql.config.ts
│   │   └── typeorm.config.ts
│   ├── decorators/
│   │   └── validate-date-format.decorator.ts
│   ├── dto/
│   │   └── pagination.dto.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   └── util/
│       └── date.util.ts
├── app.module.ts*
└── main.ts*

```

## 2. query/mutation

### 2.1 헤더 설정
```
{
  "userSeq":1
}
```
### 2.2 사용자
```
# 사용자 조회
query {
  findUser(seq:1) {
    seq
    nickname
    dueDate
    pregnancyWeek
  }
}

# 사용자 정보 변경
mutation {
  updateUser(updateUser: {
    seq: 1,
    nickname: "test",
    dueDate: "2024-09-18" // YYYY-MM-DD 포맷만 지원
  })
}
```

### 2.3 체크리스트
```
# 아이템 추가
mutation {
  addChecklist(createChecklist: { userSeq: 1, weekNumber: 1, content: "test" })
}

# 아이템 내용 수정
mutation {
  updateChecklist(updateChecklist: { seq: 2, content: "test12" }) {
    weekNumber
    content
    isCompleted
    createdAt
  }
}

# 주차별 체크리스트 조회
query {
  getChecklist(
    userId: 1
    week: 1
    pagination: { limit: 10, offset: 0, orderBy: "createdAt" }
  ) {
    seq
    weekNumber
    content
    isCompleted
    createdAt
  }
}

# 완료 체크/해제 처리
mutation {
  updateCompleteChecklist(seq: 2, isCompleted: true) {
    weekNumber
    content
    isCompleted
    createdAt
  }
}

# 삭제 / 삭제 취소 처리
mutation {
  updateDeleteChecklist(seq:2, isDeleted:false)
}
```

## 3. 프론트 개발 시 고려사항
- 완료/완료 해제 - 조회 된 `isCompleted` 값으로 상태관리 및 체크 표시, onClick 이벤트로 `updateCompleteChecklist mutation` 호출
- 삭제/삭제 취소 - 조회 된 `isDeleted` 값으로 상태관리 및 삭제 표시, onClick 이벤트로 `updateDeleteChecklist mutation` 호출
- 사용자 정보 변경 - `updateUser mutation` 호출 시 `dueDate: "YYYY-MM-DD"` 포맷만 지원 이외 에러 발생

## 4. 문제와 해결과정
### 4.1 graphql mutation 호출 시 date 포맷
- 문제 : `dueDate: "YYYY-MM-DD"` 포맷만 지원하지만 타입을 string으로 지정해 프론트엔드 개발 시 포맷 예측 불가능
- 해결 과정 : 
@InputType 정의할 때 스프링의 `@Pattern` 정규식 기반으로 유효성 검사하는 어노테이션처럼 사용하면 좋겠다 생각해서
`@ValidateDateFormat` 데코레이터를 추가했고 날짜 포맷을 아래 예시와 같이 다른 곳에서 사용할 수 있도록 함
``` typescript
// validate-date-format.decorator.ts
@ValidatorConstraint({ async: false })
export class ValidateDateFormatDecorator
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const [format] = args.constraints;
    const regex = new RegExp(format.replace(/[YMD]/g, '\\d'));
    return typeof value === 'string' && regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    const [format] = args.constraints;
    return `Date must be in the format ${format}`;
  }
}

export const ValidateDateFormat = (
  format: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [format],
      validator: ValidateDateFormatDecorator,
    });
  };
};
```
- 사용 예시
``` typescript
// update-user.input.ts
@InputType()
export class UpdateUserInput {
  @Field()
  seq: number;

  @Field()
  nickname: string;

  @Field()
  @ValidateDateFormat('YYYY-MM-DD', {
    message: 'dueDate must be in the format YYYY-MM-DD',
  })
  dueDate: string;
}
```
