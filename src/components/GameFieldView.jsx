import { OrbitControls } from "@react-three/drei"

import { Ground } from "./r3f/Ground/Ground"

import { useAtom } from "jotai"
import { Character } from "./r3f/Character"
import { allPlayerCharactersAtom } from "../game/state/characters/guineanpiglet"

const GameFieldView = () => {
   //const colorMap = useLoader(SVGLoader, "sprites/characters/kissamainen2.svg")

   const [allPlayerCharactersValue] = useAtom(allPlayerCharactersAtom)

   console.log("allPlayerCharacters in GameFieldView", allPlayerCharactersValue)

   return (
      <>
         <OrbitControls />
         <ambientLight args={["white", 1]} />
         {allPlayerCharactersValue.length > 0 &&
            allPlayerCharactersValue.map((character, index) => {
               console.log(
                  "Mapping allplayerCharacters in gamefieldview",
                  character
               )
               return (
                  <Character
                     position={[index * 2 + 0.5, 0.5, index * 2 + 0.5]}
                     key={character.id}
                     characterAtom={character}
                  />
               )
            })}

         <Ground lengthX={10} />
      </>
   )
}

export { GameFieldView }
