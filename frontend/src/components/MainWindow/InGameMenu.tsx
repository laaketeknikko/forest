import { LoadGame } from "../MainMenu/LoadGame"
import { SaveGame } from "../MainMenu/SaveGame"

const InGameMenu = () => {
   return (
      <>
         <SaveGame />
         <LoadGame />
      </>
   )
}

export { InGameMenu }
