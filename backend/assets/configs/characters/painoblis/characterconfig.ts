import * as types from "../../../../../shared/types/types"

import { actionTypes } from "../../actions/actionTypes"
import { damageTypes } from "../../actions/damageTypes"

const painoblisActions: Record<string, types.ZSaveConfigActionCardAction> = {
   grow: {
      name: "Grow",
      description: "Grow and enjoy the sun",
      effects: [
         {
            actionDelayMultiplier: 2,
            type: actionTypes.support,
         },
      ],
   },
   rootRelocate: {
      name: "Root relocate",
      description: "If it supports growth, you can go there.",
      effects: [
         {
            actionDelayMultiplier: 3,
            type: actionTypes.movement,
            range: 8,
         },
      ],
   },
   sunnyEyes: {
      name: "Sunny eyes",
      description: "Sunny, sunny, sunny, sunny, sunny",
      effects: [
         {
            actionDelayMultiplier: 2,
            range: 7,
            type: actionTypes.offensive,
            damageType: damageTypes.physical,
            powerMultiplier: 1,
         },
      ],
   },
   happyFace: {
      name: "Happy face",
      description: "Never has one seen one such a happy face.",
      effects: [
         {
            type: actionTypes.support,
            range: 5,
            actionDelayMultiplier: 1,
         },
      ],
   },
   luledielli: {
      name: "Luledielli",
      description: "Luledielli, luledielli, luledielli, luledielli",
      effects: [
         {
            type: actionTypes.support,
            range: 1,
            actionDelayMultiplier: 1,
         },
      ],
   },
   crushingRoot: {
      name: "Crushing root",
      description:
         "Crushing roots crush legendary roots (if they exist) [WTF? Descriptions by Codeium]",
      effects: [
         {
            type: actionTypes.offensive,
            range: 6,
            powerMultiplier: 1.5,
            actionDelayMultiplier: 2,
            damageType: damageTypes.physical,
         },
         {
            type: actionTypes.offensive,
            range: 6,
            powerMultiplier: 1.2,
            actionDelayMultiplier: 1.5,
            damageType: damageTypes.physical,
         },
      ],
   },
}

const PainoblisCards: Array<types.ZSaveConfigActionCard> = [
   {
      name: "A flower's a flower",
      description: "A flower's a flower",
      actions: [
         painoblisActions.grow,
         painoblisActions.rootRelocate,
         painoblisActions.sunnyEyes,
         painoblisActions.happyFace,
         painoblisActions.luledielli,
         painoblisActions.crushingRoot,
      ],
   },
   {
      name: "A flower's a flower",
      description: "A flower's a flower",
      actions: [
         painoblisActions.grow,
         painoblisActions.rootRelocate,
         painoblisActions.sunnyEyes,
         painoblisActions.happyFace,
         painoblisActions.luledielli,
         painoblisActions.crushingRoot,
      ],
   },
   {
      name: "A flower's a flower",
      description: "A flower's a flower",
      actions: [
         painoblisActions.grow,
         painoblisActions.rootRelocate,
         painoblisActions.sunnyEyes,
         painoblisActions.happyFace,
         painoblisActions.luledielli,
         painoblisActions.crushingRoot,
      ],
   },
   {
      name: "A flower's a flower",
      description: "A flower's a flower",
      actions: [
         painoblisActions.grow,
         painoblisActions.rootRelocate,
         painoblisActions.sunnyEyes,
         painoblisActions.happyFace,
         painoblisActions.luledielli,
         painoblisActions.crushingRoot,
      ],
   },
   {
      name: "A flower's a flower",
      description: "A flower's a flower",
      actions: [
         painoblisActions.grow,
         painoblisActions.rootRelocate,
         painoblisActions.sunnyEyes,
         painoblisActions.happyFace,
         painoblisActions.luledielli,
         painoblisActions.crushingRoot,
      ],
   },
]

const characterConfig: types.ZSaveConfigCharacter = {
   name: "Painoblis",
   position: { x: 0, y: 0, z: 0 },
   spritePath: "sprites/characters/kukka.png",
   cards: PainoblisCards,
   baseActionDelay: 15,
   selectedCardId: "",
   currentActionDelay: 15,
   health: 60,
   maxHealth: 60,
   strength: 10,
}

export { characterConfig }
