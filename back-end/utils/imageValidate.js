const imageValidate = (imagesTable) => {
    if (imagesTable.length > 1) {
        return { error: "Send only 1 image" }
    }
    for (let image of imagesTable) {
        const filetypes = /jpg|png|jpeg/
        const mimetype = filetypes.test(image.mimetype)
        if (!mimetype) {
            return { error: "Incorrect mime type(Should be jpg.jpeg or png" }
        }
        if (image.size > 1048576*3) {
            return { error: "Size is too large(above 1 MB)" }
        }
        
    }
    return { error: false }
}
module.exports = imageValidate