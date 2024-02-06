const getTextureAspectRatio = (texture: THREE.Texture) => {
   const width = texture.image.naturalWidth || texture.image.width
   const height = texture.image.naturalHeight || texture.image.height

   return {
      width: width,
      height: height,
      aspectRatio: texture.image.width / texture.image.height,
   }
}

const getTextureNormalizedWidthAndHeight = (
   texture: THREE.Texture,
   maxDimension = 1
) => {
   const { width, height, aspectRatio } = getTextureAspectRatio(texture)
   const normalizedDimensions = {
      width: 0,
      height: 0,
   }
   if (width > height) {
      normalizedDimensions.width = maxDimension
      normalizedDimensions.height = maxDimension / aspectRatio
   } else {
      normalizedDimensions.height = maxDimension
      normalizedDimensions.width = maxDimension * aspectRatio
   }

   return normalizedDimensions
}

const getTextureYCenter = (height: number) => {
   return height / 2
}

export {
   getTextureAspectRatio,
   getTextureNormalizedWidthAndHeight,
   getTextureYCenter,
}
