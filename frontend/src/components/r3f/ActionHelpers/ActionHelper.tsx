import { useAtom, useSetAtom } from "jotai"
import {
   currentlySelectedActionCardAtom,
   gameExecutionStateAtom,
   popupInfoAtom,
} from "../../../game/state/jotai/gameState"
import { activeCharacterAtomAtom } from "../../../game/state/jotai/characters"
import { useEffect, useMemo, useRef, useState } from "react"

import { actionTypes } from "../../../config/actions/actionTypes"

import {
   performAction,
   performEffect,
} from "../../../game/actions/performAction"
import {
   ActionEffectsTracker,
   useActionEffectsTracker,
} from "./useActionEffectsTracker"
import { ZActionEffect, ZCharacter } from "../../../../../shared/types/types"
import { ThreeEvent } from "@react-three/fiber"
import { MathUtils } from "three"

import { customTheme } from "../../../styles/mui/theme"
import { emptyActionCardAtom } from "../../../game/state/initialStates"

import { CustomGrid } from "../util/CustomGrid"
import {
   getEntitiesForPosition,
   getNearestTileCornerFromPosition,
} from "../../../game/util/mapUtils"
import { AffectedPopupInfo } from "../../GameScene/PopupInfo.tsx/AffectedPopupInfo"
import { PrimitiveAtom } from "jotai/vanilla"

// TODO: When user deselects a card, the action is undefined
// but it's still possible to execute the effects. Fix.

/**
 * Provides visual and game logic helpers when performing actions and action effects.
 * - Displays a circle for effect ranges
 * - Takes care of executing actions in order
 * - Displays a popup with the affected entities
 *
 */
const ActionHelper = () => {
   const [selectedCard, setSelectedCard] = useAtom(
      currentlySelectedActionCardAtom
   )
   const [selectedCardData] = useAtom(selectedCard)
   const [activeCharacter] = useAtom(activeCharacterAtomAtom)
   const [activeCharacterData] = useAtom(activeCharacter)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const setPopupInfo = useSetAtom(popupInfoAtom)
   const [activeEffect, setActiveEffect] = useState<ZActionEffect | undefined>(
      undefined
   )

   const action = useMemo(
      () =>
         selectedCardData.actions.find(
            (action) => action._id === selectedCardData.nextActionId
         ),
      [selectedCardData.actions, selectedCardData.nextActionId]
   )

   const entitiesOnTileRef = useRef<ReturnType<
      typeof getEntitiesForPosition
   > | null>(null)

   const actionTrackerRef = useRef<ActionEffectsTracker>()
   actionTrackerRef.current = useActionEffectsTracker()

   useEffect(() => {
      if (action && actionTrackerRef.current) {
         actionTrackerRef.current.setAction(action)
         setActiveEffect(actionTrackerRef.current.getNextUnexecutedEffect())
      } else {
         setActiveEffect(undefined)
      }
   }, [action])

   const handlePerformEffect = (event: ThreeEvent<MouseEvent>) => {
      if (!actionTrackerRef.current) return

      event.stopPropagation()

      performEffect({
         selectedCharacterAtom: activeCharacter,
         activeEffect: activeEffect!,
         targetPoint: event.point,
      })

      setGameExecutionState({
         ...gameExecutionState,
         actions: { ...gameExecutionState.actions, isPerfomingAction: true },
      })
      actionTrackerRef.current.effectExecuted()

      /**
       * If there are no more effects to execute, perform whole-action updates.
       */
      if (!actionTrackerRef.current.getNextUnexecutedEffect()) {
         performAction({
            activeCardAtom: selectedCard,
            /**
             * It's not possible to get here without an action.
             */
            selectedAction: action!,
            selectedCharacterAtom: activeCharacter,
         })

         setGameExecutionState({
            ...gameExecutionState,
            actions: {
               ...gameExecutionState.actions,
               isPerfomingAction: false,
            },
         })
         setSelectedCard(emptyActionCardAtom)
      } else {
         setActiveEffect(actionTrackerRef.current?.getNextUnexecutedEffect())
      }
   }

   const handleHelperHover = (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation()

      entitiesOnTileRef.current = getEntitiesForPosition({
         x: event.point.x,
         z: event.point.z,
      })

      setPopupInfo(
         <AffectedPopupInfo
            entityAtoms={entitiesOnTileRef.current.map(
               (e) => e.entity as unknown as PrimitiveAtom<ZCharacter>
            )}
         />
      )
   }

   let helperColor
   let gridColor
   if (activeEffect?.type === actionTypes.movement) {
      helperColor = customTheme.custom.colors.actionTypes.movement
      gridColor = customTheme.custom.colors.actionTypes.movementOpposite
   } else if (activeEffect?.type === actionTypes.support) {
      helperColor = customTheme.custom.colors.actionTypes.support
      gridColor = customTheme.custom.colors.actionTypes.supportOpposite
   } else if (activeEffect?.type === actionTypes.offensive) {
      helperColor = customTheme.custom.colors.actionTypes.offensive
      gridColor = customTheme.custom.colors.actionTypes.offensiveOpposite
   } else if (activeEffect?.type === actionTypes.defensive) {
      helperColor = customTheme.custom.colors.actionTypes.defensive
      gridColor = customTheme.custom.colors.actionTypes.defensiveOpposite
   }

   const gridCenter = useMemo(() => {
      const corner = getNearestTileCornerFromPosition(
         activeCharacterData.position.x,
         activeCharacterData.position.z
      )

      const gridCenter = {
         x: corner.x - activeCharacterData.position.x,
         z: corner.z - activeCharacterData.position.z,
      }

      return gridCenter
   }, [activeCharacterData.position])

   return (
      <group>
         {activeEffect && (
            <>
               <mesh
                  position={[
                     activeCharacterData.position?.x || 0,
                     0.05,
                     activeCharacterData.position?.z || 0,
                  ]}
                  rotation-x={MathUtils.degToRad(-90)}
                  onClick={handlePerformEffect}
                  onPointerMove={handleHelperHover}
                  onPointerLeave={() => setPopupInfo(null)}
               >
                  {/**
                   * Positioning the custom grid is a bit tricky.
                   *
                   * The grid is y-up oriented. Because we have rotated the parent
                   * mesh, y would be pointing to the side. So we need to rotate
                   * the grid to point it globally up.
                   *
                   * We also want to position the grid horizontally to align with
                   * full integer positions. Because the parent mesh is rotated -90
                   * degrees, now the y dimension of the grid is pointing to the
                   * z dimension globally. Increasing the y coordinate of the grid
                   * pushes towards negative z coordinate, so we invert the coordinate
                   * we set.
                   */}
                  <CustomGrid
                     position={[gridCenter.x, -gridCenter.z, 0.05]}
                     cellSize={1}
                     cellThickness={1}
                     cellColor={gridColor}
                     sectionThickness={0}
                     args={[
                        activeEffect.range ? activeEffect.range * 4 + 2 : 10,
                        activeEffect.range ? activeEffect.range * 4 + 2 : 10,
                     ]}
                     infiniteGrid={false}
                     rotation-x={MathUtils.degToRad(90)}
                     fadeDistance={
                        activeEffect.range ? activeEffect.range * 2 + 1 : 5
                     }
                     fadeStrength={0.5}
                  />

                  <circleGeometry
                     args={[activeEffect.range ? activeEffect.range : 0.5, 30]}
                  />
                  <meshBasicMaterial toneMapped={false} color={helperColor} />
               </mesh>
            </>
         )}
      </group>
   )
}

export { ActionHelper }
