import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import { Ground } from "./Ground/Ground"

import { useAtom } from "jotai"
import { Character } from "./Character"
import { allPlayerCharactersAtom } from "../../game/state/jotai/characters"
import { ActionHelper } from "./ActionHelper"

const R3FCanvasWrapper = () => {
   const [allPlayerCharactersValue] = useAtom(allPlayerCharactersAtom)

   return (
      <Canvas camera={{ position: [1, 4, 5] }}>
         <axesHelper />
         <OrbitControls />
         <ambientLight args={["white", 1]} />
         {allPlayerCharactersValue.length > 0 &&
            allPlayerCharactersValue.map((character) => {
               return <Character key={character.id} characterAtom={character} />
            })}

         <Ground />
         <ActionHelper />
      </Canvas>
   )
}

export { R3FCanvasWrapper }
