import { readFileSync } from "fs";

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
  for (let char of line) {
    if (!isNaN(char)) {
      state.update(parseInt(char));
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
