import PropTypes from "prop-types"

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

import { PrimitiveAtom, useAtom } from "jotai"

import * as textureUtilities from "../util/textureUtilities"
import { useEffect } from "react"

interface CharacterProps {
   characterAtom: PrimitiveAtom<Character>
   maxDimension: number
}

// TODO: Place the characters on ground level.
const Character = ({ characterAtom, maxDimension = 1 }: CharacterProps) => {
   const [character, setCharacter] = useAtom(characterAtom)

   const colorMap = useLoader(TextureLoader, character.spritePath)

   const dimensions = textureUtilities.getTextureNormalizedWidthAndHeight(
      colorMap,
      maxDimension
   )
   const normalizedYPos = textureUtilities.getTextureYCenter(dimensions.height)

   // Update character Y position
   useEffect(() => {
      if (character.position.y !== normalizedYPos) {
         setCharacter({
            ...character,
            position: { ...character.position, y: normalizedYPos },
         })
      }
   }, [character, normalizedYPos, setCharacter])

   return (
      <mesh
         position={[character.position.x, normalizedYPos, character.position.z]}
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
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            actions: PropTypes.arrayOf(PropTypes.object),
         })
      ),
   }),
}

export { Character }
