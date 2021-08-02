const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowExpend: true,
    expendSelected: true,
    expendList: [
      {
        id: 'canyin',
        name: '餐饮',
        image: '../../static/food.png'
      },
      {
        id: 'gouwu',
        name: '购物',
        image: '../../static/gouwu.png'
      },
      {
        id: 'jiaotong',
        name: '交通',
        image: '../../static/jiaotong.png'
      },
      {
        id: 'fushi',
        name: '服饰',
        image: '../../static/clothes.png'
      },
      {
        id: 'jiaoyu',
        name: '教育',
        image: '../../static/education.png'
      },
      {
        id: 'yule',
        name: '娱乐',
        image: '../../static/yule.png'
      },
      {
        id: 'yundong',
        name: '运动',
        image: '../../static/yundong.png'
      },
      {
        id: 'shenghuojiaofei',
        name: '生活缴费',
        image: '../../static/shenghuojiaofei.png'
      },
      {
        id: 'lvxing',
        name: '旅行',
        image: '../../static/lvyou.png'
      },
      {
        id: 'chongwu',
        name: '宠物',
        image: '../../static/chongwu.png'
      },
      {
        id: 'yiliao',
        name: '医疗',
        image: '../../static/yiliao.png'
      },
      {
        id: 'baoxian',
        name: '保险',
        image: '../../static/baoxian.png'
      },
      {
        id: 'gongyi',
        name: '公益',
        image: '../../static/gongyi.png'
      },
      {
        id: 'fahongbao',
        name: '发红包',
        image: '../../static/hongbao.png'
      },
      {
        id: 'zhuanzhang',
        name: '转账',
        image: '../../static/zhuanzhang.png'
      },
      {
        id: 'qita',
        name: '其他',
        image: '../../static/qita.png'
      }
    ],
    incomeList: [
      {
        id: 'gongzi',
        name: '工资',
        image: '../../static/gongzi.png'
      },
      {
        id: 'jiangjin',
        name: '奖金',
        image: '../../static/jiangjin.png'
      },
      {
        id: 'shouhongbao',
        name: '收红包',
        image: '../../static/hongbao.png'
      },
      {
        id: 'shouzhuanzhang',
        name: '收转账',
        image: '../../static/zhuanzhang.png'
      },
      {
        id: 'qita',
        name: '其他',
        image: '../../static/qita.png'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  changTab: function () {
    this.setData({ isShowExpend: !this.data.isShowExpend, expendSelected: !this.data.expendSelected })

  },
  onTapItem(e) {
    wx.navigateTo({
      url: '../add/add',
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { item: e.currentTarget.dataset.item, name: e.currentTarget.dataset.name,image:e.currentTarget.dataset.image })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})