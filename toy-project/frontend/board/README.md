# Server와 연결된 게시판

## 학습 목표

- json server를 통해 서버와 클라이언트를 연결하여 본다.
- 이때 타입을 지정하여 ts를 어떻게 사용하는지 좀 더 서버와 함께 경험해본다.
- 이 과정에서 ts도 익히고 mock server도 어떻게 사용하는지 경험해본다.

---

## 사전 준비

프로젝트 초기화:

```
npx create-vite@latest board --template react-ts
cd board

npm install
# json-server 설치 (로컬 개발용 API 서버)
npm install -D json-server
# axios 설치 (API 호출용)
npm install axios
```

json-server 설정:

프로젝트 루트에 `db.json` 파일 생성 후 아래와 같이 구성

```json
{
  "posts": []
}
```

package.json에 실행 스크립트 추가

```json
"scripts": {
  ...,
  "server": "json-server --watch db.json --port 3001"
}
```

## 백앤드 서버(json-server) & 클라이언트 실행

백엔드(API 서버) 실행

`npm run server`

→ http://localhost:3001 로 접속 가능

프론트엔드 실행

`npm run dev`

→ http://localhost:5173 (Vite 기본 포트) 접속 가능

---

지금부터 App.tsx, posts.ts, types.ts를 작성해봅니다.
