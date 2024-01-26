import PropTypes from "prop-types"

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { MathUtils } from "three"

interface CharacterProps {
   character: Character
   width: number
}

// TODO: Place the characters on ground level.
const Character = ({ character, width = 1 }: CharacterProps) => {
   console.log("character in Character", character)

   const colorMap = useLoader(TextureLoader, character.spritePath)

   return (
      <mesh position={[5.5, 0.5, 5.5]} rotation-x={MathUtils.degToRad(-45)}>
         <planeGeometry args={[width, 1]} />
         <meshBasicMaterial
            color="white"
            map={colorMap}
            transparent
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
