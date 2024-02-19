import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

const ScenarioStatisticsSchema =
   new mongoose.Schema<modelTypes.IScenarioStatisticsModel>({
      scenarioName: { type: String, required: false },
      timesAttempted: { type: Number, required: false },
      wins: { type: Number, required: false },
      losses: { type: Number, required: false },
   })

const ScenarioStatisticsModel =
   mongoose.model<modelTypes.IScenarioStatisticsModel>(
      "ScenarioStatistics",
      ScenarioStatisticsSchema
   )

export { ScenarioStatisticsModel, ScenarioStatisticsSchema }
