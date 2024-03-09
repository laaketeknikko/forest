import Button from "@mui/material/Button"

import { useSaveGame } from "../../game/hooks/useSaveGame"
import { useState } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

/**
 * Display save game button.
 *
 * When clicked, uses useSaveGame to update the save state
 * and save the game to server.
 */
const SaveGame = () => {
   const { updateSaveData, saveTheGame } = useSaveGame()
   const [saveKey] = useState<string | null>(
      window.location.pathname.substring(1).trim()
   )
   const [loadingAlertMessage, setLoadingAlertMessage] = useState("")
   const [alertSeverity, setAlertSeverity] = useState<
      "info" | "success" | "warning" | "error" | undefined
   >("info")

   const handleSaveGame = () => {
      setAlertSeverity("info")
      setLoadingAlertMessage("Saving game...")

      const saveData = updateSaveData()

      try {
         saveTheGame(saveData).then((data) => {
            if (data?.keyString) {
               history.pushState(
                  { keyString: data.keyString },
                  "",
                  `/${data.keyString}`
               )

               setAlertSeverity("success")
               setLoadingAlertMessage("Game saved")
            }
         })
      } catch (error) {
         console.error("Error saving game", error)
         setAlertSeverity("error")
         setLoadingAlertMessage("Error saving game")
      }
   }

   return (
      <>
         <Snackbar
            open={loadingAlertMessage.length > 0 ? true : false}
            autoHideDuration={10000}
            onClose={() => {
               setLoadingAlertMessage("")
               setAlertSeverity("info")
            }}
         >
            <Alert severity={alertSeverity}>{loadingAlertMessage}</Alert>
         </Snackbar>

         <Button
            onClick={handleSaveGame}
            disabled={saveKey === "" || !saveKey ? true : false}
         >
            Save
         </Button>
      </>
   )
}

export { SaveGame }
