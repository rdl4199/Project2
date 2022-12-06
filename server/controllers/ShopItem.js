// const models = require('../models');
const { default: mongoose } = require('mongoose');
const ShopItemModel = require('../models/ShopItem');
const AccountModel = require('../models/Account');

// const { ShopItem } = models;

const shopPage = (req, res) => res.render('shop');

const getItems = (req, res) => ShopItemModel.find({}, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred!' });
  }

  return res.json({ items: docs });
});

const getUserSkins = async (req, res) => {
  let acctDetails;
  acctDetails = await AccountModel.findById(req.session.account._id).exec();
  console.log(acctDetails);
  // const skins = acctDetails.SkinOwned.map(skin => {
  //     console.log(skin)
  //     mongoose.Types.ObjectId(`${skin}`)
  //  })
  ShopItemModel.find({
    _id: {
      $in:
            acctDetails.SkinOwned,
    },
  }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred!' });
    }
    console.log(docs);
    return res.json({ items: docs });
  });
};

module.exports = {
  shopPage,
  getItems,
  getUserSkins,
};
