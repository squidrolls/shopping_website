//引用express框架
var express=require('express');
var path=require('path')
var bodyParse=require('body-parser');
var session=require('express-session');
//连接数据库
require('./model/connect')
var User=require('./model/user');
var Score=require('./model/score');
var Shoppingcart=require('./model/shoppingcart');
var Supply=require('./model/supply');
var Comment=require('./model/comment')
var Order=require('./model/order');
require('./model/email');
var sd = require('silly-datetime');
const { timeEnd } = require('console');
const sendEmail = require('./model/email');
const { type } = require('express/lib/response');
//创建网站服务器
var app=express();
app.use(session({secret:'secret key'}));
//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')))
//处理post请求参数
app.use(bodyParse.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','art');
app.engine('art',require('express-art-template'))

app.get('/',(req,res)=>{
    res.render('login')
})

app.post('/',async (req,res)=>{
    //接收请求参数
    //res.send(req.body);
    const {username,password1,password}=req.body;
    let user=await User.findOne({username:username});
    if(user){
        if(password==user.password){
            req.session.username=username;
            //说明是普通用户
            if(user.role==0)
                res.redirect('/shop');
            else if(user.role==1) 
                res.redirect('/admin');
            else
                res.redirect('/supply2')

        }else{
            res.render('login',{message:'密码错误'})
        }
    }
    else{
        res.render('login',{message:'用户名错误'})
    }
})
//主界面
app.get('/shop',async(req,res)=>{
    let page=req.query.page ||1;
    let sort=req.query.sort ||0;
    var size=4;
    let count=await Score.countDocuments({});
    let total=Math.ceil(count/size);  
    start=(page-1)*size;
        if(sort==0) score=await Score.find({}).limit(size).skip(start);
        else if(sort==1) score=await Score.find({}).sort('Price').limit(size).skip(start);
        else score=await Score.find({}).sort('-Price').limit(size).skip(start);                


    res.render('shop',{
        message:req.session.username,
        score:score,
        total:total,
        page:page,
        sort:sort,
    })

})

app.post('/shop',async(req,res)=>{
    const {GName}=req.body;
    //构建正则表达式，实现模糊匹配
    str=new RegExp(GName);       
    //总页数
    var size=4;
    let count=await Score.find({GName:str}).countDocuments({});

    let total=Math.ceil(count/size);
    let page=req.query.page ||1;   
    start=(page-1)/size;
    let score=await Score.find({GName:str}).limit(size).skip(start);
    if(score){
        res.render('shop',{
            message:req.session.username,
            score:score,
            page:page,
            total:total
        })
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy(function(){
        res.clearCookie('connect.sid');
        res.redirect('/');
    })   
})

//注册页面
app.get('/registered',(req,res)=>{
    res.render('registered');
})

app.post('/registered',async (req,res)=>{
let user=await User.findOne({email:req.body.email})
if(user)  {
    //已经被注册
    res.redirect('/registered')
}else{
    if(req.body.password1==req.body.password2){
        await User.create({
            username:req.body.username,
            password:req.body.password1,
            email:req.body.email,
            sex:req.body.sex,
            role:0,
            birthday:req.body.birthday
        }).then(()=>console.log('用户创建成功'))
            .catch(()=>console.log('用户创建失败'))
        res.redirect('/');
    }  
    else res.send('用户信息有错误')  
}
}
)


app.get('/sendEmail',async (req,res)=>{
    var id=req.query._id
    let order=await Order.findOne({id:id}) 
    var username=order.username
    let user=await User.findOne({username:username})
    var type=order.type
    if(type==1){
        context="尊敬的顾客你好，你的订单目前已经发货，请注意查收，欢迎下次光临，谢谢"
    }else context="尊敬的顾客你好，由于种种原因，您的订单已被拒绝，非常抱歉，特此像你通知，给你带来的困扰，非常抱歉"
    sendEmail(user.email,context)
    res.redirect('/order');
    }
    )



//加入购物车
app.post('/add',async(req,res)=>{
    
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    let score=await Score.findOne({Gid:req.body.Gid});
    let shoppingcart=await Shoppingcart.findOne({username:req.session.username,score:score._id,type:0});
    if(shoppingcart) {
        
        var x=shoppingcart.number+parseInt(req.body.number);
        await Shoppingcart.updateOne({
            username:req.session.username,       
            score:score._id
        },
        {
            time:time,
            number:x
        })
    }
    else {
  
        Shoppingcart.create({
            username:req.session.username,
            score:score._id,
            number:parseInt(req.body.number),
            type:0,
            time:time           
        }).then(()=>console.log("成功")).catch(()=>console.log("失败"))
    }


    res.redirect('/shop');
})

app.get('/detail',async(req,res)=>{
    let Gid=req.query.Gid
    let score=await Score.find({Gid:Gid});
    let comment=await Comment.find({Gid:Gid})
    
    res.render('detail',{
    message:req.session.username,
    score:score,
    comment:comment
    })
})

app.get('/add-comment',async(req,res)=>{
    let Gid=req.query.Gid;
    let score=await Score.find({Gid:Gid});
    let comment=await Comment.find({Gid:Gid})
    res.render('add-comment',{
        message:req.session.username,
        score:score,
        comment:comment
        })
})

app.post('/add-comment',async(req,res)=>{
    let username=req.session.username;
    let Gid=req.body.Gid;
    let commenttext=req.body.commenttext;
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    Comment.create({
        Gid:Gid,
        username:username,
        commentData:time,
        commenttext:commenttext
    });
    res.redirect('/detail?Gid='+Gid);

})

app.get('/shop-history',async(req,res)=>{
    var username=req.session.username;
    let shoppingcart=await Shoppingcart.find({username:username,type:1}).sort('-time');
    if(shoppingcart.length!=0){
    list=[];
    for(let i=0;i<shoppingcart.length;i++){
        let score=await Score.findOne({_id:shoppingcart[i].score})        
        sum=shoppingcart[i].number*score.Price;
        sum=Math.floor(sum*100)/100;
        list.push({
            "Gid":score.Gid,
            "name":score.GName,       
            "sum":sum,
            "time":shoppingcart[i].time
        })
         
    }
    res.render('shop-history',{
        message:req.session.username,
        list:list
    });
    }
    else res.render('shopcart-2',{message:req.session.username})
})


app.get('/shopcart',async(req,res)=>{
    var username=req.session.username;
    let shoppingcart=await Shoppingcart.find({username:username,type:0});
    if(shoppingcart.length!=0){
    list=[];
    sumMoney=0;
    for(let i=0;i<shoppingcart.length;i++){
        let score=await Score.findOne({_id:shoppingcart[i].score})
        if(shoppingcart[i].type==0){
            sum=shoppingcart[i].number*score.Price;
            sum=Math.floor(sum*100)/100;
        sumMoney+=sum;
        list.push({
            "Gid":score.Gid,
            "name":score.GName,
            "Price":score.Price,
            "numb":shoppingcart[i].number,           
            "sum":sum
        })
        }  
    }
    res.render('shopcart',{
        message:req.session.username,
        list:list,
        sum:sumMoney
    });
    }
    else res.render('shopcart-2',{message:req.session.username})
})

app.get('/delete-shoppingcart',async (req,res)=>{
    var Gid=req.query.Gid;
    var username=req.session.username;
    var score= await Score.findOne({Gid:Gid})
    await Shoppingcart.findOneAndDelete({username:username,score:score});
    res.redirect('shopcart')
})


app.get('/payview',async(req,res)=>{

    var sum=req.query.sum;
    var select=req.query.select || 'wx'
    var username=req.session.username;
    var photo='';

    if(select=='wx') photo='/img/wx.jpg';
    else if(select=='zfb') photo='/img/zfb.jpg';
    else photo='/img/yl.jpg';

    res.render('payview',{
        message:req.session.username,
        username:req.session.username,
        photo:photo,
        sum:sum
    })
})

app.get('/pay',async(req,res)=>{
    var sum=req.query.sum;   
    var username=req.session.username;
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    Order.create({
        time:time,
        username:username,
        money:sum,
        type:0
    })
    let order=await Order.findOne({time:time});

    await Shoppingcart.updateMany({username:username,type:0},{
        type:1,
        order:order._id,
        time:time
    });
    res.redirect('shopcart');
})

app.get('/people',async(req,res)=>{
    let user=await User.findOne({username:req.session.username});
    if(user.sex==0) sex='男';
    else sex='女';
    res.render('people',{
        message:req.session.username,
        username:req.session.username,
        email:user.email,
        birthday:user.birthday,
        sex:sex
    })
})

app.post('/people',async(req,res)=>{
    let email=req.body.email;
    let birthday=req.body.birthday;
    let username=req.session.username;
    await User.updateOne({username:username},{email:email,birthday:birthday});
    res.redirect('/people');
})


app.get('/admin',async(req,res)=>{   
    let user=await User.findOne({username:req.session.username});
    if(user.sex==0) sex='男';
    else sex='女';
    res.render('admin',{
        message:req.session.username,
        username:req.session.username,
        email:user.email,
        birthday:user.birthday,
        sex:sex
    })
})

app.post('/admin',async(req,res)=>{
    let email=req.body.email;
    let birthday=req.body.birthday;
    let username=req.session.username;
    await User.updateOne({username:username},{email:email,birthday:birthday});
    res.redirect('/admin');
})

app.get('/supply2',async(req,res)=>{   
    let user=await User.findOne({username:req.session.username});
    if(user.sex==0) sex='男';
    else sex='女';
    res.render('supply',{
        message:req.session.username,
        username:req.session.username,
        email:user.email,
        birthday:user.birthday,
        sex:sex
    })
})


app.post('/supply',async(req,res)=>{
    let email=req.body.email;
    let birthday=req.body.birthday;
    let username=req.session.username;
    await User.updateOne({username:username},{email:email,birthday:birthday});
    res.redirect('supply');
})

//查看所有客户
app.get('/customer',async (req,res)=>{
    let user=await User.find({role:0});
    res.render('customer',{
        message:req.session.username,
        user:user
    })
})

//供货商管理
app.get('/supply',async (req,res)=>{
    let user=await User.find({role:2});

    list=[]
    for(let i=0;i<user.length;i++){
        var username=user[i].username
        let supply=await Supply.findOne({username:username});
        list.push({
            username:username,
            address:user[i].address,
            email:user[i].email,
            name:supply.name
        })
    }

    res.render('supplyMan',{
        message:req.session.username,
        list:list
    })
})

app.get('/order',async(req,res)=>{
    var order=await Order.find().sort('type');
    res.render('order',{
        message:req.session.username,
        order:order
    })
})

app.get('/sendout',async(req,res)=>{
    var id=req.query.id;
    var status=req.query.status;
    id=id.replace('"','').replace('"','')
    await Order.findOneAndUpdate({_id:id},{type:status});
    res.redirect('/order');
})

app.get('/score',async(req,res)=>{
    
    let supply=await Supply.findOne({username:req.session.username})
    let score=await Score.find({type:supply.Sid});
    res.render('score',{
        message:req.session.username,
        score:score
    })
})

app.get('/delete-score',async(req,res)=>{
    var Gid=req.query.Gid;
    await Score.findOneAndDelete({Gid:Gid})
    res.redirect('/score')
})

app.get('/modify-score',async(req,res)=>{
    var Gid=req.query.Gid;
    var score=await Score.findOne({Gid:Gid});
    res.render('score-detail',{
        message:req.session.username,
        Gid:score.Gid,
        GName:score.GName,
        Price:score.Price,
        GDscrpt:score.GDscrpt,
        Rebate:score.Rebate,
        Stock:score.Stock,
        Photos:score.Photos
    })
})

app.post('/score-detail',async(req,res)=>{
    var Gid=req.body.Gid;
    await Score.updateOne({Gid:Gid},{
        GName:req.body.GName,
        Price:req.body.Price,
        GDscrpt:req.body.GDscrpt,
        Rebate:req.body.Rebate,
        Stock:req.body.Stock
    })
    res.redirect('/modify-score?Gid='+Gid)
})

app.post('/addNewScore',async(req,res)=>{

    var username=req.session.username
    let supply=await Supply.findOne({username:username})
    let count=await Score.countDocuments({});
    count=count+1;
    var Gid='0'+count
    var GName=req.body.GName
    var Price=req.body.Price
    var GDscrpt=req.body.GDscrpt
    var Rebate=1
    var Stock=req.body.Stock;
    var Photos="/img/"+req.body.Photos
    Score.create({
        Gid:Gid,
        GName:GName,
        GDscrpt:GDscrpt,
        Rebate:Rebate,
        Stock:Stock,
        Price:Price,
        Photos:Photos,
        type:supply.Sid
    })

    res.redirect('/addNewScore')
})



app.get('/addNewScore',async(req,res)=>{
    

    res.render('addNewScore',{
        message:req.session.username,
    })
})



app.get('/order2',async(req,res)=>{

    let order=await Order.find({type:1})
    list=[]
    if(order.length!=0){    
        for(let i=0;i<order.length;i++){         
            var username=order[i].username
            var orderId=order[i]._id;   
            let shoppingcart=await Shoppingcart.find({username:username,order:orderId});
            for(let j=0;j<shoppingcart.length;j++){               
                var Gid=shoppingcart[j].score;
                var score=await Score.findOne({_id:Gid})
                list.push({
                    orderId:orderId,
                    username:username,
                    name:score.GName,
                    number:shoppingcart[j].number
                })
            }
        }
    }
    res.render('order2',{
        message:req.session.username,
        list:list
    })
})

app.get('/shop-message',async(req,res)=>{
    
    let supply=await Supply.findOne({username:req.session.username})
    res.render('shop-message',{
        message:req.session.username,
        name:supply.name

    })
})



//监听端口
app.listen(3000);
console.log('服务器启动成功');