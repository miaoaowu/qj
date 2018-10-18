const req = require('../../utils/req.js').req;
const cfg = require('../../cfg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consultant: {},
    nametype: "",
    id:0,
    follow: false,
    pageBackgroundColor:
    [
      "linear-gradient(120deg, rgb(55,180,255),rgb(197,164,252))", 
      "linear-gradient(120deg, rgb(73,208,212),rgb(67,172,230))",
      "linear-gradient(120deg, rgb(93,133,232),rgb(62,191,242))",
    ],
    btnColor:[
      "linear-gradient(120deg, rgb(55,180,255),rgb(197,164,252)) ",
      "linear-gradient(120deg, rgb(73,211,211),rgb(67,170,231)) ",
      "linear-gradient(120deg, rgb(95,130,232),rgb(61,193,242)) ",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    
    var id=query.id;
    this.setData({
      id
    })
    console.log("777",query)
   

    //根据顾问id查询顾问的详细信息     
    req({
      url: cfg.qjUrl + 'consultant/get/' + query.id,
      method: 'get',
      data: {},
      success: (res) => {
         console.log(res);

         if (res.data.title == '金牌') {
           // 设置背景颜色数据
           this.setData({
             pageBackgroundColor: this.data.pageBackgroundColor[0],
             btnColor:this.data.btnColor[0],
           }); 
            wx.setNavigationBarColor({
              frontColor: '#ffffff',
             backgroundColor: '#37B4FF',
           })
         }
         else if (res.data.title == '银牌') {
           this.setData({
             pageBackgroundColor: this.data.pageBackgroundColor[1],
             btnColor: this.data.btnColor[1],
           });
           wx.setNavigationBarColor({
             frontColor: '#ffffff',
             backgroundColor: '#49D0D4',
           })
         }
         else {
           this.setData({
             pageBackgroundColor: this.data.pageBackgroundColor[2],
             btnColor: this.data.btnColor[2],
           });
           wx.setNavigationBarColor({
             frontColor: '#ffffff',
             backgroundColor: '#5D85E8',
           })
         };

        if (res.statusCode == 200) {
          //console.log('req result', res);
          if (res.data.avata) {
            res.data.avata = cfg.qiniuDomain + res.data.avata
          } else {
            res.data.avata = 'https://qj.foxcodes.cn/images/logo.jpg'
          }
          
          var a = res.data.title;
          console.log(a)
          var nametype = 1
          switch (a) {
            case '1':
              nametype = "形象设计讲师";
              break;
            case '2':
              nametype = "形象设计服务师";
              break;
            case '3':
              nametype = "服饰搭配顾问";
              break;
            default:
              nametype = "";
          }
          this.setData({
            consultant: res.data,
            nametype
          });
          

          //console.log(this.data.consultant);
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
        
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    })
    //根据openid和顾问id查询顾问是否被关注
    req({
      url: cfg.qjUrl + 'consultant/isfollow/',
      method: 'get',
      data: {
        consultant_id: query.id
      },
      success: (res) => {
        if (res.statusCode == 200) {
          //console.log('req result', res);
          if (res.data.ok == 0) {
            console.log(`顾问${query.id}已经被关注`);
            this.setData({
              follow: true
            });
          } else {
            console.log(`顾问${query.id}没有被关注`);
          }
        } else {
          console.log("网络访问错误！检查服务器是否正常！")
        }
      },
      fail: function (res) {
        console.log('网络访问失败！')
      }
    });

   
  },

  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    

  },

  askQuestion: function () {
    wx.navigateTo({
      url: '../ask/ask?id=' + this.data.id + "&consultation_fees=" + this.data.consultant.consultation_fees + '&name=' + this.data.consultant.name
    })
  },

  //关注
  follow: function () {
    var that = this;
    // 向后台数据库提交数据
    req({
      url: cfg.qjUrl + 'consultant/follow',
      method: 'post',
      data: {
        consultant_id: this.data.consultant.id
      },
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('consultant/follow req result', res);
          if (res.data.ok==0){
            wx.showToast({
              title: "关注成功",
              icon: "success",
              duration: 2000,
              success: function () {
                that.setData({
                  follow: true
                })
              }
            });
          } else {
            wx.showToast({
              title: "关注失败",
              icon: "loding",
              duration: 2000
            }); 
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
 

  //取消关注
  unfollow: function () {
    var that = this;
    // 向后台数据库提交数据
    req({
      url: cfg.qjUrl + 'consultant/unfollow',
      method: 'post',
      data: {
        consultant_id: this.data.consultant.id
      },
      success: (res) => {
        if (res.statusCode == 200) {
          console.log('consultant/unfollow req result', res);
          if(res.data.ok==0){
            wx.showToast({
              title: "取消关注成功",
              icon: "success",
              duration: 2000,
              success: function () {
                that.setData({
                  follow: false
                })
              }
            });
          } else {
            wx.showToast({
              title: "取消关注失败",
              icon: "loding",
              duration: 2000
            }); 
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

 
})