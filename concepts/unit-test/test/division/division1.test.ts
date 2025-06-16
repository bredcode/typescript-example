import { divide1 } from "../../src/division/division1";

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

describe("divide1 함수", () => {
  test.each(cases)("%i / %i = %i", (a, b, expected) => {
    expect(divide1(a, b)).toBe(expected);
  });
});
