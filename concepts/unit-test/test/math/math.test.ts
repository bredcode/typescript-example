import { add, multiply } from "../../src/math/math";

describe("math 함수", () => {
  it("add는 두 수를 더한다", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("multiply는 두 수를 곱한다", () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
