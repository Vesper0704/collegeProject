
/*
创建article model
 */
const mongoose = require('mongoose');
//schema就是创建表的模型
const Schema = mongoose.Schema;
//创建article
const Article = new Schema(
	{
		//标题
		title: {
			required: true,  //necessary
			type: String,
		},
		brief: String,  //摘要
		content: String,  //内容
		date: Date,
		cover: String,
		to: String,
		author: String,  //作者
	},
	{ collection: 'article' }
);
//使用模式“编译”模型
module.exports = mongoose.model('Article', Article);
