// pages/paymentConfirm/paymentConfirm.js
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    pay_amount: 0,
    order_id: '',
    amount_payable: 10000,
    discount_amount: 0,
    array: ['余额付款', '微信付款'],
    balance:0,
    chosed:1,
  },
  radioChange(e){
    this.setData({
      chosed: e.detail.value
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
          balance: app.globalData.balance
        })
    let questionTmp = app.globalData.questionTmp;
    this.setData({
      pay_amount: questionTmp.pay_amount,
      order_id: questionTmp.order_id.slice(0,19),
      amount_payable: questionTmp.amount_payable,
      discount_amount: questionTmp.discount_amount,
    })
  },

  pay: function () {
    let questionTmp = app.globalData.questionTmp;
    console.log("aaaaa", questionTmp)  // 引用全局对象questionTmp
    let paymentOK = 3;  // 支付是否成功
    if (questionTmp.pay_amount > 0) { // 订单实付金额大于0
      
      if (questionTmp.payparams) {  // 支付参数是否存在
        console.log("1223", questionTmp.payparams)
        if (this.data.chosed == 1) {
          if (this.data.balance >= questionTmp.pay_amount){
          wx.showModal({
            title: '余额付款',
            content: '',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            },
            fail:function(res){
              console.log('fail',res)
            },
            complete:function(res){
              console.log('complete',res)
              if (res.confirm ==true) {
                console.log("用户支付成功！")
                paymentOK = 0
                req({
                  url: cfg.qjUrl + 'question/chargePay/submit',
                  method: 'post',
                  data: {
                    payment_id: questionTmp.payment_id,  // 支付id
                    question_id: questionTmp.id,  // 问题id
                    ok: paymentOK  // 0表示支付成功
                  },
                  success: function (res) {
                    console.log('支付成功', res)
                    app.globalData.questionTmp = null;

                    wx.switchTab({
                      url: '/pages/consult/consult',
                    })
                  }
                })
              } else if (res.cancel ==true) {
                console.log("用户取消支付！")
                paymentOK = 1
              } else {
                console.log("调用支付失败！")
                paymentOK = 2
              }
              
            },
    
          })
          }
          else{
            wx.showModal({
              title: '余额不足',
              content: '请充值',
              success: function (res) {
                if (res.confirm) {
                 wx.navigateTo({
                   url: '../balance/balance?targetUrl=paymentConfirm',
                 })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }

        }
        else{
        wx.requestPayment({  // 调用微信支付接口
            'timeStamp': '' + questionTmp.payparams.timeStamp,
            'nonceStr': questionTmp.payparams.nonceStr,
            'package': questionTmp.payparams.package,
            'signType': questionTmp.payparams.signType,
            'paySign': questionTmp.payparams.paySign,
            'success': function (res) {
              console.log("success. 支付成功！", res)
            },
            'fail': function (res) {
              console.log("fail. 支付失败！", res)
            },
            'complete': function (res) {
              console.log("complete. 支付结束！结果为：", res)
              if (res.errMsg == "requestPayment:ok") {
                console.log("用户支付成功！")
                paymentOK = 0
              } else if (res.errMsg == "requestPayment:fail cancel" ){
                console.log("用户取消支付！")
                paymentOK = 1
              } else {
                console.log("调用支付失败！")
                paymentOK = 2
              }
              // 将支付结果反馈给服务器端
              if (paymentOK == 0){
                req({
                  url: cfg.qjUrl + 'question/pay/submit',
                  method: 'post',
                  data: {
                    payment_id: questionTmp.payment_id,  // 支付id
                    question_id: questionTmp.id,  // 问题id
                    ok: paymentOK  // 0表示支付成功
                  },
                  success: (res) => {
                    app.globalData.questionTmp = null;
                    if (res.statusCode == 200) {
                      console.log('支付结果提交 req result', res);
                      if (res.data.ok) {  // 支付结果提交给服务器，服务器处理提交结果错误
                        if (paymentOK == 0) { // 支付成功
                          wx.showModal({
                            title: "支付失败！",
                            content: "很抱歉，给您造成不便！支付完成，支付结果提交失败，请与奇纪客服联系！",
                            showCancel: false,
                            confirmText: "确定",
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '/pages/consult/consult',
                                })
                              }
                            }
                          })
                        } else {  // 支付失败或取消支付
                          wx.showModal({
                            title: "支付失败！",
                            content: "支付取消或未完成！结果提交失败！",
                            showCancel: false,
                            confirmText: "确定",
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '/pages/consult/consult',
                                })
                              }
                            }
                          })
                        }
                      } else {  // 将支付结果提交给服务器，服务器处理提交结果成功
                        if (paymentOK == 0) { // 支付成功时
                          wx.showModal({
                            title: "支付成功！",
                            content: "您的咨询问题已提交！我们会安排形象顾问给您解答，谢谢！",
                            showCancel: false,
                            confirmText: "确定",
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '/pages/consult/consult',
                                })
                              }
                            }
                          })
                        } else {  // 支付失败时
                          wx.showModal({
                            title: "支付失败！",
                            content: "支付取消或未完成！结果提交成功！",
                            showCancel: false,
                            confirmText: "确定",
                            success: function (res) {
                              if (res.confirm) {
                                wx.switchTab({
                                  url: '/pages/consult/consult',
                                })
                              }
                            }
                          })
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
              }
              
            }
          })
        }
      } else {
        console.log("支付参数不存在！检查订单是否提交成功。")
      }
    } else {  // 订单实付金额为0
      console.log("订单实付金额为0。")
      paymentOK = 0
      // 将支付结果反馈给服务器端
      req({
        url: cfg.qjUrl + 'question/pay/submit',
        method: 'post',
        data: {
          payment_id: questionTmp.payment_id,  // 支付id
          question_id: questionTmp.id,  // 问题id
          ok: paymentOK  // 0表示支付成功
        },
        success: (res) => {
          app.globalData.questionTmp = null;
          if (res.statusCode == 200) {
            console.log('支付结果提交 req result', res);
            if (res.data.ok) {
              wx.showModal({
                title: "支付失败！",
                content: "很抱歉，给您造成不便！支付结果提交失败，请与奇纪客服联系！",
                showCancel: false,
                confirmText: "确定",
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/consult/consult',
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: "支付成功！",
                content: "您的咨询问题已提交！我们会安排形象顾问给您解答，谢谢！",
                showCancel: false,
                confirmText: "确定",
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/consult/consult',
                    })
                  }
                }
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
    }
  },

  cancelPayment: function () {
    app.globalData.questionTmp = null;
    wx.switchTab({
      url: '../consult/consult'
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