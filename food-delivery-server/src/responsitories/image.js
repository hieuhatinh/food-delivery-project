import { ImageModel } from '../models/index.js'

export async function createImage(imageInfo, name) {
    let typeImage = imageInfo.originalname.split('.').pop()

    const newImage = await ImageModel.create({
        fileName: `${name}.${typeImage}`,
        file: {
            data: imageInfo.buffer,
            contentType: imageInfo.mimetype,
        },
    })
    return newImage
}
