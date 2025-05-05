### 사전 작업

```shell
mkdir loadbalancer
cd loadbalancer
npm init -y
npm i express http-proxy axios
```

### 문제

방금 random loadbalancer에 대해서 진행해보았습니다.
랜덤하게 트래픽을 분배할 경우, 한쪽으로 몰릴 수 있는 경우가 있는데
이를 해결하기 위한 다양한 로드밸런서 알고리즘들이 있습니다.

이번 실습 시간에는 각자 생각나는 알고리즘을 이용하여  
어떻게 하면 가장 공평하게 분배할 수 있는 로드 밸런서를 만들 수 있을지 고민해보고 코드를 작성해봅시다!

백엔드 서버(5001, 5002번 포트)가 존재하는 환경에서,  
클라이언트의 요청을 각 서버에 분산시키는 로드 밸런서를  
Node.js, Express, 그리고 http-proxy 라이브러리를 사용하여 구현해보세요.

### Tip

- 앞선 randomLB 코드를 적극적으로 활용해보세요.
- 본인만의 아이디어가 안떠오른다면 round-robin 방식으로 해주세요.
