import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

const ScenarioStatisticsSchema =
   new mongoose.Schema<modelTypes.IScenarioStatisticsModel>({
      scenarioName: { type: String, required: true },
      timesAttempted: { type: Number, required: true },
      wins: { type: Number, required: true },
      losses: { type: Number, required: true },
   })

const ScenarioStatisticsModel =
   mongoose.model<modelTypes.IScenarioStatisticsModel>(
      "ScenarioStatistics",
      ScenarioStatisticsSchema
   )

export { ScenarioStatisticsModel, ScenarioStatisticsSchema }
