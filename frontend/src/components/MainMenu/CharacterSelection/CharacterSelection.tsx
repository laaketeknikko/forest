import Box from "@mui/material/Box"

import { useAtom } from "jotai"
import {
   activePartyAtom,
   allPlayerCharactersAtom,
} from "../../../game/state/jotai/characters"
import { useEffect } from "react"
import { CharacterOption } from "./CharacterOption"
import AvatarGroup from "@mui/material/AvatarGroup"
import Avatar from "@mui/material/Avatar"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import Typography from "@mui/material/Typography"
import ImageList from "@mui/material/ImageList"
import { SetNavigationState } from "../types"
import { CharacterSelectionItem } from "../../../config/types"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"

interface CharacterSelectionProps {
   setNavigationState: SetNavigationState
}

const CharacterSelection = ({
   setNavigationState,
}: CharacterSelectionProps) => {
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [activeParty, setActiveParty] = useAtom(activePartyAtom)
   const [gameState, setGameState] = useAtom(gameExecutionStateAtom)

   // Update local and global lists of selected characters.
   // Local list contains name and image path for easier access.
   const handleCharacterSelected = (option: CharacterSelectionItem) => {
      const isSelected = gameState.characterSelection.find((character) => {
         return character.name === option.name
      })
      let newSelection: Array<CharacterSelectionItem> = []
      if (isSelected) {
         newSelection = gameState.characterSelection.filter((character) => {
            return character.characterAtom !== option.characterAtom
         })
         setGameState({ ...gameState, characterSelection: newSelection })
      } else {
         newSelection = [...gameState.characterSelection, option]
         setGameState({ ...gameState, characterSelection: newSelection })
      }

      setActiveParty(newSelection.map((character) => character.characterAtom))
   }

   useEffect(() => {
      if (
         activeParty.length > 0 &&
         activeParty.length <= selectedScenarioConfig.maxPartySize
      ) {
         setNavigationState(true)
      } else {
         setNavigationState(false)
      }
   }, [
      activeParty.length,
      selectedScenarioConfig.maxPartySize,
      setNavigationState,
   ])

   return (
      <Box component="div">
         <Typography variant="body1">
            Maximum party size: {selectedScenarioConfig.maxPartySize}
         </Typography>
         <Typography variant="body1">
            Selected party size: {gameState.characterSelection.length}
         </Typography>
         <AvatarGroup>
            {gameState.characterSelection &&
               gameState.characterSelection.map((character) => {
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
