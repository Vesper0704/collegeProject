const fs = require('fs')

fs.readdir('../images',(err,data)=>{
    if(!err){
        console.log(data);
         remove(data).then(()=>{
             console.log('removed');
         })

    }
})


async function remove(data){
    let map = new Map()
    for (const image of data) {
        if(image.startsWith('files')){
            let temp  = image.split('-')
            let name = temp[2]
            console.log(temp[2]);
            if(!map.get(name)){
                map.set(name,'exist')
            }else{
                 console.log(image+' duplicate')
                await fs.unlinkSync('/Users/apple/Desktop/毕设/backend/public/images/'+image)
               // console.log(map.get(name));
            }

        }
    }
}
