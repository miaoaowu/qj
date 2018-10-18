//获取cfg.js中的url配置信息
const cfg = require('../cfg.js');
//获取应用实例
const app = getApp();


// 利用userInfo获取用户openid
function getLoginData(code, rawData, signature, encryptedData, iv, scene,callback) {
  console.log("getLoginData Begin ... ")
  wx.request({
    url: cfg.loginUrl,
    method: 'POST',
    data: {
      code: code,
      iv: iv,
      scene:scene,
      rawData: rawData,
      encryptedData: encryptedData,
      signature: signature
    },
    success: function (r) {
      // 获取openid成功
      wx.setStorageSync('openId', r.data.openid)
      let app = getApp()
      app.globalData.openId = r.data.openid
      callback(r)
    },
    fail: function (err) {
      console.log("getLoginData网络请求失败！")
      // 网络请求失败处理
    }
  })
}

function login(z,y,scene) {  // 用户登录并取得openid等用户信息
  var that = this;
  let app = getApp();
  var success = arguments[0] ? arguments[0] : function () { }; //登录成功的回调
  var fail = arguments[1] ? arguments[1] : function () { }; //登录失败的回调
  var content = arguments[2] ? arguments[2] : '授权登录失败，部分功能将不能使用，是否重新登录？'; //当用户取消授权登录时，弹出的确认框文字

  wx.login({
    success: function (res1) {
      //login成功，获得code
      var code = res1.code;
      console.log("login成功，获得code", res1)
      wx.getUserInfo({
        success: function (res2) {
          console.log("getUserInfo成功", res2)
          // let app = getApp()
          app.globalData.userInfo = res2.userInfo
          wx.setStorageSync("userInfo", res2.userInfo)
          var rawData = encodeURIComponent(res2.rawData); // 不包括敏感信息的原始数据字符串，用于计算签名
          var signature = res2.signature || ''; // 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
          var encryptedData = res2.encryptedData; // 包括敏感数据在内的完整用户信息的加密数据
          var iv = res2.iv; // 加密算法的初始向量
          // 调用服务器端登录，获得详细用户资料，比如openid(支付用)，保存用户数据到服务器  
          getLoginData(code, rawData, signature, encryptedData, iv, scene, function (res3) {
            wx.setStorageSync("user", res3.data) // 本地缓存user数据，下次打开不需要登录
            // let app = getApp()
            app.globalData.user = res3.data // 在当前的app对象中缓存user数据
            app.globalData.isTested = app.globalData.user.tested ? app.globalData.user.tested : false;
            app.globalData.isLogin = true;
            success(res3)
          })
        },
        fail: function (res1) {//用户点了“拒绝”
          wx.showModal({
            title: '提示',
            content: content,
            showCancel: true,
            cancelText: "否",
            confirmText: "是",
            success: function (res2) {
              if (res2.confirm) {
                if (wx.openSetting) {//当前微信的版本 ，是否支持openSetting
                  wx.openSetting({
                    success: (res3) => {
                      if (res3.authSetting["scope.userInfo"]) { //如果用户重新同意了授权登录
                        wx.getUserInfo({ //跟上面的wx.getUserInfo  sucess处理逻辑一样
                          success: function (res4) {
                            // let app = getApp()
                            app.globalData.userInfo = res4.userInfo
                            wx.setStorageSync("userInfo", res4.userInfo)
                            var rawData = encodeURIComponent(res4.rawData);
                            var signature = res4.signature || '';
                            var encryptedData = res4.encryptedData;
                            var iv = res4.iv;
                            getLoginData(code, rawData, signature, encryptedData, iv, function (res5) {
                              wx.setStorageSync("user", res5.data)
                              let app = getApp()
                              app.globalData.user = res5.data
                              app.globalData.isTested = app.globalData.user.tested ? app.globalData.user.tested : false;
                              app.globalData.isLogin = true;
                              success(res5)
                            })
                          }
                        })
                      } else {//用户还是拒绝
                        fail()
                      }
                    },
                    fail: function () {//调用失败，授权登录不成功
                      fail()
                    }
                  })
                } else {
                  fail()
                }
              }
            }
          })
        }
      })
    },
    fail: function (res) {
      fail()
    }
  })
}

function isLogin() {  //判断用户是否登录过，如未曾登录，则调用login方法
  let success = arguments[0] ? arguments[0] : function () { }; //登录成功的回调
  let fail = arguments[1] ? arguments[1] : function () { }; //登录失败的回调
  let content = arguments[2] ? arguments[2] : '授权登录失败，部分功能将不能使用，是否重新登录？'; //当用户取消授权登录时，弹出的确认框文字

  let that = this
  let app = getApp()
  let user = wx.getStorageSync('user');//登录过后，用户信息会缓存

  if (!user.openid || user.openid.length < 10) {  // if(app.globalData.isLogin)
    login(success, fail, content);
  }
  else { // 如果缓存中已经存在user.openId  那就是已经登录过
    app.globalData.user = user;
    app.globalData.isTested = user.tested ? user.tested : false;
    app.globalData.userInfo = wx.getStorageSync('userInfo');
    app.globalData.openId = wx.getStorageSync('openId');
    app.globalData.isLogin = true;
    success(user)
  }
}


module.exports = {
  login: login,
  isLogin: isLogin,
}