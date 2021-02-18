const mongoose = require('mongoose');

const ShareSchema = mongoose.Schema({
	symbol: {
		type: String,
		required: true,
	},
	open: {
		type: String,
		required: true,
	},
	high: {
		type: String,
		required: true,
	},
	low: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('series', ShareSchema);
