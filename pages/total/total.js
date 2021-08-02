// pages/total/total.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
let interval = null
let interval1 = null
function initChart(canvas, width, height, dpr) {
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
                value: null,
                name: '收入'
            }, {
                value: null,
                name: '支出'
            }]
        }]
    };
    option.series[0].data[0].value = app.globalData.totalByMonth.incomeByMonth;
    option.series[0].data[1].value = app.globalData.totalByMonth.expendByMonth;
    chart.setOption(option, true);
    interval = setInterval(function () {
        option.series[0].data[0].value = app.globalData.totalByMonth.incomeByMonth;
        option.series[0].data[1].value = app.globalData.totalByMonth.expendByMonth;
        chart.setOption(option, true);
    }, 3000)

    return chart;
}

function lineInit(canvas, width, height, dpr) {
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
            data: [],
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
        },
        series: [{
            name: '收入',
            type: 'line',
            smooth: true,
            data: []
        }, {
            name: '支出',
            type: 'line',
            smooth: true,
            data: []
        }]
    };

    option.xAxis.data = app.globalData.dateList
    option.series[0].data = app.globalData.incomeByDay;
    option.series[1].data = app.globalData.expendByDay;
    chart.setOption(option, true);


    interval1 = setInterval(function () {
        option.xAxis.data = app.globalData.dateList
        option.series[0].data = app.globalData.incomeByDay;
        option.series[1].data = app.globalData.expendByDay;
        chart.setOption(option, true);
    }, 3000)
    return chart;
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ecpie: {
            onInit: initChart
        },
        ecline: {
            onInit: lineInit
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
        if (app.globalData.items.length>0) {
            this.setData({ isShow: true })
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
        clearInterval(interval)
        clearInterval(interval1)
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