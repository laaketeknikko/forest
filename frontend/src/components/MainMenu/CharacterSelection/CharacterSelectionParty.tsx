import Stack from "@mui/material/Stack"
import { useAtom } from "jotai"
import { selectedPartyAtom } from "../../../game/state/jotai/characters"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { theme } from "../../../styles/mui/theme"
import { useRef } from "react"
import { getDefaultJotaiStore } from "../../../game/state/jotai/store"

/**
 * Used to show the selected party in the character selection screen.
 */
const CharacterSelectionParty = () => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [activeParty] = useAtom(selectedPartyAtom)
   const jotaiStoreRef = useRef(getDefaultJotaiStore())

   return (
      <Stack
         className="character-selection-selected-party"
         spacing={4}
         sx={{ paddingTop: 3, paddingRight: 3, paddingLeft: 3 }}
      >
         {/***
          * First render avatars of selected characters.
          */}
         {activeParty &&
            activeParty.map((characterAtom) => {
               const character = jotaiStoreRef.current.get(characterAtom)
               return (
                  <img
                     title={character.name}
                     key={character.name}
                     src={character.spritePath}
                     style={{ width: "100%" }}
                  />
               )
            })}

         {/**Add empty spaces up to scenario maximum. */}
         {Array(selectedScenarioConfig.maxPartySize - activeParty.length)
            .fill(0)
            .map((_, index) => {
               return (
                  <div
                     key={index}
                     style={{
                        width: "100%",
                        aspectRatio: 1,
                        backgroundColor: theme.palette.text.secondary,
                        borderRadius: "50%",
                        borderColor: theme.palette.primary.main,
                        borderStyle: "solid",
                        borderWidth: 0,
                     }}
                  ></div>
               )
            })}
      </Stack>
   )
}

export { CharacterSelectionParty }
