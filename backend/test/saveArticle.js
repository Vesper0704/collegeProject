const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });

const Article = require('../models/articleModel');
const User = require('../models/userModel');
User.updateOne({ mail: 'crsong@bupt.edu.cn' }, { $push: { articles: '5dbfe320a181214417a82dd9' } })
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
