/*
 * @Author: your name
 * @Date: 2020-12-12 11:23:21
 * @LastEditTime: 2020-12-14 11:29:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \oneproject_one\js\car.js
 */
//  把就登录两个字改成用户名
let login = document.querySelector('#login5');
let name = getCookie('name');
if (name) {
    login.innerText = name;
}
/**
 * 到了购物车要判断是不是有登录，
 * 如果有登录，就可以购买
 * 没有登录就到登录页面去登录
 */
if(!login){
    location.href='./login.html'
    localStorage.setItem('url5','./car.html')
}

/**
 * 获取用户（helisa）购物车的数据渲染
 * 
 */
getData();
async function getData() {
    let res = await pAjax({
        url: '../api/getCarData.php',
        data: {
            username: name
        }
    });
    /**
     *把获取出来的数据 存储在本地存储中 
     * localStorage只能存字符串或是json字符串
     * 所以把数组转成json
     * 第一次初始的存数据
     *  */ 
    localStorage.setItem('carData', JSON.stringify(res));
    renderHtml(res);
}
let allsp=document.querySelector('.allsp');
let box = document.querySelector('#headding');
let box1= document.querySelector('.panel-body');
let jies=document.querySelector('.jies');
function renderHtml(data){
    /**
     * 判断是否有数据。有没有添加数据到购物车
     * 如果数组中第一项没有数据。说明数组里没有数据。
     * 那么就提示它，没有数据。要去列表页选购
     */
    
    if(!data[0]){
        alert('购物车还没有数据，请去列表页去选购');
        location.href='./list.html';
        //如果没有数据。给return,就不用执行以下的代码了
        return;
    }
    /**
     *  <input type="checkbox" class="allin" id="allcheck"checked>
     * 渲染的时候，如果每一条的数据is_select都为1的时候，表示全选按钮都被选上了
     * ？？？这些数据是不是都是is_select ,要被选择必须有一个属性是checked，到底要不要
     * 给它添加这个属性。必须要判断is_selet是不是被选上的效果
     */
    let allSelect =data.every(item =>{
        return item.is_select == '1';
    });
    let obj = selectShop(data);
    allsp.innerHTML=`
    <p>全部商品<span>${data.length}</span></p>
    `
    box.innerHTML=`
    <div class="content">
        <label for="" class="checkbox">
            <input type="checkbox"  class="allin" id="allcheck"${allSelect ? 'checked' : ''}>
            <span>全选</span>
        </label>
        <label for="" class="type">
            <span>商品信息</span>
        </label>
        <label for="" class="qty">
            <span>单价(元)</span>
        </label>
        <label for="" class="price">
            <span>数量</span>
        </label>
        <label for="" class="price">
            <span>金额(元)</span>
        </label>
        <label for="" class="price">
            <span>操作</span>
        </label>
    </div>
    `
    box1.innerHTML=' ';
    data.forEach((item,index) => {
        box1.innerHTML+=`
        <ul>
        <li>
            <div class="media">
                <div class="media-left media-middle">
                    <input type="checkbox" data_id="${item.goods_id}" class="inbox" id="select" ${item.is_select == 1 ? 'checked' : ''}>
                    <a href="#" class="imgtu">
                        <img class="media-object"
                            src="${item.goods_small_logo}"
                            alt="">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading" class="fl">${item.goods_name}</h4>
                    <div class="price fl" >
                        <span class="nu2">${item.goods_price}</span>
                    </div>
                    <div class="btn fl">
                        <div class="btn-group" data_id="${item.goods_id}" >
                            <button class="btn btn-default" id="reduce"type="button">-</button>
                            <button class="btn btn-default">${item.cart_number}</button>
                            <button class="btn btn-default"id="add"type="button"goodsNumber="${item.goods_number}">+</button>
                        </div>
                        <span class="fl nub">${item.goods_price}</span>
                        <p>
                            <button class="btn btn-danger"  data_id="${item.goods_id}" id="deleteone" >删除</button>
                        </p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
        `
    });
    jies.innerHTML=`
    <label for="" class="checkbox jis1 fl" >
    <input type="checkbox" class="jisipt" id="allcheck" ${allSelect ? 'checked' : ''}>
    <span>全选</span>
</label>
<p class="fl"><span style="margin-left: 30px;"id="deletetwo">清空购物车</span>
    <span style="margin-left: 580px;">已选择<span style="color: red;">${obj.count}</span>件商品，<span>总价：</span><span style="margin:0 5px 0 5px;color: red; font-size: 20px;">&yen${obj.totalPrice}.00</span></span>
    <button id="clearing">结算</button>
</p>
    `
}
/**
 * 利用事件委托绑定点击事件
 * reduce减
 * cart_number商品点击加入的时候，在数据库的总量
 * add加号
 * deleteone删除 ,deletetwo(删除选中商品)
 * allcheck全选
 * select单选
 * clearing结算
 */
