import PropTypes from "prop-types"

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { MathUtils } from "three"

import { Atom, useAtom } from "jotai"
import { useEffect } from "react"

interface CharacterProps {
   characterAtom: Atom<Character>
   width: number
}

// TODO: Place the characters on ground level.
const Character = ({ characterAtom, width = 1 }: CharacterProps) => {
   const [character] = useAtom(characterAtom)

   const colorMap = useLoader(TextureLoader, character.spritePath)

   useEffect(() => {
      console.log("width", width)
   }, [width])

   return (
      <sprite
         position={[
            character.position.x,
            character.position.y,
            character.position.z,
         ]}
         rotation-y={MathUtils.degToRad(-45)}
      >
         <spriteMaterial args={[{ map: colorMap }]} depthWrite={false} />
      </sprite>
   )

   /*return (
      <mesh
         position={[
            character.position.x,
            character.position.y,
            character.position.z,
         ]}
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
            opacity={1}
            toneMapped={false}
         />
      </mesh>
   )*/
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