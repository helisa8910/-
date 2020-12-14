/*
 * @Author: your name
 * @Date: 2020-12-02 22:23:21
 * @LastEditTime: 2020-12-11 19:38:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\js\register.js
 * 从登录页面过来注册页面，注册成功返回登录页面
 * ？？？？这么知道之前从登录页面过来。
 * 跳转的时候，带一个locastrage登录页面的网址来注册页面。
 * 注册成功之后，把loacstrage给删除掉。跳转回以前的页面。
 * 把当前用户名和密码添加到数据库。
 */
// //获取元素
let form = document.querySelector('.telzhufl');
let userName=document.querySelector('#userName');
let passWord= document.querySelector('#passWrod');
//使用jQ的插件来实现正则判断==========
//验证的有手机号码tel，登录密码passwrod，确认密码qrpasswrod，用户名username。打沟 IsAgreeContract
// 给validate自定验证规则
 // jQuery.validator.addMethod(名字,函数,'验证错误的提示信息')
        jQuery.validator.addMethod('testTel', function (value) {
            let reg =  /^1[3,5,6,7,8]\d{9}$/;
           
            if (reg.test(value)) {
                return true
            } else {
                return false
            }
        }, '你填写的手机号码不对');
        $('#telzhu').validate({
            // 填写的输入框验证的规则rules
            rules: {
                // 就是input的name属性的属性值来验证
                username: {
                    //提示信息,用户名最大长度12，最小6
                    required: true,
                    maxlength: 12,
                    minlength: 6
                },
                passwrod: {
                    //登录密码最低6位，最大12位
                    required: true,
                    maxlength: 12,
                    minlength: 6
                },
                qrpasswrod:{
                    required: true,
                     // 确认密码，是否跟上一个密码一样
                    equalTo: "#passWrod",
                },
                tel:{
                    required: true,
                    testTel: true
                }
          },
            // 当不满足规则的是 编写的提示信息
          messages: {
             username: {
               required: '用户名必填',
                 maxlength: '用户的最大长度只能为12位',
                 minlength: '用户名不能低于6位字符'
              },
               passWord: {
                  required: '用户名必填',
                  maxlength: '用户的最大长度只能为12位',
                  minlength: '用户名不能低于6位字符' ,
                 minlength: '用户名不能低于6位字符',
                 remote: "*",
                },
                tel: {
                    required: '用户名必填项',
                    testTel: '手机号格式不正确'
                }
            },
            submitHandler: function () {
               // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
               // 一般用跟后端进行数据交互 
              
                form.onsubmit = async function (e) {
                    e = e || window.event;
                    //表单有个默认提交事件，所以要阴止表单默认事件
                    e.returnValue = false;
                    // 发送ajax请求判断是否登录成功
                    let res = await pAjax({
                        url: '../api/register.php',
                        type: 'post',
                        data: {
                            userName: userName.value,
                            passWord: passWord.value,
                        }
                    })
                        if (res.code === 1) {
                            //获取登录的路径
                            let urlr=localStorage.getItem('urll');
                            console.log(urlr);
                            if(urlr){
                         //  从登录页面来，就回到登录页面
                           
                              location.href=urlr;
                                //登录成功并且有跳转的时候把urlr的这个cookie值清除
                                localStorage.removeItem('urlr');
                          }
                        }
                         //如果登录不成功，表示没有注册，要跳到注册页面。注册。注册完了之后跳到登录页面。
                          if(res.code==0){
                            location.href='../html/register.html';
                        }
                 }
                
            }
        });