let dClick = document.querySelector('.container ');
dClick.onclick=(e)=>{
    e=e||window.event;
    let t = e.target;
    //商品id//商品数量
    let goods_id,goods_num;
    
    switch(t.id){
        case'add':
        /**
         * 在当前的数量增加1
         * 把增加的数据放到数据库
         * 在进行数据渲染
         * break不解决穿透，会往下走
         * 修改商品数量的接口
         * username传的参数有，用户名，那个用户名修改商品的数量
         * goods_id修改那条商品的数量
         * goods_num修改数量 为多少
         * 拿到商品的id,这么知道当前点击的商品id是什么？
         * 渲染的时候把商品id放在html标签上面，再利用getAttribute获取这个属性的属性值。
         * t.previousElementSibliing拿到我当前点击这个元素的上一个兄弟元素
            */
            goods_id=t.parentNode.getAttribute('data_id');
            goods_num=t.previousElementSibling.innerHTML*1 + 1;
            //最高的数量不能超过库存goods_number
            goods_number=t.getAttribute('goodsNumber');
            if (goods_num >= goods_number) {
                goods_num = goods_number;
            }
            tjspsl(name, goods_id, goods_num);
            break;
        case'reduce':
            goods_id=t.parentNode.getAttribute('data_id');
            goods_num=t.nextElementSibling.innerHTML*1 -1;
            //判断 goods_num的值不能小于1
            if (goods_num <= 1) {
                goods_num = 1;
            }
            tjspsl(name, goods_id, goods_num);
             break;
        case'deleteone':
            goods_id=t.getAttribute('data_id');
            removeData(name, goods_id);
             break;
         case'allcheck':
            /**
             * is-selet判断是不是被选上
             * 不能去更改数据库里面的数据，因为数据库里面的数据对应的是成千上万个用户，
             * 如果你选上数据库的数据。别人也选上了。
             * 只能更改本地存储的数据
             * 当点击全选的时候，获取本地存储中的数据更改每一条数据的is-selet:1
             * 点击全选改变数据的时候,必须重新渲染页面。渲染页面之后，才能得到这个值，is_selet
             */
            let carData = JSON.parse(localStorage.getItem('carData'));
            carData.forEach(item => {
                item.is_select = t.checked ? 1 : 0
            });
            renderHtml(carData);
            localStorage.setItem('carData', JSON.stringify(carData));
            break;
        case 'select':
            // 把当前的这商品选上 改变当前这个商品的is_select 
            goods_id = t.getAttribute('data_id');
            let carData1 = JSON.parse(localStorage.getItem('carData'));
            carData1.forEach(item => {
                if (item.goods_id == goods_id) {
                    item.is_select = t.checked ? 1 : 0
                }
            });
            renderHtml(carData1);
            localStorage.setItem('carData', JSON.stringify(carData1));
            break;
        case'deletetwo':
            /**
             * 清空购物车
             * 传用户名
             * 
             */
            clearData(name);
        break;
        case'clearing':
            /**
             * 结算
             *  获取总价格进行支付（暂时只是获取总价格）
             * 把结算的 过的商品从购物车中删除（如果is_selelct = 1 表示被结算的商品）
             *  把本地的数据也要更新（结算的也要删除）
             */
            let data = JSON.parse(localStorage.getItem('carData'));
            alert('你已经成功支付' + selectShop(data).totalPrice);
            data.forEach(item => {
                // 表示被结算的商品
                if (item.is_select == 1) {
                    removeData(login, item.goods_id)
                }
            })
            
       break;
    }
    
}

/**
 * 增加商品数量的渲染tjspsl()
 * 
 */
async function tjspsl(  username, goods_id, goods_num) {
    let res = await pAjax({
        url: '../api/updCarData.php',
        data: {
            username,
            goods_id,
            goods_num
        }
      
    });
    getData();
    /**
     * 更改完数据库中的数据之后，也需要更改本地存储中的数据
     * 获取localStorage的数据
     * 如果我传的这条数据==我存起的的那条数据
     * 把存起来的数据拿来渲染 renderHtml(carData);
     * 在把更改的数据存入本地localStorage.setItem('carData', JSON.stringify(carData));
     * 又重新渲染一次总数据。
     *  */ 
    let carData = JSON.parse(localStorage.getItem('carData'));
    carData.forEach(item => {
        if (item.goods_id === goods_id) {
            item.cart_number = goods_num;
        }
    });
     renderHtml(carData);
     localStorage.setItem('carData', JSON.stringify(carData));
     getData();
}

/**
 * 删除数据
 * 传两个参数，你要删除哪个用户的那条数据。传用户名和id
 * 
 */

async function removeData(username, goods_id) {
    await pAjax({
        url: '../api/removeCarData.php',
        data: {
            username,
            goods_id
        }
    })
    // 更新本地存储中的数据
    let carData = JSON.parse(localStorage.getItem('carData'));
    // 过滤出没有删除的数据
    carData = carData.filter(item => {
        // 当item.goods_id === goods_id 这条数据被删除
        return item.goods_id !== goods_id
    });
    renderHtml(carData);
    // 重新把数据存入本地存储
    localStorage.setItem('carData', JSON.stringify(carData));
}

async function clearData(username) {
    let res = await pAjax({
        url: '../api/clearCarData.php',
        data: {
            username
        }
    });
    if (res.code) {
        // 当数据从数据库中删除成功的时候，需要把本地存储中的数据也要删除
        localStorage.removeItem('carData');
        // 当数据删除成功，需要传递一个空数组给renderHtml函数
        renderHtml([]);
    }
}

// 定义一个函数，这个函数主要计算所选商品的数量和价格
function selectShop(data) {
    // 过滤出本地存储中 is_select:1的数据
    let selectData = data.filter(item => {
        return item.is_select == 1
    });
    let obj = {
        count: 0,
        totalPrice: 0
    };
    // 根据过滤出来的数据 计算商品的总数量 和总价格
    selectData.forEach(item => {
        obj.count += item.cart_number * 1
        obj.totalPrice += item.cart_number * item.goods_price;
    })
    return obj
}