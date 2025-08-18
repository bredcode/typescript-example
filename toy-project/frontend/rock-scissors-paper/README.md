## 가위바위보 미니 프로젝트

- npx create-vite@latest my-app --template react-ts

## 📝 실습 과제: js를 ts로 리팩토링

이 과제에서는 App.js로 작성된 가위바위보 게임을 TypeScript (App.tsx) 로 변환해보겠습니다.  
아래 문제들을 순서대로 풀어가며 코드를 점점 개선하세요.

### 문제 1. 파일 확장자 변경

현재 파일은 App.jsx입니다.
TypeScript + JSX를 쓰려면 .tsx 확장자가 필요합니다.

### 문제 2. 타입 정의하기

JS 코드에서는 문자열을 그대로 사용했습니다.
TypeScript에서는 명확한 타입을 정의해야 합니다.

- 선택지 타입은 "rock", "paper", "scissors" 중 하나가 되게 해주세요.
- 결과 타입은 "win", "lose", "draw" 중 하나가 되게 해주세요.
- 점수 타입은 user와 computer를 가지며 숫자 타입이 되게 해주세요. (ex: { user: ??, computer: ?? })

### 문제 3. useState에 타입 추가

현재 상태는 모두 "" (빈 문자열)로 초기화되어 있어 타입이 불명확합니다.

useState에 제네릭(<>)을 사용하여 타입을 지정해주세요.
위 `문제 2`에서 타입을 모두 정했지만, useState에서는 초기값이 ""이 될 수 있도록 허용해주어야합니다.

### 문제 4. 배열 타입 지정하기

`const choices = ["rock", "paper", "scissors"];`  
선택지 배열도 Choice 타입으로 명시해야 합니다.

### 문제 5. 함수에 타입 추가하기

- `determineWinner` 함수의 타입 지정이 필요하다면 모두 타입을 지정해주세요.
- `handleUserChoice` 함수의 타입 지정이 필요하다면 모두 타입을 지정해주세요.
- `resetGame`함수의 타입 지정이 필요하다면 모두 타입을 지정해주세요.
