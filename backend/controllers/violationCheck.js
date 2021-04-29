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
        console.log(req.files);
        // files.forEach(each=>{
        //     let format = each.originalname.split('.').slice(-1)[0]
        //     if(format!='png' && format!='jpg')
        //         return res.send('wrong format')
        // })

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

                if (result && result.owner!=mail) {
                    flag = 1
                   // let {mail,} = result
                    console.log(result);
                    let user = await User.findOne({mail:result.owner})

                    let article = new Article({
                        title: 'Infringement detected :(',
                        brief: `Copyright violation has occurred @${result.title} by ${mail} `,
                        date: new Date(),
                        cover: result.url,
                        to: user.username,
                        author: 'Copyright System',
                    });

                    let saveRes = await article.save()

                    console.log('saveRes:' + saveRes);

                    let resId = saveRes._id
                    console.log(resId);

                    let updateRes = await User.updateOne({mail:user.username},{
                        $push:{articles: resId},
                        $inc:{
                            notification:1
                        }
                    })
                    console.log('updateRes '+updateRes)

                    console.log('查询用户更新:');

                    await User.find({mail:user.username},(err,docs)=>{
                            if(!err){
                                console.log(docs);
                            }else{
                                console.log(err);
                            }
                        }
                    )
                    //console.log(user);
                    return res.send({
                        violation: true,
                        info:user.username
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






