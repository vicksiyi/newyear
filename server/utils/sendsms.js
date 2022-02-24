var http = require('http');
var crypto = require('crypto');
var util = require('util');
var urlencode = require('urlencode');

class Sms {
    constructor(){
    }

    getSendSmsData(app_id, secretKey, template_sign, template_id, mobile, code,  URL) {
		var method = 'sms.message.send';
	    var version = '1.0';
	    var sign_type = 'MD5';
		var timestamp = this.getNowSceond();	

	    var biz_content = util.format('{"mobile":["%s"],"template_id":"%s","type":0,"sign":"%s","send_time":"","params":{"code":%s}}',
	          mobile, template_id, template_sign, code);
	    var sign = this.getSmssign(['app_id', 'biz_content', 'method', 'sign_type', 'timestamp', 'version', 'key'],
	              [app_id, biz_content, method, sign_type, util.format('%s', timestamp), version, secretKey]);

	    var ResponseStr = '?app_id=' + app_id + '&method=' + method  + '&version=' + version + '&timestamp=' + timestamp + '&sign_type=' + sign_type + '&sign=' + sign + '&biz_content=' + urlencode(biz_content);


		return ResponseStr;
	}

	getSmssign(paramNameList, paramValueList) {
		var result = '';
		for(let i1 =0; i1 < paramNameList.length; i1++){
			if(result != ''){
				result = result + '&';
			}	      
		    result = result + util.format('%s=%s', paramNameList[i1], paramValueList[i1]);
		}

		result = this.md5(result);

		return result.toUpperCase();
	}

	// 转为unicode 编码  
	encodeUnicode(str) {  
	    var res = [];  
	    for ( var i=0; i<str.length; i++ ) {  
	      res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);  
	    }  
	    return "\\u" + res.join("\\u");  
	}

	getNowSceond(){
		return Math.floor(Date.now() / 1000);
	}

	md5(content) {
		return crypto.createHash('md5').update(content).digest("hex");
	}
}

module.exports = Sms;