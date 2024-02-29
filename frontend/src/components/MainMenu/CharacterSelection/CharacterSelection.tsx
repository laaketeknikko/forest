import Box from "@mui/material/Box"

import { PrimitiveAtom, useAtom } from "jotai"
import {
   activePartyAtom,
   allPlayerCharactersAtom,
} from "../../../game/state/jotai/characters"
import { useEffect, useState } from "react"
import { CharacterOption } from "./CharacterOption"

import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import Typography from "@mui/material/Typography"

import { CharacterSelectionItem } from "../../../config/types"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"

import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

import { generatedDarkThemeColors, theme } from "../../../styles/mui/theme"
import Stack from "@mui/material/Stack"
import { ZCharacter } from "../../../../../shared/types/types"
import { DebriefingEntityCard } from "../../Debriefing/DebriefingEntityCard"
import { Container } from "@mui/material"
import { ActionCardList } from "../../Cards/ActionCardList"
import { CharacterSelectionDetails } from "./CharacterSelectionDetails"

const CharacterSelection = () => {
   /**
    * allPlayerCharactersAtom is used to create list of all player characters.
    * When characters are selected, they are added to activeParty.
    */
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [activeParty, setActiveParty] = useAtom(activePartyAtom)
   const [gameState, setGameState] = useAtom(gameExecutionStateAtom)
   const [detailDisplayAtom, setDetailDisplayAtom] =
      useState<PrimitiveAtom<ZCharacter> | null>(null)

   const handleDetailDisplay = (option: CharacterSelectionItem) => {
      detailDisplayAtom === option.characterAtom
         ? setDetailDisplayAtom(null)
         : setDetailDisplayAtom(option.characterAtom)
   }

   /**
    * Update local and global lists of selected characters.
    * Local list contains name and image path for easier access.
    */
   const handleCharacterSelected = (option: CharacterSelectionItem) => {
      /**
       * Selecting already added character removes character from selection.
       */
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
      <Box component="div" sx={{ overflowY: "auto", height: "100vh" }}>
         <Typography variant="h3" color="primary" textAlign={"center"}>
            Select characters
         </Typography>

         <Stack sx={{ justifyContent: "center", marginTop: 3 }}>
            <Typography variant="h5" textAlign="center">
               Current party
            </Typography>
            {
               // TODO: Is this outer grid needed?
            }
            <Grid2
               container
               marginBottom={4}
               marginTop={2}
               justifyContent={"center"}
            >
               <Grid2
                  xs={12}
                  justifyContent={"center"}
                  alignItems={"center"}
                  container
                  columns={24}
               >
                  {/***
                   * First render avatars of selected characters, then add empty spaces
                   * up to scenario maximum.
                   */}
                  {gameState.characterSelection &&
                     gameState.characterSelection.map((character) => {
                        return (
                           <Grid2 key={character.name} xs={5} md={3}>
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
                           <Grid2 xs={5} md={3} key={index}>
                              <div
                                 style={{
                                    width: "100%",
                                    aspectRatio: 1,
                                    backgroundColor:
                                       theme.palette.text.secondary,
                                    borderRadius: "50%",
                                    borderColor: theme.palette.primary.main,
                                    borderStyle: "solid",
                                    borderWidth: 0,
                                 }}
                              >
                                 {" "}
                              </div>
                           </Grid2>
                        )
                     })}
               </Grid2>
            </Grid2>
            <Typography variant="h5" textAlign="center">
               Available
            </Typography>
            <Grid2
               marginTop={2}
               columns={24}
               container
               className="character-selection-list"
               justifyContent={"center"}
               alignItems={"center"}
            >
               {
                  // TODO: Add a visual cue to selected characters.
                  allPlayerCharacterAtoms &&
                     allPlayerCharacterAtoms.map((character) => {
                        const isSelected = activeParty.find(
                           (atom) => atom === character
                        )

                        return (
                           <Grid2
                              key={character.toString()}
                              xs={6}
                              md={4}
                              lg={3}
                              xl={2}
                           >
                              <Box
                                 component="div"
                                 sx={{
                                    borderStyle: "solid",
                                    borderColor: theme.palette.primary.main,
                                    borderRadius: "1rem",
                                    borderWidth: isSelected ? 1 : 0,
                                    aspectRatio: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    padding: isSelected ? 3 : 0,
                                 }}
                              >
                                 <Box component="div">
                                    <CharacterOption
                                       characterAtom={character}
                                       handleSelection={handleDetailDisplay}
                                    />
                                 </Box>
                              </Box>
                           </Grid2>
                        )
                     })
               }
            </Grid2>

            {!detailDisplayAtom && (
               <Typography variant="body1" textAlign="center">
                  Select a character to view stats
               </Typography>
            )}
            {detailDisplayAtom && (
               <CharacterSelectionDetails characterAtom={detailDisplayAtom} />
            )}
         </Stack>
      </Box>
   )
}

export { CharacterSelection }
