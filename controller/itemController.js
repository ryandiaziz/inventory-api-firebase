const admin = require("firebase-admin");
const credentials = require("../key.json");
const { Storage } = require('@google-cloud/storage');

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    storageBucket: "inventory-8ebc0.appspot.com"
});

const storage = new Storage({
    projectId: "inventory-8ebc0",
    keyFilename: credentials
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

class ItemController {
    static async readItem(req, res) {
        try {
            const snapshot = await db.collection("items").get();
            const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            res.send(list);
        } catch (error) {
            res.send(error)
        }
    }

    static async createItem(req, res) {
        try {
            const { imageUrl, name, purchasePrice, sellPrice, stock } = req.body;
            await db.collection("items").add({
                imageUrl: imageUrl,
                name: name,
                purchasePrice: +purchasePrice,
                sellPrice: +sellPrice,
                stock: +stock
            });
            res.send({ msg: "User Added" });
        } catch (error) {
            res.send(error)
        }
    }

    static async updateItem(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            await db.collection("items").doc(id).update(data);
            res.send({ msg: "Updated" });
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteItem(req, res) {
        try {
            const id = req.params.id;
            await db.collection("items").doc(id).delete();
            res.send({ msg: "Deleted" });
        } catch (error) {
            res.send(error)
        }
    }

    static async uploadImage(req, res, next) {
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
}

module.exports = ItemController;