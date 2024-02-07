import mongoose from "mongoose"
import { CharacterSchema } from "./Character"
import { EnemySchema } from "./Enemy"
import { ScenarioSchema } from "./Scenario"

const SaveGameSchema = new mongoose.Schema({
   characters: { type: [CharacterSchema], required: true },
   enemies: { type: [EnemySchema], required: true },
   scenario: { type: ScenarioSchema, required: true },
})

const SaveGameModel = mongoose.model("SaveGame", SaveGameSchema)

export { SaveGameModel }
