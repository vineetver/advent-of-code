package main

import (
	"bufio"
	"os"
)

type State interface {
	GetState() int
	SetState(rune)
}

type StateMachine struct {
	firstOccurence, lastOccurence *int
}

func (sm *StateMachine) GetState() int {
	if sm.firstOccurence == nil {
		return 0
	}

	if sm.lastOccurence == nil {
		sm.lastOccurence = sm.firstOccurence
	}

	return 10*(*sm.firstOccurence) + (*sm.lastOccurence)
}

func (sm *StateMachine) SetState(value rune) {
	num := int(value - '0')
	if sm.firstOccurence == nil {
		sm.firstOccurence = &num
	}

	sm.lastOccurence = &num
}

var validDigits = map[string]int{
	"one":   1,
	"two":   2,
	"three": 3,
	"four":  4,
	"five":  5,
	"six":   6,
	"seven": 7,
	"eight": 8,
	"nine":  9,
}

func calibrateValue(line string) int {
	sm := StateMachine{}
	lineLength := len(line)

	for i := 0; i < lineLength; i++ {
		char := line[i]

		if char >= '0' && char <= '9' {
			sm.SetState(rune(char))
			continue
		}

		for key, value := range validDigits {
			keyLength := len(key)
			if i+keyLength > lineLength {
				continue
			}

			if key == line[i:i+keyLength] {
				sm.SetState(rune(value + '0'))
				i += keyLength - 2
				break
			}
		}
	}

	return sm.GetState()
}

func main() {
	file, _ := os.Open("../input.txt")
	defer file.Close()

	totalSum := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		totalSum += calibrateValue(scanner.Text())
	}
	println(totalSum)
}
