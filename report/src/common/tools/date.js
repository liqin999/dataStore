
module.exports = {
  getNowDate: function(format,obj){//获得当前的日期的前N天和前N个月
    var currentdate='';
    var date = new Date();
    if(obj.d){//处理前一天
       date = new Date(date.getTime() - 24*60*60*1000*(obj.d));
     }
    var seperator1 = "/";
    var month = null;
    var year = date.getFullYear();
    var strDate =date.getDate();
    if(date.getMonth() == 0 && format == 'YM'){//如果是一年的第一个月，显示上年的12月
        year = year-1;
        month = obj.m ?  (12 - date.getMonth() - (obj.m-1))  : date.getMonth() + 1;
    }else{
        month = obj.m ? date.getMonth() - (obj.m-1) : date.getMonth() + 1;
    }
   
    if (month >= 1 && month <= 9) {
        month = "0" + month;
     }
     if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
     }
     if(format == 'YMD'){
        currentdate = year + seperator1 + month + seperator1 + strDate;
     }else if(format == 'YM'){
        currentdate = year + seperator1 + month;
     }
     
     return currentdate;
  },

  getNowDateTime:function(){//获得当前的日期和时间
  	var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
   },
   dateToMs:function(date){//时间格式转时间戳"2016-4-18 10:45:56"
   	   var getDate = function(strDate) {return date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')')};
       return Date.parse(new Date(getDate(date)));//毫秒
   },
   msToDateTime:function(ms){
	    var date = new Date(parseInt(ms));
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
	    var _date=Y+M+D;
	    return _date;
   }
 
};