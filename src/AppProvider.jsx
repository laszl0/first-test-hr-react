import { createContext, useContext, useEffect, useState } from "react";

function utilRange(from, to) {
    if (from < to) {
        return Array.from({ length: (to - from) }, (_, i) => from + 1 + i);
    } else {
        return Array.from({ length: (from - to) }, (_, i) => from - 1 - i);
    }
}

function checkOrder(arr, currentNumber, targetNumber) {
    if (arr.length === 1) {
        return currentNumber > targetNumber ? 'up' : (currentNumber < targetNumber ? 'down' : '-');
    }

    let asc = true;
    let desc = true;

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            desc = false;
        } else if (arr[i] > arr[i + 1]) {
            asc = false;
        }
    }

    if (asc) return 'up';
    if (desc) return 'down';
    return '-';
}

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

export function AppProvider(props) {

    const [elevatorA, setElevatorA] = useState({
        isMoving: false,
        direction: '-',
        currentFloor: 0,
        targetFloor: 0,
        skipFloors: [],
    });

    const [elevatorB, setElevatorB] = useState({
        isMoving: false,
        direction: '-',
        currentFloor: 6,
        targetFloor: 6,
        skipFloors: [],
    });

    function callElevator(targetFloor) {
        const rangeA = utilRange(elevatorA.currentFloor, targetFloor);
        const rangeB = utilRange(elevatorB.currentFloor, targetFloor);
        console.log(rangeA, rangeB);

        if (rangeA.length == rangeB.length) {
            if (elevatorA.currentFloor > elevatorB.currentFloor) {
                startElevator('B', targetFloor)
            } else {
                startElevator('A', targetFloor)
            }
        }

        if (rangeA.length > rangeB.length) {
            startElevator('B', targetFloor)
        } else {
            startElevator('A', targetFloor)
        }
    }

    function startElevator(name, targetFloor) {
        const getElevator = name == 'A' ? elevatorA : elevatorB;
        const setElevator = name == 'A' ? setElevatorA : setElevatorB;

        if (getElevator.currentFloor == targetFloor) {
            return;
        }

        const range = utilRange(getElevator.currentFloor, targetFloor);

        const direction = checkOrder(range, getElevator.currentFloor, targetFloor);

        const skipFloors = [...range];
        const nextFloor = skipFloors.shift();

        console.log('startElevator')
        console.log(skipFloors, nextFloor);

        setElevator({
            isMoving: true,
            direction: direction,
            currentFloor: nextFloor,
            targetFloor: targetFloor,
            skipFloors: skipFloors
        });
    }

    function moveElevator(name) {
        const getElevator = name == 'A' ? elevatorA : elevatorB;
        const setElevator = name == 'A' ? setElevatorA : setElevatorB;

        if (getElevator.skipFloors.length == 0) {
            console.log('stopped' + name);
            setElevator({
                isMoving: false,
                direction: '-',
                currentFloor: getElevator.currentFloor,
                targetFloor: getElevator.targetFloor,
                skipFloors: getElevator.skipFloors
            });
            return;
        }

        if (getElevator.currentFloor != getElevator.targetFloor) {
            const skipFloors = [...getElevator.skipFloors];
            const nextFloor = skipFloors.shift();
            console.log('moving' + name);
            console.log(skipFloors, nextFloor);
            setElevator({
                isMoving: true,
                direction: getElevator.direction,
                currentFloor: nextFloor,
                targetFloor: getElevator.targetFloor,
                skipFloors: skipFloors
            });
        }
    }

    const providerData = {
        elevatorA, setElevatorA,
        elevatorB, setElevatorB,
        callElevator, startElevator, moveElevator,
    }

    return (
        <AppContext.Provider value={providerData}>
            {props.children}
        </AppContext.Provider>
    );
}