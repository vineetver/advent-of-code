import { readFileSync } from "fs";

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

export class State {
  constructor() {
    this.firstOccurrence = null;
    this.lastOccurrence = null;
  }

  update(value) {
    if (this.firstOccurrence === null) {
      this.firstOccurrence = value;
    }
    this.lastOccurrence = value;
  }

  getValue() {
    if (this.firstOccurrence === null) return 0;
    if (this.lastOccurrence === null) return this.firstOccurrence;
    return 10 * this.firstOccurrence + this.lastOccurrence;
  }
}

function calibrateValues(line) {
  const state = new State();

  for (let i = 0; i < line.length; i++) {
    if (!isNaN(line[i])) {
      state.update(parseInt(line[i]));
    } else {
      for (const [word, number] of Object.entries(validDigits)) {
        if (line.slice(i, i + word.length).toLowerCase() === word) {
          state.update(number);
          i += word.length - 2;
          break;
        }
      }
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
