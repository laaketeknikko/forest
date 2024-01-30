import PropTypes from "prop-types"

import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { MathUtils } from "three"

import { Atom, useAtom } from "jotai"
import { selectedCharacterAtom } from "../../game/state/jotai/characters"
import { Billboard } from "@react-three/drei"

import { useState } from "react"

interface CharacterProps {
   characterAtom: Atom<Character>
   width: number
}

// TODO: Place the characters on ground level.
const Character = ({ characterAtom, width = 1 }: CharacterProps) => {
   const [character] = useAtom(characterAtom)
   const [, setActiveCharacter] = useAtom(selectedCharacterAtom)

   const colorMap = useLoader(TextureLoader, character.spritePath)

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
