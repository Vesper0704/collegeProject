var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller');
const violator = require('../controllers/violationCheck')
const multer = require('multer');
const path = require('path');
// const mkdirp =require('mkdirp')
// const sd = require('silly-datetime')

		//转换成年月日的格式  按照这样的格式生成目录存储
		// let day = sd.format(new Date(),'YYYYMMDD')
		// let dir = path.join('public/images',day)
		//
        // await mkdirp(dir)
		//
		// cb(null, dir);
		const storage = multer.diskStorage({
			//定义存储文件的地方和格式
			destination: function(req, file, cb) {
				cb(null, path.join(__dirname, '../public/images'));
			},
			filename: function(req, file, cb) {
				cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
			},
		});

const upload = multer({ storage: storage });

//根路径
router.get('/', function(req, res, next) {
	res.render('index',{title:'You have accessed User section'});
});


router.post('/login', controller.login);

router.post('/logout', function(req, res, next) {
	res.send({
		code: 20000,
		data: {},
	});
});
router.get('/getInfo', controller.getInfo);
router.post('/register', controller.register);
router.post('/whetherRegister', controller.whetherRegister);
router.post('/setInfo', controller.setInfo);
router.post('/handleUpload', upload.single('avatar'), controller.handleUpload);
router.post('/multiUpload', upload.array('files'), controller.multiUpload);
router.post('/uploadArticle', controller.uploadArticle);
router.post('/getImage', controller.getImage);
router.post('/monitImage', controller.monitImage);
router.post('/cancelMonit', controller.cancelMonit);
router.post('/transferAsset', controller.transferAsset);
router.get('/getAllImages', controller.getAllImages);
router.post('/checkImage', controller.checkImage);
router.post('/monitAcceptor', controller.monitAcceptor);
router.post('/getAccount',controller.getAccount)
router.post('/changePassword',controller.changePassword)
router.post('/violationCheck',upload.array('files'),violator.violationCheck)

module.exports = router;
