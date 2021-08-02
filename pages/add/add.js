// pages/add/add.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: '',
        name: '',
        image: '',
        date: '',
        inputNumValue: '',
        inputTextValue: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this
        const eventChannel = this.getOpenerEventChannel()
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            _this.setData({ item: data.item, name: data.name, image: data.image })
        })

        var nowDate = new Date();
        var year = nowDate.getFullYear(), month = nowDate.getMonth() + 1, day = nowDate.getDate()
        this.setData({
            date: `${year}年${month}月${day}日`
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

    },
    onDateChange: function (e) {
        let strArray = e.detail.value.split("-");
        strArray = strArray.map(function (val) {
            if (val[0] == "0") {
                return (val = val.slice(1));
            } else {
                return val;
            }
        });
        let date = strArray.join("-").replace('-', '年').replace('-', '月') + '日'
        this.setData({ date })
    },
    onInput: function (e) {
        this.setData({ inputTextValue: e.detail.value })
    },
    onTapNum: function (e) {
        if (e.target.dataset.num) {
            if (e.target.dataset.num === '.') {
                if (!this.data.inputNumValue) {
                    return
                } else {
                    this.setData({ inputNumValue: this.data.inputNumValue + e.target.dataset.num })
                }
            } else {
                if (this.data.inputNumValue.includes('.')) {
                    let inputNumValue = this.data.inputNumValue
                    let num = inputNumValue.length - 1 - (inputNumValue.indexOf('.'))
                    if (num < 2) {
                        this.setData({ inputNumValue: this.data.inputNumValue + e.target.dataset.num })
                    }
                } else {
                    this.setData({ inputNumValue: this.data.inputNumValue + e.target.dataset.num })
                }
            }
            if (parseFloat(this.data.inputNumValue) === 0) {
                this.setData({ inputNumValue: '0.' })
            }

        }
    },
    onDelete: function () {
        if (this.data.inputNumValue !== '') {
            this.setData({ inputNumValue: this.data.inputNumValue.substring(0, this.data.inputNumValue.length - 1) })
        }
    },
    onSubmit: function () {
        console.log(parseFloat(this.data.inputNumValue))
        if (this.data.inputNumValue !== '' && parseFloat(this.data.inputNumValue) !== 0) {
            // let arr = wx.getStorageSync('qqjzItem') || []
            // arr.push({
            //     item: this.data.item,
            //     name: this.data.name,
            //     image: this.data.image,
            //     date: this.data.date,
            //     inputNumValue: this.data.inputNumValue,
            //     inputTextValue: this.data.inputTextValue
            // })
            // wx.setStorage({
            //     key: 'qqjzItem',
            //     data: arr,
            //     success: function (res) {
            //     },
            //     fail: function () {
            //         console.log('fail')
            //     }
            // })
            app.globalData.items.push({
                item: this.data.item,
                name: this.data.name,
                image: this.data.image,
                date: this.data.date,
                inputNumValue: this.data.inputNumValue,
                inputTextValue: this.data.inputTextValue
            })


            let totalByMonth = {}
            // function num() {
                const year = new Date().getFullYear()
                const month = new Date().getMonth() + 1
                let allData = app.globalData.items

                totalByMonth.expendByMonth = 0
                totalByMonth.incomeByMonth = 0
                allData.forEach((data) => {
                    data.date.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/)
                    if (year == RegExp.$1 && month == RegExp.$2) {
                        if (data.item === '支出') {
                            totalByMonth.expendByMonth += parseFloat(data.inputNumValue)
                        } else if (data.item === '收入') {
                            totalByMonth.incomeByMonth += parseFloat(data.inputNumValue)
                        }
                    }
                })
            // }
            // num()
            app.globalData.totalByMonth = totalByMonth


            let items = app.globalData.items
            let dateList = []
            items.forEach((list) => {
                if (!dateList.includes(list.date)) {
                    dateList.push(list.date)
                }
            })

            let incomeByDay = []
            let expendByDay = []
            for (let i = 0; i < dateList.length; i++) {
                incomeByDay[i] = 0
                expendByDay[i] = 0
            }
            items.forEach((item) => {
                let index = dateList.indexOf(item.date)
                if (item.item === '收入') {
                    incomeByDay[index] += parseFloat(item.inputNumValue)
                } else if (item.item === '支出') {
                    expendByDay[index] += parseFloat(item.inputNumValue)
                }
            })

            app.globalData.dateList = dateList
            app.globalData.incomeByDay = incomeByDay
            app.globalData.expendByDay = expendByDay

            wx.setStorage({
                key: 'qqjzItem',
                data: app.globalData.items,
                success: function (res) {
                },
                fail: function () {
                    console.log('fail')
                }
            })
            wx.switchTab({
                url: '../detail/detail',
            })
        }

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