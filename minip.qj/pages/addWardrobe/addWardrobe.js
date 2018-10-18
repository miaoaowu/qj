// pages/addWardrobe/addWardrobe.js
const qiniuUploader = require("../../utils/uploader");
const app = getApp();
const cfg = require('../../cfg.js');
const req = require('../../utils/req.js').req;
// 初始化七牛相关参数
function initQiniu() {
  var options = {
    //   region: 'SCN', // 华南区
    //   uptokenURL: 'https://[yourserver.com]/api/uptoken',
    //   // uptoken: 'xxxx',
    //   domain: 'http://[yourBucketId].bkt.clouddn.com',
    //   shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}
const modObj = {
  TypeList: ['外套', '上装', '下装', '连衣裙', '包', '鞋', '饰品'],
  TypeIndex: 0,
  TextureList: ['棉布', '麻布', '丝绸', '毛呢', '皮革', '化纤', '混纺', '针织', '皮草', '其它'],
  TextureIndex: 0,
  imageURL: '',
  imgkey:'',
  len: ''
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //服饰的件数
    delData:[
      modObj
    ],
    //列表选项列表
    typeList:modObj.TypeList,
    //材质选项列表
    texture: modObj.TextureList,
    //没有选择图片时默认图片
    addImg:"../../image/addimage.png",
    //新添服饰为0
    id: 0,
    //已添加
    tapIndex:1,
  },
  submit: function () {
    let D = this.data
    let wardrobe = []
    let subFlag = true
    D.delData.forEach((ele,i) => {
      if (!ele.imageURL) {
        wx.showModal({
          title: '提示',
          content: `第 ${i+1} 栏的服饰图片未添加`,
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } 
          }
        }) 
        subFlag = false
      }
    })  
    if (subFlag){
      console.log(D.delData)
      let wardrobeData = []
      D.delData.forEach((ele,i)=>{
        let tag = ele.TypeList[ele.TypeIndex]
        let texture = ele.TextureList[ele.TextureIndex]
        let picture = ele.imgkey
        let length = ele.len
        let id = this.data.id;
        let tempWord = {
          tag,
          texture,
          picture,
          length,
          id
        }
        wardrobeData.push(tempWord)
      })
      app.globalData.wardrobeData = wardrobeData
      console.log(app.globalData.wardrobeData)
      wx.navigateTo({
        url: '../wardrobePayment/wardrobePayment'
      })
    }
  },
  //添加服饰
  add:function(){
    let tempDelData = this.data.delData
    if(this.data.tapIndex<10){
      this.data.tapIndex+=1;
      tempDelData.push(modObj)
      this.setData({
        tapIndex: this.data.tapIndex,
        delData : tempDelData 
      })
      console.log(this.data.delData)
    }else{
      wx.showModal({
        title: '提示',
        content: '已经达到上限',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })  
    }
  },
  //删除服饰
  detele:function(){
    if (this.data.tapIndex !=1) {
      this.data.tapIndex -= 1;
      console.log('前',this.data.delData)
      this.data.delData.pop();
      this.setData({
        tapIndex: this.data.tapIndex,
        delData: this.data.delData
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '已无法删除',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  //修改类别
  bindTypeChange: function (e) {
    var idx = e.currentTarget.id;
    let tempDelData = this.data.delData
    //改变已添加多个别类的index
    tempDelData[idx].TypeIndex = e.detail.value
    this.setData({
      delData: tempDelData
    })
  },

  bindTextureChange: function (e) {
    var idx = e.currentTarget.id;
    let tempDelData = this.data.delData
    tempDelData[idx].TextureIndex = e.detail.value
    this.setData({
      delData: tempDelData
    })
    console.log(this.data.delData)
  },


  bindLengthInput: function (e) {
    var idx = e.currentTarget.id;
    let tempDelData = this.data.delData
    tempDelData[idx].len = e.detail.value

    this.setData({
      delData: tempDelData
    })
    console.log(this.data.delData)
  },

  



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //不适应动态添加多个图片
    // this.setData({ "imageObject.imageURL": "../../image/addimage.png" })
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
    this.onHide();
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

  },

  didPressChooesImage: function (e) {
    var that = this;
    didPressChooesImage(that,e);
  }
})

function didPressChooesImage(that,e) {
  var idx = e.currentTarget.dataset.id
  let tempDelData = that.data.delData
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: (res) =>{
      var filePath = res.tempFilePaths[0];
      that.setData({
        delData: tempDelData
      });   
      console.log("djj",filePath)
      // 交给七牛上传
      qiniuUploader.upload(
        filePath,
        (res) => {
          tempDelData[idx].imgkey = res.key
          tempDelData[idx].imageURL = res.imageURL
          that.setData({
            delData: tempDelData
          });
          console.log(that.data.delData)
        },
        (error) => {
          console.error('error: ' + JSON.stringify(error));
        },
        {
          region: 'SCN', // 华南区
          uptokenURL: 'https://qj.foxcodes.cn/file/init',
          domain: 'http://p70m18mpm.bkt.clouddn.com',
          shouldUseQiniuFileName: false,
          // key: 'testKeyNameLSAKDKASJDHKAS'
        },
        // null,// 可以使用上述参数，或者使用 null 作为参数占位符
        (progress) => {
          console.log('上传进度', progress.progress)
          console.log('已经上传的数据长度', progress.totalBytesSent)
          console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)   
        }
      );
    },
    error:function(err){
      console.log(err)
    }
  })
}