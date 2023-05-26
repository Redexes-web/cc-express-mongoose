const Account = require('../models/account.js');
const Transaction = require('../models/transaction.js');

exports.create = async (req, res) => {
	try {
		const userId = req.auth.userId;
        const accountId = req.body.accountId;
        console.log(req.body);
        const transactionId = req.params.id;
        //check if account exist
        const account = await Account.findOne({ _id: accountId, userId: userId });
        if (!account) {
            return res.status(404).json({ error: 'Compte non trouvé' });
        }

		const transaction = new Transaction({
			...req.body
		});

		const savedTransaction = await transaction.save();
		res.status(201).json(savedTransaction);
	} catch (error) {
		console.error(error);
		res.status(500).send('Erreur de création de la Transaction : ' + error.message);
	}
};

exports.update = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const accountId = req.params.accountId;
        const userId = req.auth.userId;
        const account = await Account.findOne({ _id: accountId, userId: userId });
        if (!account) {
            return res.status(404).json({ error: 'Compte non trouvé' });
        }
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: transactionId},
            req.body,
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction non trouvé' });
        }

        res.json(updatedTransaction);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send('Erreur lors de la mise à jour de la Transaction : ' + error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const accountId = req.params.accountId;
        const userId = req.auth.userId;
        const account = await Account.findOne({ _id: accountId, userId: userId });
        if (!account) {
            return res.status(404).json({ error: 'Compte non trouvé' });
        }
        const transaction = await Transaction.findOneAndDelete(
            { _id: transactionId}
        );

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction non trouvé' });
        }

        res.json(transaction);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send('Erreur lors de la suppression de la Transaction : ' + error.message);
    }
};
