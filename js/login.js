/*
 * @Author: your name
 * @Date: 2020-12-02 20:46:04
 * @LastEditTime: 2020-12-12 16:00:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\js\login.js
 * 点击登录的时候，来到登录页面，判断数据库，没有登录名，没有就跳到注册去注册
 * 注册完之后。从注册页面在跳回登录页面登录。登录成功就回到
 */


//绑定表单提交事件
let form = document.querySelector('.denglu');
let username=document.querySelector('#username');
let password= document.querySelector('#password');
let cwu = document.querySelector('.cwu');
let cwu1=document.querySelector('.cwu1');
// //获取用户名，密码，验证码，
username.onchange = function () {
    //用户名是数字和字母组成，第一个字符只能为字母。长度是2-12位
    let userNameTest = /^[a-z][0-9A-Za-z]{1,11}$/i.test(username.value);
    if (!userNameTest) {
        cwu.innerHTML = '用户名只能由数字和字母组成，第一个字符只能为字母。长度是1-12位'
        cwu.style.color='red';
        cwu.style.fontSize='8px'
        
    } 
}
password.onchange = function () {
    //是非空白字符组成，长度是6-18位。
    //密码是6-18位
    let passwordTest = /^[^\s]{6,18}$/.test(password.value);
    if (!passwordTest) {
        cwu1.innerHTML = '密码是6-18位,非空白字符组成'
        cwu1.style.color='red';
        cwu1.style.fontSize='8px'
    } 
}

// //点击button登录的时候，tel,密码， 和复选框有没有沟上。沟上才能登录。
// let login=document.querySelector('#login2');



form.onsubmit = async function (e) {
    //console.log(1);
    e = e || window.event;
    //表单有个默认提交事件，所以要阴止表单默认事件
    e.returnValue = false;
    // 发送ajax请求判断是否登录成功
    let res = await pAjax({
        url: '../api/login.php',
        type: 'post',
        data: {
            username: username.value,
            password: password.value
        }
    })
    if (res.code === 1) {
      //如果登录成功，获取从首页带过来的url
      //获取购物车来的路径
      let url5= localStorage.getItem('url5');
      if(url5){
        location.href=url5;
        localStorage.removeItem('url5');
    }
        //获取首页的路径
        let url=localStorage.getItem('url');
        //获取祥情页来的路径
        let url4=localStorage.getItem('url4');
        if(url4){
            location.href=url4;
            localStorage.removeItem('url4');
        }
   //设置cookie的用户名
      setCookie('name',username.value);
     
      //判断登录成功之后，判断input的checkbox为true的时候，设置14天免登录
      let inpt=document.querySelector('#inpt');
      if(inpt.checked==true){
        setCookie('seven', 'even',14*24*60*60);
      }
        if(url){
            //从首页来，就回到首页
            location.href=url;
            //登录成功并且有跳转的时候把url的这个cookie值清除
            localStorage.removeItem('url');
        }
    }
    //如果登录不成功，表示没有注册，要跳到注册页面。注册。注册完了之后跳到登录页面。
    if(res.code==0){
        localStorage.setItem('urll','login.html');
        location.href='../html/register.html';
    }
    //如果我沟选两周内自动登录的时候，在登录的后端设置17天免登录
    
}
