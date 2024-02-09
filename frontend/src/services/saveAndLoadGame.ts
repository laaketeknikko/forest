const serverRoot = import.meta.env.VITE_SERVER_LOCATION

const saveGame = async (saveGameData) => {
   const response = await fetch(`${serverRoot}/api/savedgames`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(saveGameData),
      mode: "cors",
   })

   return response.json()
}

const loadGame = async (keyString: string) => {
   const response = await fetch(`${serverRoot}/api/savedgames/${keyString}`)
   const json = await response.json()
   return json
}

export { saveGame, loadGame }
