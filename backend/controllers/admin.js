const Share = require('../models/Share');

exports.getIndex = async (req, res) => {
	const share = await Share.find((data) => data);

	try {
		console.log(share);
		// Data rendered as an object and passed down into index.ejs
		res.status(200).render('index', { share: share });

		// Data returned as json so a fetch/axios requst can get it
		// res.json(share);
	} catch (error) {
		console.log(error);
	}
};

exports.getShare = async (req, res) => {
	const shareId = req.params.shareId;

	const share = await Share.findById(shareId, (share) => share);

	try {
		console.log(share);
		res.status(200).render('share', { share: share});
	} catch (error) {
		console.log(error);
	}
};

exports.getAddShare = (req, res) => {
	res.status(200).render('edit-share', { editing: false });
};

exports.getEditShare = async (req, res) => {
	const shareId = req.params.shareId;

	const editMode = req.query.edit;

	if (!editMode) {
		return res.redirect('/');
	}

	const share = await Share.findById(shareId);

	try {
		if (!shareId) {
			return res.redirect('/');
		}
		console.log(share);
		res.status(200).render('edit-share', { share: share, editing: editMode });
	} catch (error) {
		console.log(error);
	}
};

exports.postShare = (req, res) => {
	const { symbol,open,high,low } = req.body;

	const share = new Share({ symbol: symbol, open: open, high: high,low: low });
	share.save();
	console.log('Share Added to the database');

	// Updated the home route to the React App index page
	// res.status(201).redirect('http://localhost:3000/');

	// Home route for ejs index page
	res.status(201).redirect('/');
};

exports.postEditShare = (req, res) => {
	const shareId = req.body.shareId;
	const { symbol,open,high,low } = req.body;

	Share.findById(shareId)
		.then((share) => {
			share.symbol = symbol;
			share.open = open;
			share.high = high;
			share.low = low;

			return share.save();
		})
		.then(() => {
			console.log('Item Updated');
			res.status(201).redirect(`/${shareId}`);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDelete = async (req, res) => {
	const shareId = req.body.shareeId;

	const share = await Share.findByIdAndRemove(shareId, (data) => data);

	try {
		console.log(share);
		console.log('Item Deleted');
		res.redirect('/');
	} catch (error) {
		console.log(error);
	}
};
