var mongoose=require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/shopping',{ useNewUrlParser: true })
.then(()=>console.log('数据库连接成功'))
.catch(()=>console.log('数据库连接失败'))