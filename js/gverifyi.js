/*
 * @Author: your name
 * @Date: 2020-12-03 19:39:00
 * @LastEditTime: 2020-12-03 19:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\js\gverifyi.js
 * 调用的验证吗js
 */
  //初始化验证码
  let verifyCode = new GVerify({
    id: "picyzm",
    length: 4
});
//点击按钮验证
let code = document.getElementById("code_input");
let btn = document.getElementById("btn");
btn.onclick = function () {
    // 拿到验证的结果
    let res = verifyCode.validate(code.value);
    if (res) {
        alert("验证通过");
    } else {
        alert("验证码错误");
    }
}
