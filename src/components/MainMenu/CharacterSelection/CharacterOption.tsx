import { useAtom } from "jotai"
import type { Atom } from "jotai"
import ToggleButton from "@mui/material/ToggleButton"

import { useRef } from "react"

interface CharacterOptionProps {
   characterAtom: Atom<Character>
}

const CharacterOption = ({ characterAtom }: CharacterOptionProps) => {
   const [characterData] = useAtom(characterAtom)

   const option = useRef({
      name: characterData.name,
      spritePath: characterData.spritePath,
   })

   return (
      <ToggleButton value={option}>
         <img src={characterData.spritePath} />
      </ToggleButton>
   )
}

export { CharacterOption }
