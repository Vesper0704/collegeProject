const User = require('../models/userModel')
const Image = require('../models/imageModel')
const Article = require('../models/articleModel')
const fs = require('fs')
const imghash = require('imghash')

module.exports = {
    async violationCheck(req, res) {
        console.log('--test.log--');
        console.log(req.files.length);
        console.log(req.body);
        let {mail} = req.body
        console.log(mail)

        let files = req.files
        if (files.length === 0 ) {
            return res.send('invalid length')
        }
        else {
            let flag = 0
            for (const each of files) {
                const phash = await imghash.hash(`${each.destination}/${each.filename}`);
                console.log(each + ' ' + phash);

                let result = await Image.findOne({phash: phash})
                await fs.unlinkSync(`${each.destination}/${each.filename}`)
                if (result) {
                    flag = 1
                    return res.send({
                        violation: true
                    })
                }
                //console.log(res);
            }
            if (flag === 0) {
                return res.send({
                    violation: false
                })
            }
        }
    }
}






