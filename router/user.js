const express = require('express')
const router = express.Router()




// 导入用户相关模块
const ctrl = require('../controller/user')

// 用户请求注册页面
router.get('/register', ctrl.showRegisterPage)

// 用户请求登录页面
router.get('/login', ctrl.showLoginPage)

// 注册新用户表单
router.post('/register', ctrl.reg)



// 监听登录请求
router.post('/login', ctrl.Login)




module.exports = router