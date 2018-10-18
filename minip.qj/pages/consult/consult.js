//获取cfg.js中的url配置信息
const cfg = require('../../cfg.js');

//获取应用实例
const app = getApp();
const req = require('../../utils/req.js').req;
let user = require('../../user/index.js');

Page({
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 10000, //自动切换时间间隔
    duration: 1000, //	滑动动画时长1s
    circular: true, //是否衔接滑动
    ad: [],
    inputShowed: false,
    inputVal: "",
    balance:0,
    isShow: false,
    messages: "",
    id:0,
    title:"",
  },
  //事件处理函数
  tabInput(){
    wx.navigateTo({
      url: '../search/index',
    })
  },
  //广告点击跳转
  changeTo: (event) => {
    console.log(event);
    let id = event.currentTarget.dataset.id; //广告在globalData.ad中的index
    wx.navigateTo({
      url: `/pages/showAD/showAD?id=${id}` //把广告在globalData.ad中的index传给跳转的page
    });
  },
  //“咨询”按钮跳转
  jumpToAsk: function () {
    // 验证是否已登录
    user.basic.isLogin(
      function (res) {
        console.log("jump to page Ask")
        if (!app.globalData.isTested) {
          wx.showModal({
            title: "您还未完成形象测试！",
            content: "建议您先完成形象测试，我们只有根据形象测试结果才能对您的咨询问题给出最好的搭配方案。",
            showCancel: false,
            confirmText: "确定",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../ask/ask'
                })
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../ask/ask'
          })
        }
      }, function (res) {
        console.log("用户未授权或登录")
      }
    )
  },
  //“找顾问”按钮跳转
  jumpToFindadvisor: function () {
    // 验证是否已登录
    user.basic.isLogin(
      function (res) {
        console.log("jump to page Ask")
        wx.navigateTo({
          url: '../consultant/consultant'
        })
      }, function (res) {
        console.log("用户未授权或登录")
      }
    )
  },
  //“形象测试”按钮跳转
  jumpToImagetest: function () {
    // 验证是否已登录
    user.basic.isLogin(
      function (res) {
        if (app.globalData.isTested) {
          wx.showModal({
            title: "您已经完成形象测试！",
            content: "现在可以在“咨询”栏目中提出您的问题，我们会安排专业顾问给予满意的答复。",
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
          //查询形象测试优惠券   
          req({
            url: cfg.qjUrl + 'coupon/list/11',
            method: 'get',
            data: {},
            success: (res) => {
              console.log("111",res.data)
              if (res.statusCode == 200) {
                console.log('req result', res);                
                if (res.data.length == 0) { // 如果没有形象测试优惠券
                  wx.showModal({
                    title: "缺少优惠券！",
                    content: "您没有个人形象测试专项优惠券，无法进行测试！如想继续测试，请与奇纪客服联系。",
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
                  console.log("jump to page imageTest")
                  wx.navigateTo({
                    url: '../imageTest/imageTest'
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
      }, function (res) {
        console.log("用户未授权或登录")
      }
    )
  },
  //“私人衣橱”按钮跳转
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

  know() {
    console.log("id",this.data.id)
    req({
      url: cfg.qjUrl + 'notice/read',
      method: 'post',
      data: {
        noticeId: this.data.id
      },
      success: (res) => {
        this.setData({
          isShow:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取广告
    req({
      url: cfg.qjUrl + 'ad/list',
      method: 'get',
      data: {},
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('req result', res);
          let adData = res.data;
          this.setData({
            ad: adData
          });
          app.globalData.ad = adData
          console.log('this.data.ad', this.data.ad);
          console.log('globalData.ad', app.globalData.ad);
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    });

    //获取当前余额
    req({
      url: cfg.qjUrl + 'balance/balance',
      method: 'get',
      data: {},
      success: (res) => {
        
        console.log("余额",res.data)
        app.globalData.balance=res.data.balance
        this.setData({
          balance:app.globalData.balance
        })
      }
    });


    //获取公告
    req({
      url: cfg.qjUrl +'notice/notice',
      method:'get',
      data:{},
      success:(res)=>{
        console.log("qqq:",res.data)
        if (!res.data.ok){
          console.log("公告:", res.data)
          var title = res.data.notice.title
          var messages = res.data.notice.brief
          var id = res.data.notice.id
          this.setData({
            messages,
            isShow: true,
            id,
            title
          })
        }
        
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
    // openid = user.basic.getStoredID();

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