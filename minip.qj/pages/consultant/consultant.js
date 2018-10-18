const req = require('../../utils/req.js').req;
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listType:{},
    nametype: "",
    list: [],
    id:0

  },
  tz(e){
    console.log("asd",e)
    var id=e.currentTarget.id
    this.setData({
      id
    })
    wx.navigateTo({
      url: "../consultantDetail/consultantDetail?id="+`${id}`
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    req({
      url: cfg.qjUrl + 'consultant/list',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('req result', res);
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].avata) {
              res.data[i].avata = cfg.qiniuDomain + res.data[i].avata
            } else {
              res.data[i].avata = 'https://qj.foxcodes.cn/images/logo.jpg'
            }
          }
          
          var list = res.data;
          list.forEach((ele) => {
            var key = ele.title;
            var nametype
            switch (key) {
              case '1':
                nametype = "形象设计讲师";
                break;
              case '2':
                nametype = "形象设计服务师";
                break;
              case '3':
                nametype = "服饰搭配顾问";
                break;
              default:
                nametype = "";
            }
            ele.nametype = nametype;
          })
          this.setData({
            list
          });
          console.log(this.data.list)
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

  seeDetail:function(e){
      console.log(e)
  }
})