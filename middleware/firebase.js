const admin = require("firebase-admin");
const { Storage } = require('@google-cloud/storage');
const credentials = require("../key.json");

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

module.exports = {
    db, bucket
}