const { bucket } = require('../middleware/firebase');

const deleteImage = async (req, res, next) => {
    try {
        await bucket.file(`images/${req.body.imageName}`).delete();
        console.log(`Image deleted successfully.`);
        next();
    } catch (error) {
        console.error(`Error deleting the image: ${error}`);
    }
}

module.exports = deleteImage;