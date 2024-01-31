import Box from "@mui/material/Box"

import { useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../../../game/state/jotai/characters"
import { useState } from "react"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { CharacterOption } from "./CharacterOption"
import { AvatarGroup } from "@mui/material"
import Avatar from "@mui/material/Avatar"

interface CurrentProps {
   name: string
   spritePath: string
}

interface SelectedCharacter {
   current: CurrentProps
}

const CharacterSelection = () => {
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)

   const [selectedCharacters, setSelectedCharacters] = useState<
      Array<SelectedCharacter>
   >([])

   const handleCharacterSelected = (_event, selection) => {
      console.log("in characterselection, selection", selection)
      setSelectedCharacters(selection)
   }

   return (
      <Box component="div">
         <AvatarGroup>
            {selectedCharacters &&
               selectedCharacters.map((character) => {
                  return (
                     <Avatar
                        src={character.current.spritePath}
                        key={character.current.name}
                     />
                  )
               })}
         </AvatarGroup>
         <ToggleButtonGroup onChange={handleCharacterSelected}>
            {allPlayerCharacterAtoms.map((characterAtom) => {
               return (
                  <CharacterOption
                     characterAtom={characterAtom}
                     key={characterAtom}
                  />
               )
            })}
         </ToggleButtonGroup>
      </Box>
   )
}

export { CharacterSelection }
