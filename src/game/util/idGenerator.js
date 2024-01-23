import { v4 } from "uuid"

const getNextId = () => {
   return v4()
}

export { getNextId }
