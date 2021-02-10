/*
controller methods of all functions in the project
 */



const User = require('../models/userModel');
const Image = require('../models/imageModel');
const Article = require('../models/articleModel');

/*
记录日志
 */
const Logger = require('../utils/logger');
const logger = new Logger();

/*
crypto 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装
 */
const crypto = require('crypto');
/*
获取一些配置参数
 */
const config = require('../config/config').config;

/*
获取ipfs-api    使用的话预装python /usr/bin/python
 */
const ipfsAPI = require('ipfs-api');
/*
配置参数 端口协议等
 */
const ipfs = ipfsAPI({ host: 'localhost', port: '5001', protocol: 'http' });


/*
http://nodejs.cn/api/fs.html
 */
const fs = require('fs');

/*
从' bigchaindb-driver '导入驱动程序
 */
const driver = require('bigchaindb-driver');

//api_path: 'http://127.0.0.1:9984/api/v1/',
const conn = new driver.Connection(config.api_path);


const imghash = require('imghash');
/*imghash的一些用法
imghash
  .hash('path/to/file')
  .then((hash) => {
    console.log(hash); // 'f884c4d8d1193c07' 默认hex
  });

// Custom hex length and result in binary
imghash
  .hash('path/to/file', 4, 'binary')
  .then((hash) => {
    console.log(hash); // '1000100010000010'
  });
 */

/*
Measure the difference between two strings
One of the fastest JS implementations of the Levenshtein distance algorithm
编辑距离（Edit Distance），又称Levenshtein距离，是指两个字串之间，由一个转成另一个所需的最少编辑操作次数。
许可的编辑操作包括:
将一个字符替换成另一个字符，插入一个字符，删除一个字符。
一般来说，编辑距离越小，两个串的相似度越大。
 */
const leven = require('leven');

/*
Bluebird is a fully featured promise library with focus on innovative features and performance
 */
const Promise = require('bluebird');

/*
used to delete some files gracefully
 */
const unlinkFile = Promise.promisify(fs.unlinkSync);

const assert = require('assert');

/**
 * handle login
 * @param {Obj} req username and password of user, now plain text
 * @param {Obj} res code http status, data for login and message
 * @param {middleware} next not used
 */


//async 函数返回一个promise　对象
// promise要么会通过一个由async函数返回的值被解决，要么会通过一个从async函数中抛出的（或其中没有被捕获到的）异常被拒绝。
/*
一个不含await表达式的async函数是会同步运行的。
然而，如果函数体内有一个await表达式，async函数就一定会异步执行。
 */
async function login(req, res, next) {
	const { username, password } = req.body;  //获取请求体


	//console.log(req.body);
	if (username === '' || password === '') {
		res.send({
			code: 20000,
			data: {
				login: false,
				message: 'must enter username or password',
			},
		});
	}
	try {
		const user = await User.findOne({ username: username });

		//test to get all of the user info
		User.find({ },function (err,docs) {
			if(err){
				console.log('find err:',err);
				return;
			}
			console.log('result:',docs);
		});

		Image.find({ },function (err,docs) {
			if(err){
				console.log('find err:',err);
				return;
			}
			console.log('image result:',docs);
		});

		// Article.find({ },function (err,docs) {
		// 	if(err){
		// 		console.log('find err:',err);
		// 		return;
		// 	}
		// 	console.log('article result:',docs);
		// });

//该用户存在
		if (user)
		{
			//密码正确
			if (user['password'] === password) {
				/*
				基于 Token 的方案中，服务端根据用户身份信息生成 Token，发放给客户端。
				客户端收好 Token，并在之后的数据请求中带上 Token，
				服务端接到请求后校验并解析 Token 得出用户身份
				 */

				//根据用户名密码和登陆时间产生token   MD-5算法
				const mdhash = crypto.createHash('md5').update(username + password + new Date().toISOString());
				const token = mdhash.digest('hex');
				//更新用户信息的token
				User.updateOne({ username: username }, { $set: { token: token } })
					.then((doc, err) => {
					if (doc) {
						logger.infoLog(`user ${username} token updated successfully`);
					}
					if (err) {
						console.error(err);
						logger.warnLog('fail to update user');
					}
				});


				res.send({
					code: 20000,
					data: {
						login: true,
						message: 'login successfully!',
						token: token,
					},
				});
			}

			else
			{
				res.send({
					code: 20000,
					data: {
						login: false,
						message: 'wrong password :(',
					},
				});
			}
		}

		else {
			res.send({
				code: 20000,
				data: {
					login: false,
					message: 'User not found :(',
				},
			});
		}
	}

	catch (err) {
		logger.warnLog(err);
		res.send({
			code: 20000,
			data: {
				login: false,
				message: 'Internal Server Error!',
			},
		});
	}
}

