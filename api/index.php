<?
/*
 * @Author: your name
 * @Date: 2020-10-26 18:01:12
 * @LastEditTime: 2020-12-08 21:31:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\api\index.php
 */
    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','goodsList');

    # 设置SQL语句
    $sql = "SELECT * FROM `goods`";

    # 执行SQL语句
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error' . mysqli_error());
    }
    # 数据的处理
    $dataArr = array();
    $row = mysqli_fetch_assoc($res);
    //把6条数据
    for($i=0;$i<10;$i++){
        array_push($dataArr,$row);
    $row = mysqli_fetch_assoc($res);
  }
    # $row 得到的是当前请求的6条数据
    echo json_encode(array(
    
    "list" => $dataArr,
  
  ));
?>