// Types to use Mongoose with TypeScript.

interface IActionCardActionModel extends ActionCardAction {}

interface IActionCardModel extends ActionCard {}

interface IDynamicGameEntityModel
   extends Omit<DynamicGameEntity, "selectedCardId"> {
   cards: Array<IActionCardModel>
}

interface IEnemyModel extends Omit<Enemy, "selectedCardId"> {}

interface ICharacterModel extends Omit<Character, "selectedCardId"> {}

interface IScenarioModel
   extends Omit<
      ScenarioConfig,
      "enemies" | "playerCharacterStartingPositions"
   > {
   _id?: string
   name: string
   shortDescription: string
   description: string
   arena: ArenaConfig
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
