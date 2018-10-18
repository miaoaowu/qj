// pages/register/register.js

//获取cfg.js中的url配置信息
const cfg = require('../../cfg.js');

const req = require('../../utils/req.js').req;
const util = require('../../utils/util.js')
const app = getApp();
let goto = 'consult';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    age_scope:{
      list:['18~25岁','26~30岁','31-35岁','36~40岁','41~45岁','46~50岁'],
      selectedIndex: 0
      },
    mobile: '',
    identifyingCode: '123',
    btnstate: "default"
  },
 
  mobileBlur: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  bindAgeScopeChange: function (e) {
    this.setData({
      'age_scope.selectedIndex': e.detail.value
    })
  },

  //验证手机号码是否符合规则,11位数字，以1开头
  checkMobile(str){
    var re = /^1\d{10}$/
    if (re.test(str)) {
      return 1
    } else {
      return 0
    }
  },

  formSubmit: function (e) {
    console.log("djj",e)
    var user = new Object();
    user.name = e.detail.value.name;
    user.profession = e.detail.value.profession;
    user.sex = e.detail.value.sex;
    user.age_scope = this.data.age_scope.list[this.data.age_scope.selectedIndex];
    user.mobile = e.detail.value.mobile;
    user.isMember = true
    console.log(user);
    if (this.checkMobile(user.mobile)){
      //向后台提交数据
      req({
        url: cfg.qjUrl + 'setting/modify_record',
        method: 'post',
        data: user,
        success: (res) => {
          if (res.statusCode == 200) {
            if (res.data.ok) {  //// ok为0才是正常返回
              wx.showToast({
                title: "修改失败！请尝试重新提交。",
                icon: "none",
                duration: 2000,
                success: function () { }
              });
              console.log("修改失败！")
            } else {
              wx.showToast({
                title: "修改成功！",
                icon: "success",
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    //修改成功后，数据同步到全局变量user
                    app.globalData.isMember = true;
                    app.globalData.user.ismember = true;
                    app.globalData.user.gold = 20;
                    app.globalData.user.giftcard = 14;
                    app.globalData.user.name = user.name;
                    app.globalData.user.profession = user.profession;
                    app.globalData.user.sex = user.sex;
                    app.globalData.user.age_scope = user.age_scope;
                    app.globalData.user.mobile = user.mobile;
                    wx.setStorageSync('user', app.globalData.user);
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000);
                }
              });
              console.log("修改成功！")
            }
          } else {
            console.log("网络访问错误！检查服务器是否正常！")
          }
        },
        fail: function (res) {
          console.log('网络访问失败！')
        }
      })  
    }else{
      wx.showToast({
        title: "手机号码不符合规范请重新填写",
        icon: "none",
        duration: 2000,
        success: function () { }
      });
    }
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      let userInfo = app.globalData.userInfo
      userInfo.city = util.transCity(userInfo.city)
      this.setData({
        userInfo: userInfo
      })
    }

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