const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
const util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_id: -1,      //问题ID
    is_public: '1',      //资料是否公开
    isUseCoupon: false,   //是否使用优惠券
    coupons: [],          //优惠卷列表     
    currentSelected: -1,
    amount_payable: 10000,   //应付金额,以分为单位
    pay_amount: 0,            //实付金额,以分为单位
    confree:'' //咨询费用
  },

  recharge(){
    if (!this.data.coupons.length) {
      wx.showModal({
        title: '温馨提示',
        content: '登陆积累五天可获得一张优惠卷',
        showCancel:false,
        confirmText	:'知道了'
      })
    }
  },

  selectCoupon: function (e) {
    console.log("djj",e)
    var that = this;
    if (this.data.currentSelected == e.currentTarget.dataset.id) {
      this.setData({
        currentSelected: -1,
        isUseCoupon: false
      });
    } else {
      this.setData({
        currentSelected: e.currentTarget.dataset.id,
        isUseCoupon: true
      });
    }
    if (this.data.isUseCoupon == true && this.data.is_public == '2') {
      wx.showToast({
        title: '用券方案须公开',
        duration: 2000,
        success: function () {
          that.setData({
            is_public: '1'
          })
        }
      })
    }
  },

  radioChange: function (e) {
    var that = this;
    if (this.data.isUseCoupon == true && e.detail.value == '2') {
      wx.showToast({
        title: '用券方案须公开',
        duration: 2000,
        success: function () {
          that.setData({
            is_public: '1'
          })
        }
      })
    } else {
      this.setData({
        is_public: e.detail.value
      })
    }
  },

  formSubmit: function (e) {
    var that = this;
    var payment = new Object();
    payment.question_id = this.data.question_id;
    payment.is_public = this.data.is_public;
    payment.isUseCoupon = this.data.isUseCoupon;
    if (payment.isUseCoupon) {
      payment.coupon_id = this.data.coupons[this.data.currentSelected].id
    }
    payment.amount_payable = this.data.amount_payable*100;

    // 向后台数据库提交数据
    req({
      url: cfg.qjUrl + 'question/pay/init',
      method: 'post',
      data: payment,
      success: (res) => {
        
        if (res.statusCode == 200) {
          console.log('pay init req result', res);
          if (res.data.ok) {  //// ok为0才是正常返回
            wx.showToast({
              title: "订单提交失败！请尝试重新提交订单。",
              icon: "none",
              duration: 2000,
              success: function () { }
            });
            console.log("订单提交失败！")
          } else {
            wx.showToast({
              title: "订单提交成功！",
              icon: "success",
              duration: 2000,
              success: function () {
                let questionTmp = app.globalData.questionTmp;  // 引用全局对象questionTmp
                questionTmp.pay_amount = res.data.pay_amount;  // 订单实付金额
                questionTmp.order_id = res.data.order_id;  // 订单id
                questionTmp.payment_id = res.data.payment_id;  // 支付id
                questionTmp.discount_amount = res.data.discount_amount;  // 订单优惠金额
                questionTmp.payparams = res.data.payparams;  // 微信支付参数
                questionTmp.amount_payable = that.data.amount_payable;  // 订单应付金额
                wx.reLaunch({
                  url: '../paymentConfirm/paymentConfirm'
                })
              }
            });
            console.log("订单提交成功！")
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
  onLoad: function (query) {
    console.log("djj",query)
       if (query.id) {
         if (query.confree){
           this.setData({
             question_id: parseInt(query.id),
             amount_payable: query.confree
           })
         }else{
           this.setData({
             question_id: parseInt(query.id),
             amount_payable: 1
           })
         }
         
       }
     
    //设置问题ID
    
    console.log('问题ID' + this.data.amount_payable);

    //初始化优惠券列表   
    req({
      url: cfg.qjUrl + 'coupon/list/13',
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
          console.log(this.data.coupons)
          if (!this.data.coupons.length) {
            wx.showModal({
              title: '温馨提示',
              content: '登陆积累五天可获得一张优惠卷',
              showCancel: false,
              confirmText: '知道了'
            })
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
    let questionTmp = app.globalData.questionTmp;
    questionTmp.id = this.data.question_id;
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