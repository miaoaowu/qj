//app.js

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.globalData.userInfo = wx.getStorageSync('userInfo')
    this.globalData.user = wx.getStorageSync('user')
    this.globalData.isTested = this.globalData.user.tested ? this.globalData.user.tested : false
    this.globalData.test_data = this.globalData.original_test_data
  },
  globalData: {
    balance:10,      //余额
    gold:0,         //金币
    shareId: null,  //小程序分享者的openid
    isSignin: null,  //是否签到
    costumes: [], //顾问推荐服饰列表
    answered: [], //已答问题列表
    unanwsered: [], //未答问题列表
    questionTmp: null,
    balanceTmp:{},
    wardrobeTmp: null,
    userInfo: null, // 小程序本地获取的userInfo
    openId: null, // 服务器传回的hash后的openId，与user.openid一致
    isTested: false, // 是否进行过形象测试，login成功后取user.tested的值一致
    isLogin: false, // 是否曾经登录，获得openId表示已经登录
    user: null, // 登录后服务器传回的用户信息
    ad: [],
    wardrobeData:[],  
    test_data: [],
    aticle_data:'',  //存服饰搭的数据
    original_test_data: [{
      question_value: ' 请按以下图片要求上传您自己的素颜无美颜的照片', //问题题目
      question_type: '图片', //问题类型
      question_number: '1', //问题题号
      question_options: [{ //问题选项
        src: 'img/1-1.png', //选项图片链接
        alt: '(图一)头部正面照(清晰五官,头发后梳)' //图片描述
      }, {
        src: 'img/1-2.png',
        alt: '(图二)头部侧面照(清晰五官,头发后梳)'
      }, {
        src: 'img/1-3.png',
        alt: '(图三)身体正面照(着紧身衣,肩腰臀线条清晰)'
      }, {
        src: 'img/1-4.png',
        alt: '(图四)身体侧面照(着紧身衣,胸腹臀线条清晰)'
      }],
      answered: true
    }, {
      question_type: '选择文件',
      question_number: '1',
      question_value: ' 请按照测试告知(图一)的图片实例上传素颜无美颜无饰品的头部正面照 [上传文件题]',
      question_model: '',
      answered: false
    }, {
      question_type: '选择文件',
      question_number: '2',
      question_value: ' 请按照测试告知(图二)的图片实例上传素颜无美颜无饰品的头部侧面照 [上传文件题]',
      question_model: '',
      answered: false
    }, {
      question_type: '选择文件',
      question_number: '3',
      question_value: ' 请按照测试告知(图三)的图片实例上传身体正面照 [上传文件题]',
      question_model: '',
      answered: false
    }, {
      question_type: '选择文件',
      question_number: '4',
      question_value: ' 请按照测试告知(图四)的图片实例上传身体侧面照 [上传文件题]',
      question_model: '',
      answered: false
    }, {
      //填空题
      //姓名
      question_type: '填空',
      question_number: '5',
      question_value: '您的姓名: [填空题]',
      question_model: '',
      answered: false
    }, {
      //电话号码
      question_type: '填空',
      question_number: '6',
      question_value: '您的电话号码: [填空题]',
      question_model: '',
      answered: false
    }, {
      //单选题目
      question_type: '单选',
      question_number: '7',
      question_value: '您的年龄是在哪个区间? [单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_8_id_' + Math.random(),
        value: '18~25岁',
        src: ''
      }, {
        id: 'radio_8_id_' + Math.random(),
        value: '26~30岁',
        src: ''
      }, {
        id: 'radio_8_id_' + Math.random(),
        value: '31~35岁',
        src: ''
      }, {
        id: 'radio_8_id_' + Math.random(),
        value: '36~40岁',
        src: ''
      }, {
        id: 'radio_8_id_' + Math.random(),
        value: '41~45岁',
        src: ''
      }, {
        id: 'radio_8_id_' + Math.random(),
        value: '46~50岁',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '8',
      question_value: '您从事何种职业? [单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_9_id_' + Math.random(),
        value: '政府官员/企业高管',
        src: ''
      }, {
        id: 'radio_9_id_' + Math.random(),
        value: '公司白领',
        src: ''
      }, {
        id: 'radio_9_id_' + Math.random(),
        value: '商业服务人员',
        src: ''
      }, {
        id: 'radio_9_id_' + Math.random(),
        value: '学生/军人',
        src: ''
      }, {
        id: 'radio_9_id_' + Math.random(),
        value: '教师',
        src: ''
      }, {
        id: 'radio_9_id_' + Math.random(),
        value: '自由职业',
        src: ''
      }, {
        id: 'radio_9_id_' + Math.random(),
        value: '其他',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '9',
      question_value: '您的身高是多少? [单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_10_id_' + Math.random(),
        value: '145—150CM',
        src: ''
      }, {
        id: 'radio_10_id_' + Math.random(),
        value: '151—155CM',
        src: ''
      }, {
        id: 'radio_10_id_' + Math.random(),
        value: '156—160CM',
        src: ''
      }, {
        id: 'radio_10_id_' + Math.random(),
        value: '161—165CM',
        src: ''
      }, {
        id: 'radio_10_id_' + Math.random(),
        value: '166—170CM',
        src: ''
      }, {
        id: 'radio_10_id_' + Math.random(),
        value: '171CM以上',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '10',
      question_value: '您的体重是多少? [单选题] ',
      question_model: '',
      question_options: [{
        id: 'radio_11_id_' + Math.random(),
        value: '40—45KG',
        src: ''
      }, {
        id: 'radio_11_id_' + Math.random(),
        value: '46—50KG',
        src: ''
      }, {
        id: 'radio_11_id_' + Math.random(),
        value: '51—55KG',
        src: ''
      }, {
        id: 'radio_11_id_' + Math.random(),
        value: '56—60KG',
        src: ''
      }, {
        id: 'radio_11_id_' + Math.random(),
        value: '61—65KG',
        src: ''
      }, {
        id: 'radio_11_id_' + Math.random(),
        value: '65KG以上',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '11',
      question_value: '您日常穿着什么尺码的服装? [单选题]',
      question_model: '', //单选的model
      question_options: [{
        id: 'radio_12_id_' + Math.random(),
        value: 'XS码',
        src: ''
      }, {
        id: 'radio_12_id_' + Math.random(),
        value: 'S码',
        src: ''
      }, {
        id: 'radio_12_id_' + Math.random(),
        value: 'M码',
        src: ''
      }, {
        id: 'radio_12_id_' + Math.random(),
        value: 'L码',
        src: ''
      }, {
        id: 'radio_12_id_' + Math.random(),
        value: 'XL码',
        src: ''
      }, {
        id: 'radio_12_id_' + Math.random(),
        value: 'XXL码及以上',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '12',
      question_value: '您有日常化妆的习惯吗? [单选题] ',
      question_model: '',
      question_options: [{
        id: 'radio_13_id_' + Math.random(),
        value: '每天都化妆',
        src: ''
      }, {
        id: 'radio_13_id_' + Math.random(),
        value: '偶然会化妆',
        src: ''
      }, {
        id: 'radio_13_id_' + Math.random(),
        value: '极少或素颜',
        src: ''
      }],
      answered: false
    }, {
      question_type: '复选',
      question_number: '13',
      question_value: '您日常多用哪类妆面? [多选题]',
      question_model: [],
      question_options: [{
        id: 'radio_14_id_' + Math.random(),
        value: '裸妆',
        src: ''
      }, {
        id: 'radio_14_id_' + Math.random(),
        value: '较艳丽的妆面',
        src: ''
      }, {
        id: 'radio_14_id_' + Math.random(),
        value: '只化眉毛或嘴唇局部',
        src: ''
      }, {
        id: 'radio_14_id_' + Math.random(),
        value: '只涂BB霜等基础粉底',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '14',
      question_value: ' 您习惯穿多高的高跟鞋？[单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_15_id_' + Math.random(),
        value: '3厘米以下',
        src: ''
      }, {
        id: 'radio_15_id_' + Math.random(),
        value: '3-5厘米',
        src: ''
      }, {
        id: 'radio_15_id_' + Math.random(),
        value: '5-8厘米',
        src: ''
      }, {
        id: 'radio_15_id_' + Math.random(),
        value: '8厘米以上',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '15',
      question_value: ' 您是否有耳洞？[单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_16_id_' + Math.random(),
        value: '有耳洞',
        src: ''
      }, {
        id: 'radio_16_id_' + Math.random(),
        value: '没有耳洞',
        src: ''
      }],
      answered: false
    }, {
      question_type: '复选',
      question_number: '16',
      question_value: '您日常的偏好色是？[多选题]',
      question_model: [], //复选的model
      question_options: [{
        id: 'radio_17_id_' + Math.random(),
        value: '红',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '橙',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '黄',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '绿',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '蓝',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '紫',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '黑',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '白',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '灰',
        src: ''
      }, {
        id: 'radio_17_id_' + Math.random(),
        value: '裸色',
        src: ''
      }],
      answered: false
    }, {
      //十八题
      question_type: '复选',
      question_number: '17',
      question_value: '您日常穿着较多的服装款式有：[多选题]',
      question_model: [],
      question_options: [{
        id: 'radio_18_id_' + Math.random(),
        value: '裙装',
        src: ''
      }, {
        id: 'radio_18_id_' + Math.random(),
        value: '裤装',
        src: ''
      }, {
        id: 'radio_18_id_' + Math.random(),
        value: '宽松款',
        src: ''
      }, {
        id: 'radio_18_id_' + Math.random(),
        value: '紧身款',
        src: ''
      }, {
        id: 'radio_18_id_' + Math.random(),
        value: '长款',
        src: ''
      },
      {
        id: 'radio_18_id_' + Math.random(),
        value: '中款',
        src: ''
      },
       {
        id: 'radio_18_id_' + Math.random(),
        value: '短款',
        src: ''
      }, {
        id: 'radio_18_id_' + Math.random(),
        value: '时尚款',
        src: ''
      }, {
        id: 'radio_18_id_' + Math.random(),
        value: '大众款',
        src: ''
      }, {
        id: 'radio_18_id_' + Math.random(),
        value: '单件款',
        src: ''
      }, {
        id: 'radio_18_id_' + Math.random(),
        value: '混搭款',
        src: ''
      }],
      answered: false
    }, {
      //十九题
      question_type: '复选',
      question_number: '18',
      question_value: '您有哪些日常形象场合的需要? [多选题]',
      question_model: [],
      question_options: [{
        id: 'radio_19_id_' + Math.random(),
        value: '严肃职场(召开会议/商务谈判/作报告等)',
        src: 'img/19-1.png'
      }, {
        id: 'radio_19_id_' + Math.random(),
        value: '时尚职场(日常上班/拜访客户等)',
        src: 'img/19-2.png'
      }, {
        id: 'radio_19_id_' + Math.random(),
        value: '时尚休闲(朋友逛街/闺蜜聚会/旅游休闲等)',
        src: 'img/19-3.png'
      }, {
        id: 'radio_19_id_' + Math.random(),
        value: '私密约会(结婚纪念/情人节庆祝/二人世界等)',
        src: 'img/19-4.png'
      }, {
        id: 'radio_19_id_' + Math.random(),
        value: '日宴社交(参加婚礼/小型酒会/生日聚会等)',
        src: 'img/19-5.png'
      }, {
        id: 'radio_19_id_' + Math.random(),
        value: '晚宴社交(走红毯/公司年庆/大型晚会/庆功表彰等)',
        src: 'img/19-6.png'
      }],
      answered: false
    }, {
      question_type: '复选',
      question_number: '19',
      question_value: '您喜欢或心仪的形象有哪些?/你有什么样的理想形象? [多选题]',
      question_model: [],
      question_options: [{
        id: 'radio_20_id_' + Math.random(),
        value: '乖巧、可爱、甜美、活泼的少女形象',
        src: 'img/20-1.png'
      }, {
        id: 'radio_20_id_' + Math.random(),
        value: '帅气十足、中性、直率、利落的少年形象',
        src: 'img/20-2.png'
      }, {
        id: 'radio_20_id_' + Math.random(),
        value: '精致、怡静、温柔、细致、素雅的优雅形象',
        src: 'img/20-3.png'
      }, {
        id: 'radio_20_id_' + Math.random(),
        value: '迷人、性感、妖媚、艳丽、女人味十足的浪漫形象',
        src: 'img/20-4.png'
      }, {
        id: 'radio_20_id_' + Math.random(),
        value: '放松、随意、朴素、亲切的自然形象',
        src: 'img/20-5.png'
      }, {
        id: 'radio_20_id_' + Math.random(),
        value: '端庄、严谨、上品、精致、有学识感的古典形象',
        src: 'img/20-6.png'
      }, {
        id: 'radio_20_id_' + Math.random(),
        value: '个性、时尚、另类,与众不同的前卫形象',
        src: 'img/20-7.png'
      }, {
        id: 'radio_20_id_' + Math.random(),
        value: '少数民族风情、异国风情的异域形象',
        src: 'img/20-8.png'
      }, {
        id: 'radio_20_id_' + Math.random(),
        value: '有存在感、大气、夸张、引人注目的戏剧形象',
        src: 'img/20-9.png'
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '20',
      question_value: ' 您自我评价日常气质是趋向哪个方向? [单选题] ',
      question_model: '',
      question_options: [{
        id: 'radio_21_id_' + Math.random(),
        value: '端庄雅致的气质',
        src: 'img/21-1.png'
      }, {
        id: 'radio_21_id_' + Math.random(),
        value: '个性另类的气质',
        src: 'img/21-2.png'
      }, {
        id: 'radio_21_id_' + Math.random(),
        value: '居于两者之间',
        src: 'img/21-3.png'
      }, {
        id: 'radio_21_id_' + Math.random(),
        value: '我不清楚',
        src: 'img/21-4.png'
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '21',
      question_value: ' 您日常的动作偏多或偏少? [单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_22_id_' + Math.random(),
        value: '动作偏多',
        src: ''
      }, {
        id: 'radio_22_id_' + Math.random(),
        value: '动作偏少',
        src: ''
      }, {
        id: 'radio_22_id_' + Math.random(),
        value: '不多不少,居中',
        src: ''
      }, {
        id: 'radio_22_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '22',
      question_value: ' 您日常的动作幅度偏大或偏小? [单选题] ',
      question_model: '',
      question_options: [{
        id: 'radio_23_id_' + Math.random(),
        value: '动作幅度较大',
        src: ''
      }, {
        id: 'radio_23_id_' + Math.random(),
        value: '动作幅度较小',
        src: ''
      }, {
        id: 'radio_23_id_' + Math.random(),
        value: '不大不小,居中',
        src: ''
      }, {
        id: 'radio_23_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '23',
      question_value: '您日常说话偏多或偏少? [单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_24_id_' + Math.random(),
        value: '说话偏多',
        src: ''
      }, {
        id: 'radio_24_id_' + Math.random(),
        value: '说话偏少',
        src: ''
      }, {
        id: 'radio_24_id_' + Math.random(),
        value: '不多不少,居中',
        src: ''
      }, {
        id: 'radio_24_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '24',
      question_value: '您日常说话音量偏大或偏小? [单选题] ',
      question_model: '',
      question_options: [{
        id: 'radio_25_id_' + Math.random(),
        value: '音量偏大',
        src: ''
      }, {
        id: 'radio_25_id_' + Math.random(),
        value: '音量偏小',
        src: ''
      }, {
        id: 'radio_25_id_' + Math.random(),
        value: '不大不小,居中',
        src: ''
      }, {
        id: 'radio_25_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '25',
      question_value: '您在公众场合（朋友聚会等）属于什么样的角色？ [单选题] ',
      question_model: [],
      question_options: [{
        id: 'radio_26_id_' + Math.random(),
        value: '属于人气王的角色',
        src: ''
      }, {
        id: 'radio_26_id_' + Math.random(),
        value: '属于安静无存在感的角色',
        src: ''
      }, {
        id: 'radio_26_id_' + Math.random(),
        value: '居于两者之间',
        src: ''
      }, {
        id: 'radio_26_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '26',
      question_value: '你自我感觉气场是偏大还是偏小？ [单选题] ',
      question_model: '',
      question_options: [{
        id: 'radio_27_id_' + Math.random(),
        value: '偏大',
        src: ''
      }, {
        id: 'radio_27_id_' + Math.random(),
        value: '偏小',
        src: ''
      }, {
        id: 'radio_27_id_' + Math.random(),
        value: '居于两者之间',
        src: ''
      }, {
        id: 'radio_27_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '27',
      question_value: '您的日常言行举止偏优雅有礼或偏随意天性? [单选题] ',
      question_model: '',
      question_options: [{
        id: 'radio_28_id_' + Math.random(),
        value: '言行举止偏优雅有礼',
        src: ''
      }, {
        id: 'radio_28_id_' + Math.random(),
        value: '言行举止偏随意天性',
        src: ''
      }, {
        id: 'radio_28_id_' + Math.random(),
        value: '居于两者之间',
        src: ''
      }, {
        id: 'radio_28_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '28',
      question_value: '您的个性和言行举止偏男性或偏女性化? [单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_29_id_' + Math.random(),
        value: '偏女汉子',
        src: ''
      }, {
        id: 'radio_29_id_' + Math.random(),
        value: '偏女性化',
        src: ''
      }, {
        id: 'radio_29_id_' + Math.random(),
        value: '居中',
        src: ''
      }, {
        id: 'radio_29_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }, {
      question_type: '单选',
      question_number: '29',
      question_value: '你的谈吐趋于偏文雅或偏白话? [单选题]',
      question_model: '',
      question_options: [{
        id: 'radio_30_id_' + Math.random(),
        value: '谈吐偏文雅,有学识',
        src: ''
      }, {
        id: 'radio_30_id_' + Math.random(),
        value: '谈吐偏白话,接地气',
        src: ''
      }, {
        id: 'radio_30_id_' + Math.random(),
        value: '居中',
        src: ''
      }, {
        id: 'radio_30_id_' + Math.random(),
        value: '我不清楚',
        src: ''
      }],
      answered: false
    }]
  }
})