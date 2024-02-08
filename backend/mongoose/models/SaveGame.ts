import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"
import { CharacterSchema } from "./Character"
import { EnemySchema } from "./Enemy"
import { ScenarioSchema } from "./Scenario"

const SaveGameSchema = new mongoose.Schema<modelTypes.ISaveGameConfigModel>({
   characters: { type: [CharacterSchema], required: false },
   enemies: { type: [EnemySchema], required: false },
   scenario: { type: ScenarioSchema, required: false },
   keyString: { type: String, required: false },
})

const SaveGameModel = mongoose.model<modelTypes.ISaveGameConfigModel>(
   "SaveGame",
   SaveGameSchema
)

export { SaveGameModel }
