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
    baseResult.xml.Content = msgConfig.DAILY_CHECKIN_MSG(true);
  }else if(eventKey == 'JOIN'){
    //加入计划
    baseResult.xml.Content = msgConfig.JOIN_MSG(true);
  }else{
    baseResult.xml.Content = msgConfig.UNKNOWN_MSG;
  }
  return baseResult;
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
