var mongoose=require('mongoose');


var supplySchema=new mongoose.Schema({
    username:String,
    name:String,
    Sid:String
})

var Supply=mongoose.model('Supply',supplySchema);

// Supply.create({
//     username:'12345678',
//     name:'无名小店',
//     Sid:4
// })


// Supply.create({
//     username:'00002',
//     name:'华为京东自营官方旗舰店',
//     Sid:0
// })

// Supply.create({
//     username:'00003',
//     name:'李宁官方旗舰店',
//     Sid:1
// })

// Supply.create({
//     username:'00004',
//     name:'酒类旗舰店',
//     Sid:2
// })

module.exports=Supply;