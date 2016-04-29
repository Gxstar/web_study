$(function(){
	$("form").click(function(e){
		e.preventDefault();
	})
	
	//图片轮播
	var t1=setInterval(carousel,'3000');
	function carousel(){
		var car=$("#carousel");
		var left=car.css("margin-left");
		if(parseInt(left)%200!=0){//消除有时候出现不是图片宽度200px整数倍的bug
			left=Math.round(parseInt(left)/200)*200+"px";
		}
		if(left>="-1200px"){
			left=parseInt(left)-200;
			left=left+"px";
		}
		else{
			left="0px";
		}
		car.css("margin-left",left);
	}
	
	//	显示时间(试试原生js)
	var t2=setInterval(showtime,'100');
	function showtime(){
		var ndate=document.getElementById("date");
		var nday=document.getElementById("day");
		var ntime=document.getElementById("time");
		var mydate=new Date();
		var datestr,timestr;
		datestr=mydate.getFullYear()+"年"+parseInt(mydate.getMonth()+1)+"月"+mydate.getDate()+"日";
		var day=mydate.getDay();
		var daystr=daytoday(day);
		ndate.innerText=datestr;
		nday.innerText=daystr;
		ntime.innerText=mydate.toLocaleTimeString();
	}
	
	//显示城市天气预报
	showcity();
})

//计算星期几
var daytoday=function(a){
	switch(a){
		case 0:
			b="星期日"
			break;
		case 1:
			b="星期一"
			break;
		case 2:
			b="星期二"
			break;
		case 3:
			b="星期三"
			break;
		case 4:
			b="星期四"
			break;
		case 5:
			b="星期五"
			break;
		case 6:
			b="星期六"
			break;
	}
	return b;
}
function showcity(){//查询当前城市名称
	var postip;
	$.getJSON("http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=",function(result,status){
		postip=result.Ip;//获取当前ip
		$.ajax({//获取当前城市名称
			type:"post",
			url:"getcity.php",
			async:true,
			data:postip,
			success: function(data){
				showweather(data);
			}
		});
	})
}
function showweather(result){//根据城市名称天气查询
	var obj=eval('('+result+')');
	var cwea=obj.retData.city;
	document.getElementById("city").innerHTML=obj.retData.province+"省"+cwea+"市";
	$.ajax({
		type:"post",
		url:"getweather.php",
		async:true,
		data:cwea,
		success:function(data){
			var wea=eval('('+data+')');
			var weainfo=wea.retData.weather;
			$('#temMin').html(wea.retData.l_tmp+"℃");
			$('#temMax').html(wea.retData.h_tmp+"℃");
			$('#weainfo').html(weainfo);
			$('#wind').html(wea.retData.WS);
			$('#updatetime').html(wea.retData.time);
			switch (weainfo){
				case "阴":
					$("#weaimg").attr('src','img/weather/5.png');
					break;
				case "小雨":case "中雨":case "大雨":case "暴雨":case "大暴雨":case "阵雨":case "特大暴雨":
				case "小到中雨":case "中到大雨":case "大到暴雨":case "暴雨到大暴雨":case "大暴雨到特大暴雨":
					$("#weaimg").attr('src','img/weather/1.png');
					break;
				case "雾":case "霾":
					$("#weaimg").attr('src','img/weather/2.png');
					break;
				case "多云":
					$("#weaimg").attr('src','img/weather/3.png');
					break;
				case "晴":
					$("#weaimg").attr('src','img/weather/6.png');
					break;
				case "雷阵雨":case "雷阵雨伴有冰雹":
					$("#weaimg").attr('src','img/weather/7.png');
					break;
				default:
					$("#weaimg").attr('src','img/weather/3.png');
					break;
			}
		}
	});
}
