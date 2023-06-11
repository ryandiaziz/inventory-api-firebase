const { bucket } = require('../middleware/firebase');

const checkImageUpdate = async (req, res, next) => {
    if (!req.file) {
        // res.send('ga ada gambar')
        next();
    } else {
        await bucket.file(`images/${req.body.imageName}`).delete(); // Delete old image
        delete req.body.imageName;
        // upload new image
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
                    // req.body.imageUrl = url[0];
                    req.body.image = {
                        url: url[0],
                        name: req.file.originalname
                    }
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
}

module.exports = checkImageUpdate;