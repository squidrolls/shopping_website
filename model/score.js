var mongoose=require('mongoose');


var scoreSchema=new mongoose.Schema({
    Gid:String,  //商品ID
    GName:String,  //商品名称
    Price:Number,  //单价
    GDscrpt:String,  //商品描述
    Rebate:Number,  //折扣
    Stock:Number,  //库存
    Photos:String,  //图片   
    type:Number    //分类   
})

//type  0-华为京东自营官方旗舰店   1-李宁官方旗舰店   2-酒类旗舰店  

var Score=mongoose.model('Score',scoreSchema);




// Score.create({
//     Gid:'001',
//     GName:'华为P50 Pro',
//     Price:6488.00,
//     GDscrpt:' 4G全网通 原色双影像单元 麒麟9000芯片 万象双环设计 8GB+256GB拂晓粉',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/1.jpg',
//     type:0
// },
// {
//     Gid:'002',
//     GName:'华为nova9pro',
//     Price:3499,
//     GDscrpt:'普罗旺斯 【100W超级快充】8G+128G全网通',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/2.jpg',
//     type:0
// },
// {
//     Gid:'003',
//     GName:'华为 HUAWEI Mate 40 Pro',
//     Price:6099,
//     GDscrpt:'4G 全网通 麒麟9000旗舰芯片 8GB+128GB秋日胡杨华为手机【搭载HarmonyOS 2】',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/3.jpg',
//     type:0
// },
// {
//     Gid:'004',
//     GName:' 华为口红耳机',
//     Price:1699,
//     GDscrpt:'HUAWEI FreeBuds Lipstick 无线耳机 半开放主动降噪真无线蓝牙入耳式耳机 蜜语',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/4.jpg',
//     type:0
// },
// {
//     Gid:'005',
//     GName:' HUAWEI Sound X 2021（FLMG-10）',
//     Price:1999,
//     GDscrpt:'智能音箱幻彩光随声动 帝瓦雷8单元三分频 分布式音响系统 ',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/5.jpg',
//     type:0
// },
// {
//     Gid:'006',
//     GName:'华为HUAWEI MatePad Pro',
//     Price:5099,
//     GDscrpt:'12.6英寸2021款鸿蒙HarmonyOS麒麟9000E OLED全面屏平板电脑 8+256GB WIFI曜石灰',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/6.jpg',
//     type:0
// },
// {
//     Gid:'007',
//     GName:'HUAWEI小精灵学习智慧屏',
//     Price:2799,
//     GDscrpt:'双AI慧眼 HarmonyOS 自主学习 学生平板 学习机 4+128GB贝母白 ',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/7.jpg',
//     type:0
// },
// {
//     Gid:'008',
//     GName:'华为一体机电脑HUAWEI MateStation X',
//     Price:11799,
//     GDscrpt:'28.2英寸窄边框4K+触控全面屏 五代AMD R7/16G/512G SSD/WIFI 6 皓月银 ',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/8.jpg',
//     type:0
// },
// {
//     Gid:'009',
//     GName:'中国李宁外套男',
//     Price:1499,
//     GDscrpt:'2021新品针织外套官方旗舰网AJDR435 间灰色黑色-3  ',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/9.jpg',
//     type:1
// },
// {
//     Gid:'010',
//     GName:'中国李宁卫衣男女同款',
//     Price:899,
//     GDscrpt:'2021新品秋冬潮流发布走秀款宽松套头外套官方旗舰网AWDRA41 黑色章牌满印-1',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/10.jpg',
//     type:1
// },
// {
//     Gid:'011',
//     GName:'李宁篮球鞋男',
//     Price:1699,
//     GDscrpt:'迪士尼联名Muppets科米特系列韦德之道9无限官方旗舰网ABER003 草木绿/黑色-13',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/11.jpg',
//     type:1
// },
// {
//     Gid:'012',
//     GName:'李宁篮球鞋男2021新品',
//     Price:1299,
//     GDscrpt:'驭帅14䨻BENG高帮专业比赛鞋官方店ABAQ033 荧光果红-25 ',
//     Rebate:0.1,
//     Stock:100,
//     Photos:'/img/12.jpg',
//     type:1
// },
// {
//         Gid:'013',
//         GName:'茅台',
//         Price:29994,
//         GDscrpt:'53%vol 500ml*6瓶 陈年茅台酒（15） 整箱装',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/13.jpg',
//         type:2
//     },
// {
//         Gid:'014',
//         GName:'茅台纪念款',
//         Price:4869,
//         GDscrpt:'庚子鼠年 生肖纪念酒 53度 500ml 单瓶装 酱香型白酒',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/14.jpg',
//         type:2
//     },
// {
//         Gid:'015',
//         GName:'拉菲罗斯柴尔德',
//         Price:9188,
//         GDscrpt:'1855列级酒庄 列级名庄红酒 法国进口干红葡萄酒 750ml 单支礼盒 拉菲古堡 正牌/大拉菲 2016年',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/15.jpg',
//         type:2
//     },
// {
//         Gid:'016',
//         GName:'青岛啤酒（Tsingtao）',
//         Price:2394,
//         GDscrpt:'百年之旅815ml/瓶 大师酒 礼盒装 限量款 青岛啤酒博物馆同款 815ml*6瓶整箱装',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/16.jpg',
//         type:2
//     },
// {
//         Gid:'017',
//         GName:'人头马（Remy Martin）',
//         Price:50145,
//         GDscrpt:'路易十三干邑白兰地700ml×1瓶法国进口洋酒',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/17.jpg',
//         type:2
//     },
//     {
//         Gid:'018',
//         GName:'龙舌兰',
//         Price:1436,
//         GDscrpt:'灵魂判官龙舌兰骷髅头酒陶瓷瓶 40度 700mL 金+银+陈酿(三瓶组合)',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/18.jpg',
//         type:2
//     },
//     {
//         Gid:'019',
//         GName:'朗姆酒',
//         Price:899,
//         GDscrpt:'委内瑞拉原瓶进口洋酒 外交官 单一年份朗姆酒 【2005单一年份】700ml',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/19.jpg',
//         type:2
//     },
//     {
//         Gid:'020',
//         GName:'女儿红黄酒',
//         Price:5980,
//         GDscrpt:'1998年手工冬酿原酒电视剧纪念珍藏15L坛装绍兴花雕酒',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/20.jpg',
//         type:2
//     },
//     {
//         Gid:'021',
//         GName:'文君酒',
//         Price:19999,
//         GDscrpt:'55度文君汉韵25L 浓香型白酒 文君大坛收藏品',
//         Rebate:0.1,
//         Stock:100,
//         Photos:'/img/21.jpg',
//         type:2
//     },
// )
module.exports=Score;
