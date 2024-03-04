//import { useThree } from "@react-three/fiber"
import { activeCharacterAtomAtom } from "../../game/state/jotai/characters"
import { useAtom } from "jotai"
import { useEffect, useMemo, useRef } from "react"
import { CameraControls } from "@react-three/drei"

// TODO: Implement to use drei/CameraControls

/**
 * Drei/CameraControls doesn't actually export the necessary
 * constants to modify the controls.
 *
 * Copied from camera-controls.
 */
const ACTION: Readonly<{
   readonly NONE: 0
   readonly ROTATE: 1
   readonly TRUCK: 2
   readonly OFFSET: 4
   readonly DOLLY: 8
   readonly ZOOM: 16
   readonly TOUCH_ROTATE: 32
   readonly TOUCH_TRUCK: 64
   readonly TOUCH_OFFSET: 128
   readonly TOUCH_DOLLY: 256
   readonly TOUCH_ZOOM: 512
   readonly TOUCH_DOLLY_TRUCK: 1024
   readonly TOUCH_DOLLY_OFFSET: 2048
   readonly TOUCH_DOLLY_ROTATE: 4096
   readonly TOUCH_ZOOM_TRUCK: 8192
   readonly TOUCH_ZOOM_OFFSET: 16384
   readonly TOUCH_ZOOM_ROTATE: 32768
}> = {
   NONE: 0,
   ROTATE: 1,
   TRUCK: 2,
   OFFSET: 4,
   DOLLY: 8,
   ZOOM: 16,
   TOUCH_ROTATE: 32,
   TOUCH_TRUCK: 64,
   TOUCH_OFFSET: 128,
   TOUCH_DOLLY: 256,
   TOUCH_ZOOM: 512,
   TOUCH_DOLLY_TRUCK: 1024,
   TOUCH_DOLLY_OFFSET: 2048,
   TOUCH_DOLLY_ROTATE: 4096,
   TOUCH_ZOOM_TRUCK: 8192,
   TOUCH_ZOOM_OFFSET: 16384,
   TOUCH_ZOOM_ROTATE: 32768,
}

const CustomCameraControls = () => {
   //const three = useThree()
   const [characterAtom] = useAtom(activeCharacterAtomAtom)
   const [character] = useAtom(characterAtom)

   /*useMemo(() => {
      const position = character.position
      if (position.x && position.y && position.z) {
         console.log("Camera looking at position:", position)
         three.camera.lookAt(position.x, position.y, position.z)
         three.camera.updateProjectionMatrix()
      }
   }, [character.position, three.camera])*/

   const controlsRef = useRef<CameraControls>(null)

   useEffect(() => {
      if (controlsRef.current) {
         controlsRef.current.elevate = (_height, _enableTransition) => {
            return new Promise(() => {})
         }
      }
   }, [])

   const controls = useMemo(() => {
      return (
         <CameraControls
            ref={controlsRef}
            makeDefault
            mouseButtons={{
               left: ACTION.OFFSET,
               right: ACTION.ROTATE,
               wheel: ACTION.DOLLY,
               middle: ACTION.TRUCK,
            }}
         />
      )
   }, [])

   useEffect(() => {
      let position = character.position
      if (!(position?.x && position?.y && position?.z)) {
         position = { x: 0, y: 0, z: 0 }
      }
      controlsRef.current?.setTarget(position.x, position.y, position.z, true)
   }, [character.position])

   return controls

   /**
    * We don't want the camera following the characters all the time.
    * By using useMemo, we set the target once and then user can control the camera freely.
    */
   /*const controls = useMemo(() => {
      let position = character.position
      if (!(position?.x && position?.y && position?.z)) {
         position = { x: 0, y: 0, z: 0 }
      }
      return <MapControls target={[position.x, position.y, position.z]} />
   }, [character.position])

   // TODO: Return some helpers controls or turn into hook.
   return controls*/
}

export { CustomCameraControls }
