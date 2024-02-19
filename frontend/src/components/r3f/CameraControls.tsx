//import { useThree } from "@react-three/fiber"
import { activeCharacterAtom } from "../../game/state/jotai/characters"
import { useAtom } from "jotai"
import { useMemo } from "react"
import { MapControls } from "@react-three/drei"

// TODO: Implement to use drei/CameraControls

const CameraControls = () => {
   //const three = useThree()
   const [characterAtom] = useAtom(activeCharacterAtom)
   const [character] = useAtom(characterAtom)

   /*useMemo(() => {
      const position = character.position
      if (position.x && position.y && position.z) {
         console.log("Camera looking at position:", position)
         three.camera.lookAt(position.x, position.y, position.z)
         three.camera.updateProjectionMatrix()
      }
   }, [character.position, three.camera])*/

   /**
    * We don't want the camera following the characters all the time.
    * By using useMemo, we set the target once and then user can control the camera freely.
    */
   const controls = useMemo(() => {
      let position = character.position
      if (!(position?.x && position?.y && position?.z)) {
         position = { x: 0, y: 0, z: 0 }
      }
      return <MapControls target={[position.x, position.y, position.z]} />
   }, [character.position])

   // TODO: Return some helpers controls or turn into hook.
   return controls
}

export { CameraControls }
