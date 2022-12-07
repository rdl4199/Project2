const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // app.get('/', controllers.index);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/app', mid.requiresLogin, controllers.appPage);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/getItems', mid.requiresLogin, controllers.ShopItem.getItems);
  app.get('/profile', mid.requiresLogin, controllers.Account.profilePage);
  app.post('/changeSkin', mid.requiresLogin, controllers.Account.changeSkin);
  app.post('/postScore', mid.requiresLogin, controllers.Account.postScore);

  app.post('/changePassword', mid.requiresSecure, controllers.Account.changePassword);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/highScore', mid.requiresLogin, controllers.Account.highScorePage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/shop', mid.requiresLogin, controllers.ShopItem.shopPage);
  app.get('/getOwnedSkins', mid.requiresLogin, controllers.ShopItem.getUserSkins);
  app.get('/getHighScores', mid.requiresLogin, controllers.Account.getHighScores);
  app.get('/getAccountDetails', mid.requiresLogin, controllers.Account.AccountDetails);
  app.post('/purchase', mid.requiresLogin, controllers.Account.buyItem);

  app.get('/*', controllers.notFound);
};

module.exports = router;
