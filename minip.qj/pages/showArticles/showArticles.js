const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    adtype: "coupon",
    num:'1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var url = decodeURIComponent(options.url)
    console.log(url)
    //根据page跳转传递过来的，广告在globalData.ad中的index，找到广告的url
    // this.data.url = app.globalData.ad[options.id].url;
    this.setData({
      url
    });
    console.log('djj',this.data.url)
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
  onShareAppMessage: function (options) {
    var a = encodeURIComponent(this.data.url)
    return {
      title: '奇纪时尚小程序',
      path: `pages/showArticles/showArticles?url=${a}`,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})