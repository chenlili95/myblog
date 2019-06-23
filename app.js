const express = require('express')
const app = express()

// 配置中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')

// 设置模板页面的存放路径
app.set('views', './views')

//node_modules 托管静态资源
app.use('/node_modules', express.static('node_modules'))

// 用户请求根目录页面
app.get('/', (req, res) => {
    res.render('index', {})
})

// 用户请求注册页面
app.get('/register', (req, res) => {

    // res.render()路径是根据模板views下路径
    res.render('./user/register.ejs', {})

})

// 用户请求登录页面
app.get('/login', (req, res) => {

    // res.render()路径是根据模板views下路径
    res.render('./user/login.ejs', {})

})

// 注册新用户表单

app.post('/register', (req, res) => {
    /**
     * 1.接收前端发送的post请求数据
     * 2.对接收数据进行解析
     * 3.对参数进行校验，是否合法性，是否重复
     * 4.数据库添加用户名 */

    console.log(req.body)

    res.send({ status: 200, msg: 'ok' })
})

// 启动
app.listen(3000, () => {
    console.log("服务器运行成功……")
})