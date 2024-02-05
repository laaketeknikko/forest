import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import { Ground } from "./Ground/Ground"

import { useAtom } from "jotai"
import { Character } from "./Character"
import { allPlayerCharactersAtom } from "../../game/state/jotai/characters"
import { ActionHelper } from "./ActionHelpers/ActionHelper"
import { allEnemiesAtom } from "../../game/state/jotai/enemies"

//const DisableRender = () => useFrame(() => null, 1000)

const R3FCanvasWrapper = () => {
   const [allPlayerCharactersValue] = useAtom(allPlayerCharactersAtom)
   const [allEnemiesValue] = useAtom(allEnemiesAtom)

   return (
      <Canvas
         camera={{ position: [1, 4, 5] }}
         style={{ backgroundColor: "rgb(31, 27, 22)" }}
      >
         <axesHelper />
         <OrbitControls />
         <ambientLight args={["white", 1]} />
         {allPlayerCharactersValue.length > 0 &&
            allPlayerCharactersValue.map((character) => {
               return (
                  <Character
                     key={character.toString()}
                     characterAtom={character}
                  />
               )
            })}
         {allEnemiesValue.length > 0 &&
            allEnemiesValue.map((enemy) => {
               return (
                  <Character
                     key={enemy.toString()}
                     characterAtom={enemy}
                     width={2}
                  />
               )
            })}

         <Ground />
         <ActionHelper />
      </Canvas>
   )
}

export { R3FCanvasWrapper }
