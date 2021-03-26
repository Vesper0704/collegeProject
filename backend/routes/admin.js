const express=require('express')
const router =express.Router()

const User = require('../models/userModel')
const Image = require('../models/imageModel')

router.get('/',(req,res)=>{
    res.render('admin',{title:'Administration'})
})
router.get('/userList',async(req,res)=>{
    let user = await  User.find({})
    let count = await User.find({}).count()
    res.send({
        userList:user,
        total:count
    })
})

router.get('/imageList',async (req,res)=>{
    let image = await Image.find({})
    let count= await Image.find({}).count()

    res.send({
        total:count,
        imageList:image,

    })
})

module.exports = router
