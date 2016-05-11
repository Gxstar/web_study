$(function(){
	//设置页高
	var setPage=function(){
		var pageGroup=$(".page");
		var heightSet=window.innerHeight;
		pageGroup.css("height",heightSet);
	}
	var timeSet1=setInterval(setPage,'100');//让高度实时变动
//	当前页面位置
	var pageNum=1;
	//	页面滚动
	document.addEventListener("mousewheel",function(e){//给文档绑定鼠标滚动事件
		var data=e.wheelDelta;
		var address='#p';
		if (data>0) {
			pageNum--;
		} 
		else{
			pageNum++;
		}
		address=address+pageNum;
		$.scrollTo(address,1000);
	});
})