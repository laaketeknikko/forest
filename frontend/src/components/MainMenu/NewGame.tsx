import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useInitializeDefaultGameState } from "../../game/hooks/useInitializeDefaultGameState"

const NewGame = () => {
   const initializeDefaultGameState = useInitializeDefaultGameState()

   return (
      <Stack>
         <Button onClick={initializeDefaultGameState}>New game</Button>
         <Button>Save</Button>
         <Button>Load</Button>
      </Stack>
   )
}

export { NewGame }
