import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.jsx"
import CssBaseline from "@mui/material/CssBaseline"
import { DevTools } from "jotai-devtools"
import { JotaiDebugComponent } from "./components/util/JotaiDebugComponent.jsx"

import "./styles/global.css"
import "./styles/cards.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <DevTools />
      <JotaiDebugComponent />
      <CssBaseline>
         <App />
      </CssBaseline>
   </React.StrictMode>
)
