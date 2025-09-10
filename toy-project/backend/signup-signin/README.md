## Token을 이용한 signup & signin

### 사전 작업

- 환경 구축

  ```shell
  mkdir signup-signin
  cd signup-signin
  npm init -y
  npm install express dotenv jsonwebtoken bcryptjs
  npm install --save-dev nodemon
  ```

  - 필수

    - express : API 서버 프레임워크
    - dotenv : .env 파일 로드
    - jsonwebtoken : JWT 생성 및 검증
    - bcryptjs : 비밀번호 해싱

  - 개발용
    - nodemon : 코드 수정 시 서버 자동 재시작

### 지금부터 함께 따라 코딩해봅시다!
