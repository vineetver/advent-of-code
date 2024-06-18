package main

import (
	"bufio"
	"os"
	"unicode"
)

type State interface {
	GetState() int
	SetState(string)
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

func calibrateValue(line string) int {
	sm := StateMachine{}

	for _, char := range line {
		if unicode.IsDigit(char) {
			sm.SetState(char)
		}
	}

	return sm.GetState()
}

func main() {
	file, _ := os.Open("../input.txt")

	totalSum := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		totalSum += calibrateValue(scanner.Text())
	}
	println(totalSum)
}
