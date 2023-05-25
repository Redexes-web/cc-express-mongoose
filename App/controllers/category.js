const Category = require('../models/category');

exports.create = async (req, res) => {
	try {
		const userId = req.auth.userId;

		const category = new Category({
			...req.body,
			userId: userId,
		});

		const savedCategory = await category.save();
		res.status(201).json(savedCategory);
	} catch (error) {
		console.error(error);
		res.status(500).send('Erreur de création de la Categorie : ' + error.message);
	}
};

exports.get = async (req, res) => {
	try {
		const categoryId = req.params.id;
		const userId = req.auth.userId;

		const category = await Category.findOne({ _id: categoryId, userId: userId });
		if (!category) {
			return res.status(404).json({ error: 'Categorie non trouvé' });
		}

		res.json(category);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send('Erreur lors de la récupération de la Categorie : ' + error.message);
	}
};

exports.update = async (req, res) => {
	try {
		const categoryId = req.params.id;
		const userId = req.auth.userId;

		const updatedCategory = await Category.findOneAndUpdate(
			{ _id: categoryId, userId: userId },
			req.body,
			{ new: true }
		);

		if (!updatedCategory) {
			return res.status(404).json({ error: 'Categorie non trouvé' });
		}

		res.json(updatedCategory);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send('Erreur lors de la mise à jour de la Categorie : ' + error.message);
	}
};

exports.delete = async (req, res) => {
	try {
		const categoryId = req.params.id;
		const userId = req.auth.userId;

		const deletedCategory = await Category.findOneAndDelete({
			_id: categoryId,
			userId: userId,
		});

		if (!deletedCategory) {
			return res.status(404).json({ error: 'Categorie non trouvé' });
		}

		res.json({ message: 'Categorie supprimé avec succès' });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send('Erreur lors de la suppression de la Categorie : ' + error.message);
	}
};
