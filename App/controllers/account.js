const Account = require('../models/account');
const Transaction = require('../models/transaction');
exports.create = async (req, res) => {
	try {
		const userId = req.auth.userId;

		const account = new Account({
			...req.body,
			userId: userId,
		});

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
    //findOne and populate linked transactions
		const account = await Account.findOne({ _id: accountId, userId: userId }).populate('transactions');
		if (!account) {
			return res.status(404).json({ error: 'Compte non trouvé' });
		}

		res.json(account);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send('Erreur lors de la récupération du compte : ' + error.message);
	}
};

exports.update = async (req, res) => {
	try {
		const accountId = req.params.id;
		const userId = req.auth.userId;

		const updatedAccount = await Account.findOneAndUpdate(
			{ _id: accountId, userId: userId },
			req.body
		);

		if (!updatedAccount) {
			return res.status(404).json({ error: 'Compte non trouvé' });
		}

		res.json(updatedAccount);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send('Erreur lors de la mise à jour du compte : ' + error.message);
	}
};

// Delete an account
exports.delete = async (req, res) => {
	try {
		const accountId = req.params.id;
		const userId = req.auth.userId;
    //delete account and linked transactions
    const deletedTransactions = await Transaction.deleteMany({
      accountId: accountId,
      userId: userId,
    });

		const deletedAccount = await Account.findOneAndDelete({
			_id: accountId,
			userId: userId,
		});

		if (!deletedAccount) {
			return res.status(404).json({ error: 'Compte non trouvé' });
		}

		res.json({ message: 'Compte supprimé avec succès' });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send('Erreur lors de la suppression du compte : ' + error.message);
	}
};
