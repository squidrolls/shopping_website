const { date } = require('joi');
var mongoose=require('mongoose');


var userSchema=new  mongoose.Schema({
    username:String,
    password:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        type:String
    },
    sex:{
        type:Number    //0-男   1-女
    },
    role:{
        type:Number,
        default:0    //0-普通用户  1-管理员   2-供货商
    },
    birthday:{
        type:String
    },
    address:{
        type:String
    }


})

var User=mongoose.model('User',userSchema)


// User.create({
//     username:'10160311',
//     password:'12345678',
//     email:'815499572@qq.com',
//     sex:0,
//     role:0,
//     birthday:'2000-01-01',
//     address:'上海徐汇'
// }).then(()=>console.log('用户创建成功'))
//     .catch(()=>console.log('用户创建失败'))

// User.create({
//     username:'00001',
//     password:'12345678',
//     email:'18321657959@163.com',
//     sex:0,
//     role:1,
//     birthday:'1998-02-23'
// }).then(()=>console.log('用户创建成功'))
//     .catch(()=>console.log('用户创建失败'))

// User.create({
//     username:'12345678',
//     password:'12345678',
//     email:'12345678@qq.com',
//     sex:0,
//     role:2,
//     birthday:'2000-01-01',
//     address:'浙江杭州'
// }).then(()=>console.log('用户创建成功'))
//     .catch(()=>console.log('用户创建失败'))


// User.create({
//     username:'00002',
//     password:'12345678',
//     email:'34567898@qq.com',
//     sex:0,
//     role:2,
//     birthday:'2000-01-01',
//     address:'浙江杭州'
// }).then(()=>console.log('用户创建成功'))
//     .catch(()=>console.log('用户创建失败'))


//     User.create({
//         username:'00003',
//         password:'12345678',
//         email:'3456756898@qq.com',
//         sex:0,
//         role:2,
//         birthday:'2000-01-01',
//         address:'浙江杭州'
//     }).then(()=>console.log('用户创建成功'))
//         .catch(()=>console.log('用户创建失败'))

//         User.create({
//             username:'00004',
//             password:'12345678',
//             email:'342367898@qq.com',
//             sex:0,
//             role:2,
//             birthday:'2000-01-01',
//             address:'浙江杭州'
//         }).then(()=>console.log('用户创建成功'))
//             .catch(()=>console.log('用户创建失败'))

module.exports=User;