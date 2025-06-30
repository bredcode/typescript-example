const { divide3 } = require("../../src/division/division3");

const cases = [
  [10, 3, 3.33],
  [5, 2, 2.5],
  [7, 3, 2.33],
  [1, 3, 0.33],
  [2, 3, 0.67],
  [10, 4, 2.5],
  [100, 3, 33.33],
  [1234, 10, 123.4],
  [0, 5, 0],
];

describe("divide3 함수", () => {
  test.each(cases)("%i / %i = %f", (a, b, expected) => {
    expect(divide3(a, b)).toBeCloseTo(expected, 2); // 소수점 둘째 자리까지 검사
  });

  it("0으로 나누면 에러가 발생해야 한다", () => {
    expect(() => divide3(10, 0)).toThrow("Cannot divide by zero");
  });
});
