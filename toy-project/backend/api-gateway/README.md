### 사전 작업

```shell
mkdir file-server
cd file-server
npm init -y
npm i express http-proxy-middleware
```

### 설명

이 프로젝트는 **Node.js + Express + http-proxy-middleware**를 사용하여 간단한 **API Gateway**를 구현한 예제입니다.  
각기 다른 마이크로서비스(User Service, Product Service 등)에 대한 요청을 중앙 Gateway를 통해 라우팅합니다.

클라이언트 요청을 내부 마이크로서비스로 프록시합니다.

### 구조

```bash
📦 gateway/
├── index.js         ← API Gateway
📦 services/
├── user-service.js  ← 유저 서비스 (예: /users)
├── product-service.js ← 상품 서비스 (예: /products)
```

### 실행 방법

```bash
# 각 마이크로서비스 실행
node user.js
node product.js

# API Gateway 실행
node index.js

# 유저 조회
GET http://localhost:3000/users

# 상품 조회
GET http://localhost:3000/products

```
