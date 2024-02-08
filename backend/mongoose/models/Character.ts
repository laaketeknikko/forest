import { DynamicGameEntitySchema } from "./DynamicGameEntity"
import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

const CharacterSchema = new mongoose.Schema<modelTypes.ICharacterModel>()

CharacterSchema.add(DynamicGameEntitySchema)

const CharacterModel = mongoose.model<modelTypes.ICharacterModel>(
   "Character",
   CharacterSchema
)

export { CharacterModel, CharacterSchema }
