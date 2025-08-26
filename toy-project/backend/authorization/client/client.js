const fetch = require("node-fetch");

const API = "http://localhost:4000"; // 서버 주소
const EMAIL = "demo@google.com"; // 데모 계정
const PASSWORD = "1234";

let cookieStore = ""; // 여기에 쿠키 문자열을 직접 보관

/* ───────────────────── 공통 fetch 래퍼 ───────────────────── */
function getAccessToken() {
  return cookieStore
    .split("; ") // 'key=value' 배열
    .find((p) => p.startsWith("accessToken=")) // 'accessToken=abc.123'
    ?.split("=")[1]; // 'abc.123'
}

async function api(path, options = {}) {
  const accessToken = cookieStore ? getAccessToken() : null;

  const headers = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(cookieStore ? { Cookie: cookieStore } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API}${path}`, { ...options, headers });

  const cookie = res.headers.raw()["set-cookie"];
  // console.log(cookie);
  if (cookie?.length) cookieStore = cookie.map((c) => c.split(";")[0]).join("; ");

  return res;
}

/* ───────────────────── 액션 함수들 ───────────────────── */
async function login() {
  const res = await api("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  console.log("login:", res.status, await res.json());
}

async function profile() {
  const res = await api("/profile");
  console.log("profile:", res.status, await res.json());
}

async function refresh() {
  const res = await api("/auth/refresh", { method: "POST" });
  console.log("refresh:", res.status, await res.json());
}

async function logout() {
  const res = await api("/auth/logout", { method: "POST" });
  console.log("logout:", res.status, await res.json());
  cookieStore = ""; // 로컬 쿠키도 비움
}

/* ───────────────────── 시나리오 실행 ───────────────────── */
(async () => {
  await login(); // ① 로그인 → 두 쿠키 저장
  await profile(); // ② 보호 API 호출
  await refresh(); // ③ accessToken 재발급
  await profile(); // ④ 다시 호출 (재발급된 토큰 사용)
  await logout(); // ⑤ 로그아웃
})();
