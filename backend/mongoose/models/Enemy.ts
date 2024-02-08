import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

import { DynamicGameEntitySchema } from "./DynamicGameEntity"

const EnemySchema = new mongoose.Schema<modelTypes.IEnemyModel>()

EnemySchema.add(DynamicGameEntitySchema)

const EnemyModel = mongoose.model<modelTypes.IEnemyModel>("Enemy", EnemySchema)

export { EnemyModel, EnemySchema }
