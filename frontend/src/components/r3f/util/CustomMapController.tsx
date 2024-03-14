import { MapControls } from "@react-three/drei"
import { MapControls as MapControlsImpl } from "three-stdlib"

import { useAtom } from "jotai"
import { useEffect, useMemo, useRef } from "react"
import { activeCharacterAtomAtom } from "../../../game/state/jotai/characters"
import { Vector3 } from "three"
import { useFrame } from "@react-three/fiber"
import { approximatelyEqual } from "../../../game/util/mapUtils"
import { isCameraMovingAtom } from "../../../game/state/jotai/gameState"

/**
 * Vanilla three.js MapControls with smoother turning to target.
 */
const CustomMapController = () => {
   const [characterAtom] = useAtom(activeCharacterAtomAtom)
   const [character] = useAtom(characterAtom)
   const targetRef = useRef<Vector3 | null>(null)
   const originRef = useRef<Vector3 | null>(null)
   const mapControlsRef = useRef<MapControlsImpl | null>(null)
   const [, setIsCameraMoving] = useAtom(isCameraMovingAtom)

   /**
    * We don't want the camera following the characters all the time.
    * By using useMemo, we set the target once and then user can control the camera freely.
    *
    * By removing this, you can make the camera center on the target
    * constantly, which might be useful in some cases.
    */
   useEffect(() => {
      if (!mapControlsRef.current) {
         return
      }

      originRef.current = mapControlsRef.current?.target
      setIsCameraMoving(true)

      targetRef.current = new Vector3(
         character.position.x,
         character.position.y,
         character.position.z
      )
   }, [character.position, setIsCameraMoving])

   /** Turn smoothly towards the active character. */
   useFrame(() => {
      if (targetRef.current && mapControlsRef.current) {
         mapControlsRef.current?.target.lerp(targetRef.current, 0.1)

         /** Stop turning once we're almost there.
          */
         if (
            approximatelyEqual(
               targetRef.current.x,
               mapControlsRef.current?.target.x,
               0.1
            ) &&
            approximatelyEqual(
               targetRef.current.z,
               mapControlsRef.current?.target.z,
               0.1
            ) &&
            approximatelyEqual(
               targetRef.current.y,
               mapControlsRef.current?.target.y,
               0.1
            )
         ) {
            targetRef.current = null
            setIsCameraMoving(false)
         }
      }
   })

   const mapControls = useMemo(() => {
      return <MapControls ref={mapControlsRef} />
   }, [])

   return mapControls
}

export { CustomMapController }
