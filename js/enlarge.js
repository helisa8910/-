class Enlarge {
    constructor(ele, data) {
        this.ele = document.querySelector(ele);
        this.data = data;

        this.init();
    }
    init() {
        // 把show盒子添加到 box中中
        this.ele.appendChild(this.renderShow());
        this.ele.appendChild(this.renderList());
        this.ele.appendChild(this.renderEnlarge());
        this.setStyle();

        // 给show盒子绑定鼠标移入事件，显示遮罩层和放大镜
        this.show.onmouseover = () => this.mask.style.display = this.enlarge.style.display = 'block';

        //鼠标移出show盒子，隐藏遮罩层和放大镜
        this.show.onmouseout = () => this.mask.style.display = this.enlarge.style.display = 'none';

        // 使用事件驱动帝调用 this.move 函数
        // 方案1
        // this.move 函数中的this指向 this.show
        // this.show.onmousemove = (e) => {
        //     this.move(e);
        // }
        // 方案2：
        this.show.onmousemove = this.move;

        this.p = this.list.querySelectorAll('p');
        this.p.forEach((item, index) => {
            item.onclick = () => {
                this.change(item, index)
            }
        })
    }
    renderShow() {
        // 入如果后面还需要这个元素的时候，尽量把这个元素绑定在 this对象
        this.show = document.createElement('div');
        this.show.classList.add('show');

        this.showImg = document.createElement('img');
        // 默认情况下，show盒子显示第一张图片
        this.showImg.src = this.data[0].medium;
        this.show.appendChild(this.showImg);

        // 创建mask标签
        this.mask = document.createElement('div');
        this.mask.classList.add('mask');
        this.show.appendChild(this.mask);

        // 把这个show盒子返回
        return this.show;
    }
    renderList() {
        this.list = document.createElement('div');
        this.list.classList.add('list');

        this.list.innerHTML = this.data.map((item, index) => {
            return index === 0 ? `<p class="active"><img src="${item.small}"></p>` : `<p><img src="${item.small}"></p>`
        }).join('');
        return this.list;
    }
    renderEnlarge() {
        this.enlarge = document.createElement('div');
        this.enlarge.classList.add('enlarge');
        // 给enlarge这个盒子添加背景图，默认为第一张的大图
        this.enlarge.style.backgroundImage = `url(${this.data[0].big})`;
        return this.enlarge;
    }
    setStyle() {
        // 这个函数作用：给放大镜盒子设置 大小
        // 放大镜盒子的大小 = 遮罩层的大小 * 背景图的大小 / show盒子大小

        // 求遮罩层的大小 maskWidth = 0 ,当调用 setStyle的时候，mask是隐藏的状态
        // let maskWidth = this.mask.offsetWidth;
        // let maskHeight = this.mask.offsetHeight;
        let maskWidth = parseInt(getStyle(this.mask, 'width'));
        let maskHeight = parseInt(getStyle(this.mask, 'height'));

        // 背景图的大小
        let bgx = getStyle(this.enlarge, 'background-size').split(' ')[0];
        this.bgx = parseInt(bgx);
        let bgy = getStyle(this.enlarge, 'background-size').split(' ')[1];
        this.bgy = parseInt(bgy);

        // 求show盒子的大小，因为后面还需要用的这个变量，所以把这个变量存储在 this对象中
        this.showWidth = this.show.offsetWidth;
        this.showHeight = this.show.offsetHeight;

        let enlargeWidth = maskWidth * this.bgx / this.showWidth;
        let enlargeHeight = maskHeight * this.bgy / this.showHeight;

        // 把计算出来的值设置到enlarge盒子上
        this.enlarge.style.width = enlargeWidth + 'px';
        this.enlarge.style.height = enlargeHeight + 'px';
    }
    // 方案1调用的函数
    // move(e) {
    //       
    //     // 遮罩层跟随鼠标移动
    //     this.mask.style.left = e.clientX + 'px';
    //     this.mask.style.top = e.clientY + 'px';
    // }
    // 方案2调用的函数
    move = (e) => {
        // 遮罩层跟随鼠标移动
        // 需要减去this.ele盒子左边和上边的偏移量
        let maskLeft = e.pageX - this.ele.offsetLeft - this.mask.offsetWidth / 2;
        let maskTop = e.pageY - this.ele.offsetTop - this.mask.offsetHeight / 2;

        if (maskLeft <= 0) {
            maskLeft = 0;
        }
        if (maskTop <= 0) {
            maskTop = 0;
        }
        if (maskLeft >= this.showWidth - this.mask.offsetWidth) {
            maskLeft = this.showWidth - this.mask.offsetWidth;
        }
        if (maskTop >= this.showHeight - this.mask.offsetHeight) {
            maskTop = this.showHeight - this.mask.offsetHeight;
        }
        this.mask.style.left = maskLeft + 'px';
        this.mask.style.top = maskTop + 'px';

        // 背景图移动的距离 = 背景图的大小 * 遮罩层移动的距离 / show盒子的大小
        // background-position
        let bgpX = parseInt(this.bgx * maskLeft / this.showWidth);
        let bgpY = parseInt(this.bgy * maskTop / this.showHeight);

        // 遮罩层往右移动，背景图需要往左移动
        this.enlarge.style.backgroundPosition = `${-bgpX}px ${-bgpY}px`;
    }
    change(ele, idx) {
        // 当前点击的这个元素 添加active，其他元素移出
        for (let i = 0; i < this.p.length; i++) {
            this.p[i].classList.remove('active');
        }
        ele.classList.add('active');

        // 给show盒子设置 当前点击的这个元素的对应的中图
        this.showImg.src = this.data[idx].medium;

        // 给放大镜设置当前点击的这个元素的 对应的大图
        this.enlarge.style.backgroundImage = `url(${this.data[idx].big})`;
    }
}
