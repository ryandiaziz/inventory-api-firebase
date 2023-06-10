const itemRoute = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const ItemController = require('../controller/itemController');
const uploadImage = require('../middleware/uploadImage')

itemRoute.get('/', ItemController.readItem);
itemRoute.post(
    '/create',
    upload.single("filename"),
    uploadImage,
    ItemController.createItem,
);
itemRoute.put('/update/:id', ItemController.updateItem);
itemRoute.delete('/delete/:id', ItemController.deleteItem);
// itemRoute.post('/upload', upload.single("filename"), ItemController.uploadImage);

module.exports = itemRoute;