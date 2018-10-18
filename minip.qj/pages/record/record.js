const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    currentView: 0,
    winWidth: 0,
    winHeight: 0,
    avatar: '../../image/head.png',
    nickname: "匿名", //昵称
    personal_info: {},     //个人资料
    current: 0,
    pres:[
        { preX: "风格定位"  },
        { preX: "肤色定位" },
        { preX: "体型定位" },
        { preX: "场合需求" },
        { preX: "个人爱好" },
    ],
    image_info: {     //形象特质
      style: '您的风格暂未评定，我们将尽快根据形象测试结果确定您的风格定位。',
      colour: '您的肤色暂未评定，我们将尽快根据形象测试结果确定您的肤色定位。',
      shape: '您的体型暂未评定，我们将尽快根据形象测试结果确定您的体型定位。',
      occasion: '您的需求暂未评定，我们将尽快根据形象测试结果确定您的场合定位。',
      hobbies: '您的喜好暂未评定，我们将尽快根据形象测试结果确定您的喜好定位。'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let app = getApp()
    this.setData({
      avatar: app.globalData.userInfo.avatarUrl,
      nickname: app.globalData.userInfo.nickName,
      personal_info: app.globalData.user
    })

    var page = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        page.setData({ winWidth: res.windowWidth });
        page.setData({ winHeight: res.windowHeight });
      },
    })

    //初始化形象特质  
    req({
      url: cfg.qjUrl + 'user/userimage',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('user/userimage req result', res);
          if (res.data.id) {
            res.data.occasion = JSON.parse(res.data.occasion)
            var a = JSON.parse(res.data.hobbies)
            var b=[]
            b.push(a[9])
            b.push(a[10])
            b.push(a[11])
            res.data.hobbies=b
            this.setData({
              image_info: res.data
            });

            console.log("形象测试结论：", this.data.image_info);
          } else if (res.data.ok == 3) {
            console.log()
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


  switchNav: function (e) {
    var page = this;
    if (e.target.dataset.current == '1' && !app.globalData.isTested) {
      wx.showModal({
        title: "您还未完成形象测试！",
        content: "建议您先完成形象测试，我们只有根据形象测试结果才能对您的咨询问题给出最好的搭配方案。",
        showCancel: true,
        confirmText: "确定",
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../imageTest/imageTest'
            })
          } else if (res.cancel) {
            page.setData({ currentTab: 0 });
          }
        }
      })
    } else {
      if (this.data.currentTab == e.target.dataset.current) {
        return false;
      } else {
        page.setData({ currentTab: e.target.dataset.current });
      }
    }
  },

  switchImage: function (e) {
    this.setData({ currentView: e.target.dataset.current });
    console.log(e.target.dataset.current);
    this.setData({
      current:e.target.dataset.current,
    })

  },

  onReady: function () {

  }


})