var mongoose=require('mongoose');


var orderSchema=new mongoose.Schema({
    time:String,
    username:String,
    money:Number,
    type:Number   //0-未发货   //1-已发货
})

var order=mongoose.model('Order',orderSchema);
module.exports=order;