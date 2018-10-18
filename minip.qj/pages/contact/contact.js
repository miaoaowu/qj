//获取cfg.js中的url配置信息
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;

Page({
  data:{

  },
  onload:function(){
    req({
      method:"post",
      url:"https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN",
      success:(res)=>{
        console.log(res)
      }   
    })
  }
})