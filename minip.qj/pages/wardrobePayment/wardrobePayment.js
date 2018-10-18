const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
const util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wardrobe:[],
    wardrobe_id: [],      //服饰ID
    is_public: '1',      //资料是否公开
    isUseCoupon: false,   //是否使用优惠券
    coupons: [],          //优惠卷列表     
    currentSelected: -1,
    amount_payable: 100,   //应付金额,以分为单位
    pay_amount: 0         //实付金额,以分为单位
  },


  selectCoupon: function (e) {
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

  formSubmit: function(e) {
    let that = this;
    let wardrobe = this.data.wardrobe
    req({
      url: cfg.qjUrl + 'wardrobe/upsert',
      method: 'post',
      data: {
        wardrobe: wardrobe
      },
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('zcl', res);
          var wardrobe_id = res.data.id;
          this.setData({
            wardrobe_id
          })
          wx.showToast({
            title: "等待结算",
            icon: "success",
            duration: 2000,
            success: function () {
              var payment = new Object();
              payment.wardrobe_id = that.data.wardrobe_id[0];
              payment.is_public = that.data.is_public;
              payment.isUseCoupon = that.data.isUseCoupon;
              if (payment.isUseCoupon) {
                payment.coupon_id = that.data.coupons[that.data.currentSelected].id
              }
              payment.amount_payable = that.data.amount_payable;
              console.log(payment)
              // 向后台数据库提交数据
              req({
                url: cfg.qjUrl + 'wardrobe/pay/init',
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
                        title: "订单提交成功",
                        icon: "success",
                        duration: 2000,
                        success: function () {
                          console.log(res.data);
                          let wardrobeTmp = {}
                          wardrobeTmp.pay_amount = res.data.pay_amount;            //订单实付金额 
                          wardrobeTmp.wardrobe_id = that.data.wardrobe_id;
                          wardrobeTmp.order_id = res.data.order_id;                //订单id
                          wardrobeTmp.discount_amount = res.data.discount_amount;  //订单优惠金额
                          wardrobeTmp.amount_payable = that.data.amount_payable;   // 订单应付金额
                          wardrobeTmp.payment_id = res.data.payment_id;            // 支付id
                          wardrobeTmp.payparams = res.data.payparams;              // 微信支付参数           
                          app.globalData.wardrobeTmp = wardrobeTmp;           
                          wx.reLaunch({
                            url: '../wardrobePaymentConfirm/wardrobePaymentConfirm'
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
            }
          });
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
    //设置服饰ID
    let wardrobeData = app.globalData.wardrobeData
    this.setData({
      wardrobe: wardrobeData,
      amount_payable: wardrobeData.length * 100
    })

    console.log('wardrobeData.length', wardrobeData.length);
    
    //初始化优惠券列表   
    req({
      url: cfg.qjUrl + 'coupon/list/12',
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
    let wardrobeTmp = app.globalData.wardrobeData;
    wardrobeTmp.id = this.data.wardrobe_id;
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