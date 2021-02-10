const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const leven = require('leven');

const Image = new Schema(
	{
		url: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		owner: String,
		ipfs_hash: String,
		otherInfo: Object,
		phash: String,
		whetherRegister: Boolean,
		whetherMonitor: Boolean,
		certificate: Object,
		violation: Boolean,  //用于侵权检测
		violationResult: [
			{
				url: String,
				similarity: Number,
			},
		],
	},
	{ collection: 'image' }
);

/*
感知哈希(hash)算法描述了一个有可比较的哈希函数的类。
图像特征被用于生成独特的（但不是唯一的）指纹，而这些指纹是可比较的。

感知哈希与像MD5和SHA1这样的加密哈希（散列）函数是不同的概念。
加密哈希的hash值是随机的，数据用于生成像随机数种子的散列行为，所以相同的数据会产生相同的结果，不同的数据会产生不同的结果。
比较两个SHA1的hash值，实际上只告诉我们两个东西，如果hash值是不同的，则数据也是不同的；如果hash值是相同的，则数据是相似的。
(因为可能存在hash冲突，相同的hash值会产生不同的数据)。
相比之下，感知哈希是可比较的——给你一种两个数据集之间相似的感觉。
 */
//计算感知哈希值
const phashval = (schema) => {
	schema.query.checkHammingDist = (images, hash) => {
		const result = [];
		console.log(images);
		images.forEach((image) => {
			if (leven(image['phash'], hash) <= 14) {
				result.push(image);
			}
		});
		return result;
	};
};
//对schema进行扩展
Image.plugin(phashval);

module.exports = mongoose.model('Image', Image);
