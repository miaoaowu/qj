const req = require('../../utils/req.js').req;
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  onShow: function(){
    req({
      url: cfg.qjUrl + 'consultant/myfollow', //已关注的顾问
      // url: cfg.qjUrl + 'consultant/list',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('consultant/list req result', res);
          if (!res.data.ok && res.data.length != 0) { // 已关注顾问，获取列表成功
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].avata) {
                res.data[i].avata = cfg.qiniuDomain + res.data[i].avata
              } else {
                res.data[i].avata = 'https://qj.foxcodes.cn/images/logo.jpg'
              }
            }
            this.setData({
              list: res.data
            });
          } else if (res.data.ok == 4) {
            console.log("没有找到关注的顾问", res.data)
          } else if (res.data.ok == 3) {
            console.log("没有关注顾问", res.data)
          } else if (res.data.ok == 2) {
            console.log("没有找到会员", res.data)
          } else {
            console.log("异常错误", res.data)
          }
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    })
  },

  onReady: function () {

  },

  seeDetail: function (e) {
    console.log(e)
  }
})