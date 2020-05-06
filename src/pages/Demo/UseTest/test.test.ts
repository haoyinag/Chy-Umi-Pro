import { count } from "./test";

/** 命令行执行：yarn test */
test("adds 1 + 2 to equal 3", () => {
  expect(count(1, 2)).toBe(3);
});
