import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.tsx"
import CssBaseline from "@mui/material/CssBaseline"
import { DevTools } from "jotai-devtools"
import { JotaiDebugComponent } from "./components/util/JotaiDebugComponent.jsx"

import "./styles/global.css"
import "./styles/cards.css"

import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./styles/mui/theme.js"
import GlobalStyles from "@mui/material/GlobalStyles"

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <DevTools />
      <JotaiDebugComponent />
      <ThemeProvider theme={theme}>
         <CssBaseline>
            <GlobalStyles
               styles={{
                  body: {
                     scrollbarColor: `${theme.palette.text.secondary} ${theme.palette.background.default}`,
                     scrollbarWidth: "thin",
                  },
               }}
            />

            <App />
         </CssBaseline>
      </ThemeProvider>
   </React.StrictMode>
)
