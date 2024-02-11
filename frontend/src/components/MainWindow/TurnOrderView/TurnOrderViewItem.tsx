import { Atom } from "jotai"
import { useAtom } from "jotai"
import { ICharacter } from "../../../../../shared/types/types"

interface TurnOrderViewItemProps {
   characterAtom: Atom<ICharacter>
}

const TurnOrderViewItem = ({ characterAtom }: TurnOrderViewItemProps) => {
   const [character] = useAtom(characterAtom)

   return <img className="turn-order-image" src={character.spritePath} />
}

export { TurnOrderViewItem }
