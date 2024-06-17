import { readFileSync } from "fs";
import { State } from "./part2.mjs";

function calibrateValues(line) {
  const state = new State();
  for (let ch of line) {
    if (!isNaN(ch)) {
      state.update(parseInt(ch));
    }
  }

  return state.getValue();
}

const inputData = readFileSync((path = "./input.txt"), (encoding = "utf8"))
  .trim()
  .split("\n");
let totalSum = 0;
for (let line of inputData) {
  totalSum += calibrateValues(line);
}
console.log(totalSum);
