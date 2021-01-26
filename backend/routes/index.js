var express = require('express');
var router = express.Router();

/* GET home page. localhost:3000 */
router.get('/', function(req, res, next) {
	//  ./views/index.ejs
	res.render('index', { title: 'Express' });
});

router.get('/about-project',function(req,res,next){
	res.render('intro',{title:'copyright protection platform'})
})

module.exports = router;
