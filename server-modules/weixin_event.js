/**
 * 处理微信发送来的事件的消息处理器
 *
 * @author yiliang.guo
 */
var msgConfig = require('./reply_config.js');

exports.handler = eventHandler

//处理时间消息接口
function eventHandler(msg, cb){
  var eventKey = msg.xml.EventKey[0];
  console.log('enventKey:' + eventKey);
  //基础消息模板
  var baseResult = getBaseResult(msg)
  baseResult.xml.MsgType = 'text' //目前不涉及其他消息类型

  console.log('key:' + eventKey);
  if(eventKey == 'CHECK_IN'){
    //每日打卡
    //扫描是否有文件
    baseResult.xml.Content = msgConfig.DAILY_CHECKIN_MSG(true);
    cb(null, baseResult);
  }else if(eventKey == 'JOIN_CLASS'){
    //加入计划
    saveUserObject(msg, baseResult, cb);
  }else{
    baseResult.xml.Content = msgConfig.UNKNOWN_MSG;
    cb(null, baseResult);
  }
}

function dailyCheckIn(msg, cb){
  //1. 扫描是否有打卡记录
  //  ~ 如果么有提示去打卡，否则不能打卡

  //2. 如果有至少一条打卡记录，完成打卡


}

function saveUserObject(msg, baseResult, cb){
  var openId = msg.xml.FromUserName[0];
  var user = new AV.User();
  user.set('username', openId);
  user.set('password', 'f32@ds*@&dsa'); //默认密码,目前不做任何功能使用
  user.signUp().then(function(user) {
    // 注册成功，可以使用了
    baseResult.xml.Content = msgConfig.JOIN_MSG(true);
    console.log(user);
    cb(null, baseResult);
  }, function(error) {
    // 失败了
    console.log('Error: ' + error.code + ' ' + error.message);
    baseResult.xml.Content = msgConfig.JOIN_MSG(false);
    cb(null, baseResult);
  });
}

//获取消息模板
function getBaseResult(msg){
  var result = {
    xml: {
      ToUserName: msg.xml.FromUserName[0],
      FromUserName: '' + msg.xml.ToUserName + '',
      CreateTime: new Date().getTime(),
      MsgType: '',
      Content: ''
    }
  };
  return result;
}

function getNewsResult(msg){
  var result = {
    xml: {
      ToUserName: msg.xml.FromUserName[0],
      FromUserName: '' + msg.xml.ToUserName + '',
      CreateTime: new Date().getTime(),
      MsgType: '',
      Content: ''
    }
  };
  return result;
}
