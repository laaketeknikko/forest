const serverRoot = import.meta.env.VITE_SERVER_LOCATION

const saveGame = async (saveGameData: string) => {
   const response = await fetch(`${serverRoot}/api/save`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: saveGameData,
      mode: "cors",
   })

   return response.json()
}

export { saveGame }
