const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

// 配置中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// // 导入router/index.js路由模块
// const router1 = require('./router/index')
// app.use(router1)

// // 导入用户路由模块
// const router2 = require('./router/user')
// app.use(router2)


// 循环自动注册路由模块
// 先读取router目录文件
fs.readdir(path.join(__dirname, './router'), (err, filename) => {
    if (err) return console.log("读取路由目录失败")
        // console.log(filename)
        // 循环router目录下每一个文件名
    filename.forEach(fname => {
        // 每循环一次，拼接一个完整的路由模块
        // console.log(path.join(__dirname, './router', fname))
        const router = require(path.join(__dirname, './router', fname))
        app.use(router)
    })
})




// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')

// 设置模板页面的存放路径
app.set('views', './views')

//node_modules 托管静态资源
app.use('/node_modules', express.static('node_modules'))





// 启动
app.listen(3000, () => {
    console.log("服务器运行成功……")
})