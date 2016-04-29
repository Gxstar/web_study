<?php
	$ip=file_get_contents("php://input");
    $ch = curl_init();
    $url = 'http://apis.baidu.com/apistore/iplookupservice/iplookup?ip=';
	$url = $url.$ip;
    $header = array(
        'apikey: c7e851615aab2e842f764e63c49c4b4d',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
	echo $res;
?>