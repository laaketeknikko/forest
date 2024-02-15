import Box from "@mui/material/Box"

import type { Atom } from "jotai"
import { useAtom } from "jotai"
import {
   activePartyAtom,
   allPlayerCharactersAtom,
} from "../../../game/state/jotai/characters"
import { useEffect, useState } from "react"
import { CharacterOption } from "./CharacterOption"
import AvatarGroup from "@mui/material/AvatarGroup"
import Avatar from "@mui/material/Avatar"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import Typography from "@mui/material/Typography"
import ImageList from "@mui/material/ImageList"
import { SetNavigationState } from "../types"
import { ZCharacter } from "../../../../../shared/types/types"

interface CurrentProps {
   name: string
   spritePath: string
   characterAtom: Atom<ZCharacter>
}

interface CharacterSelectionProps {
   setNavigationState: SetNavigationState
}

const CharacterSelection = ({
   setNavigationState,
}: CharacterSelectionProps) => {
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [, setActiveParty] = useAtom(activePartyAtom)

   const [selectedCharacters, setSelectedCharacters] = useState<
      Array<CurrentProps>
   >([])

   // Update local and global lists of selected characters.
   // Local list contains name and image path for easier access.
   const handleCharacterSelected = (option) => {
      const isSelected = selectedCharacters.find((character) => {
         return character.characterAtom === option.characterAtom
      })
      let newSelection: Array<CurrentProps> = []
      if (isSelected) {
         newSelection = selectedCharacters.filter((character) => {
            return character.characterAtom !== option.characterAtom
         })
         setSelectedCharacters(newSelection)
      } else {
         newSelection = [...selectedCharacters, option]
         setSelectedCharacters(newSelection)
      }

      setActiveParty(newSelection.map((character) => character.characterAtom))
   }

   useEffect(() => {
      if (
         selectedCharacters.length > 0 &&
         selectedCharacters.length <= selectedScenarioConfig.maxPartySize
      ) {
         setNavigationState(true)
      } else {
         setNavigationState(false)
      }
   }, [selectedCharacters, selectedScenarioConfig, setNavigationState])

   return (
      <Box component="div">
         <Typography variant="body1">
            Maximum party size: {selectedScenarioConfig.maxPartySize}
         </Typography>
         <Typography variant="body1">
            Selected party size: {selectedCharacters.length}
         </Typography>
         <AvatarGroup>
            {selectedCharacters &&
               selectedCharacters.map((character) => {
                  return (
                     <Avatar src={character.spritePath} key={character.name} />
                  )
               })}
         </AvatarGroup>
         <ImageList cols={3} className="character-selection-list">
            {allPlayerCharacterAtoms &&
               allPlayerCharacterAtoms.map((character) => {
                  return (
                     <CharacterOption
                        characterAtom={character}
                        key={character.toString()}
                        handleSelection={handleCharacterSelected}
                     />
                  )
               })}
         </ImageList>
      </Box>
   )
}

export { CharacterSelection }
