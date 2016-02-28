var crypto = require('crypto');
var config = require('./config/wechat.js');

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
  var result = {
    xml: {
      ToUserName: msg.xml.FromUserName[0],
      FromUserName: '' + msg.xml.ToUserName + '',
      CreateTime: new Date().getTime(),
      MsgType: 'text',
      //Content: '你好，你发的内容是「' + msg.xml.Content + '」。'
      Content: ''
    }
  }
  handlerMessage(msg,result);
  cb(null, result);
}

//处理消息
var handlerMessage = function(msg,result){
  var msgType = msg.xml.MsgType;
  var content = '';
  if(msgType == 'text'){
    content = '【我赌我坚持】请发送语音或者图片以完成今日打卡（图片为今日学习笔记，语音为口语练习记录）';
  }else if(msgType == 'image' || msgType == 'voice'){
    content = '【我赌我坚持】成功发送一条打卡记录，继续加油哦';
  }else if(msgType == 'event'){
    content = '【我赌我坚持】成功完成今天打卡.'
    console.log(msg.xml.EventKey);
  }
  result.xml.Content = content;
}
