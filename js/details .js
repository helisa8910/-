/*
 * @Author: your name
 * @Date: 2020-11-05 08:31:31
 * @LastEditTime: 2020-12-14 11:48:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\js\details .js
 */
/*
 *放大镜
 */
// let goodlist = [{
//         small: '../images1/img1_60x60.jpg',
//         medium: '../images1/img1_430x430.jpg',
//         big: '../images1/img1_750x1000.jpg'
//     },
//     {
//         small: '../images1/img2_60x60.jpg',
//         medium: '../images1/img2_430x430.jpg',
//         big: '../images1/img2_750x1000.jpg'
//     },
//     {
//         small: '../images1/img3_60x60.jpg',
//         medium: '../images1/img3_430x430.jpg',
//         big: '../images1/img3_750x1000.jpg'
//     },
//     {
//         small: '../images1/img4_60x60.jpg',
//         medium: '../images1/img4_430x430.jpg',
//         big: '../images1/img4_750x1000.jpg'
//     },
//     {
//         small: '../images1/img5_60x60.jpg',
//         medium: '../images1/img5_430x430.jpg',
//         big: '../images1/img5_750x1000.jpg'
//     }
// ];
// new Enlarge('.box', goodlist)
//====================================================放大镜渲染
//  把就登录两个字改成用户名
let login = document.querySelector('#login3');
let name = getCookie('name');
if (name) {
    login.innerText = name;
}
/**
  * 在祥情页点击购物车的时候，
  * 如果有登录带过来的cookie,就跳转到购物车，
  * 没有就提示说你需要登录才能查看购物车
  */
let shoppingCar1t=document.querySelector('#shoppingCart');
 shoppingCar1t.onclick=()=>{
    let namee = getCookie('name');
    if(namee){
        location.href='./car.html';
    }
    if(!namee){
        alert('你需要登录才能查看购物车');
    }
   
 }
 

/**
 拿列表页传过来的id渲染数据
 */

//获取url?号后面的参数，包括？在里面
let res = location.search;
//用正则去匹配id的值,匹配一个id等于后面的值。
let reg = /id=(\d+)/;
/*
//加圆括号能铺获到它的第二个值。？id=4,第二个值就是4
["id=4","4",index:1,]运行得出的结果
0:"id=4"
1:"4"
res.test(location.search)[1]就能拿到4
 */
if (!reg.test(location.search)) { //如果没有id就去列表页
    location.href = '../html/list.html'
}
let id = reg.exec(location.search)[1];
//拿到id，根据id获取数据，获取数据，发送ajax请求
pAjax({
    url: '../api/getDetail.php',
    data: {
        //id:id可以简写
        id
    }
}).then(res => { //渲染数据
   // console.log(res);
    rendHtml(res.detail);
    rendHtml1(res.detail);
    let goodlist = [
        {
        small: res.detail.goods_small_logo,
        medium: res.detail.goods_small_logo,
        big: res.detail.goods_big_logo
        

    },
{
    small: res.detail.goods_small_logo,
    medium: res.detail.goods_small_logo,
    big: res.detail.goods_big_logo
},
{
    small: res.detail.goods_small_logo,
    medium: res.detail.goods_small_logo,
    big: res.detail.goods_big_logo
},
{
    small: res.detail.goods_small_logo,
    medium: res.detail.goods_small_logo,
    big: res.detail.goods_big_logo
},
{
    small: res.detail.goods_small_logo,
    medium: res.detail.goods_small_logo,
    big: res.detail.goods_big_logo
}
]
    new Enlarge('.box', goodlist)

})
let box = document.querySelector('.box');
//渲染商品
let shoppingCar = document.querySelector('.shoppingCarc');
function rendHtml (data){
    shoppingCar.innerHTML=`
    <p>
    ${data.goods_name}
  </p>
 <p>价格：<span class="ps">&yen${data.goods_price}</span></p>

  <p>促销价：<span class="ps1">&yen${data.goods_number}</span></p>
  <p>规格分类：<span>${data.cat_id}</span></p>
  <p>
   
        <span>数量:</span>
            <span class="amount-widget">
            <span class="add " id="add" goodSnumber1=${data.goods_number}>+</span>
            <input type="text" value="1" class="amount add" id="zhi">
            <span class="add " id="jian">-</span>
            </span>
            <span class="amount-unit">件
            </span>
            <span class="stock" id="stock" data-stock="5538">剩余库存：<i id="s_content">${data.goods_number}</i>件<i class="weight"></i></span>
  </p>
  <p>
  <button class=" btn-lg" id="goshopping">立即购买</button>
  <button class=" btn-lg" id="addCar">加入购物车</button>
</p>
    ` 
}
//渲染商品祥情介绍
let spjs = document.querySelector('.spjs');
function rendHtml1(data1){
    spjs.innerHTML=`
         ${data1.goods_introduce}
    `
}
/**
 * 利用事件委托给shoppingCar绑定事件
 * 点击add的时候，input框里面的值在变化
 * 点击减的时候，input框里面的值在减
 * 点击立即购买的时候，就跳到购物车去购买
 * 点击加入购物车，如果已登录，就直接去购物车买
 * 如果没有登录，也是去登录页面登录成功之后，跳回购物车购买。
 * */
shoppingCar.onclick=function(e){
    e=e||window.event;
    let t = e.target;
   // console.log(zhi.value);
    //用zhi.value是拿不到值的，因为你点击一次的时候，要渲染一次。才能拿到值。只能
    //通过它的下一下兄弟元素来拿。
    if(t.id=='add'){
      zhi.value =  t.nextElementSibling.value*1+1
      //最高不能加到库存量goods_number
      goods_number=t.getAttribute('goodSnumber1');
      if (zhi.value >= goods_number) {
            zhi.value =  goods_number;
        }
      rendHtml(res.detail);
    }
    if(t.id=='jian'){
        zhi.value=t.previousElementSibling.value * 1 - 1;
        if (zhi.value <=1) {
            zhi.value = 1;
        }
        rendHtml(res.detail);
    }
    if(t.id=='goshopping'){
        location.href='../html/car.html'
    }
    if(t.id=='addCar'){
        /**
         * 添加商品到购物车里面
         * 把用户名和商品id传过去购物车，拿着用户名和id去渲染数据
         * 判断是否有登录,才能拿到用户名
         * 因为添加商品到购物车的时候，需要用到用户名和id
         * 没有登录去登录页面登录成功之后跳详情页
         * 
         */
       
        let login = getCookie('name');
        if(!login){
            location.href='./login.html';
            //给地址也带一个id
            localStorage.setItem('url4','./detail.html?id='+id);
            //如果没有登录，下面的的代码不用执行
            return
        }
        //如果有登录就去带着商品跳到购物车
        pAjax({
            url:'../api/addCarData.php',
            data:{
                username:login,
                goods_id:id 
            }
        }).then(res=>{
           alert('已添加到购物车')
        })
    }
}



