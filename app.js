/*
 * @Author: ecitlm
 * @Date: 2017-12-06 16:20:03
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-06-29 22:10:37
 */
const express = require('express')
const app = express()
const router = express.Router()
app.use('/public', express.static('public')) // 设置静态资源地址
app.use('/docs', express.static('docs')) // 设置静态资源地址
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})
app.use('/', require('./routes/web/index'))
app.use('/api/bg/lists', require('./routes/api/bg/lists'))
// app.use('/api/bg/detail', require('./routes/api/photo/huaban'))
app.use(router)
app.listen(3001)
console.log('app start success port:3001')
module.exports = app
