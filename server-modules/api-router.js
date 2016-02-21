/**
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 *
 * @author wangxiao
 */

// 所有 API 的路由

'use strict';

const router = require('express').Router();
var xml2js = require('xml2js');
var utils = require('utils');
// 添加一个模块
const weixin = require('./weixin');
const hello = require('./hello');
// 一个 API 路由下的 hello 接口，访问 /api/hello
router.get('/hello',hello.hello);
//chendabegin
// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
router.get('/hallo', function(req, res) {
  res.render('hallo', { message: 'Congrats, you just set up your app!' });
});

router.get('/weixin', function(req, res) {
  console.log('weixin req:', req.query);
  weixin.exec(req.query, function(err, data) {
    if (err) {
      return res.send(err.code || 500, err.message);
    }
    return res.send(data);
  });
})

router.post('/weixin', function(req, res) {
  console.log('weixin req:', req.body);
  weixin.exec(req.body, function(err, data) {
    if (err) {
      return res.send(err.code || 500, err.message);
    }
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(data);
    console.log('res:', data)
    res.set('Content-Type', 'text/xml');
    return res.send(xml);
  });
})
// 最后，必须有这行代码来使 express 响应 HTTP 请求
//app.listen();
//chendaend
// 测试 async/await 支持
// const f = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(123);
//     }, 2000);
//   });
// };

// const testAsync = async () => {
//   const t = await f();
//   console.log(t);
// };

// testAsync();

module.exports = router;
