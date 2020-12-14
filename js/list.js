/*
 * @Author: your name
 * @Date: 2020-11-03 16:56:37
 * @LastEditTime: 2020-12-14 11:16:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\js\list.js
 */
//  把就登录两个字改成用户名
let login = document.querySelector('#login2');
let name = getCookie('name');
if (name) {
    login.innerText = name;
}

/*
实现功能1
当我点击更多的时候，让显示的盒子出来，父元素的高度改成auto,由内容撑开。
当我点击更多的时候，让收起那个盒子显示。
当我点击收起的时候，让更多显示出来。
*/
//获取自己所需要的元素
//获取品牌的第一个大盒子
var brandone = document.querySelector('.brandone');
//获取最左边边品牌的那个盒子
var ulfl = document.querySelector('.ulfl');
//获取brandone里面的中间哪个盒子
var ulceter = document.querySelector('.ulceter');
//获取brandone里面最右边的更多的盒子
var ulfr = document.querySelector('.ulfr');
//获取收起的那个盒子
var atwo = document.querySelector('.atwo');
//获取隐藏的那个商品品牌的那个盒子
var  ulfrej = document.querySelector('.ulfrej');

//给更多那个盒子注册点击事件。
ulfr.onclick = function (){
 brandone.style.height='auto';
 brandone.style.height='135px';
 ulfrej.style.display='block';
 ulfl.style.height='135px';
 atwo.style.display='block';
 ulfr.style.display='none';
}
//给收起注册点击事件
atwo.onclick = function(){
    ulfr.style.display='block';
    atwo.style.display='none';
    brandone.style.height='80px';
    ulfl.style.height='80px';
    ulfrej.style.display='none';
}

/*
渲染品牌
 */
let ceter = document.querySelector('#ulceter');
let frej = document.querySelector('#ulfrej');
getData();
async function getData(){
   let resq = await pAjax({
        url:'../api/getData.php',
        data:{
            start:4,
            len:30
        }
    })
    rander(ceter,resq.list);
}
function rander(ele,data){
    let str1=' ';
    data.forEach(function(item,index){
        str1+=`
        <li><a href="">${item.cat_three_id}</a></li>
        `
    })
   ele.innerHTML=str1;
}

pAjax({
    url:'../api/getData.php',
        data:{
            start:5,
            len:30
        }
}).then(res2=>{
    let str2 =' ';
    res2.list.forEach((item)=>{
        str2+=`
        <li><a href="">${item.cat_three_id}</a></li>
        `
    })
    frej.innerHTML=str2;
})
/*
渲染面部护肤
 */
let ulf1 = document.querySelector('#jinghua');
pAjax({
    url:'../api/getData.php',
        data:{
            start:6,
            len:20
        }
}).then(res3=>{
    let str3 =' ';
    res3.list.forEach((item)=>{
        str3+=`
        <li class="fl"><a href="">${item.cat_three_id}</a></li>
        `
    })
    ulf1.innerHTML=str3;
})
/*
渲染地区
 */
let meiguo = document.querySelector('#meiguo');
pAjax({
    url:'../api/getData.php',
        data:{
            start:7,
            len:20
        }
}).then(res4=>{
    let str4 =' ';
    res4.list.forEach((item)=>{
        str4+=`
        <li ><a href="">${item.cat_three_id}</a></li>
        
        `
    })
    meiguo.innerHTML=str4;
})

/*
渲染列表，
用分页器
每一页50个数据
默认显示第一页
 */
/**
 * 渲染分页器
 * 要去数据库把总数拿出来。
 * 一页显示50条数据。
 */
let page= document.querySelector(".page");

//设置页码默认值
let defaultInfo={
    len:50,
    num:1
}
pAjax({
    url:'../api/getData.php',
    data:{
        start:defaultInfo.num,
        len:defaultInfo.len
    }
}).then((res5)=>{
    //第1页渲染50条数据。第2页也渲染50条数据。
    new Pagination(page,{
        pageInfo: {
            pagenum: 1, // 当前页数
            pagesize: defaultInfo.len, // 每页多少条
            total: res5.total ,// 数据总数
            totalpage:Math.ceil(res5.total/defaultInfo.len) // 页码总数是总的数量total/30得到有多少个渲染的页面。但是30没有。上面的len30是传的通参
            //下面不可用。所以要给个默认值。`
          },
          textInfo: {
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '未页'
          },
          //上面是渲染页码数
          //change它的值是一个函数。
          change:function (num){
              //change没有点击的时候，都会执行一次。
            //  console.log(num);
              //num获当前点击的那个页码数

              //正常情况下，点击一次，获取页码数发送一次ajax请求
            defaultInfo.num=num;
            //想在点击的时候获取数据。就调用
               getData2();
                //点击的时候，数据加载成功之前，让滚动条回到顶部
               // scrollTo(0,0)
            }
    });
})

