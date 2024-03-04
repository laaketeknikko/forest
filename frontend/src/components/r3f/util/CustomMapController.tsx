import { MapControls } from "@react-three/drei"
import { MapControls as MapControlsImpl } from "three-stdlib"

import { useAtom } from "jotai"
import { useEffect, useMemo, useRef } from "react"
import { activeCharacterAtomAtom } from "../../../game/state/jotai/characters"
import { Vector3 } from "three"
import { useFrame } from "@react-three/fiber"
import { approximatelyEqual } from "../../../game/util/mapUtils"

const CustomMapController = () => {
   const [characterAtom] = useAtom(activeCharacterAtomAtom)
   const [character] = useAtom(characterAtom)
   const targetRef = useRef<Vector3 | null>(null)
   const originRef = useRef<Vector3 | null>(null)
   const mapControlsRef = useRef<MapControlsImpl | null>(null)

   /**
    * We don't want the camera following the characters all the time.
    * By using useMemo, we set the target once and then user can control the camera freely.
    */
   useEffect(() => {
      if (!mapControlsRef.current) {
         return
      }

      originRef.current = mapControlsRef.current?.target

      targetRef.current = new Vector3(
         character.position.x,
         character.position.y,
         character.position.z
      )
   }, [character.position])

   useFrame(() => {
      if (targetRef.current && mapControlsRef.current) {
         mapControlsRef.current?.target.lerp(targetRef.current, 0.1)
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
            console.log("they're equal")
            targetRef.current = null
         }
      }
   })

   const mapControls = useMemo(() => {
      return <MapControls ref={mapControlsRef} />
   }, [])

   return mapControls
}

export { CustomMapController }
