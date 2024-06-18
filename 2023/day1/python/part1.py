class State():
    def __init__(self):
        self.first_occurrence = None
        self.last_occurrence = None

    def update(self, value: str):
            if self.first_occurrence is None:
                self.first_occurrence = int(value)

            self.last_occurrence = int(value)

    def get_value(self) -> int:
        if self.first_occurrence == None:
            return 0

        if self.last_occurrence == None:
            self.last_occurrence = self.first_occurrence

        return 10 * self.first_occurrence + self.last_occurrence

def calibrate_values(line: str) -> int:
    state = State()

    for char in line:
        if char.isnumeric():
            state.update(char)

    return state.get_value()

total_sum = 0
input_data = open(file="../input.txt", mode="r", encoding="utf8").read()
for line in input_data.strip().split("\n"):
    total_sum += calibrate_values(line)
print(total_sum)
