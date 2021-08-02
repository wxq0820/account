// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateList: [],
        listByTime: {},
        incomeTotal: {},
        expendTotal: {},
        isShowPage: false
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
        if (wx.getStorageSync('qqjzItem').length>0) {
            
            let items = wx.getStorageSync('qqjzItem')
            let dateList = []
            items.forEach((list) => {
                if (!dateList.includes(list.date)) {
                    dateList.push(list.date)
                }
            })

            let listByTime = {}
            dateList.forEach((date) => {
                listByTime[date] = []
                for (let i = 0; i < items.length; i++) {
                    if (date === items[i].date) {
                        listByTime[date].push(items[i])
                    }
                }
            })

            let expendTotal = {}
            let incomeTotal = {}
            for (let i in listByTime) {
                expendTotal[i] = 0
                incomeTotal[i] = 0
                listByTime[i].forEach((list) => {
                    if (list.item === '支出') {
                        expendTotal[i] += parseInt(list.inputNumValue)
                    } else if (list.item === '收入') {
                        incomeTotal[i] += parseInt(list.inputNumValue)
                    }
                })
            }
            this.setData({ dateList, listByTime, expendTotal, incomeTotal, isShowPage: true })
        }
        
        console.log(this.data.isShowPage)
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