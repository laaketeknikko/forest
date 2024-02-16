import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"

interface EnemyAvatarProps {
   imagePath: string
   quantity: number
   onClick: () => void
}

const EnemyAvatars = ({ imagePath, quantity, onClick }: EnemyAvatarProps) => {
   // Array is only to loop.
   const dummyArray = Array(quantity).fill("")

   return (
      <AvatarGroup
         max={2}
         spacing="small"
         variant="rounded"
         sx={{ justifyContent: "center", width: "min-content" }}
         onClick={onClick}
      >
         {dummyArray.map((_item, index) => {
            return <Avatar key={index} src={imagePath} />
         })}
      </AvatarGroup>
   )
}

export { EnemyAvatars }
