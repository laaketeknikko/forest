import Box from "@mui/material/Box"

import type { Atom } from "jotai"
import { useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../../../game/state/jotai/characters"
import { useState } from "react"
import { CharacterOption } from "./CharacterOption"
import AvatarGroup from "@mui/material/AvatarGroup"
import Avatar from "@mui/material/Avatar"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import Typography from "@mui/material/Typography"
import ImageList from "@mui/material/ImageList"

interface CurrentProps {
   name: string
   spritePath: string
   characterAtom: Atom<Character>
}

const CharacterSelection = () => {
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const [selectedCharacters, setSelectedCharacters] = useState<
      Array<CurrentProps>
   >([])

   /*const handleCharacterSelected = (_event, selection) => {
      setSelectedCharacters(selection)
   }*/

   const handleCharacterSelected = (option) => {
      const isSelected = selectedCharacters.find((character) => {
         return character.characterAtom === option.characterAtom
      })

      if (isSelected) {
         const newSelection = selectedCharacters.filter((character) => {
            return character.characterAtom !== option.characterAtom
         })
         setSelectedCharacters(newSelection)
      } else {
         setSelectedCharacters([...selectedCharacters, option])
      }
   }

   return (
      <Box component="div">
         <Typography variant="body1">
            Maximum party size: {selectedScenarioConfig.maxPartySize}
         </Typography>
         <AvatarGroup>
            {selectedCharacters &&
               selectedCharacters.map((character) => {
                  return (
                     <Avatar src={character.spritePath} key={character.name} />
                  )
               })}
         </AvatarGroup>
         <ImageList cols={3}>
            {allPlayerCharacterAtoms &&
               allPlayerCharacterAtoms.map((character) => {
                  return (
                     <CharacterOption
                        characterAtom={character}
                        key={character}
                        handleSelection={handleCharacterSelected}
                     />
                  )
               })}
         </ImageList>
      </Box>
   )
}

export { CharacterSelection }
