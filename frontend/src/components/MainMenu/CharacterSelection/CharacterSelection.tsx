import Box from "@mui/material/Box"

import { useAtom } from "jotai"
import {
   activePartyAtom,
   allPlayerCharactersAtom,
} from "../../../game/state/jotai/characters"
import { useEffect } from "react"
import { CharacterOption } from "./CharacterOption"

import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import Typography from "@mui/material/Typography"

import { SetNavigationState } from "../types"
import { CharacterSelectionItem } from "../../../config/types"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"

import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

import { generatedDarkThemeColors } from "../../../styles/mui/theme"
import Stack from "@mui/material/Stack"

interface CharacterSelectionProps {
   setNavigationState: SetNavigationState
}

const CharacterSelection = ({
   setNavigationState,
}: CharacterSelectionProps) => {
   /**
    * allPlayerCharactersAtom is used to create list of all player characters.
    * When characters are selected, they are added to activeParty.
    */
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [activeParty, setActiveParty] = useAtom(activePartyAtom)
   const [gameState, setGameState] = useAtom(gameExecutionStateAtom)

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
                        return (
                           <Grid2
                              key={character.toString()}
                              xs={6}
                              md={4}
                              lg={3}
                              xl={2}
                           >
                              <CharacterOption
                                 characterAtom={character}
                                 handleSelection={handleCharacterSelected}
                              />
                           </Grid2>
                        )
                     })
               }
            </Grid2>
         </Stack>
      </Box>
   )
}

export { CharacterSelection }
