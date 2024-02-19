import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"

interface EnemyAvatarProps {
   imagePath: string
   quantity: number
   onClick: () => void
}

// TODO: Make avatars a bit bigger?

/**
 *
 *
 * @param imagePath - the path to the image
 * @param quantity - the number of avatars to render
 * @param onClick - the function to be called on click
 * @return {JSX.Element} the AvatarGroup component with avatars
 */
const EnemyAvatars = ({ imagePath, quantity, onClick }: EnemyAvatarProps) => {
   /**
    * Only for looping.
    */
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
