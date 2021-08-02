// app.js
import * as echarts from './ec-canvas/echarts';

let totalByMonth = {}

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
let allData = wx.getStorageSync('qqjzItem')
if (wx.getStorageSync('qqjzItem')) {
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
}



let items = wx.getStorageSync('qqjzItem')
let dateList = []

let incomeByDay = []
let expendByDay = []
if (wx.getStorageSync('qqjzItem')) {

    items.forEach((list) => {
        if (!dateList.includes(list.date)) {
            dateList.push(list.date)
        }
    })

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
}


App({
    onLaunch() {
        const qqjzItem = wx.getStorageSync('qqjzItem') || []
        wx.setStorageSync('qqjzItem', qqjzItem)
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        items: wx.getStorageSync('qqjzItem') || [],
        totalByMonth: totalByMonth || {},
        dateList: dateList || [],
        incomeByDay: incomeByDay || [],
        expendByDay: expendByDay || []
    }
})


