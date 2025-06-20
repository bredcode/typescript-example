export function divideRounded(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  const result = a / b;
  return Math.round(result * 100) / 100; // 소수 둘째 자리 반올림
}
