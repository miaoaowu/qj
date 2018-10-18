// pages/index/index.js
const app = getApp();
//获取index.js中登记的模块
let user = require('../../user/index.js')

let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene:"",
  
    leg:1,
    createAd:'',
    signin_time:''
  },
  jumpToUser: function () {
    // clearTimeout(timer);  // 清除定时器

    wx.switchTab({
       url: '../consult/consult',
       
    })
 
  },
  //"获取头像昵称"按钮触发的事件
  getUserInfoAuthorization: function (e) {
    let that = this;
    
    console.log(e)
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    console.log(e.detail.createdAt)
    console.log(e.detail.Signin_time)
    //如果授权请求被允许，则进行登录验证
    if (e.detail.errMsg.indexOf("ok") != -1) {
      
      user.basic.login((res)=> {
        
        console.log("consult.js onLoad 登录成功！", res)        
        wx.getStorage({
          key: 'user',
          success: function (res) {
            console.log("djj123",res)
            if (res.data.mobile){
              that.jumpToUser()
            } else {
              wx.reLaunch({
                url: '../register/register',
              })
            }
          },
        })

    
      }, function () {
        console.log("consult.js onLoad 登录失败!", res)
        }, this.data.scene)
    } else {
      console.log("用户拒绝授权！")
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let app = getApp();
    this.data.scene = options.scene;
    
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