const { bucket } = require('./firebase');

const uploadImage = async (req, res, next) => {
    const file = bucket.file(`images/${req.file.originalname}`);
    const blobStream = file.createWriteStream();

    blobStream.on('error', (error) => {
        console.error(error);
        res.status(500).send('Error uploading the file.');
        next();
    });
    blobStream.on('finish', () => {
        // Generate a signed URL for the file with a maximum expiration of 1 week (604800 seconds)
        const options = {
            version: 'v2', // Use version 'v2' for Firebase Storage
            action: 'read',
            expires: Date.now() + 604800000, // Set the expiration time to 1 week from now
        };
        file.getSignedUrl(options)
            .then((url) => {
                req.body.imageUrl = url[0];
                console.log('File uploaded successfully.');
                next();
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error uploading the file.');
                next();
            });
    });
    blobStream.end(req.file.buffer);
}

module.exports = uploadImage;