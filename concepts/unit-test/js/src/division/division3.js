function divide3(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  const result = a / b;
  return Math.round(result * 100) / 100; // 소수 둘째 자리 반올림
}

module.exports = { divide3 };