/**
 * retrieve user information by token
 * @param {string} req :token representing the user
 * @param {json} res :user information
 * @param {function} next :middleware
 */
async function getInfo(req, res, next) {
/*
req.query 此方法多适用于GET请求，解析GET里的参数
 */
	const { token } = req.query;

	try {
		/*
		填充 类似于连接查询
		 */
		const info = await User.findOne({ token: token })
			.populate('monitorimages')
			.populate('allimages')
			.populate('articles');
/*
找到该用户信息
 */
		if (info) {
			res.send({
				code: 20000,
				data: info,
			});
		}
		else {
			res.send({
				code: 20000,
				data: {
					status: false,
					message: "can't find user information",
				},
			});
		}
	}

	catch (err) {
		res.send({
			code: 20000,
			data: {
				status: false,
				message: "can't retrieve data",
			},
		});
		logger.warnLog('error retrieve user information' + __filename);
	}
}

/**
 * register  sign up to the system
 * @param {Obj} req containing basic information
 * @param {String} res token after register
 * @param {Func} next middleware
 */
async function register(req, res, next) {

	const { username, mail, password } = req.body;
	const mdhash = crypto.createHash('md5').update(username + password + new Date().toISOString());
	const token = mdhash.digest('hex');
	//Ed25519 is a public-key signature system
	/*
	生成公私钥对
	 */
	const keys = new driver.Ed25519Keypair();

	/*
	生成实例 存入mongodb
	 */
	const user = new User({
		username: mail,
		mail: mail,
		password: password,
		token: token,
		avatar: `${config.serverUrl}/avatar/avatar.svg`, //默认头像
		nickname: username,
		workCount: 0,
		registerCount: 0,
		monitorCount: 0,
		age: 20,
		residence: 'residence',
		jobTitle: 'occupation',
		workplace: 'workplace',
		self_introduction: 'Say something here to get to know others quickly!',
		//新用户初始化
		allimages: [],
		registerimages: [],
		monitorimages: [],
		notification: 0,
		//公钥私钥
		publicKey: keys.publicKey,
		privateKey: keys.privateKey,
	});
	user.save((err) => {
		if (err) {
			res.send({
				code: 20000,
				data: {
					status: false,
					message: 'ERROR when registering',
				},
			});
			logger.warnLog('ERROR when registering'+err);
		}
		else {
			res.send({
				code: 20000,
				data: {
					status: true,
					message: 'User has successfully registered',
					token: token,
				},
			});
		}
	});
}

/**
 * judge whether an email existed
 * @param {email} req email of prepared
 * @param {exist} res whether exist
 * @param {func} next middleware
 */
async function whetherRegister(req, res, next) {
	const { email } = req.body;
	console.log(req.body);
	try {
		//查找到一个就返回
		const user = await User.findOne({ mail: email });
		//找到就是已经注册过了
		if (user) {
			res.send({
				code: 20000,
				data: {
					exist: true,
				},
			});
		}
		else {
			res.send({
				code: 20000,
				data: {
					exist: false,
				},
			});
		}
	}
	catch (err) {
		logger.warnLog('Error in check duplication of emails' + err);
		res.send({
			code: 20000,
			data: {
				exist: false,
			},
		});
	}
}

/**
 *Allow users to set their information
 * @param {JSON} req information that the user what to save
 * @param {JSON} res whether the user successed
 * @param {func} next middleware
 */
