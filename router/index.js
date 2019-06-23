const express = require('express')
const router = express.Router()

// 导入自己处理模块
const ctrl = require('../controller/index')

// 用户请求根目录页面
router.get('/', ctrl.showIndexPage)


module.exports = router