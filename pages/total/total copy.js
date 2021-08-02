// pages/total/total.js
import * as echarts from '../../ec-canvas/echarts';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        ecpie: {
            onInit: ''
        },
        ecline: {
            onInit: ''
        },
        expendByMonth: 0,
        incomeByMonth: 0,
        isShow: false,
        optionPie: {},
        optionLine: {}
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
        let _this = this
        if (wx.getStorageSync('qqjzItem')) {
            this.setData({isShow:true})
            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1
            let allData = wx.getStorageSync('qqjzItem')
            let expendByMonth = 0
            let incomeByMonth = 0
            allData.forEach((data) => {
                data.date.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/)
                if (year == RegExp.$1 && month == RegExp.$2) {
                    if (data.item === '支出') {
                        expendByMonth += parseFloat(data.inputNumValue)
                    } else if (data.item === '收入') {
                        incomeByMonth += parseFloat(data.inputNumValue)
                    }
                }
            })
            this.setData({ expendByMonth, incomeByMonth })

            let initChart = function (canvas, width, height, dpr) {
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                });
                canvas.setChart(chart);

                var option = {
                    backgroundColor: "#ffffff",
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [{
                        label: {
                            normal: {
                                fontSize: 14
                            }
                        },
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['20%', '40%'],
                        data: [{
                            value: _this.data.incomeByMonth,
                            name: '收入'
                        }, {
                            value: _this.data.expendByMonth,
                            name: '支出'
                        }]
                    }]
                };
                chart.setOption(option);
                return chart;
            }
            this.setData({ 'ecpie.onInit': initChart })

            let items = wx.getStorageSync('qqjzItem')
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

            let lineInit = function (canvas, width, height, dpr) {
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                });
                canvas.setChart(chart);

                var option = {
                    legend: {
                        data: ['收入', '支出'],
                        top: 50,
                        left: 'center',
                        // backgroundColor: 'red',
                        z: 100
                    },
                    grid: {
                        containLabel: true
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dateList,
                        // show: false
                    },
                    yAxis: {
                        x: 'center',
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        }
                        // show: false
                    },
                    series: [{
                        name: '收入',
                        type: 'line',
                        smooth: true,
                        data: incomeByDay
                    }, {
                        name: '支出',
                        type: 'line',
                        smooth: true,
                        data: expendByDay
                    }]
                };

                chart.setOption(option);
                return chart;
            }
            this.setData({ 'ecline.onInit': lineInit })
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