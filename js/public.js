/*
 * @Author: your name
 * @Date: 2020-12-05 11:16:39
 * @LastEditTime: 2020-12-14 09:14:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Ed
 * @FilePath: \oneproject_one\js\public.js
 * 搜索框关键字的实现
 */
// //补充当鼠标移入分类的时候，让二级菜单.menu_xia显示出来
// //获取元素
let fenglei = document.querySelector(".endfl");
let xlcd= document.querySelector(" .menu_xia");
fenglei.onmouseover=()=>{
xlcd.style.display = 'block';
}
xlcd.onclick=()=>{
xlcd.style.display ='none';
}
//当我点击右边的菜单栏top的时候，让页面从底部回到顶部
let wtwo = document.querySelector(".wtwo");
wtwo.onclick = function () {
scrollTo({
    top: 0,
    behavior: "smooth"
});
}
//搜索input下面的下拉菜单显示
// 当我获取input框焦点的，显示下拉菜单inputmeue,把下拉菜单的值。写到input框里面。
let inputmeue = document.querySelector('.inputmeue')
let ipt = document.querySelector("#ipte");
//获取焦点的时候，把 inputmeue显示
ipt.onfocus =()=>{
inputmeue.style.display='block';
}
//点击inputmeue的时候，让搜索的值写到input框里面
inputmeue.onclick=(e)=>{
ipt.value=e.target.innerText;
inputmeue.style.display='none';
}
//失去焦点时候。,让inputmeue隐藏
//input框关键字的实现
let keyWrod= document.querySelector(".keyWrod");
let list = document.querySelector(".list");
//在input框输入值的时候，显示keywrod
let script;
ipt.oninput = function () {
keyWrod.style.display = "block";
script = document.createElement('script');
script.src =
  `https://www.ymatou.com/products/api/getPreKeywordList?callback=fun&query=${ipt.value}&_=${Date.now()}`;
document.body.appendChild(script);
}
//每一次拿不到结果，就先打印看一下。
function fun(res) {
let data =res.result.Keywords;
let str = '';
data.forEach((item, index) => {
    str +=
        `<li class="gujz">${item}</li>`
})
list.innerHTML = str;
script.remove();
} 
//点击关键字的时候，把关键字写到input框里面， 让keyWrod.消失
keyWrod.onclick=(e)=>{
   //把当前点击的这个关键字给input框
   ipt.value=e.target.innerText;
   keyWrod.style.display = "none";
   inputmeue.style.display='none';
}

/*
渲染列表页的下拉菜单
 */
let menu_xia=document.querySelector('.menu_xia');
pAjax({
    url:'../api/getData.php',
    data:{
        start:3,
        len:15
    }
}).then(res=>{
    let str=' '
    res.list.forEach((item,index) => {
       str+=`
       <div class="hufu  fl">
       <div class="hufu_left">
              <a href="../html/list.html">
                  <h4><span class="fl hufup">${item.cat_id}  </span><span class="fl">></span></h4>
  
              </a>

              <a href="../html/list.html">
                  <p>${item.cat_one_id}</p>
              </a>
          </div>
      <div class="huf_right fr">
          <img src="${item.goods_big_logo}" alt="">
      </div>
  </div>
        `
    });
    menu_xia.innerHTML=str;
})



//猜你喜欢渲染
let linke = document.querySelector('#like');
let jiazai =document.querySelector('#jiazai');
 pAjax({
        url:'../api/getData.php',
        data:{
            start:9,
            len:20
        }
    }).then(resa=>{
      
        render3(resa.list)
    })
    
function render3(dataa){
    let stra =' ';
    dataa.forEach((item,index)=>{
        stra+=`
        <li>
            <a href=""><img src="${item.goods_big_logo}" alt=""></a>
            <p>${item.goods_name} </p>
           
            <p class="yen">&yen <i>${item.goods_price}</i></p>
        </li>
       
        `
    })
    linke.innerHTML=stra;
}

let jiazmm =document.querySelector('.load');
//start是页码，不能写大
let start = 2;
jiazai.onclick=()=>{
   
    pAjax({
        url:'../api/getData.php',
        data:{
            start,
            len:32
        }
    }).then(resb=>{
        
        renderb(resb.list);
        start++;
    })
}

function renderb(datab){
    let strb= ' ';
    datab.forEach((item,index)=>{
        strb+=`
        <li>
            <a href=""><img src="${item.goods_big_logo}" alt=""></a>
            <p>${item.goods_name} </p>
           
            <p class="yen">&yen <i>${item.goods_price}</i></p>
        </li>
        `
    })
    jiazmm.innerHTML+=strb;
}

 /**
  * 在首页点击购物车的时候，
  * 如果有登录带过来的cookie,就跳转到购物车，
  * 没有就提示说你需要登录才能查看购物车
  */
 let shoppingCart=document.querySelector('#shoppingCart');
 shoppingCart.onclick=()=>{
    let namee = getCookie('name');
    if(namee){
        location.href='./car.html';
    }
    if(!namee){
        alert('你需要登录才能查看购物车');
    }
   
 }
 