const fs =require('fs')

let dir = fs.readdirSync('./img')

dir.forEach(each=>{
    let part = each.split('-')
    fs.renameSync('./img/'+each,part[2])
    console.log(part[2])
})
//console.log(dir)
