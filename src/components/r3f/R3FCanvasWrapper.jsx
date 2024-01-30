import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import { Ground } from "./Ground/Ground"

import { useAtom } from "jotai"
import { Character } from "./Character"
import { allPlayerCharactersAtom } from "../../game/state/jotai/characters"
import { ActionHelper } from "./ActionHelpers/ActionHelper"
import { allEnemiesAtom } from "../../game/state/jotai/enemies"

import { useInitializeGameState } from "../../game/hooks/useInitializeGameState"

const R3FCanvasWrapper = () => {
   const [allPlayerCharactersValue] = useAtom(allPlayerCharactersAtom)
   const [allEnemiesValue] = useAtom(allEnemiesAtom)

   useInitializeGameState()

   return (
      <Canvas camera={{ position: [1, 4, 5] }}>
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
