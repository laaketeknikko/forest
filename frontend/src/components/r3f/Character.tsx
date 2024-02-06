import PropTypes from "prop-types"

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

import { Atom, useAtom } from "jotai"

import * as textureUtilities from "../util/textureUtilities"

interface CharacterProps {
   characterAtom: Atom<Character>
   maxDimension: number
}

// TODO: Place the characters on ground level.
const Character = ({ characterAtom, maxDimension = 1 }: CharacterProps) => {
   const [character] = useAtom(characterAtom)

   const colorMap = useLoader(TextureLoader, character.spritePath)

   const dimensions = textureUtilities.getTextureNormalizedWidthAndHeight(
      colorMap,
      maxDimension
   )
   const normalizedYPos = textureUtilities.getTextureYCenter(dimensions.height)

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
