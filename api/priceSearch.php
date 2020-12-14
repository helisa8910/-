
<?php
    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','goodsList');
    $zOne= $_GET['zOne'];
    $zTwo=$_GET['zTwo'];
    // $zOne=100;
    // $zTwo=200;
    # 设置SQL语句
    $sql = "SELECT * FROM `goods` WHERE `goods_price` BETWEEN  '$zOne' AND '$zTwo' ";
  
    # 执行SQL语句
    $res = mysqli_query($con,$sql);
    // print_r($res);

    if(!$res){
        die('error' . mysqli_error($con));
    }
    # 数据的处理
    $dataArr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($dataArr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    print_r(json_encode($dataArr) );
?>

