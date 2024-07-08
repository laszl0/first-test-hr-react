import { useState, useEffect, useRef } from 'react'
import styled from "styled-components";

import { useApp } from '../AppProvider'

const StyledBuildingElevator = styled.div`
  background-color: green;
  width: 100px;
  height: 80px;
  z-index: 1;
  position: absolute;
  ${(props) => props.side}: 30px;
  transform: translateY(-${(props) => props.position}px);
  transition: ${(props) => props.level}s ease-in-out transform;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`

const StyledElevatorLevel = styled.div`
  color: black;
  width: 100%;
  height: 20px;
  font-size: 14px;
  text-align: center;
`

const StyledElevatorButtons = styled.div`
  width: 60px;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export function BuildingElevator({ name }) {
  const buttons = Array.from({ length: 7 }, (value, index) => index);

  // const [targetFloor, setTargetFloor] = useState(-1);
  // const isMounted = useRef(true);

  const app = useApp();
  const getElevator = name == 'A' ? app.elevatorA : app.elevatorB;
  const setElevator = name == 'A' ? app.setElevatorA : app.setElevatorB;

  useEffect(() => {
    let isMounted = true;

    const timeout = setTimeout(() => {
      app.moveElevator(name);

    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };

  }, [getElevator.skipFloors]);

  const handleClick = (targetFloor) => {
    app.startElevator(name, targetFloor);
  };

  const side = name == 'A' ? 'left': 'right'
  const ELEVATOR_SIZE = 100;
  const position = ((getElevator.currentFloor + 1) * ELEVATOR_SIZE) - 20;
  const level = 1//getElevator.targetFloor;

  return (
    <StyledBuildingElevator name={name} side={side} position={position} level={level}>
      <StyledElevatorLevel>{getElevator.currentFloor}</StyledElevatorLevel>
      <StyledElevatorButtons>
        {
          buttons.map(number => {
            return (<ElevatorLevelButton key={number} number={number} onClick={() => handleClick(number)} />)
          })
        }
      </StyledElevatorButtons>
    </StyledBuildingElevator>
  );
}

const StyledElevatorLevelButton = styled.div`
  background-color: blue;
  color: black;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
`

function ElevatorLevelButton({ number, onClick }) {
  return (
    <StyledElevatorLevelButton onClick={onClick}>
      {number}
    </StyledElevatorLevelButton>
  );
}
