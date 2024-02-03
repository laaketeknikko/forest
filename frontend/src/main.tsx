import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.jsx"
import CssBaseline from "@mui/material/CssBaseline"
import { DevTools } from "jotai-devtools"
import { JotaiDebugComponent } from "./components/util/JotaiDebugComponent.jsx"

import "./styles/global.css"
import "./styles/cards.css"

import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./styles/mui/theme.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <DevTools />
      <JotaiDebugComponent />
      <CssBaseline>
         <ThemeProvider theme={theme}>
            <App />
         </ThemeProvider>
      </CssBaseline>
   </React.StrictMode>
)
