const Account = require('../models/account');

exports.create = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const account = new Account({
      ...req.body,
      userId: userId,
    });

    const validationError = account.validateSync();
    if (validationError) {
      throw new Error(validationError.message);
    }

    const savedAccount = await account.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur de création du compte : ' + error.message);
  }
};

exports.get = async (req, res) => {
  try {
    const accountId = req.params.id;
    const userId = req.auth.userId;

    const account = await Account.findOne({ _id: accountId, userId: userId });
    if (!account) {
      return res.status(404).json({ error: 'Compte non trouvé' });
    }

    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du compte : ' + error.message);
  }
};