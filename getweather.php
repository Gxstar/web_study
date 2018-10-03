<?php
    $cityname=file_get_contents("php://input");
    $host = "https://saweather.market.alicloudapi.com";
    $path = "/area-to-weather";
    $method = "GET";
    $appcode = "7c8d0f6e622b4c2686feee09fd80ced0";
    $headers = array();
    array_push($headers, "Authorization:APPCODE " . $appcode);
    $querys = "area=".$cityname."&areaid=&need3HourForcast=0&needAlarm=0&needHourData=0&needIndex=0&needMoreDay=0";
    $bodys = "";
    $url = $host . $path . "?" . $querys;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_FAILONERROR, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($curl, CURLOPT_HEADER, true);
    if (1 == strpos("$".$host, "https://"))
    {
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    }
    $res=curl_exec($curl);
    echo $res;
?>