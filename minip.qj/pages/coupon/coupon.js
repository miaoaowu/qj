const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [],         // 优惠卷列表   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化优惠券列表   
    req({
      url: cfg.qjUrl + 'coupon/list/all', //全部的优惠卷
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('req result', res);
          //转换日期格式
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].endtime = util.formatDate(new Date(res.data[i].endtime));
          }
          this.setData({
            coupons: res.data
          });
          console.log(this.data.coupons);
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