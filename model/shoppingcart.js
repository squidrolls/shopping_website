var mongoose=require('mongoose');


var shoppingcartSchema=new mongoose.Schema({
    username:String,    //用户名
    number:Number,      //数量
    time:String,        //时间
    type:Number,        //类别：0代表待购买   1代表已购买
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    score:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Score'
    }
    

})

var Shoppingcart=mongoose.model('Shoppingcart',shoppingcartSchema)
module.exports=Shoppingcart;