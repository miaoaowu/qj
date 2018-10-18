const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
var myDate = new Date();
var app = getApp();
myDate.setMonth(myDate.getMonth() + 1);
Page({
  /**
   * 页面的初始数据
   */

  data: {
    gold: 0,
    coupon: [
      // {
      //   type: '11',
      //   value: 298000,
      //   endtime: myDate.toLocaleDateString(),
      //   number: 0
      // },
      {
        type: '12',
        value: 100,
        endtime: myDate.toLocaleDateString(),
        number: 0

      },
      {
        type: '12',
        value: 500,
        endtime: myDate.toLocaleDateString(),
        number: 0

      },
      {
        type: '13',
        value: 100,
        endtime: myDate.toLocaleDateString(),
        number: 0

      }
    ]
  },
  minusCount: function (e) {  // 减少优惠券数量
    let id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.setData({
        'coupon[0].number': this.data.coupon[0].number - 1
      })
    } else if (id == 1) {
      this.setData({
        'coupon[1].number': this.data.coupon[1].number - 1
      })
    } 
    else {
      this.setData({
        'coupon[2].number': this.data.coupon[2].number - 1
      })
    }
  },

  addCount: function (e) {  // 增加优惠券数量
  console.log("djj",e)
    let id = e.currentTarget.dataset.id;
    if (id == 0) {
      this.setData({
        'coupon[0].number': this.data.coupon[0].number + 1
      })
    } else if (id == 1) {
      this.setData({
        'coupon[1].number': this.data.coupon[1].number + 1
      })
    }else {
      this.setData({
        'coupon[2].number': this.data.coupon[2].number + 1
      })
    }
  },

  confirm: function (e) {
    let jumptomember = function(){
      wx.switchTab({
        url: '../member/member',
        success: function (e) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        } 
      })
    }
    let coupon = [];
    for (let x of this.data.coupon) {
     
      if (x.number > 0) {
        coupon.push(x);
        console.log(x)
      }
    }
    // 向后台数据库提交数据
    req({
      url: cfg.qjUrl + 'user/gold/exchange',
      method: 'post',
      data: { 'coupon': coupon },
      success: (res) => {
        console.log("111",this.data.coupon)
        if (res.statusCode == 200) {
          if (this.data.coupon[0].number == 0 && this.data.coupon[1].number == 0 && this.data.coupon[2].number == 0) {
            wx.showToast({
              title: "没有兑换优惠卷！",
              icon: "success",
              duration: 1500,
              success: function () {
                let timer = setTimeout(jumptomember, 1500);  // 设置定时器
              }
            });
           }else{
            if (res.data.ok == 0) {  // ok为0正常返回，兑换优惠券成功
              wx.showToast({
                title: "兑换成功！",
                icon: "success",
                duration: 1500,
                success: function () {
                  let timer = setTimeout(jumptomember, 1500);  // 设置定时器
                }
              });
            } else {
              wx.showToast({
                title: "兑换失败！请尝试重新提交。",
                icon: "none",
                duration: 2000,
                success: function () { }
              });
            }
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

    
    if (app.globalData.gold) {
      this.setData({
        gold: app.globalData.gold
      })
    }
    if (app.globalData.gold < 100) {
      wx.showToast({
        title: '金币不足100，无法兑换',
        icon:'none'
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