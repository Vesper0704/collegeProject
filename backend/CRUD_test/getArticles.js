const Article = require('../models/articleModel')
const config = require('../config/config').config
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.ipfs_api}:27017/`, { useNewUrlParser: true });

Article.find({ },(err,docs)=>{
    if(!err)
    return  console.log(docs)
    else{
      return console.log(err);
    }
})

// mongoose.disconnect(()=>{
//     console.log('mongoose 关闭连接');
// })
