import { ZSaveConfig } from "../../../shared/types/types"
import { SaveConfigSchema } from "../../../shared/zod/schemas"

const serverRoot = import.meta.env.VITE_SERVER_LOCATION

const saveGame = async (saveGameData: ZSaveConfig) => {
   const response = await fetch(`${serverRoot}/api/savedgames`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(saveGameData),
      mode: "cors",
   })

   const parsedResponse = SaveConfigSchema.safeParse(await response.json())

   if (!parsedResponse.success) {
      throw new Error(parsedResponse.error.message)
   }

   return parsedResponse.data
}

const loadGame = async (keyString: string) => {
   const response = await fetch(`${serverRoot}/api/savedgames/${keyString}`)

   const parsedResponse = SaveConfigSchema.safeParse(await response.json())

   if (!parsedResponse.success) {
      throw new Error(parsedResponse.error.message)
   }

   return parsedResponse.data
}

export { saveGame, loadGame }