async function setInfo(req, res, next) {
	const { mail, nickname, age, residence, jobTitle, self_introduction } = req.body;
	try {
		const result = await User.update(
			{ mail: mail }, //primary key to find the user
			{
				$set: {
					nickname: nickname,
					age: age,
					residence: residence,
					jobTitle: jobTitle,
					self_introduction: self_introduction,
				},
			}
		);
		//更新成功
		if (result) {
			res.send({
				code: 20000,
				data: {
					update: true,
				},
			});
		}
	}

	catch (err) {
		logger.warnLog('error while updating user' + err);
		res.send({
			code: 20000,
			data: {
				update: false,
			},
		});
	}
}

/**
 * allow users to update their avatar
 * @param {mail, file} req mail and the avatar of user
 * @param {Boolean} res whether upload avatar succeeded or not
 * @param {func} next middleware
 */
async function handleUpload(req, res, next) {
	const { mail } = req.body;
	const imgUrl = `${config.serverUrl}/images/${req.file.filename}`;
	try {
		if (req.file) {
			const result = await User.updateOne({ mail: mail }, { $set: { avatar: imgUrl } });
			if (result)
			{
				res.send({
					code: 20000,
					data: {
						upload: true,
					},
				});
			}
			else {
				res.send({
					code: 20000,
					data: {
						upload: false,
					},
				});
			}
		}
	}
	catch (err) {
		logger.warnLog('error in updating avatar' + err);
		res.send({
			code: 20000,
			data: {
				upload: false,
			},
		});
	}
}

/**
 * 上传图片
 * @param req
 * @param res
 * @param next
 *
 */
async function multiUpload(req, res, next) {
	const { mail } = req.body;

	try {
		//arr保存了上传的图片的信息
		const { arr, infoArr } = await multiUploadInner(req.files, mail);
		// const user = await User.findOne({'mail': mail})


		//返回解决结果true/false
		const saveResult = await saveImageArr(arr, mail);
		// const result = await user.save()


		if (saveResult) {
			res.send({
				code: 20000,
				data: {
					upload: true,
					imageInfos: arr,
				},
			});
		}

		//保存失败
		else {
			res.send({
				code: 20000,
				data: {
					upload: false,
				},
			});
		}
	}
	catch (err) {
		console.log('error in multiUpload:'+err)
		logger.warnLog('error in multiUpload' + err);

		switch (err.type) {
			//type=100 说明是相似度过高
			case 100:
				const percent = err.similarity * 100;
				res.send({
					code: 20000,
					data: {
						upload: false,
						similarity: err.similarity,
						//上传失败
						message: 'The system monitors that the similarity of your uploaded picture has reached ' + percent + '%.',
					},
				});
				break;

			case 101:
				res.send({
					code: 20000,
					data: {
						upload: false,
						message: err.message,
					},
				});
				break;
		}
	}
}

/**
 *  save all images
 * @param {array} arr all image files
 * @param {String} mail is user id
 */
function saveImageArr(imgArr, mail) {
	return new Promise((resolve, reject) => {
		let flag = 0;
		imgArr.forEach(async (img) => {
			try {
				/*
				$push: 把value追加到field里面去，field一定要是数组类型才行，如果field不存在，会新增一个数组类型加进去
				$inc可以对文档的某个值为数字型（只能为满足要求的数字）的键进行增减的操作。
				 */
				await User.updateOne({ mail: mail },
					{
						$push: { allimages: img._id },
						$inc: { workCount: 1 }
					});
			}

			catch (err) {
				logger.warnLog('Error while saving images' + err);
				resolve(false);
			}
			flag++;
			//全部存入
			if (flag === imgArr.length) {
				resolve(true);
			}
		});
	});
}
/**
 * inner function to update
 * @param {array}  upload image files
 * @param {string} email of user
 */
