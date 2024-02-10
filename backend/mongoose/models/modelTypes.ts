// Types to use Mongoose with TypeScript.

import * as types from "../../../shared/types/types"

interface IActionCardActionModel extends types.ActionCardAction {}

interface IActionCardModel extends types.ActionCard {}

interface IDynamicGameEntityModel
   extends Omit<types.DynamicGameEntity, "selectedCardId" | "cards"> {
   cards: Array<IActionCardModel>
}

interface IEnemyModel extends Omit<types.Enemy, "selectedCardId"> {}

interface ICharacterModel extends Omit<types.Character, "selectedCardId"> {}

interface IScenarioModel
   extends Omit<
      types.ScenarioConfig,
      "enemies" | "playerCharacterStartingPositions"
   > {
   _id?: string
   name: string
   shortDescription: string
   description: string
   arena: types.ArenaConfig
   thumbNailPath: string
   maxPartySize: number
}

interface ISaveGameConfigModel {
   characters: Array<ICharacterModel>
   enemies: Array<IEnemyModel>
   scenario: IScenarioModel
   keyString: string
}

export {
   IActionCardActionModel,
   IActionCardModel,
   ICharacterModel,
   IEnemyModel,
   ISaveGameConfigModel,
   IScenarioModel,
   IDynamicGameEntityModel,
}
