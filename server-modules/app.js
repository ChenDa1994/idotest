/**
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 *
 * @author wangxiao
 */

'use strict';

const domain = require('domain');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const AV = require('leanengine');
const app = express();

// babel 编译
require('babel-core/register');

// 各个模块
const apiRouter = require('./api-router');
const tool = require('./tool');
const config = require('./config');


// 设置 view 引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(express.static('public'));

// 使用 LeanEngine 中间件
app.use(AV.Cloud);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// 未处理异常捕获 middleware
app.use((req, res, next) => {
  let d = domain.create();
  d.add(req);
  d.add(res);
  d.on('error', (err) => {
    console.error('uncaughtException url=%s, msg=%s', req.url, err.stack || err.message || err);
    if (!res.finished) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json; charset=UTF-8');
      res.end('uncaughtException');
    }
  });
  d.run(next);
});

// 跨域支持
app.all('/api/*', (req, res, next) => {
  const origin = req.headers.origin;
  if (config.whiteOrigins.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  }
  next();
});

// api
app.use('/api', apiRouter);

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use((req, res, next) => {
  res.sendFile(path.dirname(require.main.filename) + '/public/index.html');
  // res.status(404);
});
//chendabegin
// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/weixin', function(req, res) {
  console.log('weixin req:', req.query);
  weixin.exec(req.query, function(err, data) {
    if (err) {
      return res.send(err.code || 500, err.message);
    }
    return res.send(data);
  });
})

app.post('/weixin', function(req, res) {
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
app.listen();
//chendaend

module.exports = app;
