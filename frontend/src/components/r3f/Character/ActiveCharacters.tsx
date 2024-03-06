import { useAtom } from "jotai"
import { activePartyAtom } from "../../../game/state/jotai/characters"
import { Character } from "./Character"
import { memo } from "react"

const ActiveCharacters = () => {
   const [activePartyCharacters] = useAtom(activePartyAtom)

   return (
      <>
         {activePartyCharacters.length > 0 &&
            activePartyCharacters.map((character) => {
               return (
                  <Character
                     key={character.toString()}
                     characterAtom={character}
                     maxDimension={1}
                  />
               )
            })}
      </>
   )
}

const MemoedCharacters = memo(ActiveCharacters)

export { MemoedCharacters as ActiveCharacters }
