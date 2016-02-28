/**
 * 处理微信发送来的事件的消息处理器
 *
 * @author yiliang.guo
 */
var msgConfig = require('./reply_config.js');

exports.handler = eventHandler

//处理时间消息接口
function eventHandler(msg){
  var eventKey = msg.xml.EventKey;
  //基础消息模板
  var baseResult = getBaseResult(msg)
  baseResult.xml.MsgType = 'text' //目前不涉及其他消息类型

  if(eventKey == 'CHECK_IN'){
    //每日打卡
    //扫描是否有文件
    baseResult.xml.Content = msgConfig.DAILY_CHECKIN_MSG(true);
  }else if(eventKey == 'JOIN_CLASS'){
    //加入计划
    saveUserObject(msg);
    baseResult.xml.Content = msgConfig.JOIN_MSG(true);
  }else{
    baseResult.xml.Content = msgConfig.UNKNOWN_MSG;
  }
  return baseResult;
}

function dailyCheckIn(msg, cb){
  //1. 扫描是否有打卡记录
  //  ~ 如果么有提示去打卡，否则不能打卡

  //2. 如果有至少一条打卡记录，完成打卡


}

function saveUserObject(msg){
  var openId = msg.xml.FromUserName[0];
  var user = new AV.User();
  user.set('username', openId);
  user.set('password', 'f32@ds*@&dsa'); //默认密码,目前不做任何功能使用
  user.signUp().then(function(user) {
    // 注册成功，可以使用了
    console.log(user);
  }, function(error) {
    // 失败了
    console.log('Error: ' + error.code + ' ' + error.message);
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
