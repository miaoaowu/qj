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
    balanceTmp: {},
    pay_count: 0,
    payment_id: 0,
    payparams: {},
    balance: 0,
    targetUrl: ''
  },

  getValue: function(e) {
    var pay_amount = e.detail.value
    this.setData({
      pay_amount
    })

  },
  cancelPayment() {
    wx.showToast({
      title: "用户取消支付,订单提交失败！",
      icon: "none",
      duration: 3000,
      success: () => {}
    });
    wx.switchTab({
      url: '../member/member'
    })
  },

  pay() {
    if (this.data.pay_amount >= 0.01) {
      var that = this
      // 向后台数据库提交数据
      req({
        url: cfg.qjUrl + 'charge/pay/init',
        method: 'post',
        data: {
          'c_id': this.data.balanceTmp.c_id,
          'amount_payable': this.data.pay_amount * 100,
        },
        success: (res) => {
          // console.log("asd",res)
          var payment_id = res.data.payment_id;
          var payparams = res.data.payparams
          this.setData({
            payment_id,
            payparams
          })

          if (res.statusCode == 200) {
            if (res.data.ok != 0) { //// ok为0才是正常返回
              wx.showToast({
                title: "订单提交失败！请尝试重新提交订单。",
                icon: "none",
                duration: 2000,
                success: () => {}
              });
            } else {
              wx.showToast({
                title: "订单提交成功！",
                icon: "success",
                duration: 2000,
                success: () => {
                  let paymentOK = 3; // 支付是否成功
                  if (this.data.payparams) { // 支付参数是否存在
                    wx.requestPayment({ // 调用微信支付接口
                      'timeStamp': '' + this.data.payparams.timeStamp,
                      'nonceStr': this.data.payparams.nonceStr,
                      'package': this.data.payparams.package,
                      'signType': this.data.payparams.signType,
                      'paySign': this.data.payparams.paySign,
                      'success': (res) => {
                        console.log("success. 支付成功！", res)
                      },
                      'fail': function(res) {
                        console.log("fail. 支付失败！", res)
                      },
                      'complete': (res) => {
                        console.log("complete. 支付结束！结果为：", res)
                        if (res.errMsg == "requestPayment:ok") {
                          console.log("用户支付成功！")
                          paymentOK = 0
                        } else if (res.errMsg == "requestPayment:fail cancel") {
                          console.log("用户取消支付！")
                          paymentOK = 1
                        } else {
                          console.log("调用支付失败！")
                          paymentOK = 2
                        }
                        console.log("111", paymentOK)
                        //将支付结果返回给服务器
                        if (paymentOK == 0) {
                          console.log("sads", this.data.payment_id)
                          req({
                            url: cfg.qjUrl + 'charge/pay/submit',
                            method: 'post',
                            data: {
                              payment_id: this.data.payment_id, // 支付id
                            },
                            success: (res) => {
                              var balance = res.data.balance
                              app.globalData.balance = res.data.balance
                              this.setData({
                                balance
                              })
                              console.log(that.data.targetUrl)
                              if (that.data.targetUrl) {
                                wx.redirectTo({
                                  url: that.data.targetUrl,
                                  success: (e) => {
                                    var page = getCurrentPages().pop()
                                    console.log(page);
                                    if (page == undefined || page == null) return;
                                    page.onLoad();
                                  }
                                })
                              } else {
                                wx.switchTab({
                                  url: '../member/member',
                                  success: (e) => {
                                    var page = getCurrentPages().pop()
                                    console.log(page);
                                    if (page == undefined || page == null) return;
                                    page.onLoad();
                                  }
                                })
                              }
                            }
                          })
                        }
                      }
                    })

                  }
                }
              });
              console.log("订单提交成功！")
            }
          } else {
            console.log("网络访问错误！检查服务器是否正常！")
          }
        },
        fail: function(res) {
          console.log('网络访问失败！')
        }
      })
    } else {
      wx.showModal({
        title: "提示",
        content: "充值金额不能为空且小于0.01元",
        duration: 2000,
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }

  },



  onLoad: function(options) {
    var c = JSON.parse(options.balanceTmp)
    this.setData({
      balanceTmp: c,
      targetUrl: options.targetUrl
    })
    console.log()
    if (options.targetUrl) {
      this.setData({
        targetUrl: '../' + options.targetUrl + '/' + options.targetUrl
      })
    }
    console.log(this.data.targetUrl)
  }
})