function multiUploadInner(files, mail) {
	/*
	解决 或是因为某种原因拒绝
	 */
	return new Promise((resolve, reject) => {
		const arr = [];
		const infoArr = [];
		let flag = 0;
		const length = files.length;
		files.forEach(async (file) => {
			let imgUrl = `${config.serverUrl}/images/${file.filename}`;
			try {
				//找到用户
			let user = await User.findOne({ mail: mail });

			//读取文件
			/*
			If the file's content changes, the hash will change,
			but if the file's content remains the same, the hash will always be the same.
			Bear in mind that if you're not running the daemon,
			it will just add locally. If you start the daemon later,
			 the blocks will be advertised after a few seconds when the re-provider runs.
			 */
			let hashArr = await ipfs.add(fs.readFileSync(`${file.destination}/${file.filename}`));

			let hash = hashArr[0].hash;

			let publicKey = user.publicKey;
			let privateKey = user.privateKey;

			let assetData = {
				img: {
					url: imgUrl,
					ipfs_hash: hash,
				},
			};

			let metaData = {
				transfer: 'earth',
			};

			/*
			创建transaction　
			 */
			let txCreateSimple = driver.Transaction.makeCreateTransaction(
				assetData,
				metaData,

				// A transaction needs an output
				[driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(publicKey))],

				publicKey
			);
			/*
			用这个用户的私钥签名， 可以用公钥来验证签名
			 */
			let txCreateSimpleSigned = driver.Transaction.signTransaction(txCreateSimple, privateKey);

			//Send the transaction off to BigchainDB
			let Info = await conn.postTransactionCommit(txCreateSimpleSigned);

			// calculate phash of the picture
			const phash = await imghash.hash(`${file.destination}/${file.filename}`);

			// check duplication  similarity
			const images = await Image.find({});  //找出所有的图片

			for (let item in images) {
				//计算phash之间的编辑距离
				const simi = leven(images[item]['phash'], phash);

				//距离越小 相似度越高
				if (simi <= 10) {
					/*
					删除这个图片
					 */
					unlinkFile(`${file.destination}/${file.filename}`);
					let similarity = 1 - simi / 29;
					/*
					拒绝 函数返回 后续不再执行 直接跳到catch
					 */
					reject({
						//返回错误类型 方便判断
						type: 100,
						similarity: similarity,
						message: 'Similarity warning!',
					});
					break;
				}
			}
			/*
			允许上传
			 */
				let img = new Image({
					url: imgUrl,
					title: file.originalname,
					owner: mail,
					ipfs_hash: hash,
					otherInfo: Info,
					phash: phash,
				});

				infoArr.push(Info);

				let result = await img.save();

				//结果存入数组
				arr.push(img);
				flag += 1;
				if (flag === length) {
					/*
					解决 返回
					 */
					resolve({ arr: arr, infoArr: infoArr });
				}
			}
			catch (err) {
				logger.warnLog('error in multiUpload' + err);
				console.log(err);
				reject({
					//错误类型101
					type: 101,
					message: err,
				});
			}
		});
	});
}

/**
 *  article uploading
 * @param {Obj} req message details
 * @param {Obj} res whether successfully upload
 * @param {func} next middleware
 */
async function uploadArticle(req, res, next) {
	const { title, brief, content, to, cover, date, author } = req.body;
	const article = new Article({
		title: title,
		brief: brief,
		content: content,
		to: to,
		cover: cover,
		date: date,
		author: author,
	});
	try {
		const user = await User.findOne({ mail: to });
		user.articles.push(article);
		const result = await article.save();
		const userResult = await user.save();
		if (result && userResult) {
			res.send({
				code: 20000,
				data: {
					upload: true,
				},
			});
		} else {
			res.send({
				code: 20000,
				data: {
					upload: false,
				},
			});
		}
	} catch (err) {
		logger.warnLog('error while uploading articles to server: ' + err);
		res.send({
			code: 20000,
			data: {
				upload: false,
			},
		});
	}
}

/**
 * 查询图片信息
 * @param req
 * @param res
 * @param next
 * @returns {bluebird<void>}
 */
async function getImage(req, res, next) {
	const { token, mail, id } = req.body;
	try {
		const user = await User.findOne({ mail: mail });

		if (token === user.token) {

			const image = await Image.findById(id);
			if (image) {
				res.send({
					code: 20000,
					data: {
						imageObj: image,   //返回图片完整信息
						whetherImage: true, //是否找到该图片
					},
				});
			}

			else {
				res.send({
					code: 20000,
					data: {
						whetherImage: false,
						//找不到该图片
						message: `Couldn't find the image`,
					},
				});
			}
		}

		//token不匹配
		else {
			res.send({
				code: 20000,
				data: {
					whetherImage: false,
					//请您重新登录，您的登录已经过期！
					message: 'Please log in again!',
				},
			});
		}
	}

	catch (err) {
		logger.warnLog('Error occurred when searching images ' + err);
		res.send({
			code: 20000,
			data: {
				whetherImage: false,
				//'在找图片时发生错误'
				message: 'Error occurred when searching...',
			},
		});
	}
}


