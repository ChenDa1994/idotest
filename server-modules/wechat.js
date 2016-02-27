/**
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 *
 * @author wangxiao
 */

// 一些工具方法
'use strict';

const tool = require('./tool');
const mrender = require('./tools/mrender')
const xml2js = require('xml2js')
var weixin = require('./weixin.js')

let pub = {};

// 测试服务是否通畅
pub.wechat_get = (req, res) => {
  console.log('weixin req:', req.query);
  weixin.exec(req.query, function(err, data) {
    if (err) {
      return res.send(err.code || 500, err.message);
    }
    return res.send(data);
  });
};

pub.wechat_post = (req, res) =>{
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
  })
};


module.exports = pub;
