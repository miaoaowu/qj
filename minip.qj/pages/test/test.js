const app = getApp()

Page({
  data:{

  },
  onLoad: function(){

  },
  //事件处理函数
  jumpToWebview: function () {
    console.log("jump to page webview")
      wx.navigateTo({
      url: 'webview/webview'
    })
  },
  jumpToLogs: function () {
    console.log("jump to page logs")
    wx.navigateTo({
      url: 'logs/logs'
    })
  },
  changeAuthorize: function () {
    console.log("jump to page authorize")
    wx.navigateTo({
      url: 'changeAuthorize/changeAuthorize'
    })
  },
  accessDB: function () {
    console.log("jump to page accessDB")
    wx.navigateTo({
      url: 'accessDB/accessDB'
    })
  },
  flexTest: function () {
    console.log("jump to page flexBox")
    wx.navigateTo({
      url: 'flexBox/flexBox'
    })
  },

})