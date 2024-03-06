import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { PrimitiveAtom, useAtom } from "jotai"
import { useCallback, useEffect, useState } from "react"
import { ZCharacter } from "../../../../../shared/types/types"
import { CharacterSelectionItem } from "../../../config/types"
import { selectedPartyAtom } from "../../../game/state/jotai/characters"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"

import { CharacterSelectionDetails } from "./CharacterSelectionDetails"
import { CharacterSelectionList } from "./CharacterSelectionList"
import { CharacterSelectionParty } from "./CharacterSelectionParty"

const CharacterSelection = () => {
   /**
    * allPlayerCharactersAtom is used to create list of all player characters.
    * When characters are selected, they are added to activeParty.
    */

   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [activeParty, setActiveParty] = useAtom(selectedPartyAtom)
   const [gameState, setGameState] = useAtom(gameExecutionStateAtom)
   const [detailDisplayAtom, setDetailDisplayAtom] =
      useState<PrimitiveAtom<ZCharacter> | null>(null)

   /**
    * Update list of selected characters.
    */
   const handleCharacterSelected = useCallback(
      (option: CharacterSelectionItem) => {
         const isSelected = activeParty.find((atom) => {
            return atom === option.characterAtom
         })

         /**
          * Selecting already added character removes character from selection.
          */
         let newSelection: Array<PrimitiveAtom<ZCharacter>> = []
         if (isSelected) {
            newSelection = activeParty.filter((atom) => {
               return atom !== option.characterAtom
            })
            setActiveParty(newSelection)
         } else {
            if (activeParty.length < selectedScenarioConfig.maxPartySize) {
               newSelection = [...activeParty, option.characterAtom]
               setActiveParty(newSelection)
            } else {
               newSelection = [...activeParty]
            }
         }

         setActiveParty(newSelection)
      },
      [activeParty, selectedScenarioConfig.maxPartySize, setActiveParty]
   )

   const handleDetailDisplay = useCallback(
      (option: CharacterSelectionItem) => {
         if (detailDisplayAtom === option.characterAtom) {
            handleCharacterSelected(option)
         } else {
            setDetailDisplayAtom(option.characterAtom)
         }
      },
      [detailDisplayAtom, handleCharacterSelected]
   )

   /**
    * If not characters or too many characters selected, disable navigation to next section.
    */
   useEffect(() => {
      let selectionOK = false
      if (
         activeParty.length > 0 &&
         activeParty.length <= selectedScenarioConfig.maxPartySize
      ) {
         selectionOK = true
      } else {
         selectionOK = false
      }

      if (selectionOK !== gameState.mainMenu.charactersSelected) {
         setGameState({
            ...gameState,
            mainMenu: {
               ...gameState.mainMenu,
               charactersSelected: selectionOK,
            },
         })
      }
   }, [
      activeParty.length,
      gameState,
      selectedScenarioConfig.maxPartySize,
      setGameState,
   ])

   return (
      <Box component="div" sx={{ overflowY: "scroll", height: "100vh" }}>
         <Grid2 container columns={36}>
            {/**
             *  Available characters
             * */}
            <Grid2
               xs
               marginTop={2}
               className="character-selection-list"
               justifyContent={"center"}
               alignItems={"center"}
            >
               <CharacterSelectionList
                  displayedCharacter={detailDisplayAtom}
                  onCharacterSelected={handleDetailDisplay}
               />
            </Grid2>

            {/**
             * Main character selection screen
             *
             * */}
            <Grid2 xs={28}>
               <Stack
                  spacing={10}
                  sx={{ justifyContent: "center", marginTop: 3 }}
               >
                  <Typography variant="h4" color="primary" textAlign={"center"}>
                     Select characters
                  </Typography>

                  {!detailDisplayAtom && (
                     <Typography variant="body1" textAlign="center">
                        Select a character to view stats. Click again to add the
                        character to the party.
                     </Typography>
                  )}
                  {detailDisplayAtom && (
                     <CharacterSelectionDetails
                        characterAtom={detailDisplayAtom}
                     />
                  )}
               </Stack>
            </Grid2>

            {/**
             * Selected party display.
             */}
            <Grid2 xs>
               <CharacterSelectionParty />
            </Grid2>
         </Grid2>
      </Box>
   )
}

export { CharacterSelection }
