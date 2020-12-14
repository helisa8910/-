<?php
/*
 * @Author: your name
 * @Date: 2020-12-02 22:16:36
 * @LastEditTime: 2020-12-03 18:17:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\api\register.php
 */
    # 获取前端传递过来的参数
    $name = $_POST['userName'];
    $passWord = $_POST['passWord'];
    // $name="aa";
    // $passWord="12345";

    $con = mysqli_connect('localhost','root','123456','goodsList');
    // 先去数据库中对比这个用户名是否存在
    $sql1 = "SELECT * FROM `userlist` WHERE `username`='$name' AND `password`='$passWord'";
    $res1 = mysqli_query($con,$sql1);

    $row = mysqli_fetch_assoc($res1);
   
    if($row){
        print_r("用户名已经存在，请重新注册");
    }else{
        // 写插入数据的SQL语句
        $sql2 = "INSERT INTO `userlist` (`username`,`password`) VALUES ('$name','$passWord')";

        $res2 = mysqli_query($con,$sql2);
      
        if($res2){
            echo json_encode(array(
                "code" => 1,
                "message" => "注册成功"
              ));
        }else{
            echo json_encode(array(
                "code" => 0,
                "message" => "注册失败"
              ));
        }
    }
?>