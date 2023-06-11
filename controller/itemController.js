const { db } = require('../middleware/firebase');

class ItemController {
    static async readItem(req, res) {
        try {
            const snapshot = await db.collection("items").get();
            const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            res.json(list);
        } catch (error) {
            res.send(error)
        }
    }

    static async createItem(req, res) {
        try {
            const { image, name, purchasePrice, sellPrice, stock } = req.body;
            await db.collection("items").add({
                image: image,
                name: name,
                purchasePrice: +purchasePrice,
                sellPrice: +sellPrice,
                stock: +stock
            });
            res.send({ msg: "Item Added" });
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
}

module.exports = ItemController;