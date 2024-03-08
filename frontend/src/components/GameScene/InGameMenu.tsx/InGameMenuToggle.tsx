import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import { InGameMenu } from "./InGameMenu"
import { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"

/**
 * Contains the button to toggle displaying in-game menu
 * and the menu content itself.
 */
const InGameMenuToggle = () => {
   const [showInGameMenu, setShowInGameMenu] = useState(false)

   return (
      <>
         {/**In-game menu
          *
          */}
         <Drawer
            PaperProps={{
               sx: {
                  width: "50vw",
               },
            }}
            anchor="left"
            open={showInGameMenu}
            onClose={() => setShowInGameMenu(false)}
         >
            <InGameMenu />
         </Drawer>

         <IconButton
            sx={{
               width: "100%",
            }}
            color="primary"
            onClick={() => setShowInGameMenu(true)}
            className="in-game-menu-button"
         >
            <MenuIcon
               sx={{
                  height: "100%",
                  width: "100%",
                  fontSize: "100%",
                  margin: 0,
                  padding: 0,
               }}
            />
         </IconButton>
      </>
   )
}

export { InGameMenuToggle }
