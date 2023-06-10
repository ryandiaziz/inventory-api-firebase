const itemRoute = require('express').Router();
const ItemController = require('../controller/itemController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

itemRoute.get('/', ItemController.readItem);
itemRoute.post(
    '/create',
    upload.single("filename"),
    ItemController.uploadImage,
    ItemController.createItem
);
itemRoute.put('/update/:id', ItemController.updateItem);
itemRoute.delete('/delete/:id', ItemController.deleteItem);
itemRoute.post('/upload', upload.single("filename"), ItemController.uploadImage);

module.exports = itemRoute;