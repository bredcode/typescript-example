module.exports = function rateLimiter() {
  const capacity = 2; // 1초당 최대 2개 요청
  const refill = 1; // 초당 1 토큰 충전
  const buckets = new Map(); // key: IP, value: {tokens, last}

  return (req, res, next) => {
    const key = req.ip;
    console.log(key);
    const now = Date.now() / 1000; // 초 단위

    if (!buckets.has(key)) {
      buckets.set(key, { tokens: capacity, last: now });
    }

    const bucket = buckets.get(key);
    // 지난 시간만큼 토큰 충전
    const delta = now - bucket.last;
    bucket.tokens = Math.min(capacity, bucket.tokens + delta * refill);
    bucket.last = now;
    console.log("남은 토큰 수 : ", bucket.tokens);

    if (bucket.tokens < 1) {
      // 남은 토큰 없음 → 429 응답
      res.setHeader("Retry-After", Math.ceil(1 / refill));
      return res.status(429).json({ error: "Too Many Requests" });
    }

    bucket.tokens -= 1;
    next();
  };
};
