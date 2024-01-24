import { Canvas } from "@react-three/fiber"
import { GameFieldView } from "../GameFieldView"

const R3FCanvasWrapper = () => {
   return (
      <Canvas camera={{ position: [1, 4, 5] }}>
         <axesHelper />
         <GameFieldView />
      </Canvas>
   )
}

export { R3FCanvasWrapper }
