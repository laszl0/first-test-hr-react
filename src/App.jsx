import { useState, useEffect, useRef } from 'react'

import './App.css'

import { AppProvider, useApp } from './AppProvider'

import { BuildingBlock } from './components/BuildingBlock'
import { BuildingFloors, BuildingFloor } from './components/BuildingFloors'
import { BuildingElevator } from './components/BuildingElevator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="main-page">
      <AppProvider>
        <BuildingBlock>
          
          <BuildingFloors>
            <BuildingFloor level="6" />
            <BuildingFloor level="5" />
            <BuildingFloor level="4" />
            <BuildingFloor level="3" />
            <BuildingFloor level="2" />
            <BuildingFloor level="1" />
            <BuildingFloor level="0" />
          </BuildingFloors>

          <BuildingElevator name="A" />
          <BuildingElevator name="B" />

        </BuildingBlock>
      </AppProvider>

    </div>
  )
}

export default App