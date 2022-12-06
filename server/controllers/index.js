// const hostIndex = (req, res) => {
//     res.render('index');
//   };

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

const appPage = (req, res) => {
  res.render('app');
};

module.exports = {
  appPage,
  notFound,
};

module.exports.Account = require('./Account.js');
module.exports.ShopItem = require('./ShopItem.js');
