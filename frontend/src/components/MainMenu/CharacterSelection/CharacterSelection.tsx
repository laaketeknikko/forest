import Box from "@mui/material/Box"

import { PrimitiveAtom, useAtom } from "jotai"
import {
   selectedPartyAtom,
   allPlayerCharactersAtom,
} from "../../../game/state/jotai/characters"
import { useCallback, useEffect, useState } from "react"
import { CharacterOption } from "./CharacterOption"

import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import Typography from "@mui/material/Typography"

import { CharacterSelectionItem } from "../../../config/types"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"

import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import TaskAltIcon from "@mui/icons-material/TaskAlt"

import { theme } from "../../../styles/mui/theme"
import Stack from "@mui/material/Stack"
import { ZCharacter } from "../../../../../shared/types/types"
import Avatar from "@mui/material/Avatar"

import { CharacterSelectionDetails } from "./CharacterSelectionDetails"

const CharacterSelection = () => {
   /**
    * allPlayerCharactersAtom is used to create list of all player characters.
    * When characters are selected, they are added to activeParty.
    */
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [activeParty, setActiveParty] = useAtom(selectedPartyAtom)
   const [gameState, setGameState] = useAtom(gameExecutionStateAtom)
   const [detailDisplayAtom, setDetailDisplayAtom] =
      useState<PrimitiveAtom<ZCharacter> | null>(null)

   /**
    * Update local and global lists of selected characters.
    * Local list contains name and image path for easier access.
    */
   const handleCharacterSelected = useCallback(
      (option: CharacterSelectionItem) => {
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

         setActiveParty(
            newSelection.map((character) => character.characterAtom)
         )
      },
      [gameState, setActiveParty, setGameState]
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

   useEffect(() => {
      if (!detailDisplayAtom) {
         handleDetailDisplay({
            name: "",
            spritePath: "",
            characterAtom: allPlayerCharacterAtoms[0],
         })
      }
   }, [allPlayerCharacterAtoms, detailDisplayAtom, handleDetailDisplay])

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
         <Grid2 container columns={24}>
            <Grid2 xs={21} md={22}>
               <Stack
                  spacing={10}
                  sx={{ justifyContent: "center", marginTop: 3 }}
               >
                  <Typography variant="h3" color="primary" textAlign={"center"}>
                     Select characters
                  </Typography>

                  {/**
                   *  Available characters
                   * */}
                  <Grid2
                     marginTop={2}
                     columns={24}
                     container
                     className="character-selection-list"
                     justifyContent={"center"}
                     alignItems={"center"}
                  >
                     {allPlayerCharacterAtoms &&
                        allPlayerCharacterAtoms.map((character) => {
                           const isInParty = activeParty.find(
                              (atom) => atom === character
                           )
                           const IsSelected = character === detailDisplayAtom

                           return (
                              <Grid2
                                 key={character.toString()}
                                 xs={6}
                                 md={4}
                                 lg={3}
                              >
                                 <Box
                                    component="div"
                                    sx={{
                                       borderStyle: "solid",
                                       borderColor: theme.palette.primary.main,
                                       borderRadius: "1rem",
                                       borderWidth: isInParty ? 1 : 0,
                                       aspectRatio: 1,
                                       display: "flex",
                                       alignItems: "center",
                                       padding: isInParty ? 3 : 0,
                                       position: "relative",
                                    }}
                                 >
                                    <Avatar
                                       sx={{
                                          position: "absolute",
                                          top: 0,
                                          left: 0,
                                          color:
                                             !isInParty && !IsSelected
                                                ? theme.palette.text.secondary
                                                : theme.palette.primary.main,
                                          backgroundColor: "transparent",
                                       }}
                                    >
                                       {isInParty ? (
                                          <TaskAltIcon />
                                       ) : (
                                          <HelpOutlineIcon />
                                       )}
                                    </Avatar>
                                    <Box component="div">
                                       <CharacterOption
                                          characterAtom={character}
                                          handleSelection={handleDetailDisplay}
                                       />
                                    </Box>
                                 </Box>
                              </Grid2>
                           )
                        })}
                  </Grid2>

                  {!detailDisplayAtom && (
                     <Typography variant="body1" textAlign="center">
                        Select a character to view stats
                     </Typography>
                  )}
                  {detailDisplayAtom && (
                     <CharacterSelectionDetails
                        characterAtom={detailDisplayAtom}
                     />
                  )}
               </Stack>
            </Grid2>
            <Grid2 xs={3} md={2} lg={2}>
               <Stack
                  spacing={4}
                  sx={{ paddingTop: 3, paddingRight: 3, paddingLeft: 3 }}
               >
                  {/***
                   * First render avatars of selected characters, then add empty spaces
                   * up to scenario maximum.
                   */}
                  {gameState.characterSelection &&
                     gameState.characterSelection.map((character) => {
                        return (
                           <img
                              key={character.name}
                              src={character.spritePath}
                              style={{ width: "100%" }}
                           />
                        )
                     })}

                  {/**Add empty spaces up to scenario maximum. */}
                  {Array(
                     selectedScenarioConfig.maxPartySize -
                        gameState.characterSelection.length
                  )
                     .fill(0)
                     .map((_, index) => {
                        return (
                           <div
                              key={index}
                              style={{
                                 width: "100%",
                                 aspectRatio: 1,
                                 backgroundColor: theme.palette.text.secondary,
                                 borderRadius: "50%",
                                 borderColor: theme.palette.primary.main,
                                 borderStyle: "solid",
                                 borderWidth: 0,
                              }}
                           >
                              {" "}
                           </div>
                        )
                     })}
               </Stack>
            </Grid2>
         </Grid2>
      </Box>
   )
}

export { CharacterSelection }
