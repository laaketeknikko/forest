import mongoose from "mongoose"

import { DynamicGameEntitySchema } from "./DynamicGameEntity"

const EnemySchema = new mongoose.Schema()

EnemySchema.add(DynamicGameEntitySchema)

const EnemyModel = mongoose.model("Character", EnemySchema)

export { EnemyModel, EnemySchema }
