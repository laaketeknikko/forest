import mongoose from "mongoose"

import { DynamicGameEntitySchema } from "./DynamicGameEntity"

const CharacterSchema = new mongoose.Schema()

CharacterSchema.add(DynamicGameEntitySchema)

const CharacterModel = mongoose.model("Character", CharacterSchema)

export { CharacterModel, CharacterSchema }
