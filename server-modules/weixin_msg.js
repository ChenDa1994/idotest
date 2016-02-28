/**
 * 处理微信发送而来的消息的处理器
 *
 * @author yiliang.guo
 */

 var msgConfig = require('./reply_config.js');

 exports.handler = msgHandler

 //处理发送来的消息接口
function msgHandler(msg, cb){
   var msgType = msg.xml.MsgType;
   //基础消息模板
   var baseResult = getBaseResult(msg)
   baseResult.xml.MsgType = 'text' //目前不涉及其他消息类型
   if(msgType == 'text'){
     //目前文字消息统统过滤，获取默认消息回复
     baseResult.xml.Content = msgConfig.DEFAULT_MSG();
   }else if(msgType == 'voice'){
     baseResult.xml.Content = msgConfig.CHECKIN_MSG(true);
   }else if(msgType == 'image'){
     baseResult.xml.Content = msgConfig.CHECKIN_MSG(true);
   }else{
     baseResult.xml.Content = msgConfig.UNKNOWN_MSG;
   }
   return cb(null, baseResult);
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
