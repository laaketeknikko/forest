import { useAtomsDebugValue } from "jotai-devtools"

/**
 * Used to display the Jotai debug helper on page.
 */
const JotaiDebugComponent = () => {
   useAtomsDebugValue()
   return null
}

export { JotaiDebugComponent }
