import { Edges } from "@react-three/drei"
import { Atom, useAtom } from "jotai"
import { MathUtils } from "three"
import { performAction } from "../../../game/actions/performAction"

interface OffensiveActionHelperProps {
   selectedCardAtom: Atom<ActionCard>
   activeCharacterAtom: Atom<Character>
}

const OffensiveActionHelper = ({
   selectedCardAtom,
   activeCharacterAtom,
}: OffensiveActionHelperProps) => {
   const [selectedCard] = useAtom(selectedCardAtom)
   const [activeCharacter] = useAtom(activeCharacterAtom)

   const action = selectedCard.actions.find(
      (action) => action.id === selectedCard.nextActionId
   )

   const actiontest = (event) => {
      event.stopPropagation()
      performAction({
         selectedCharacterAtom: activeCharacterAtom as never,
         activeCardAtom: selectedCardAtom,
         selectedAction: action as never,
         targetPoint: event.point,
      })
   }

   return (
      <mesh
         position={[
            activeCharacter.position.x,
            0.1,
            activeCharacter.position.z,
         ]}
         rotation-x={MathUtils.degToRad(-90)}
         onClick={actiontest}
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