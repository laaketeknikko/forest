import PropTypes from "prop-types"

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

import { PrimitiveAtom, useAtom } from "jotai"

import * as textureUtilities from "../../util/textureUtilities"
import { useMemo } from "react"
import { ZCharacter } from "../../../../../shared/types/types"

import { PositionSchema } from "../../../../../shared/zod/schemas"
import { popupInfoAtom } from "../../../game/state/jotai/gameState"

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

   return (
      <mesh
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
