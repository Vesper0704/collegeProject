var express = require('express');
var router = express.Router();

let Image = require('../models/imageModel')

/* GET home page. localhost:3000 */
router.get('/', function(req, res, next) {
	//  ./views/index.ejs
	res.render('index', { title: 'Express' });
});

router.get('/about-project',function(req,res,next){
	res.render('intro',{title:'copyright protection platform'})
})

router.post('/search',async function(req,res){
	console.log(req.body.hash)

	let info = await Image.findOne({ipfs_hash:req.body.hash})
	console.log(info);

	if(info){
		console.log('ok');
		res.send({
			state:true,
			data:info
		})
	}else{
		res.send({
			state:false
		})
	}
})

module.exports = router;