/**
 * 实现转让功能
 * @param req from the web
 * @param res  {response}
 * @param next - no need
 * @returns
 */
async function transferAsset(req, res, next) {
	console.log('transfer info  '+req.body)
	const { publicKey, privateKey, transferTo, imageID } = req.body;
	try {

		const image = await Image.findById(imageID);

        //get info from bigchaindb
		// otherInfo = await conn.postTransactionCommit(txCreateSimpleSigned);
		const asset = await conn.getTransaction(image.otherInfo.id);


		const transferToElse = driver.Transaction.makeTransferTransaction(
			[{ tx: asset, output_index: 0 }],
			[driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(transferTo))]
		);

		/*
		进行转让的人的私钥签名
		 */
		let txCreateSimpleSigned = driver.Transaction.signTransaction(transferToElse, privateKey);


		/*
		发布到bigchain
		 */
		const transResult = await conn.postTransactionCommit(txCreateSimpleSigned);

		// update the image object
		const updateImg = await Image.updateOne({ _id: imageID }, { $set: { otherInfo: transResult } });

		// update the users
		//The $pull operator removes from an existing array all instances of a value or values
		// that match a specified condition
		const updateSeller = await User.updateOne({ publicKey: publicKey }, { $pull: { allimages: image._id } });

		// update the receiver
		//放入接受者的数据表中
		const updateReceiver = await User.updateOne({ publicKey: transferTo }, { $push: { allimages: imageID } });


		/*
		transfer success!
		 */
		if (updateSeller && updateReceiver) {
			res.send({
				code: 20000,
				data: {
					transfer: true,
				},
			});
		}

		//failure
		else {
			res.send({
				code: 20000,
				data: {
					transfer: false,
				},
			});
		}
	}

	catch (err) {
		logger.warnLog('error while transferring images to user: ' + err);
		res.send({
			code: 20000,
			data: {
				transfer: false,
			},
		});
	}
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function monitImage(req, res, next) {
	const { mail, token, imageID } = req.body;
	try {

		const user = await User.findOne({ mail: mail, token: token });
		const image = await Image.findById(imageID);

		if (user && image) {
			// if both are valid

			const pushResult = await User.updateOne(
				{ mail: mail },
				{ $push: { monitorimages: image._id },
					$inc: { monitorCount: 1 }  //monitor number  +1
				}
			);
			const monitResult = await Image.updateOne({ _id: imageID }, { $set: { whetherMonitor: true } });

			if (pushResult && monitResult) {
				res.send({
					code: 20000,
					data: {
						update: true,
					},
				});
			}

			else {
				logger.warnLog(new Error('error while saving to database'));
				res.send({
					code: 20000,
					data: {
						update: false,
					},
				});
			}
		}
		else {
			logger.warnLog(new Error('error while enabling monitor images'));
			res.send({
				code: 20000,
				data: {
					update: false,
				},
			});
		}
	}

	catch (err) {
		logger.warnLog('error while enabling monitor images' + err);
		res.send({
			code: 20000,
			data: {
				update: false,
			},
		});
	}
}

/**
 * 取消监测
 * @param req
 * @param res
 * @param next
 * @returns {bluebird<void>}
 */
async function cancelMonit(req, res, next) {
	const { mail, token, imageID } = req.body;

	const promises = Promise.all([
		User.findOne({ mail: mail, token: token }),
		Image.findById(imageID),
		User.updateOne({ mail: mail }, { $pull: { monitorimages: imageID }, $inc: { monitorCount: -1 } }),
		Image.updateOne({ _id: imageID }, { $set: { whetherMonitor: false } }),
	]);

	let flag = true;
	promises
		.then((result) => {
			for (let i in result) {
				if (result[i])
					continue;
				else
					flag = false;
			}
			if (flag) {
				res.send({
					code: 20000,
					data: {
						cancel: true,
					},
				});
			}
			else {
				logger.warnLog('document not found while cancelling image: ' + err);
				res.send({
					code: 20000,
					data: {
						cancel: false,
					},
				});
			}
		})
		.catch((err) => {
			logger.warnLog('error while cancelling image: ' + err);
			res.send({
				code: 20000,
				data: {
					cancel: false,
				},
			});
		});
}

