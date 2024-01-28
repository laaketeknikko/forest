import { Atom } from "jotai"
import { useAtom } from "jotai"

interface TurnOrderViewItemProps {
   characterAtom: Atom<Character>
}

const TurnOrderViewItem = ({ characterAtom }: TurnOrderViewItemProps) => {
   const [character] = useAtom(characterAtom)

   return <img className="turn-order-image" src={character.spritePath} />
}

export { TurnOrderViewItem }
