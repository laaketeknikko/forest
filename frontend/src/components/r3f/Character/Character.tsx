import PropTypes from "prop-types"

import { useFrame, useLoader } from "@react-three/fiber"
import { Clock, DoubleSide, Mesh, TextureLoader } from "three"

import { PrimitiveAtom, useAtom } from "jotai"

import * as textureUtilities from "../../util/textureUtilities"
import { useEffect, useMemo, useRef } from "react"
import { ZCharacter } from "../../../../../shared/types/types"

import { PositionSchema } from "../../../../../shared/zod/schemas"
import { popupInfoAtom } from "../../../game/state/jotai/gameState"
import { useEntityMoveAnimation } from "../hooks/useEntityMoveAnimation"
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
   const [, setPopupInfo] = useAtom(popupInfoAtom)
   const [activeCharacterAtom] = useAtom(activeCharacterAtomAtom)
   const [activeCharacter] = useAtom(activeCharacterAtom)

   const colorMap = useLoader(TextureLoader, character.spritePath)

   const dimensions = textureUtilities.getTextureNormalizedWidthAndHeight(
      colorMap,
      maxDimension
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

   const animator = useEntityMoveAnimation()
   useEffect(() => {
      if (character.targetPosition && !animator.isAnimating()) {
         animator.setPoints(
            {
               x: character.position.x,
               z: character.position.z,
            },
            {
               x: character.targetPosition.x,
               z: character.targetPosition.z,
            }
         )
      }
   }, [
      animator,
      character.position.x,
      character.position.z,
      character.targetPosition,
      character.targetPosition?.x,
      character.targetPosition?.z,
   ])

   const meshRef = useRef<Mesh | null>(null)
   useEffect(() => {
      if (!meshRef.current) return

      const position = activeCharacter.position
      meshRef.current.lookAt(position.x, character.position.y, position.z)
   }, [activeCharacter.position, character.position.y])

   const clockRef = useRef(new Clock(true))
   const timeRef = useRef<number>(0)

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

         if (!animator.isAnimating()) {
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
      }
   })

   return (
      <mesh
         ref={meshRef}
         position={[
            character.position.x || 0,
            character.position.y || 0,
            character.position.z || 0,
         ]}
         onPointerEnter={() => setPopupInfo(character)}
         onPointerLeave={() => setPopupInfo(null)}
      >
         <planeGeometry args={[dimensions.width, dimensions.height]} />

         <meshBasicMaterial
            color="white"
            map={colorMap}
            transparent
            opacity={1}
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

export { Character }
