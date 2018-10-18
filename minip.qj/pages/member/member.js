//获取index.js中登记的模块
let user = require('../../user/index.js')
const util = require('../../utils/util.js')
const req = require('../../utils/req.js').req;
const cfg = require('../../cfg.js');
var myDate = new Date();
const app = getApp();
myDate.setMonth(myDate.getMonth() + 1);


Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '../../image/head.png',
    city: '',
    role: '非会员',
    balance: 0,       //账户余额
    couponNumber: 0,  //优惠卷列表
    gold: 0,          //金币
    isSignin: "",
    myfollownum:'',
    nickname: "匿名", //昵称
    navitems: [       //导航栏目
      {
        imgurl: "../../image/files.png",
        title: '会员档案',
        bgcolor: '',
        where: '../record/record',
        plain: true,
        type: ''
      },
      {
        imgurl: "../../image/wardrobe.png",
        title: '私人衣橱',
        bgcolor: '',
        where: '../wardrobe/wardrobe',
        plain: true,
        type: ''
      },
      {
        imgurl: "../../image/mycollocation.png",
        title: '我的方案',
        bgcolor: '',
        where: '../collocation/collocation',
        plain: true,
        type: ''
      },
      {
        imgurl: "../../image/share.png",
        title: '推荐分享',
        bgcolor: '',
        where: '.',
        plain: true,
        type: 'share'
      },
      {
        imgurl: "../../image/setting.png",
        title: '设置帮助',
        bgcolor: '',
        where: '../setting/setting',
        plain: true,
        type: ''
      },
      {
        imgurl: "../../image/suggest.png",
        title: '意见反馈',
        bgcolor: '',
        where: '../feedback/feedback',
        plain: true,
        type: 'switchTab'
      }
    ]
  },

  jumpTo: function (e) {
    let where = e.currentTarget.dataset.where;
    // 验证是否已登录
    if (where == '../record/record') {
      user.basic.login(function (res) {
        console.log("jump to ", where)
        wx.navigateTo({
          url: where
        })
      }, function (res) {
        console.log("用户未授权或登录")
      })
    } else if (where == '.') {
      user.basic.isLogin(
        function (res) {
          console.log("jump to ", where, "推荐分享")
        }, function (res) {
          console.log("用户未授权或登录")
        }
      )
    } else {
      user.basic.isLogin(
        function (res) {
          console.log("jump to ", where)
          wx.navigateTo({
            url: where
          })
        }, function (res) {
          console.log("用户未授权或登录")
        }
      )
    }
  },

  jumpToWardrobe: function () {
    // 验证是否已登录
    user.basic.isLogin(
      function (res) {
        console.log("jump to page Ask")
        wx.navigateTo({
          url: '../wardrobe/wardrobe'
        })
      }, function (res) {
        console.log("用户未授权或登录")
      }
    )
  },
  jumpToRecord: function () {
    // 验证是否已登录
    user.basic.isLogin(
      function (res) {
        console.log("jump to page Record")
        wx.navigateTo({
          url: '../record/record'
        })
      }, function (res) {
        console.log("用户未授权或登录")
      }
    )
  },
  jumpToCollocation: function () {
    // 验证是否已登录
    user.basic.isLogin(
      function (res) {
        console.log("jump to page Collocation")
        wx.navigateTo({
          url: '../collocation/collocation'
        })
      }, function (res) {
        console.log("用户未授权或登录")
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  

  coupon: function () {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },

  myfollow: function () {
    wx.navigateTo({
      url: '../myfollow/myfollow',
    })
  },

  // gold: function () {
    
  //   wx.navigateTo({
  //     url: '../gold/gold?gold=' + this.data.gold
  //   })
  // },

  reCharge:function(){
    wx.navigateTo({
      url: '../balance/balance' 
    })
  },

  signin: function () {
    //签到获取金币   
    req({
      url: cfg.qjUrl + 'user/gold/signin',
      method: 'post',
      data: {},
      success: (res) => { 
        if (res.statusCode == 200) {
          app.globalData.gold=res.data.gold
          console.log('user/gold/signin req result', res);
          if (res.data.ok == 0) {
            wx.setStorageSync('user', app.globalData.user);
            this.setData({
              gold: res.data.gold,
              isSignin: "（签到成功）"
            });
            console.log("签到成功");
          } else if (res.data.ok = 3) {
            this.setData({
              gold: res.data.gold,
              isSignin: "（已签到）"
            });
            console.log("今日已签到");
          } else if (res.data.ok = 2) {
            console.log("用户没找到");
          } else if (res.data.ok = 1) {
            console.log("服务器异常错误");
          } else {
            console.log("其他错误，未签到");
          }
          this.exchange(res.data.gold)
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    })
  },

  onLoad: function (options) {
    console.log("djj", app.globalData.balance)
    let role = app.globalData.user ? "会员" : "游客"
    let city = util.transCity(app.globalData.user.city)
    this.setData({
      avatar: app.globalData.userInfo.avatarUrl,
      nickname: app.globalData.userInfo.nickName,
      city: city,
      role: role,
      balance:app.globalData.balance
    })
    this.signin();
    
  },

  //签到五天金币兑换优惠卷 
  exchange(money){
    console.log(money)
    var num = Math.floor(money / 100)
    if (num >= 1){
      var coupon=[
        {
          type: '13',
          value: 100,
          endtime: myDate.toLocaleDateString(),
          number: num
        }
      ]
      req({
        url: cfg.qjUrl + 'user/gold/exchange',
        method: 'post',
        data: { 'coupon': coupon },
        success: (res) => {
          if (res.statusCode == 200){
            wx.showToast({
              title: '获得一张咨询卷',
              icon:'success'
            })
          } 
        },
        fail: function (res) {
          console.log('网络访问失败！')
        }
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
  onShow: function (options) {
    //获取优惠券数量 

    req({
      url: cfg.qjUrl + 'coupon/list/number',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('coupon/list/number req result', res);
          if (res.data.number) {
            this.setData({
              couponNumber: res.data.number
            });
            console.log(this.data.couponNumber)
          } else if (res.data.ok = 2) {
            console.log("用户没找到");
          } else if (res.data.ok = 1) {
            console.log("服务器异常错误");
          } else {
            console.log("其他错误，未获得conpon number值");
          }
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    })

    // 获取金币数量   
    req({
      url: cfg.qjUrl + 'user/gold/number',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('user/gold/number req result', res);
          if (res.data.gold) {
            app.globalData.user.gold = res.data.gold;
            wx.setStorageSync('user', app.globalData.user);
            this.setData({
              gold: res.data.gold
            });
          } else if (res.data.ok = 2) {
            console.log("用户没找到");
          } else if (res.data.ok = 1) {
            console.log("服务器异常错误");
          } else {
            console.log("其他错误，未获得gold值");
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

  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "奇纪时尚",   // 默认是小程序的名称(可以写slogan等)
      path: '/pages/index/index?shareId=' + app.globalData.user.openid,    // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '/image/csqj-logo.jpg',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          console.log("分享成功！");
        }
      },
      fail: function (res) {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
          console.log("用户取消分享！");
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
          console.log("分享失败！");
        }
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      var eData = options.target.dataset;
      console.log(eData.name);     // shareBtn
      // 此处可以修改 shareObj 中的内容
      // shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
    }
    // 返回shareObj
    return shareObj;
  }
})