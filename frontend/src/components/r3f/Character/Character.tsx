import PropTypes from "prop-types"

import { useFrame, useLoader } from "@react-three/fiber"
import { Clock, DoubleSide, Mesh, TextureLoader } from "three"

import { PrimitiveAtom, useAtom, useSetAtom } from "jotai"

import * as textureUtilities from "../../util/textureUtilities"
import { memo, useEffect, useMemo, useRef } from "react"
import { ZCharacter } from "../../../../../shared/types/types"

import { PositionSchema } from "../../../../../shared/zod/schemas"
import { animationFocusAtom } from "../../../game/state/jotai/gameState"
import { useEntityAnimation } from "../hooks/useEntityAnimation"
import { activeCharacterAtomAtom } from "../../../game/state/jotai/characters"

export interface CharacterProps {
   characterAtom: PrimitiveAtom<ZCharacter>
   maxDimension: number
}

/**
 * Used to render characters, enemies and other dynamic entities.
 *
 * @param props.characterAtom - character to display. .spritePath is used for image
 * @param props.maxDimension - sets the maximum of the bigger dimensions of character
 *
 * maxDimensions corresponds to the larger of the image's x or y dimensions.
 * For consistency, it should be an integer value. Value of 1 is normal size.
 *
 * Character's y dimensions is calculated based on image's y dimension
 * and updated on the character directly so that character appears to stand on the ground.
 */
const Character = ({ characterAtom, maxDimension = 1 }: CharacterProps) => {
   const [character, setCharacter] = useAtom(characterAtom)
   const [activeCharacterAtom] = useAtom(activeCharacterAtomAtom)
   const [activeCharacter] = useAtom(activeCharacterAtom)
   const setAnimationFocus = useSetAtom(animationFocusAtom)

   const colorMap = useLoader(TextureLoader, character.spritePath)

   const dimensions = useMemo(
      () =>
         textureUtilities.getTextureNormalizedWidthAndHeight(
            colorMap,
            maxDimension
         ),
      [colorMap, maxDimension]
   )

   /**
   Update character Y position to place character on ground level.
    */
   useMemo(() => {
      const normalizedYPos = textureUtilities.getTextureYCenter(
         dimensions.height
      )
      const oldPos = PositionSchema.parse(character.position)
      if (oldPos.y !== normalizedYPos) {
         setCharacter({
            ...character,
            position: { ...oldPos, y: normalizedYPos },
         })
      }
   }, [character, dimensions.height, setCharacter])

   const animator = useEntityAnimation()
   useEffect(() => {
      if (!animator.isAnimating()) {
         /**
          * presence of targetPosition or activeAnimation indicates
          * need for animation. These are removed on animation completion.
          */
         if (character.targetPosition) {
            animator.setMoveAnimation(
               {
                  x: character.position.x,
                  z: character.position.z,
               },
               {
                  x: character.targetPosition.x,
                  z: character.targetPosition.z,
               }
            )
            setAnimationFocus({ isAnimating: true })
         } else if (
            character.activeAnimation &&
            character.activeAnimation.type === "melee"
         ) {
            animator.setMeleeAttackAnimation(
               {
                  x: character.position.x,
                  z: character.position.z,
               },
               {
                  x: character.position.x,
                  z: character.position.z,
               },
               character.activeAnimation.target
            )
            setAnimationFocus({ isAnimating: true })
         }
      }
   }, [
      animator,
      character.activeAnimation,
      character.position.x,
      character.position.z,
      character.targetPosition,
      setAnimationFocus,
   ])

   const meshRef = useRef<Mesh | null>(null)

   /**
    * lookAt the active character.
    */
   useEffect(() => {
      if (!meshRef.current) return
      if (character._id === activeCharacter._id) return

      const position = activeCharacter.position
      meshRef.current.lookAt(position.x, character.position.y, position.z)
   }, [
      activeCharacter._id,
      activeCharacter.position,
      character._id,
      character.position.y,
   ])

   const clockRef = useRef(new Clock(true))
   const timeRef = useRef<number>(0)

   /**Handles the animations. */
   useFrame(() => {
      if (animator.isAnimating()) {
         timeRef.current += clockRef.current.getDelta()

         if (timeRef.current >= 1 / 60) {
            timeRef.current = 0
            const nextPos = animator.getNextPoint()
            meshRef.current!.position.set(
               nextPos!.x,
               nextPos!.y + character.position.y,
               nextPos!.z
            )
         }

         /**
          * Animation depends on activeAnimation or targetPosition,
          * so if we don't animate anymore, remove those.
          */
         if (!animator.isAnimating()) {
            if (character.activeAnimation) {
               setCharacter({
                  ...character,
                  position: character.position,
                  activeAnimation: null,
               })
            } else {
               setCharacter({
                  ...character,
                  position: {
                     x: character.targetPosition!.x,
                     y: character.position.y,
                     z: character.targetPosition!.z,
                  },
                  targetPosition: null,
               })
            }
            setAnimationFocus({ isAnimating: false })
         }
      }
   })

   return (
      <mesh
         renderOrder={2 /* To prevent flickering issues*/}
         ref={meshRef}
         position={[
            character.position.x,
            character.position.y,
            character.position.z,
         ]}
      >
         <planeGeometry args={[dimensions.width, dimensions.height]} />

         <meshBasicMaterial
            color="white"
            map={colorMap}
            transparent
            opacity={1}
            alphaTest={0.01}
            toneMapped={false}
            side={DoubleSide}
         />
      </mesh>
   )
}

Character.propTypes = {
   character: PropTypes.shape({
      name: PropTypes.string.isRequired,
      spritePath: PropTypes.string.isRequired,
      cards: PropTypes.arrayOf(
         PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            actions: PropTypes.arrayOf(PropTypes.object),
         })
      ),
   }),
}

const MemoedCharacter = memo(Character)
MemoedCharacter.displayName = "Character"

export { MemoedCharacter as Character }
