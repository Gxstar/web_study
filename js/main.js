$(function(){
	$("form").click(function(e){
		e.preventDefault();
	})
	$.ajax({//获取当前城市名称
			type:"post",
			url:"getinfo.php",
			data:returnCitySN["cip"],
			async:true,			
			success: function(data){
				var obj=eval('('+data+')');
				if (obj.data.county!="XX") {
					showweather(obj.data.county);
				}
				else if(obj.data.city!="XX"){
					showweather(obj.data.city);
				}
				else{
					showweather(obj.data.region);
				}
		}
	});

	//图片轮播
	var t1=setInterval(carousel,'8000');
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
	var t2=setInterval(showtime,'1000');
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
	

	//手动查询城市天气
	$("#inquire").click(function(){
		var incity=$("#incityname").val();
		showweather(incity);
	})
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

function showweather(cwea){//根据城市名称天气查询
	var result=cwea;
	$.ajax({
		type:"post",
		url:"getweather.php",
		async:true,
		data:result,
		success:function(data){
			var wea=eval('('+data+')');
			if(wea.showapi_res_code!=0){
				alert("城市输入错误");
			}
			else{
				document.getElementById("city").innerHTML=wea.showapi_res_body.cityInfo.c3;
				var weainfo=wea.showapi_res_body.now.weather;
				$('#temNow').html(wea.showapi_res_body.now.temperature+"℃");
				$('#weainfo').html(weainfo);
				$('#wind').html(wea.showapi_res_body.now.wind_direction);
				$('#updatetime').html(wea.showapi_res_body.now.temperature_time);
				$("#weaimg").attr('src',wea.showapi_res_body.now.weather_pic);
			}
		}
	});
}