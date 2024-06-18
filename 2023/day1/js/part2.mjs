import { readFileSync } from "fs";
import { State } from "../js/part1.mjs";

const validDigits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function calibrateValues(line) {
  const state = new State();
  const lineLength = line.length;

  for (let i = 0; i < lineLength; i++) {
    const char = line[i];

    if (!isNaN(char)) {
      state.update(parseInt(char));
      continue;
    }

    for (const [key, value] of Object.entries(validDigits)) {
      const keyLength = key.length;
      if (i + keyLength > lineLength) {
        continue;
      }

      if (line.slice(i, i + keyLength) === key) {
        state.update(value);
        i += keyLength - 2;
        break;
      }
    }
  }

  return state.getValue();
}

const inputData = readFileSync("../input.txt", "utf8").trim().split("\n");
let totalSum = 0;
for (let line of inputData) {
  totalSum += calibrateValues(line);
}

console.log(totalSum);
