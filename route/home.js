//引用express框架
var express=require('express');


var home=express.Router();


home.get('/',(req,res)=>{
    res.send('欢迎来到首页')
})


module.exports=home;