const User = require('../models/userModel')
const Image = require('../models/imageModel')
const Article = require('../models/articleModel')

const imghash = require('imghash')

module.exports = {
    async violationCheck(req,res) {
        console.log('--test.log--');
        console.log(req.files.length);
        if (req.files.length > 1) {
            return res.send('invalid Length!')
        } else {
            console.log(req.body);
            let {mail} = req.body
            console.log(mail)
           // res.send('get it' + ' hahaha')
            let files = req.files
            let flag = 0
            for (const each of files) {
                const phash = await imghash.hash(`${each.destination}/${each.filename}`);
                console.log(each + ' ' + phash);

                let result = await Image.findOne({phash: phash})
                if (result) {
                    flag = 1
                    return res.send({
                        violation: true
                    })
                }
                //console.log(res);
            }


        }
    }
}
