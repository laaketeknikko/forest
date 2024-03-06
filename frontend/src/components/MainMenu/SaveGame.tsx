import Button from "@mui/material/Button"

import { useSaveGame } from "../../game/hooks/useSaveGame"
import { useEffect, useState } from "react"

const SaveGame = () => {
   const { updateSaveData, saveTheGame } = useSaveGame()
   const [saveKey, setSaveKey] = useState<string | null>(null)

   useEffect(() => {
      console.log("getting the key")
      const key = window.location.pathname.substring(1).trim()

      console.log("window location pathname: ", window.location)
      console.log(key)

      setSaveKey(key)
   }, [])

   const handleSaveGame = () => {
      const saveData = updateSaveData()

      try {
         saveTheGame(saveData).then((data) => {
            if (data?.keyString) {
               history.pushState(
                  { keyString: data.keyString },
                  "",
                  `/${data.keyString}`
               )
            }
         })
      } catch (error) {
         console.error("Error saving game", error)
      }
   }

   return (
      <Button
         onClick={handleSaveGame}
         disabled={saveKey === "" || !saveKey ? true : false}
      >
         Save
      </Button>
   )
}

export { SaveGame }
