let user = require('../../user/index.js')
const util = require('../../utils/util.js')
const req = require('../../utils/req.js').req;
const cfg = require('../../cfg.js');

var app = getApp()
// pages/test/test.js
Page({
  data: {
    coupons: [],          //套餐    
    currentSelected: -1,
    isUseCoupon: false,   //是否使用套餐充值
    balanceTmp:{},
    length:0,
    targetUrl:''
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
  },
  
  submit: function (e) {
    console.log(e);
    var balanceTmp = new Object();
    balanceTmp.isUseCoupon=this.data.isUseCoupon
    if (balanceTmp.isUseCoupon) {
      balanceTmp.c_id = this.data.coupons[this.data.currentSelected].id
      balanceTmp.amount_payable = this.data.coupons[this.data.currentSelected].threshold
    }else{
      balanceTmp.c_id = 2
      balanceTmp.amount_payable = this.data.coupons[1].threshold
    }
    this.setData({
      balanceTmp
    })
    wx.navigateTo({
      url: '../balanceDetail/balanceDetail?balanceTmp=' + JSON.stringify(this.data.balanceTmp) + '&targetUrl=' + this.data.targetUrl

    })
  },


  onLoad: function (option) {
    console.log(option)
    req({
      url: cfg.qjUrl + 'charge/list',
      method: 'get',
      data: {},
      success: (res) => {
        console.log("djj",res.data)
        for (let i = 0; i < res.data.c.length; i++) {
          this.data.coupons.push(res.data.c[i])   
        }
        this.setData({
          coupons: this.data.coupons,
          length: --res.data.c.length,
        })
        if (option.targetUrl) {
          this.setData({
            targetUrl: option.targetUrl
          })
        }
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    })
   
  }
})



  

