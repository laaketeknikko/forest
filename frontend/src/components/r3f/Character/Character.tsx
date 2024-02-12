import PropTypes from "prop-types"

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

import { PrimitiveAtom, useAtom } from "jotai"

import * as textureUtilities from "../../util/textureUtilities"
import { useEffect } from "react"
import { ZCharacter } from "../../../../../shared/types/types"

import { PositionSchema } from "../../../../../shared/zod/schemas"
import { popupInfoAtom } from "../../../game/state/jotai/gameState"

interface CharacterProps {
   characterAtom: PrimitiveAtom<ZCharacter>
   maxDimension: number
}

// TODO: Place the characters on ground level.
const Character = ({ characterAtom, maxDimension = 1 }: CharacterProps) => {
   const [character, setCharacter] = useAtom(characterAtom)
   const [, setPopupInfo] = useAtom(popupInfoAtom)

   const colorMap = useLoader(TextureLoader, character.spritePath)

   const dimensions = textureUtilities.getTextureNormalizedWidthAndHeight(
      colorMap,
      maxDimension
   )
   const normalizedYPos = textureUtilities.getTextureYCenter(dimensions.height)

   // Update character Y position
   useEffect(() => {
      const oldPos = PositionSchema.parse(character.position)
      if (oldPos.y !== normalizedYPos) {
         setCharacter({
            ...character,
            position: { ...oldPos, y: normalizedYPos },
         })
      }
   }, [character, normalizedYPos, setCharacter])

   return (
      <group>
         <mesh
            position={[
               character.position?.x || 0,
               normalizedYPos,
               character.position?.z || 0,
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
      </group>
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
