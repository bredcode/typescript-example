import { divide2 } from "../../src/division/division2";

const cases: Array<[number, number, number]> = [
  [10, 2, 5],
  [3, 1, 3],
  [8, 4, 2],
  [18, 3, 6],
  [15, 5, 3],
  [21, 7, 3],
  [100, 10, 10],
  [54, 6, 9],
  [81, 9, 9],
  [64, 8, 8],
];

describe("divide2 함수", () => {
  test.each(cases)("%i / %i = %i", (a, b, expected) => {
    expect(divide2(a, b)).toBe(expected);
  });

  it("0으로 나누면 에러가 발생해야 한다", () => {
    expect(() => divide2(1, 0)).toThrow("Cannot divide by zero");
  });
});
