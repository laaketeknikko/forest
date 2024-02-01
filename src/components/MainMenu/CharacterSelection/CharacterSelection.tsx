import Box from "@mui/material/Box"

import { useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../../../game/state/jotai/characters"
import { useState } from "react"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { CharacterOption } from "./CharacterOption"
import AvatarGroup from "@mui/material/AvatarGroup"
import Avatar from "@mui/material/Avatar"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import Typography from "@mui/material/Typography"

interface CurrentProps {
   name: string
   spritePath: string
}

interface SelectedCharacter {
   current: CurrentProps
}

const CharacterSelection = () => {
   const [allPlayerCharacterAtoms] = useAtom(allPlayerCharactersAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const [selectedCharacters, setSelectedCharacters] = useState<
      Array<SelectedCharacter>
   >([])

   const handleCharacterSelected = (_event, selection) => {
      setSelectedCharacters(selection)
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
                     <Avatar
                        src={character.current.spritePath}
                        key={character.current.name}
                     />
                  )
               })}
         </AvatarGroup>
         <ToggleButtonGroup
            onChange={handleCharacterSelected}
            exclusive={false}
            value={selectedCharacters}
         >
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
