const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./imageModel').schema;
const Article = require('./articleModel').schema;

const User = new Schema(
	{
		username: String,
		mail: {
			type: String,
			required: true,
			unique: true,     // 类比sql里的主键  这里只能是唯一的
		},
		date: Date,
		password: String,
		token: String,    //登陆token
		avatar: String,    //头像
		nickname: String,
		workCount: Number,
		registerCount: Number,
		monitorCount: Number,
		age: Number,
		residence: String,
		jobTitle: String,
		workplace: String,
		self_introduction: String,
		/*
		ref相当于是外键  引用 IMAGE 的相关信息
		 */
		allimages: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
		registerimages: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
		monitorimages: [{ type: Schema.Types.ObjectId, ref: 'Image' }],

		notification: Number,
		registerDate: Date,
		/*
		公钥私钥对 唯一确定了一个用户 都是必须且唯一
		 */
		publicKey: {
			required: true,
			unique: true,
			type: String,
		},
		privateKey: {
			required: true,
			unique: true,
			type: String,
		},
		/*
		外键引用
		 */
		articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
	},
	{ collection: 'Image_users' }
);

module.exports = mongoose.model('User', User);
