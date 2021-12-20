const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({

  service: 'qq', 
  port: 465, 
  secureConnection: true, // 使用了 SSL
  auth: {
    user: '815499572@qq.com',
    pass: 'vnfmiqhspwnqbgba',
  }
});






function sendEmail(name,context){


    let mailOptions = {
        from: '"电子商务商城" <815499572@qq.com>', 
        to: name,
        subject: '订单通知', 
        text: context 
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log("邮件发送失败");
        }
        console.log("邮件发送成功");
      });

}

module.exports=sendEmail