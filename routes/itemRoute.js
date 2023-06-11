const itemRoute = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const ItemController = require('../controller/itemController');
const uploadImage = require('../helper/uploadImage');
const checkName = require('../helper/checkName');
const deleteImage = require('../helper/deleteImage');
const checkImageUpdate = require('../helper/checkImageUpdate');

itemRoute.get('/',
    ItemController.readItem);
itemRoute.post('/create',
    upload.single("filename"),
    checkName,
    uploadImage,
    ItemController.createItem,
);
itemRoute.put('/update/:id',
    upload.single("filename"),
    checkImageUpdate,
    ItemController.updateItem,
);
itemRoute.delete('/delete/:id',
    deleteImage,
    ItemController.deleteItem
);

module.exports = itemRoute;