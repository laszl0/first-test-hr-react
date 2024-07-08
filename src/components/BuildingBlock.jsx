import { useState, useEffect, useRef } from 'react'
import styled from "styled-components";

const StyledBuildingBlock = styled.div`
  background-color: gray;
  position: relative;
  padding: 30px;
  box-sizing: content-box;
`

export function BuildingBlock({ children }) {
  return (
    <StyledBuildingBlock>
      {children}
    </StyledBuildingBlock>
  );
}
