const enemyConfig: Omit<Enemy, "position"> = {
   name: "Miinii",
   health: 200,
   spritePath: "sprites/characters/miinii.png",
   baseActionDelay: 10,
   currentActionDelay: 10,
}

export { enemyConfig }
