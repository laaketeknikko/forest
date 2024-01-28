import { useAtom } from "jotai"
import { currentlySelectedActionCardAtom } from "../../game/state/jotai/gameState"
import { activeCharacterAtom } from "../../game/state/jotai/characters"
import { useEffect } from "react"
import { MathUtils } from "three"
import { Edges } from "@react-three/drei"

const ActionHelper = () => {
   const [selectedCard] = useAtom(currentlySelectedActionCardAtom)
   const [selectedCardData] = useAtom(selectedCard)

   const [activeCharacter] = useAtom(activeCharacterAtom)
   const [activeCharacterData] = useAtom(activeCharacter)

   useEffect(() => {
      console.log("In ActionHelper, currently selected card:", selectedCard)
      console.log("In ActionHelper, selected card data:", selectedCardData)
      console.log("In ActionHelper, active character:", activeCharacter)
      console.log(
         "In ActionHelper, active character data:",
         activeCharacterData
      )
   }, [activeCharacter, activeCharacterData, selectedCard, selectedCardData])

   return (
      <mesh
         position={[
            activeCharacterData.position.x,
            0.1,
            activeCharacterData.position.z,
         ]}
         rotation-x={MathUtils.degToRad(-90)}
      >
         <circleGeometry args={[1, 20]} />
         <meshBasicMaterial
            toneMapped={false}
            color="red"
            transparent
            opacity={0}
         />
         <Edges />
      </mesh>
   )
}

export { ActionHelper }
