# FSD 아키텍처 구조

```
doctorstock-web/
├── src/
│   ├── app/                         # 라우팅/메타/레이아웃은 여기서만 결정
│   │   ├── (public)/                # route group (URL에 안 잡힘)
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (protected)/
│   │   │   └── home/
│   │   │       └── page.tsx         # 서버 컴포넌트(기본)
│   │   ├── layout.tsx
│   │   ├── providers.tsx            # 전역 Provider (client)
│   │   └── globals.css
│   │
│   └── layers/                      # FSD 레이어들 (app 밖에 둬서 라우팅과 분리)
│       ├── pages/                   # "페이지 모듈" (Next 라우트 파일 아님!)
│       │   ├── home/
│       │   │   ├── ui/
│       │   │   │   └── HomePage.tsx
│       │   │   ├── lib/             # 유틸리티 함수, slice내에서 사용되는 보조 기능
│       │   │   ├── consts/          # 설정값, 상수 값들을 담당
│       │   │   ├── model/           # 상태 관리 & 비즈니스 로직, 즉 상태와 상호작용, action 및 selectors가 해당됨
│       │   │   └── api/             # API 호출 로직
│       │   │
│       │   └── login/
│       │       ├── ui/
│       │       │   └── LoginPage.tsx
│       │       ├── lib/             # slice내에서 사용되는 보조 기능, util 함수의 성격
│       │       ├── consts/          # 필요한 상수 값들을 담당
│       │       ├── model/           # 비즈니스 로직, 즉 상태와 상호작용, action 및 selectors가 해당됨
│       │       └── api/             # 필요한 서버 요청 담당
│       │
│       ├── widgets/                 
│       │   └── header/
│       │       ├── ui/
│       │       │   └── Header.tsx   # 헤더 컴포넌트
│       │       └── model/
│       │           └── useNavigation.ts  # 네비게이션 로직
│       │
│       ├── features/                # 로그인 기능이나 비밀번호 일치 여부 검증, 일정 규칙을 따르는지 검증 로직 등이 해당
│       │   ├── auth/
│       │   │   └── login/
│       │   │       ├── ui/
│       │   │       │   └── LoginForm.tsx
│       │   │       ├── model/
│       │   │       └── api/
│       │   │
│       │   └── onboarding/
│       │       ├── ui/
│       │       └── model/
│       │
│       ├── entities/                # FSD Entities 레이어(User 엔터티를 정의하여 사용자 데이터를 관리)
│       │   └── user/
│       │       ├── ui/
│       │       ├── model/
│       │       ├── api/
│       │       └── lib/
│       │
│       └── shared/                  # Button과 같은 기본 컴포넌트를 제공, 프로젝트 전반에서 다양한 버튼 스타일을 일관되게 사용
│           ├── ui/                  # 기존의 components
│           │   ├── Button/
│           │   │   └── Button.tsx   # 공통 버튼
│           │   ├── Input/
│           │   │   └── Input.tsx    # 공통 인풋
│           │   └── Modal/
│           │       └── Modal.tsx    # 공통 모달
│           ├── api/
│           │   ├── client.ts        # 클라에서만 쓰는 요청
│           │   ├── server/          # 서버에서만 쓰는 fetch
│           │   └── common/          # 둘 다 가능한 공용
│           ├── lib/                 # 공통 유틸리티 함수 및 헬퍼 함수
│           │   ├── formatDate.ts    # 날짜 포맷팅 함수
│           │   ├── mathHelpers.ts   # 수학 계산 관련 헬퍼 함수
│           │   └── api.ts           # 공통 API 호출 함수
│           ├── config/
│           │   ├── apiUrls.ts       # API URL 목록
│           │   └── roles.ts         # 사용자 권한 관련 상수 값
│           ├── styles/
│           │   └── theme.css        # 전역 테마 설정 (컬러, 폰트 등)
│           ├── types/
│           ├── hooks/               # 재사용 가능한 React Hooks
│           │   ├── useWindowSize.ts # 윈도우 크기 감지 Hook
│           │   └── useDebounce.ts   # 디바운스 기능을 제공하는 Hook
│           └── auth/                # 인증 관련 공통 로직
│               ├── utils.ts         # 유틸 함수
│               └── validation.ts    # 검증 로직
│
├── public/                          # Assets, Fonts
└── package.json
```