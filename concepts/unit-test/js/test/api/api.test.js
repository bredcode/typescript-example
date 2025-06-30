const { fetchUser, User } = require("../../src/api/api");

it("fetchUser는 id=1 유저를 반환한다", async () => {
  const user = await fetchUser();
  expect(user).toHaveProperty("id", 1);
});
