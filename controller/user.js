const moment = require('moment')

// 导入数据库模块
const conn = require('../db/index')


// 展示注册页面
const showRegisterPage = (req, res) => {

    // res.render()路径是根据模板views下路径
    res.render('./user/register.ejs', {})

}


// 展示登录页面
const showLoginPage = (req, res) => {

    // res.render()路径是根据模板views下路径
    res.render('./user/login.ejs', {})

}


// 注册新用户
const reg = (req, res) => {
    /**
     * 1.接收前端发送的post请求数据
     * 2.对接收数据进行解析
     * 3.对参数进行校验，是否合法性，是否重复
     * 4.数据库添加用户名 */

    const body = req.body


    // 判断用户输入数据是否完整
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: "请输入完整再注册用户", status: 501 })
    }


    // 查询用户名是否重复
    const sql1 = 'select count(*) as count from blog_users where username=?'
    conn.query(sql1, body.username, (err, result) => {
        if (err) return res.send({ msg: '用户查重失败！', status: 502 })
            // console.log(result)
        if (result[0].count !== 0) return res.send({ msg: "请更换其他用户名再重新注册", status: 503 })


        //注册业务逻辑
        body.ctime = moment().format('YYYY--MM--DD, HH:mm:ss')
        const sql2 = 'insert into  blog_users set?'

        console.log(body)

        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '注册用户失败！', status: 504 })
                // console.log(result)
            if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败！', status: 505 })
            res.send({ msg: "用户名注册成功", status: 200 })
        })

    })

}



// 登录请求
const Login = (req, res) => {
    // 获取表单数据
    const body = req.body
        // console.log(body)


    // 查询用户是否存在
    const sql1 = 'select * from blog_users where username=? and password=?'
    conn.query(sql1, [body.username, body.password], (err, result) => {
        // console.log(result)

        // 执行语句失败，登录失败
        if (err) return res.send({ msg: '登录用户失败！', status: 501 })

        // 如果查询结果，记录条数不为1，查询失败
        if (result.length !== 1) return res.send({ msg: '登录用户失败！', status: 501 })

        // 查询成功
        res.send({ msg: "ok", status: 200 })
    })


}

module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    Login
}