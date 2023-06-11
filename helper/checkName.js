const { db } = require('../middleware/firebase');

const checkName = async (req, res, next) => {
    try {
        const snapshot = await db.collection("items").get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const result = list.filter((item) => item.name === req.body.name);
        if (result.length > 0) {
            res.json({ data: false })
        } else {
            next();
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = checkName;