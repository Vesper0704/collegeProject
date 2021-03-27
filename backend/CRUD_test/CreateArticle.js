const Article = require('../models/articleModel')
const User =require('../models/userModel')
const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/`, { useNewUrlParser: true });

async function create(){

    let article = new Article({
        title: 'Infringement detected :(',
        brief: `Copyright violation has occurred @img `,
        date: new Date(),
        cover: 'img url',
        to: 'drj',
        author: 'Copyright System',
    })

    let saveRes = await article.save()

    console.log(saveRes);

    let resId = saveRes._id
    console.log(resId);

    let updateRes = await User.updateOne({mail:'sj@qq.com'},{
        $push:{articles: resId},
        $inc:{
            notification:1
        }
    })
    console.log('updateRes '+updateRes)

    console.log('查询用户更新:');

    await User.find({mail:'sj@qq.com'},(err,docs)=>{
        if(!err){
            console.log(docs);
        }else{
            console.log(err);
        }
        }
    )


}

create().then(()=>{
    console.log('callback');
})

// mongoose.disconnect(()=>{
//     console.log('mongoose 关闭连接');
// })
