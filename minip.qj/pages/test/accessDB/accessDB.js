const app = getApp()

Page({
  data:{
    requestData:[],
    userInfo: null,
    hasUserInfo: false,
    inputValue:'',
    findData:[]
  },
  onLoad: function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 

    console.log(this.data.userInfo)
    console.log(this.data.hasUserInfo)
  },
  //使用request访问url，将用户信息存储到数据库
  storeUserInfo: function(){
    let savedUserInfo = {}
    savedUserInfo.nickname = this.data.userInfo.nickName
    savedUserInfo.sex = this.data.userInfo.gender
    savedUserInfo.country = this.data.userInfo.country
    savedUserInfo.city = this.data.userInfo.city

    wx.request({
      url: 'https://qj.foxcodes.cn/b2/user/saveuserinfo', 
      data: savedUserInfo,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res=> {
        this.setData({
          requestData: res.data
        })
        console.log(res.data)
      }
    }) 
  },
  jumpToIndex: function () {
    console.log("jump to page index")
      wx.navigateTo({
      url: '../index/index'
    })
  },
  //用户输入数据绑定的事件，根据输入的文本随时更改inputValue
  bindInput: function(e){
    this.setData({
      inputValue: e.detail.value
    })
    console.log(this.data.inputValue)
  },
  //根据文本框中用户名称访问url，查询用户信息
  finduser: function(){
    let user = {}
    user.nickname = this.data.inputValue
    wx.request({
      url: 'https://qj.foxcodes.cn/b2/user/finduser',
      data: user,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        this.setData({
          findData: res.data
        })
        console.log(res.data)
      }
    }) 
  },

})