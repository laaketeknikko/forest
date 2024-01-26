import { SVGLoader } from "three/addons/loaders/SVGLoader.js"
import {
   OrbitControls,
   OrthographicCamera,
   PerspectiveCamera,
} from "@react-three/drei"
import { Plane } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { TextureLoader, MathUtils } from "three"
import { Ground } from "./r3f/Ground/Ground"

import { useAtom } from "jotai"
import { Character } from "./r3f/Character"
import { guineanPigletCharacterAtom } from "../game/state/characters/guineanpiglet"

const GameFieldView = () => {
   //const colorMap = useLoader(SVGLoader, "sprites/characters/kissamainen2.svg")

   const [guineanPigletAtom] = useAtom(guineanPigletCharacterAtom)

   const [katikatti, miinii, puu, guineanpiglet] = useLoader(TextureLoader, [
      "sprites/characters/katikatti.png",
      "sprites/characters/miinii.png",
      "sprites/characters/puu.png",
      "sprites/characters/guineanpiglet.png",
   ])

   return (
      <>
         <OrbitControls />
         <ambientLight args={["white", 1]} />
         <Character character={guineanPigletAtom} />
         <mesh position={[0.5, 0.5, 0.5]} rotation-x={MathUtils.degToRad(-45)}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial
               color="white"
               map={katikatti}
               transparent
               toneMapped={false}
            />
         </mesh>
         <mesh position={[1.5, 0.5, 1.5]} rotation-x={MathUtils.degToRad(-45)}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial
               color="white"
               map={miinii}
               transparent
               toneMapped={false}
            />
         </mesh>
         <mesh position={[2.5, 0.5, 1.5]} rotation-x={MathUtils.degToRad(-45)}>
            <planeGeometry args={[1, 1.5]} />
            <meshBasicMaterial
               color="white"
               map={puu}
               transparent
               toneMapped={false}
            />
         </mesh>
         <mesh position={[3.5, 0.5, 5.5]} rotation-x={MathUtils.degToRad(-45)}>
            <planeGeometry args={[0.3, 0.2]} />
            <meshBasicMaterial
               color="white"
               map={guineanpiglet}
               transparent
               toneMapped={false}
            />
         </mesh>
         <Ground lengthX={10} />
      </>
   )
}

export { GameFieldView }
