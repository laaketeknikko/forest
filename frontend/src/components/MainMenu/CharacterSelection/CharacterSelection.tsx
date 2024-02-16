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
import { Masonry } from "@mui/lab"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Stack } from "@mui/material"
import { generatedDarkThemeColors } from "../../../styles/mui/theme"

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
            return character.name !== option.name
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
         <Typography variant="h3" color="primary" textAlign={"center"}>
            Select characters
         </Typography>
         <Grid2
            container
            marginTop={2}
            marginBottom={4}
            alignItems={"center"}
            justifyContent={"center"}
         >
            <Grid2 xs={12} alignItems={"center"} container>
               {gameState.characterSelection &&
                  gameState.characterSelection.map((character) => {
                     return (
                        <Grid2 key={character.name} xs={4} md={2}>
                           <img
                              src={character.spritePath}
                              style={{ width: "100%" }}
                           />
                        </Grid2>
                     )
                  })}
               {Array(
                  selectedScenarioConfig.maxPartySize -
                     gameState.characterSelection.length
               )
                  .fill(0)
                  .map((_, index) => {
                     return (
                        <Grid2 xs={4} md={2} key={index}>
                           <div
                              style={{
                                 width: "100%",
                                 aspectRatio: 1,
                                 backgroundColor:
                                    generatedDarkThemeColors.colors
                                       .tertiaryContainer,
                                 borderRadius: "50%",
                                 borderColor:
                                    generatedDarkThemeColors.colors
                                       .tertiaryContainer,
                              }}
                           >
                              {" "}
                           </div>
                        </Grid2>
                     )
                  })}
            </Grid2>
         </Grid2>
         <Grid2 container className="character-selection-list">
            {allPlayerCharacterAtoms &&
               allPlayerCharacterAtoms.map((character) => {
                  return (
                     <Grid2 key={character.toString()} xs={6} md={4} lg={3}>
                        <CharacterOption
                           characterAtom={character}
                           handleSelection={handleCharacterSelected}
                        />
                     </Grid2>
                  )
               })}
         </Grid2>
      </Box>
   )
}

export { CharacterSelection }
