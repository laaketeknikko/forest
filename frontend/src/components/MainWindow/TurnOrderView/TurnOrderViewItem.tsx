import { Atom } from "jotai"
import { useAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"

interface TurnOrderViewItemProps {
   characterAtom: Atom<ZCharacter>
}

const TurnOrderViewItem = ({ characterAtom }: TurnOrderViewItemProps) => {
   const [character] = useAtom(characterAtom)

   return <img className="turn-order-image" src={character.spritePath} />
}

export { TurnOrderViewItem }
