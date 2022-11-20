const models = require('../models');
const ShopItemModel = require('../models/ShopItem')
const AccountModel = require('../models/Accounts')

const { ShopItem } = models

const buyItem = async (req, res) => {
    const currency = `${req.body.currency}`;
    const Name = `${req.body.Name}`

    try {
        AccountModel.findByIdAndUpdate(req.session.account._id,
            { "$push": { "childrens": employee._id } },
            { "new": true, "upsert": true },
        ) 
    } catch (err) {
        return res.status(400).json({ error: 'An Error Occured'})
    }
}