//发起ajax请求
//请求数据放在页码里面。
let lists = document.querySelector(".render");
async function getData2(){
    let res6 = await pAjax({
        url:'../api/getData.php',
        data:{
            start:defaultInfo.num,
            len:defaultInfo.len
        }
    });
    renderHtml(res6.list);//把结果传过来。是拿res.下面的list渲染
}
function renderHtml(data){
    let str6 = '';
    data.forEach((item,index)=>{
        str6 += ` 
        <ul>
        <li>
                <a href="./details%20.html?id=${item.goods_id}">
                <img src="${item.goods_big_logo}" alt="">
            </a>
         </li>
        <li class="spriceone"><span class="sprice">&yen&nbsp;&nbsp;${item.goods_price}</span><span class="ssprice fr">包邮包税</span></li>
          <li class="renderthere"><a href="">${item.goods_name}</a></li>
         <li class="renderfour">
             <img src="${item.goods_small_logo}" alt="" class="imgone"><a href="">${item.cat_two_id}</a> <img src="../images/listone.png" alt="" class="imgtwo"><a href=""style="margin-left:100px">${item.cat_one_id}</a>
         </li>
        </ul>
    `
    })

    lists.innerHTML = str6;
}
/**
 * 当我点击搜索按钮的时候，
 * 获取input框的值
 * 发送pajax请求数据。把input框的值传给后端
 * 在php文里里面面模糊查询
 * 拿出数据渲染页面。
 */
//获取搜索按钮
let serch = document.querySelector('.serch');
//获取input框 
let ipte = document.querySelector('#ipte');
serch.onclick=()=>{
    let huo = ipte.value;
    pAjax({
        url:'../api/mHuGetData.php',
        data:{
            huo:huo
        }
    }).then(resj=>{
        
       let strx ='';
       
      resj.forEach((item,index)=>{
            strx+=`
            <ul>
            <li>
                 <a href="">
                    <img src="${item.goods_big_logo}" alt="">
                </a>
             </li>
            <li class="spriceone"><span class="sprice">&yen&nbsp;&nbsp;${item.goods_price}</span><span class="ssprice fr">包邮包税</span></li>
              <li class="renderthere"><a href="">${item.goods_name}</a></li>
             <li class="renderfour">
                 <img src="${item.goods_small_logo}" alt="" class="imgone"><a href="">${item.cat_two_id}</a> <img src="../images/listone.png" alt="" class="imgtwo"><a href=""style="margin-left:100px">${item.cat_one_id}</a>
             </li>
            </ul>
            `
      })
      lists.innerHTML = strx;
    })
}
/**
 * 在点击确定按钮sure的时候，获取input框里面的值
 * 在搜索框里面搜价格priceSearch ，price_search
 * 把price_search的值和priceSearch的值传给后端
 * 在把内容渲染到lists这个盒子里面
 *  $sql = "SELECT * FROM `goods` WHERE `goods_price` BETWEEN  '$zOne' AND '$zTwo' ";
 * 查询什么到什么的数据
 * 在between前面加not,表示不是这个
 */
//获取元素
let priceSearch=document.querySelector('#priceSearch');
let price_search=document.querySelector('#price_search');
let sure=document.querySelector('#sure');

sure.onclick=()=>{
  pAjax({
    url:'../api/priceSearch.php',
    data:{
        zOne:priceSearch.value*1,
        zTwo:price_search.value*1
    }
  }).then(resq=>{
     let strq=''
     resq.forEach((item,index)=>{
         strq+=`
         <ul>
         <li>
              <a href="">
                 <img src="${item.goods_big_logo}" alt="">
             </a>
          </li>
         <li class="spriceone"><span class="sprice">&yen&nbsp;&nbsp;${item.goods_price}</span><span class="ssprice fr">包邮包税</span></li>
           <li class="renderthere"><a href="">${item.goods_name}</a></li>
          <li class="renderfour">
              <img src="${item.goods_small_logo}" alt="" class="imgone"><a href="">${item.cat_two_id}</a> <img src="../images/listone.png" alt="" class="imgtwo"><a href=""style="margin-left:100px">${item.cat_one_id}</a>
          </li>
         </ul>
         `
     })
     lists.innerHTML = strq;
  })
}