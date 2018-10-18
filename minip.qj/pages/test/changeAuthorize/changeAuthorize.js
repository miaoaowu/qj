//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '进入功能测试页面',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../logs/logs'
    })
  },
  gotoTest: function () {
    console.log("gotoTest")
    wx.switchTab({
      url: '../test/test'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //"获取头像昵称"按钮触发的事件
  getUserInfo: function(e) {
    console.log(e)
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    //如果授权请求被允许，则存储用户信息
    if(e.detail.errMsg.indexOf("ok")!=-1){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  //"更改访问授权"按钮触发的事件
  changeAuthorize: function() {
    //打开更改授权页面
    wx.openSetting({
      success: (res) => {
        console.log(res.authSetting)
        //如果用户信息授权未被允许，则清空用户信息，否则存储用户信息
        if (!res.authSetting['scope.userInfo']){
          app.globalData.userInfo = null
          this.setData({
            userInfo: {},
            hasUserInfo: false
          })          
        }
        else{
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      }
    })
  }
})