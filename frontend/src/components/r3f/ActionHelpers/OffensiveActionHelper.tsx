import { Edges } from "@react-three/drei"
import { Atom, useAtom } from "jotai"
import { MathUtils } from "three"
import { ZActionCard, ZCharacter } from "../../../../../shared/types/types"

interface OffensiveActionHelperProps {
   selectedCardAtom: Atom<ZActionCard>
   activeCharacterAtom: Atom<ZCharacter>
   onClick?: (event: object) => void
}

const OffensiveActionHelper = ({
   selectedCardAtom,
   activeCharacterAtom,
   onClick,
}: OffensiveActionHelperProps) => {
   const [selectedCard] = useAtom(selectedCardAtom)
   const [activeCharacter] = useAtom(activeCharacterAtom)

   console.log("In OffensiveActionHelper, activeCharacter:", activeCharacter)
   console.log(
      "In OffensiveActionHelper, activeCharacterAtom:",
      activeCharacterAtom
   )

   const action = selectedCard.actions.find(
      (action) => action._id === selectedCard.nextActionId
   )

   return (
      <mesh
         position={[
            activeCharacter.position?.x || 0,
            0.1,
            activeCharacter.position?.z || 0,
         ]}
         rotation-x={MathUtils.degToRad(-90)}
         onClick={onClick}
      >
         <circleGeometry args={[action?.effects[0].range, 20]} />
         <meshBasicMaterial
            toneMapped={false}
            color="red"
            transparent
            opacity={0.05}
            depthWrite={false}
         />
         <Edges />
      </mesh>
   )
}

export { OffensiveActionHelper }
