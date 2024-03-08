import { PrimitiveAtom, useAtom } from "jotai"
import { CharacterSelectionItem } from "../../../config/types"
import {
   allPlayerCharactersAtom,
   selectedPartyAtom,
} from "../../../game/state/jotai/characters"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import { theme } from "../../../styles/mui/theme"
import { CharacterOption } from "./CharacterOption"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import { useCallback } from "react"
import { ZCharacter } from "../../../../../shared/types/types"

export interface CharacterSelectionListProps {
   onCharacterSelected: (option: CharacterSelectionItem) => void
   displayedCharacter: PrimitiveAtom<ZCharacter> | null
}

/**
 * Used to show a list of all available characters in the
 * character selection menu.
 */
const CharacterSelectionList = ({
   onCharacterSelected,
   displayedCharacter,
}: CharacterSelectionListProps) => {
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)
   const [activeParty] = useAtom(selectedPartyAtom)

   const handleCharacterSelected = useCallback(
      (option: CharacterSelectionItem) => {
         onCharacterSelected(option)
      },
      [onCharacterSelected]
   )

   return (
      <>
         {allPlayerCharacterAtoms &&
            allPlayerCharacterAtoms.map((character) => {
               const isInParty = activeParty.find((atom) => atom === character)
               const IsSelected = character === displayedCharacter

               return (
                  <Stack key={character.toString()}>
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
                        {/**
                         * Show the "selection state" icon
                         * on top left corner of character
                         */}
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
                              <TaskAltIcon fontSize="large" />
                           ) : (
                              <HelpOutlineIcon fontSize="large" />
                           )}
                        </Avatar>
                        <Box component="div">
                           <CharacterOption
                              characterAtom={character}
                              handleSelection={handleCharacterSelected}
                           />
                        </Box>
                     </Box>
                  </Stack>
               )
            })}
      </>
   )
}

export { CharacterSelectionList }
