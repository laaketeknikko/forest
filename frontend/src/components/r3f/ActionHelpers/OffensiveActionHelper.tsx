import { Edges } from "@react-three/drei"
import { Atom, useAtom } from "jotai"
import { MathUtils } from "three"

interface OffensiveActionHelperProps {
   selectedCardAtom: Atom<ActionCard>
   activeCharacterAtom: Atom<Character>
   onClick?: (event: object) => void
}

const OffensiveActionHelper = ({
   selectedCardAtom,
   activeCharacterAtom,
   onClick,
}: OffensiveActionHelperProps) => {
   const [selectedCard] = useAtom(selectedCardAtom)
   const [activeCharacter] = useAtom(activeCharacterAtom)

   const action = selectedCard.actions.find(
      (action) => action.id === selectedCard.nextActionId
   )

   return (
      <mesh
         position={[
            activeCharacter.position.x,
            0.1,
            activeCharacter.position.z,
         ]}
         rotation-x={MathUtils.degToRad(-90)}
         onClick={onClick}
      >
         <circleGeometry args={[action?.range, 20]} />
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
