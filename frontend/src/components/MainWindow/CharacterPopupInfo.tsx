import { ZCharacter } from "../../../../shared/types/types"

interface CharacterPopupInfoProps {
   character: ZCharacter | null
}

const CharacterPopupInfo = ({ character }: CharacterPopupInfoProps) => {
   if (!character) {
      return null
   }

   return (
      <div>
         {character.name}
         <ul>
            <li>{character.health}</li>
            <li>{character.currentActionDelay}</li>
         </ul>
      </div>
   )
}

export { CharacterPopupInfo }
