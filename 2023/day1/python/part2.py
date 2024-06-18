from part1 import State

validDigits = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}


def calibrate_values(line: str) -> int:
    state = State()
    line_length = len(line)

    for i in range(line_length):
        char = line[i]

        if char.isdigit():
            state.update(char)
            continue

        for key, value in validDigits.items():
            key_length = len(key)
            if i + key_length > line_length:
                continue

            if line[i : i + key_length] == key:
                state.update(str(value))
                i += key_length - 2
                break

    return state.get_value()


total_sum = 0
input_data = open(file="../input.txt", mode="r", encoding="utf8").read()
for line in input_data.strip().split("\n"):
    total_sum += calibrate_values(line)
print(total_sum)
