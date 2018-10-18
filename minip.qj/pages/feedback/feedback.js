const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      feedback:''
  },

  bindContentInput: function (e) {
    this.setData({
      feedback: e.detail.value
    })
  },

  submit:function(){
    console.log(this.data.feedback);
    req({
      url: cfg.qjUrl + 'member/feedback',
      method: 'post',
      data: {
        feedback: this.data.feedback
      },
      success: (res) => {
        if (res.statusCode == 200) {
          if (res.data.ok) {  //// ok为0才是正常返回
            wx.showToast({
              title: "问题反馈失败！请尝试重新提交。",
              icon: "none",
              duration: 2000,
              success: function () { }
            });
            console.log("问题反馈失败！")
          } else {
            wx.showToast({
              title: "问题反馈成功！",
              icon: "success",
              duration: 2000,
              success: function () {                
                wx.reLaunch({
                  url: '../member/member'
                })
              }
            });
            console.log("问题反馈成功！")
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})