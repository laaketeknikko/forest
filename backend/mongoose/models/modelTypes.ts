// Types to use Mongoose with TypeScript.

import * as types from "../../../shared/types/types"

interface IActionCardActionModel extends types.ISaveConfigActionCardAction {}

interface IActionCardModel extends types.ISaveConfigActionCard {}

interface IDynamicGameEntityModel extends types.ISaveConfigDynamicGameEntity {}

interface IEnemyModel extends types.ISaveConfigEnemy {}

interface ICharacterModel extends types.ISaveConfigCharacter {}

interface IScenarioModel extends types.ISaveConfigScenarioConfig {}

interface ISaveGameConfigModel extends types.ISaveGameConfig {}

export {
   IActionCardActionModel,
   IActionCardModel,
   ICharacterModel,
   IEnemyModel,
   ISaveGameConfigModel,
   IScenarioModel,
   IDynamicGameEntityModel,
}
