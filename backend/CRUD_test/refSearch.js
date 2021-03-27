const Article = require('../models/articleModel')
const User =require('../models/userModel')
const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/`, { useNewUrlParser: true });

User
    .find({mail:'sj@qq.com'})
        .populate('articles')
            .exec((err,data)=>{
                if(!err){
                    console.log(data);
                    data.forEach(each=>{
                        console.log(each)
                    })
                    //let articles = data.articles
                    // articles.forEach(each=>{
                    //     console.log(each);
                    // })
                   // console.log(articles);
                }else{
                    console.log(err);
                }
            })
