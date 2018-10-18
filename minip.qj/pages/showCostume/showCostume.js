const cfg = require('../../cfg.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    commodity:[],
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var commomitys = JSON.parse(options.commodity);
    var type=commomitys.type;
    var shops = commomitys.shops;
    
    for (let i=0;i<shops.length;i++){
      if (type == shops[i].type){
        this.data.commodity.push(shops[i])
      }
    }
    
    this.setData({
      commodity:this.data.commodity,
      
    });
    console.log("djj", this.data.commodity)
    // req({

    // })
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