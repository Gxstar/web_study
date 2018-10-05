<?php
	// 1. 初始化
	$ch = curl_init();
	$ip=file_get_contents("php://input");
	$url="http://ip.taobao.com/service/getIpInfo.php?ip=".$ip;
	// 2. 设置选项，包括URL
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_HEADER,0);
	// 3. 执行并获取HTML文档内容
	$output = curl_exec($ch);
	if($output === FALSE ){
		echo "CURL Error:".curl_error($ch);
	}
	else{
		echo $output;
	}
	// 4. 释放curl句柄
	curl_close($ch);
?>
