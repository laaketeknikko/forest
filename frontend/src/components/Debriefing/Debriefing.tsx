import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { useAtom } from "jotai"
import { MainWindowDisplayStatus } from "../../config/types"
import {
   activeSaveGameConfigAtom,
   gameExecutionStateAtom,
} from "../../game/state/jotai/gameState"

import { selectedPartyAtom } from "../../game/state/jotai/characters"

import Stack from "@mui/material/Stack"
import { selectedScenarioEnemiesAtom } from "../../game/state/jotai/enemies"

import { emptyScenarioSaveConfig } from "../../game/state/initialStates"
import { DebriefingEntityList } from "./DebriefingEntityList"
import { DebriefingStat } from "./DebriefingStat"

const Debriefing = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const [saveGame, setSaveGame] = useAtom(activeSaveGameConfigAtom)
   const [selectedParty, setSelectedParty] = useAtom(selectedPartyAtom)
   const [enemyAtoms, setEnemyAtoms] = useAtom(selectedScenarioEnemiesAtom)

   const scenarioStatistics = saveGame.scenarioStatistics.find((stat) => {
      return stat.scenarioName === saveGame.scenario.name
   })

   const handleConfirmation = () => {
      setGameExecutionState({
         ...gameExecutionState,
         scenario: {
            lost: false,
            won: false,
            resultRecorded: false,
         },
         mainDisplay: MainWindowDisplayStatus.showMainMenu,
         mainMenu: {
            showMainmenu: true,
            gameConfigLoaded: true,
            scenarioSelected: false,
            charactersSelected: false,
            scenarioStarted: false,
         },
      })

      setSaveGame({
         ...saveGame,
         isScenarioInProgress: false,
         scenario: emptyScenarioSaveConfig,
      })

      setSelectedParty([])

      setEnemyAtoms([])
   }

   return (
      <Container
         sx={{
            overflowY: "auto",
            height: "100%",
         }}
      >
         <Typography variant="h3" color="primary" textAlign={"center"}>
            Debriefing
         </Typography>

         <Typography variant="h5" textAlign={"center"}>
            {saveGame.scenario.name}
         </Typography>

         <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"space-around"}
            marginTop={10}
            marginBottom={10}
         >
            <DebriefingStat
               heading="Result"
               stat={gameExecutionState.scenario.won ? "Victory" : "Defeat"}
            />

            <DebriefingStat
               heading={"Times attempted"}
               stat={String(scenarioStatistics?.timesAttempted)}
            />

            <DebriefingStat
               heading={"Wins"}
               stat={String(scenarioStatistics?.wins)}
            />

            <DebriefingStat
               heading={"Losses"}
               stat={String(scenarioStatistics?.losses)}
            />
         </Stack>

         <Grid2
            columns={24}
            container
            sx={{ marginTop: 3 }}
            alignItems={"start"}
         >
            {/** Enemies section
             *
             */}
            <DebriefingEntityList header={"Enemies"} entityAtoms={enemyAtoms} />

            {/** Party section
             *
             */}
            <DebriefingEntityList
               header={"Party"}
               entityAtoms={selectedParty}
            />
         </Grid2>

         <Button onClick={handleConfirmation}>Accept</Button>
      </Container>
   )
}

export { Debriefing }
