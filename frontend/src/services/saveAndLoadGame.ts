const serverRoot = import.meta.env.VITE_SERVER_LOCATION

const saveGame = async (saveGameData) => {
   console.log("saveGameData", saveGameData)

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

export { saveGame }
