const models = require('../models');
const AccountModel = require('../models/Account');

const { Account } = models;
const loginPage = (req, res) => {
  res.render('index');
};

const profilePage = (req, res) => {
  res.render('profile');
};

const highScorePage = (req, res) => {
  res.render('highScore');
};

const getToken = (req, res) => res.json({ csrfToken: 'Gay' });

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const changePassword = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  console.log('YOUR MOM!!');
  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, async (err, account) => {
    if (err || !account) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    const hash = await Account.generateHash(pass2);
    const acct = await Account.toAPI(account);
    console.log(acct);
    await AccountModel.findByIdAndUpdate(
      `${acct._id}`,
      { password: hash },
    ).exec();
    return res.json({ redirect: '/shop' });
  });
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(400).json({ error: 'All fields are required!' });
    }
    req.session.account = Account.toAPI(account);
    return res.json({ redirect: '/shop' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({
      username, password: hash, Admin: false, Currency: 0, HighScore: 0, gamesPlayed: 0, currentSkin: 'default',
    });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    console.log('THIS HAPPENING!');
    return res.json({ redirect: '/shop' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

const getHighScores = async (req, res) => {
  let accts;
  try {
    accts = await AccountModel.find({}).sort({ HighScore: -1 }).limit(10).exec();
    return res.json({ profile: accts });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Couldnt gather Accounts for HighScore' });
  }
};

const AccountDetails = async (req, res) => {
  let acct;
  try {
    acct = await AccountModel.findById(req.session.account._id).exec();
    console.log(acct);
    return res.json({ profile: acct });
  } catch (err) {
    return res.status(400).json({ error: 'Couldnt find your Account' });
  }
};

const buyItem = async (req, res) => {
  const skinID = `${req.body._id}`;
  const currency = `${req.body.currency}`;
  try {
    await AccountModel.findByIdAndUpdate(
      `${req.session.account._id}`,
      { $push: { SkinOwned: skinID } },
    ).exec();
    await AccountModel.findByIdAndUpdate(
      `${req.session.account._id}`,
      { $inc: { Currency: -currency } },
    ).exec();
    return res.json({ redirect: '/shop' });
  } catch (err) {
    return res.status(400).json({ error: 'An Error Occured' });
  }
  // return res.status(200).json({});
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  buyItem,
  getToken,
  getHighScores,
  highScorePage,
  AccountDetails,
  profilePage,
  changePassword,
};
