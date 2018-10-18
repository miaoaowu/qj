// pages/wardrobe/wardrobe.js
//获取cfg.js中的url配置信息
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;

Page({

  data: {
    inputShowed: false,
    inputVal: "",
    list: [],
    clothes: [],
    status:1,
  },

  onLoad: function (options) {
    wx.showModal({
      title: "私人衣橱上传流程",
      content: "拍摄自己的服装或饰品--->点击添加服饰单品按钮上传",
      showCancel: false,
      confirmText: "确定",
      
    })

    req({
      url: cfg.qjUrl + 'wardrobe/list',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('req result', res);
          if (res.data.ok) {  // ok非0表示出错
            console.log("获取私人衣橱服饰出错！")
          } else {
            //转换路径
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].picture) {
                res.data[i].picture = cfg.qiniuDomain + res.data[i].picture
              } else {
                res.data[i].picture = 'https://qj.foxcodes.cn/images/logo.jpg'
              }
            }
            this.setData({
              list: res.data
            });
            console.log(this.data.list);
            for (let i of this.data.list) {
              this.data.clothes.push(i.picture)
            }
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

  addWardrobe: function () {
    wx.navigateTo({
      url: '../addWardrobe/addWardrobe',
    })
  },

  deleteImg:function(e){
    var that=this;
    
    console.log(e.currentTarget.dataset.index)
  },

  onReady: function () {

  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log(e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },
  previewImage: function (e) {
    console.log('333333' + e.currentTarget.id);
    console.log(this.data.clothes);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.clothes // 需要预览的图片http链接列表
    })
  }
})
