//获取cfg.js中的url配置信息
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
const util = require('../../utils/util.js');
const moment = require('../../utils/moment.min.js')

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],   //所有文章
    ctype: ['文章'],
    pageNum:0,
  },
  preview(e){
    console.log(e)
    var num = e.currentTarget.dataset.num
    console.log(this.data.articles)
    let target_url = this.data.articles[num].content_url
    app.globalData.aticle_data = target_url
    var a = encodeURIComponent(target_url)
    wx.navigateTo({
      url: '../showArticles/showArticles?url='+a
    })
  },
  lower:function(){
    console.log(88)
    this.loadMsg()
  },
  loadMsg:function(){
    let that = this;
    req({
      url: cfg.qjUrl + 'article/list',
      method: 'get',
      data: {
        'pageNum': that.data.pageNum
      },
      success: (res) => {
        if (res.statusCode == 200) {
          
          console.log('返回文章列表，req result：', res);
          
          // res.data.sort(util.compare1) 
          
          for(let i=0;i<res.data.length;i++){
            var time=res.data[i].updatedAt
            var times = moment(time).format("YYYY-MM-DD HH:mm:ss")
            res.data[i].updatedAt=times
          }
      
          
          this.setData({
            articles: this.data.articles.concat(res.data),
            pageNum: ++that.data.pageNum 
          });
          console.log(this.data.articles)
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
    var that = this;
    // 取得知识文章knowledge列表
    this.loadMsg()


    // articles.sort(util.compare("updatedAt"))
    
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
