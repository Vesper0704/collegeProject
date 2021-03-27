const User = require('../models/userModel')
const Article = require('../models/articleModel')

const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/`, { useNewUrlParser: true });

async function clearAll() {
    await User.update({mail: 'sj@qq.com'}, {
        $set: {articles: []},
        $set: {notification: 0}
    })


   await Article.deleteMany({}, (err, info) => {
        if (!err) {
            console.log(info);
        } else {
            console.log(err);
        }
    })
}

clearAll().then(()=>{
    console.log('clear');
})
