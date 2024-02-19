import Box from "@mui/material/Box"
import { Atom, useAtom } from "jotai"
import { ZCharacter } from "../../../../shared/types/types"

interface ScenarioStartCharacterInfoProps {
   characterAtom: Atom<ZCharacter>
}

// TODO: Maybe expand this info.
const ScenarioStartCharacterInfo = ({
   characterAtom,
}: ScenarioStartCharacterInfoProps) => {
   const [character] = useAtom(characterAtom)

   return (
      <Box component="div">
         <img src={character.spritePath} />
      </Box>
   )
}

export { ScenarioStartCharacterInfo }