async function getAllImages(req, res, next) {
	try {
		const result = await Image.find({}).select('url');
		const resultArr = [];
		for (let i in result) {
			resultArr.push({
				url: result[i].url,
				id: result[i]._id,
			});
			if (i == result.length - 1) {
				res.send({
					code: 20000,
					data: {
						whetherGet: true,
						images: resultArr,
					},
				});
			}
		}
	} catch (err) {
		logger.warnLog('error while getting all images from database: ' + err);
		res.send({
			code: 20000,
			data: {
				whetherGet: false,
			},
		});
	}
}

async function checkImage(req, res, next) {
	const { imageID } = req.body;
	try {
		const user = await User.findOne({ allimages: imageID });
		if (user) {
			res.send({
				code: 20000,
				data: {
					username: user.username,
					nickname: user.nickname,
					publicKey: user.publicKey,
					user: true,
				},
			});
		} else {
			res.send({
				code: 20000,
				data: {
					user: false,
					message: '没有找到该图片用户',
				},
			});
		}
	} catch (err) {
		logger.warnLog('error in checkImage: ' + err);
		res.send({
			code: 20000,
			data: {
				user: false,
				message: '查找时发生错误',
			},
		});
	}
}

/**
 * intelligent backend filter sends image features through this api to judge whether there is a violation
 * @param {Array} req array of phash
 * @param {Boolean} res whether received successfully
 * @param {func} next Middleware
 */
async function monitAcceptor(req, res, next) {
	const { url, phash } = req.body;
	console.log(req.body);
	console.log(typeof phash);
	let violate = null;
	try {
		const images = await Image.find({ whetherMonitor: true });
		for (let i in images) {
			for (let j in phash) {
				let simi = leven(images[i].phash, phash[j]);
				if (simi <= 10) {
					let similarity = 1 - simi / 29;
					violate = await Image.updateOne(
						{ _id: images[i]._id },
						{ $set: { violation: true }, $push: { violationResult: { url: url, similarity: similarity } } }
					);
					let violateArticle = `<div class="text-center col-md-12">
                                <p>经过系统检测有一个图片和您的版权图片高度重合，被侵权图片为：</p>
                                  <div class="col-md-12 text-center">
                                    
                                    <img src="${images[i].url}" alt="" style="max-width: 80%;">
                                  </div>
                                  <p>侵权网址为：<a href="${url}">${url}</a></p>
                                  <p>请您及时维权</p>
                              </div>`;
					let article = new Article({
						title: '侵权提醒',
						brief: '系统检测到了和您的相似图片',
						content: violateArticle,
						date: Date.now(),
						cover: images[i].url,
						to: images[i].owner,
						author: 'system',
					});
					let articlesave = await article.save();
					let updateres = await User.updateOne(
						{ mail: images[i].owner },
						{ $push: { articles: articlesave._id }, $inc: { notification: 1 } }
					);
					console.log(updateres);
				}
			}
			if (i == images.length - 1) {
				if (violate) {
					res.send({
						code: 20000,
						data: {
							message: '发生了侵权行为',
						},
					});
				} else {
					res.send({
						code: 20000,
						data: {
							message: '无侵权行为',
						},
					});
				}
			}
		}
	} catch (err) {
		logger.warnLog('error in monitorAcceptor: ' + err);
		res.send({
			code: 20000,
			data: {
				message: '服务器查找发生错误',
			},
		});
	}
}
module.exports = {
	login: login,
	getInfo: getInfo,
	register: register,
	whetherRegister: whetherRegister,
	setInfo: setInfo,
	handleUpload: handleUpload,
	multiUpload: multiUpload,
	uploadArticle: uploadArticle,
	getImage: getImage,
	monitImage: monitImage,
	cancelMonit: cancelMonit,
	transferAsset: transferAsset,
	getAllImages: getAllImages,
	checkImage: checkImage,
	monitAcceptor: monitAcceptor,
};
