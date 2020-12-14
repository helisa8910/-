/*
 * @Author: your name
 * @Date: 2020-10-28 17:18:25
 * @LastEditTime: 2020-12-12 11:32:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\js\index.js
 * 从首页点击登录， 跳转到登录页面。
 * 带一个cookie的值，给登录页面
 */
let login = document.querySelector('#login1');
login.onclick = () => {
    //跳转到登录页面 
    localStorage.setItem('url', './index1.html');
    location.href = './html/login.html';
}
//  把就登录两个字改成用户名

let name = getCookie('name');
if (name) {
    login.innerText = name;
}
// //补充当鼠标移入分类的时候，让二级菜单.menu_xia显示出来
// //获取元素
// let fenglei1 = document.querySelector(".endfl");
// let xlcd = document.querySelector(" .menu_xia");
// // let hufu=document.querySelector(".hufu");
// // //当我鼠标移入fenglei的时候，让下拉菜单xlcd显示出来
// fenglei1.onmouseover = () => {
//     xlcd.style.display = 'block';
//     xlcd.onclick = () => {
//         xlcd.style.display = 'none';

//     }
// }
// //当我点击右边的菜单栏top的时候，让页面从底部回到顶部
// let wtwo = document.querySelector(".wtwo");
// wtwo.onclick = function () {
//     scrollTo({
//         top: 0,
//         behavior: "smooth"
//     });
// }
//搜索input下面的下拉菜单显示
// // 当我获取input框焦点的，显示下拉菜单inputmeue,把下拉菜单的值。写到input框里面。
// let inputmeue = document.querySelector('.inputmeue')

// let ipt = document.querySelector("#ipte");
// //获取焦点的时候，把 inputmeue显示
// ipt.onfocus = () => {
//     inputmeue.style.display = 'block';
// }
// //点击inputmeue的时候，让搜索的值写到input框里面
// inputmeue.onclick = (e) => {
//     ipt.value = e.target.innerText;
//     inputmeue.style.display = 'none';
// }
//失去焦点时候。,让inputmeue隐藏



// //input框关键字的实现
// let keyWrod = document.querySelector(".keyWrod");
// let list = document.querySelector(".list");
// //在input框输入值的时候，显示keywrod
// let script;
// ipt.oninput = function () {
//     keyWrod.style.display = "block";
//     script = document.createElement('script');
//     script.src =
//         `https://www.ymatou.com/products/api/getPreKeywordList?callback=fun&query=${ipt.value}&_=${Date.now()}`;
//     document.body.appendChild(script);
// }
// //每一次拿不到结果，就先打印看一下。
// function fun(res) {
//     let data = res.result.Keywords;
//     let str = '';
//     data.forEach((item, index) => {
//         str +=
//             `<li class="gujz">${item}</li>`
//     })
//     list.innerHTML = str;
//     script.remove();
// }
// // //点击关键字的时候，把关键字写到input框里面， 让keyWrod.消失
// keyWrod.onclick = (e) => {
//     //把当前点击的这个关键字给input框
//     ipt.value = e.target.innerText;
//     keyWrod.style.display = "none";
//     inputmeue.style.display = 'none';
// }

/*
    活动时间
    小时，分。秒
    lingone
    lingtwo
    lingthere
 假设活动时间还有36个小时47分20秒结束
 给定一个未来的固定时间
 不断通过定时器去获取当前的时间
 判断当前时间 和未来时间的时间差
 如果 两个时间的时间差为 0天0小时0分钟0秒 说明到规定的时间，可以活动结束
 
     */

//获取元素，渲染页面
let time = document.querySelector('#time');
//用定时器让页面的时间一直在动。
setInterval(() => {
    let dat1 = new Date('2020.12.30 12:30:33');
    let dat2 = new Date();
    let datec = timeDifference(dat1, dat2);
    time.innerHTML = ` <i class="icon  iconfont">&#xe6c1;</i>距离结束<span class="ling lingone">${datec.hours}</span><span
class="ling1">:</span><span class="ling lingtwo">${datec.min}</span><span class="ling1">:</span><span
class="ling lingthere">${datec.sec}</span>`
}, 1000);

/*
全求必买清单渲染数据
请球8条数据来渲染
用promisse来请求。用aysnc 和await来请求
*/
let list2 = document.querySelector('.list2');
let list1 = document.querySelector('.list1');


getDeta();
async function getDeta() {
    let res1 = await pAjax({
        url: '../api/getData.php',
        data: {
            start: 20,
            len: 8
        }
    })
    render(list1, res1.list.splice(0, 4));
    //用了8条数据，截取4条4条渲染
    render(list2, res1.list.splice(0, 4));

}

function render(ele, data) {
    let str = ' ';
    data.forEach(function (item, index) {
        str += `
            <li>
                <img src="${item.goods_big_logo}" alt="">
            </li>
    `
    })
    ele.innerHTML = str;
}


/*
渲染分类
用pajax请求
    
 */
let fnei = document.querySelector('.fnei');

pAjax({
    url: '../api/index.php',

}).then(res => {

    var strr = ' ';
    res.list.forEach((item, index) => {

        strr += `
            <div class=" bx classify">
           <div class="classifyfl fl">
               <img src="${item.goods_big_logo}" alt="">
               <p><i>${item.cat_id}</i></p>
           </div>
           <div class="classifyfr fr">
               <img src="./images/分类线条.png" alt="">
               <span>包治百病</span>
               <ul>
                   <li><img src="${item.goods_small_logo}" alt="">
                       <p>${item.cat_one_id}</p>
                   </li>
                   <li><img src="${item.goods_small_logo}" alt="">
                       <p>${item.cat_one_id}</p>
                   </li>
                   <li><img src="${item.goods_small_logo}" alt="">
                       <p>${item.cat_one_id}</p>
                   </li>
                   <li><img src="${item.goods_small_logo}" alt="">
                       <p>${item.cat_one_id}</p>
                   </li>
                   <li><img src="${item.goods_small_logo}" alt="">
                       <p>${item.cat_one_id}</p>
                   </li>
               </ul>
   
           </div>
           
   
       </div> 
      
           `

    })
    fnei.innerHTML = strr;

})

/*热卖地渲染 
landmark
*/
let landmark = document.querySelector('.landmark');
pAjax({
    url: '../api/getData.php',
    data: {
        start: 26,
        len: 4
    }
}).then(rest => {
    let str3 = ' ';
    rest.list.forEach(function (item) {
        str3 += `
      <ul>
      <li><a href="">
             <img src="${item.goods_big_logo}" alt="">
         </a></li>
     
 </ul> 
        `
    })
    landmark.innerHTML = str3;
})

