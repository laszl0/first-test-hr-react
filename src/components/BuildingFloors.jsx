import { useState, useEffect, useRef } from 'react'
import styled from "styled-components";

import arrowUp from '../assets/arrow-up.svg'
import arrowDown from '../assets/arrow-down.svg'

import { useApp } from '../AppProvider'


const StyledBuildingFloors = styled.div`
  background-color: silver;
  z-index: 0;
`

export function BuildingFloors({ children }) {
  return (
    <StyledBuildingFloors>
      {children}
    </StyledBuildingFloors>
  );
}

const StyledBuildingFloor = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledFloorControls = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledFloorButtons = styled.div`
  display: flex;
  flex-direction: column;
`

export function BuildingFloor({ level }) {
  const app = useApp();

  const handleClick = (targetFloor) => {
    app.callElevator(targetFloor);
  }

  return (
    <StyledBuildingFloor>
      <FloorDoor name="A" />
      <StyledFloorControls>
        <StyledFloorButtons>
          <FloorArrowButton img={arrowUp} onClick={() => handleClick(level)} />
          <FloorArrowButton img={arrowDown} onClick={() => handleClick(level)} />
        </StyledFloorButtons>
      </StyledFloorControls>
      <FloorDoor name="B" />
    </StyledBuildingFloor>
  );
}

const StyledFloorArrowButton = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`

function FloorArrowButton({ img, onClick }) {
  return (
    <StyledFloorArrowButton onClick={onClick}>
      <img width={24} src={img} alt="" />
    </StyledFloorArrowButton>
  );
}

const StyledFloorDoor = styled.div`
  /* border: 1px solid red; */
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
`

const StyledFloorDoorInfo = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: column;
`

const StyledFloorDoorPanel = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
`

function FloorDoor({ name }) {
  const app = useApp();
  const getElevator = name == 'A' ? app.elevatorA : app.elevatorB;
  return (
    <StyledFloorDoor>
      <StyledFloorDoorInfo>{name}:{getElevator.direction}</StyledFloorDoorInfo>
      <StyledFloorDoorPanel />
    </StyledFloorDoor>
  );
}
