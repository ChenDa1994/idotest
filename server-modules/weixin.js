var crypto = require('crypto');
var config = require('./config/wechat.js');
var eventHandler = require('./weixin_event.js')
var msgHandler = require('./weixin_msg.js')

exports.exec = function(params, cb) {
  if (params.signature) {
    checkSignature(params.signature, params.timestamp, params.nonce, params.echostr, cb);
  } else {
    receiveMessage(params, cb)
  }
}

// 验证签名
var checkSignature = function(signature, timestamp, nonce, echostr, cb) {
  var oriStr = [config.token, timestamp, nonce].sort().join('')
  var code = crypto.createHash('sha1').update(oriStr).digest('hex');
  if (code == signature) {
    cb(null, echostr);
  } else {
    var err = new Error('Unauthorized');
    err.code = 401;
    cb(err);
  }
}

// 接收普通消息
var receiveMessage = function(msg, cb) {
  var msgType = msg.xml.MsgType;
  if(msgType === 'event'){
    cb(null, eventHandler.handler(msg));
  }else{
    cb(null, msgHandler.handler(msg));
  }
}
