import { useAtom } from "jotai"
import { activeCharacterAtomAtom } from "../../game/state/jotai/characters"
import {
   globalThreeStateGetterAtom,
   isCameraMovingAtom,
} from "../../game/state/jotai/gameState"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {
   getEntityScreenCoordinates,
   getPixelCoordinatesFromNormalizedCoordinates,
} from "../../game/util/mapUtils"
import { Vector3 } from "three"
import { useEffect, useState } from "react"

const DebugInformation = () => {
   const [activeCharacter] = useAtom(activeCharacterAtomAtom)
   const [activeCharacterData] = useAtom(activeCharacter)
   const [isCameraMoving] = useAtom(isCameraMovingAtom)
   const [screenPosUnit, setScreenPosUnit] = useState<Vector3 | null>(null)
   const [screenPosPixel, setScreenPosPixel] = useState<Vector3 | null>(null)

   useEffect(() => {
      if (!isCameraMoving) {
         const screenPos = getEntityScreenCoordinates(activeCharacterData)
         setScreenPosUnit(screenPos)

         if (screenPos) {
            setScreenPosPixel(
               getPixelCoordinatesFromNormalizedCoordinates(screenPos)
            )
         }
      }
   }, [activeCharacterData, isCameraMoving])

   return (
      <Box component="div">
         <Box component="div" sx={{ lineHeight: 1 }}>
            <Typography variant="caption">
               camera-moving: {isCameraMoving ? "true" : "false"}
            </Typography>
            <br />
            <Typography variant="caption">
               Active: {activeCharacterData.name}
            </Typography>
            <br />
            <Typography variant="caption">
               unit-x: {screenPosUnit?.x}
            </Typography>
            <br />
            <Typography variant="caption">
               unit-y: {screenPosUnit?.y}
            </Typography>
            <br />
            <Typography variant="caption">
               screen-x: {screenPosPixel?.x}
            </Typography>
            <br />
            <Typography variant="caption">
               screen-y: {screenPosPixel?.y}
            </Typography>
            <br />
         </Box>
      </Box>
   )
}

const DebugDisplay = () => {
   const [globalThreeGetter] = useAtom(globalThreeStateGetterAtom)

   if (!globalThreeGetter.get) return null

   const three = globalThreeGetter.get()

   if (!three) return null

   const size = three.size

   const width = size.width / 5
   const maxHeight = size.height / 2

   return (
      <Paper
         sx={{
            position: "absolute",
            top: 0,
            left: size.width - width,
            zIndex: 100,
            maxHeight: maxHeight,
            height: maxHeight,
            overFlow: "hidden",
         }}
      >
         <DebugInformation />
      </Paper>
   )
}

export { DebugInformation, DebugDisplay }
