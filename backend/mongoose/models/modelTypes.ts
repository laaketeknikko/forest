// Types to use Mongoose with TypeScript.

import * as types from "../../../shared/types/types"

interface IActionEffectModel extends types.ZActionEffect {}

interface IActionCardActionModel extends types.ZActionCardAction {}

interface IActionCardModel extends types.ZActionCard {}

interface IDynamicGameEntityModel extends types.ZSaveConfigDynamicGameEntity {}

interface IEnemyModel extends types.ZSaveConfigEnemy {}

interface ICharacterModel extends types.ZSaveConfigCharacter {}

interface IScenarioModel extends types.ZSaveConfigScenarioConfig {}

interface IScenarioStatisticsModel
   extends types.ZSaveConfigScenarioStatistics {}

export interface IScenarioVictoryConditionModel
   extends types.ZScenarioVictoryCondition {}

interface ISaveGameConfigModel extends types.ZSaveConfig {}

export {
   IActionCardActionModel,
   IActionCardModel,
   ICharacterModel,
   IEnemyModel,
   ISaveGameConfigModel,
   IScenarioModel,
   IDynamicGameEntityModel,
   IActionEffectModel,
   IScenarioStatisticsModel,
}
