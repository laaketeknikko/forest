import PropTypes from "prop-types"

import { Vector3, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { MathUtils } from "three"

import { Atom, useAtom } from "jotai"
import { selectedCharacterAtom } from "../../game/state/jotai/characters"

interface CharacterProps {
   characterAtom: Atom<Character>
   width: number
   position: Vector3
}

// TODO: Place the characters on ground level.
const Character = ({ characterAtom, width = 1, position }: CharacterProps) => {
   const [character] = useAtom(characterAtom)
   const [, setActiveCharacter] = useAtom(selectedCharacterAtom)

   const colorMap = useLoader(TextureLoader, character.spritePath)

   return (
      <mesh
         position={position}
         rotation-x={MathUtils.degToRad(-45)}
         onClick={() => {
            setActiveCharacter(characterAtom)
         }}
      >
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
