# FSD 아키텍처 구조

```
doctorstock-web/
├── src/
│   ├── app/                      # FSD App 레이어
│   │   ├── providers/
│   │   │   └── LayoutProvider.tsx
│   │   ├── styles/
│   │   │   └── layout.module.css
│   │   └── layout.tsx            
│   │
│   ├── pages/                    # FSD Pages 레이어
│   │   ├── home/
│   │   │   ├── ui/               # React 컴포넌트
│   │   │   │   └── page.tsx
│   │   │   ├── lib/              # 유틸리티 함수, slice내에서 사용되는 보조 기능
│   │   │   ├── consts/           # 설정값, 상수 값들을 담당
│   │   │   ├── model/            # 상태 관리 & 비즈니스 로직, 즉 상태와 상호작용, action 및 selectors가 해당됨
│   │   │   └── api/              # API 호출 로직
│   │   │
│   │   └── login/
│   │       ├── ui/               # slice를 구성하는 UI
│   │       │   └── page.tsx
│   │       ├── lib/              # slice내에서 사용되는 보조 기능, util 함수의 성격
│   │       ├── consts/           # 필요한 상수 값들을 담당
│   │       ├── model/            # 비즈니스 로직, 즉 상태와 상호작용, action 및 selectors가 해당됨
│   │       └── api/              # 필요한 서버 요청 담당
│   │
│   ├── widgets/                  
│   │   └── header/
│   │       ├── ui/Header.tsx             # 헤더 컴포넌트
│   │       └── model/use-navigation.ts   # 네비게이션 로직
│   │
│   ├── features/                 # 로그인 기능이나 비밀번호 일치 여부 검증, 일정 규칙을 따르는지 검증 로직 등이 해당
│   ├── entities/                 # FSD Entities 레이어(User 엔터티를 정의하여 사용자 데이터를 관리)
│   │   └── User.tsx
│   │
│   └── shared/                   # Button과 같은 기본 컴포넌트를 제공, 프로젝트 전반에서 다양한 버튼 스타일을 일관되게 사용
│       ├── components/           # 기존의 components
│       │   ├── Button.tsx        # 공통 버튼
│       │   ├── Input.tsx         # 공통 인풋
│       │   └── Modal.tsx         # 공통 모달
│       ├── api/                  # 공통 API 클라이언트
│       │   └── client.ts         # API 클라이언트
│       ├── style/                # 글로벌 및 공통 스타일 파일
│       │   ├── theme.ts          # 전역 테마 설정 (컬러, 폰트 등)
│       │   └── globals.css       # 글로벌 스타일 시트
│       ├── lib/                  # 공통 유틸리티 함수 및 헬퍼 함수
│       │   ├── formatDate.ts     # 날짜 포맷팅 함수
│       │   ├── mathHelpers.ts    # 수학 계산 관련 헬퍼 함수
│       │   └── api.ts            # 공통 API 호출 함수
│       ├── hooks/                # 재사용 가능한 React Hooks
│       │   ├── useWindowSize.ts  # 윈도우 크기 감지 Hook
│       │   └── useDebounce.ts    # 디바운스 기능을 제공하는 Hook
│       ├── constants/            # 프로젝트 전역에서 사용되는 상수 값
│       │   ├── apiUrls.ts        # API URL 목록
│       │   └── roles.ts          # 사용자 권한 관련 상수 값
│       └── auth/
│           ├── utils.ts          # 유틸 함수
│           └── validation.ts     # 검증 로직
│
├── public/                      # Assets, Fonts
└── package.json
```
