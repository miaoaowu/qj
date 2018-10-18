const util = require('../../utils/util.js');
const req = require('../../utils/req.js').req;
const cfg = require('../../cfg.js');

var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /** 
         * 页面配置 
         */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,  

    unanswered: [],   //未回答问题
    answered: [],    //已回答问题
    inputShowed: false,
    inputVal: ""
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
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    req({
      // basicUrl: cfg.qjUrl,
      url: cfg.qjUrl + 'question/list?djj=123',
      method: 'get',
      data: { },
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('返回问题列表，req result：', res);
          var question = res.data;
          app.globalData.unanswered = []; //清空未答问题列表
          app.globalData.answered = []; //清空已答问题列表
          for (var i in question) {
            //将图片、视频路径转换为全路径
            question[i].image1 = question[i].image1 ? cfg.qiniuDomain + question[i].image1 : question[i].image1;
            question[i].image2 = question[i].image2 ? cfg.qiniuDomain + question[i].image2 : question[i].image2;
            question[i].image3 = question[i].image3 ? cfg.qiniuDomain + question[i].image3 : question[i].image3;
            question[i].video = question[i].video ? cfg.qiniuDomain + question[i].video : question[i].video;
            //格式化日期格式
            question[i].updatedAt = util.formatTime(new Date(question[i].updatedAt));
            //问题的status值。1:新问题，未回答；2: 第一轮回答；3: 第一轮回答被否定；4:第二回答；5: 第二轮回答被否定；6:第三轮回答；7:否定后第一轮为最终方案，肯定即为最后方案；
            if (question[i].status == 1 || question[i].status == 3 || question[i].status == 5) { //如果问题为1,3,5状态，则为待解答问题。
              app.globalData.unanswered.push(question[i]); //放入未答问题列表
            } else {
              app.globalData.answered.push(question[i]);  //放入已答问题列表
            }
          }
          app.globalData.unanswered.sort(util.compare("updatedAt"));//将未答问题列表按时间降序排序
          app.globalData.answered.sort(util.compare("updatedAt"));//将已答问题列表按时间降序排序
          console.log("问题列表question：", question);
          console.log("未答问题列表：", app.globalData.unanswered);
          console.log("已答问题列表", app.globalData.answered);
          this.setData({
            answered: app.globalData.answered,
            unanswered: app.globalData.unanswered
          });
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    });

    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });  

  },

  /** 
      * 滑动切换tab 
      */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  } , 

 

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