var mongoose=require('mongoose');

var commentSchema=new mongoose.Schema({
    Gid:String,
    username:String,
    commentData:String,
    commenttext:String,
    
})

var Comment=mongoose.model('Comment',commentSchema);
// Comment.create({
//     Gid:'001',
//     username:'10160311',
//     commentData:'2021-5-21 08:21',
//     commenttext:'这件商品质量很棒，十分值得购买',
    
// })

module.exports=Comment