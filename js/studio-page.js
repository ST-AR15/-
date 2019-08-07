// todo 这里应该封装一个函数，用于打开某个页面。现在的这样子太散了
let main = getDom('main');
let h = window.innerHeight;
let w = window.innerWidth;
if(w < 1400) {
    w = 1400;
}
main.style.width = w + "px";
main.style.height = h + "px";
window.onresize = function() {
    let h = window.innerHeight;
    let w = window.innerWidth;
    if(w < 1400) {
        w = 1400;
    }
    main.style.width = w + "px";
    main.style.height = h + "px";
    getDom("studio").style.transform = "translateX(-" + (pageNow-1)*parseFloat(window.getComputedStyle(getDom('studio')).width) + "px)";
}
// 点击上一页和下一页
// 还是弄个这个数字吧
var pageNow = 1;
getDom('prv').onclick = function() {
    // 先判断当前是不是在第一页，如果不是，才能往左走
    if(window.getComputedStyle(getDom('studio')).transform === "none" || window.getComputedStyle(getDom('studio')).transform === "matrix(1, 0, 0, 1, 0, 0)") {
        // console.log("no");
        // 不执行命令
        console.log("已到第一页");
    } else {
        // console.log(window.getComputedStyle(getDom('studio')).transform);
        // todo 通过transform修改内容、修改下面的小圆圈、修改标题
        // 获取到外面的包装和内部的元素
        let studioContainer = getDom('studio');
        let studio = document.getElementsByClassName('studio-main');
        // 获取包装的宽度
        let studioWidth = window.getComputedStyle(getDom('studio')).width;
        // 修改包装的transform
        // 先获取当前页码
        // window.getComputedStyle(getDom('studio')).transform.lastIndexOf(",")
        // 还是直接改吧
        studioContainer.style.transform = "translateX(-" + (pageNow-2)*parseFloat(studioWidth) + "px)";
        // 透明度
        studio[pageNow-1].style.opacity = "0";
        studio[pageNow-2].style.opacity = "1";
        // 通过页码来判断circle的情况和修改中心名
        // 1-5页是5个circle，6-7是两个，8-10是三个
        // 从6往前，从8往前会导致圆的数量变化
        let studioFooter = getDom("studio-footer");
        let studioHader = getDom("studio-header");
        // 改副导航栏
        let cardContainer = document.getElementsByClassName('menu-card-container');
        if(pageNow === 6 || pageNow === 8) {
            // 需要修改圆的数量
            if(pageNow === 6) {
                // 前一页就有五个圆了
                // 这一页是两个圆
                // 显示最后三个圆
                studioFooter.children[2].className = "footer-circle";
                studioFooter.children[3].className = "footer-circle";
                studioFooter.children[4].className = "footer-circle active-circle";
                studioFooter.children[0].className = "footer-circle";
                studioHader.innerText = "产品发展中心";
                cardContainer[1].className = "menu-card-container";
                cardContainer[0].className = "menu-card-container active-card";
            } else {
                // 前一页两个圆
                // 这一页三个圆
                // 屏蔽第三个圆
                studioFooter.children[2].className = "footer-circle unuse-circle";
                studioFooter.children[1].className = "footer-circle active-circle";
                studioFooter.children[0].className = "footer-circle";
                studioHader.innerText = "行政管理中心";
                cardContainer[2].className = "menu-card-container";
                cardContainer[1].className = "menu-card-container active-card";
            }
        } else {
            // 不用修改圆的数量
            if(pageNow <= 5) {
                studioFooter.children[pageNow-1].className = "footer-circle";
                studioFooter.children[pageNow-2].className = "footer-circle active-circle";
            } else if(pageNow <= 7) {
                studioFooter.children[pageNow-6].className = "footer-circle";
                studioFooter.children[pageNow-7].className = "footer-circle active-circle";
            } else {
                studioFooter.children[pageNow-8].className = "footer-circle";
                studioFooter.children[pageNow-9].className = "footer-circle active-circle";
            }
        }
        // 最后页码-1
        pageNow--;
    }
}
getDom('next').onclick = function() {
    // 先判断当前是不是在最后一页，如果不是，才能往右走
    if(getDom('studio').children.length === pageNow) {
        // console.log("no");
        // 不执行命令
        console.log("已到最后一页");
    } else {
        // console.log(window.getComputedStyle(getDom('studio')).transform);
        // todo 通过transform修改内容、修改下面的小圆圈、修改标题
        // 获取到外面的包装和内部的元素
        let studioContainer = getDom('studio');
        let studio = document.getElementsByClassName('studio-main');
        // 获取包装的宽度
        let studioWidth = window.getComputedStyle(getDom('studio')).width;
        // 修改包装的transform
        studioContainer.style.transform = "translateX(-" + pageNow*parseFloat(studioWidth) + "px)";
        // 透明度
        studio[pageNow-1].style.opacity = "0";
        studio[pageNow].style.opacity = "1";
        // 通过页码来判断circle的情况和修改中心名
        // 1-5页是5个circle，6-7是两个，8-10是三个
        // 从5往后，从7往后会导致圆的数量变化
        let studioFooter = getDom("studio-footer");
        let studioHader = getDom("studio-header");
        // 改副导航栏
        let cardContainer = document.getElementsByClassName('menu-card-container');
        if(pageNow === 5 || pageNow === 7) {
            // 需要修改圆的数量
            if(pageNow === 5) {
                // 下一页是两个圆
                // 这一页是五个圆
                // 屏蔽最后三个圆
                studioFooter.children[2].className = "footer-circle unuse-circle";
                studioFooter.children[3].className = "footer-circle unuse-circle";
                studioFooter.children[4].className = "footer-circle unuse-circle";
                studioFooter.children[0].className = "footer-circle active-circle";
                studioHader.innerText = "行政管理中心";
                cardContainer[0].className = "menu-card-container";
                cardContainer[1].className = "menu-card-container active-card";
            } else {
                // 下一页三个圆
                // 这一页两个圆
                // 显示第三个圆
                studioFooter.children[2].className = "footer-circle";
                studioFooter.children[1].className = "footer-circle";
                studioFooter.children[0].className = "footer-circle active-circle";
                studioHader.innerText = "传媒发展中心";
                cardContainer[1].className = "menu-card-container";
                cardContainer[2].className = "menu-card-container active-card";
            }
        } else {
            // 不用修改圆的数量
            if(pageNow <= 5) {
                studioFooter.children[pageNow-1].className = "footer-circle";
                studioFooter.children[pageNow].className = "footer-circle active-circle";
            } else if(pageNow <= 7) {
                studioFooter.children[pageNow-6].className = "footer-circle";
                studioFooter.children[pageNow-5].className = "footer-circle active-circle";
            } else {
                studioFooter.children[pageNow-8].className = "footer-circle";
                studioFooter.children[pageNow-7].className = "footer-circle active-circle";
            }
        }
        // 最后页码+1
        pageNow++;
    }
}
// 获取当前页码的函数
// function getPage() {
//     return Number(window.getComputedStyle(getDom('studio')).transform.substring(19,window.getComputedStyle(getDom('studio')).transform.lastIndexOf(",")))/parseFloat(window.getComputedStyle(getDom('studio')).width);
// }
let department = document.getElementsByClassName('department');
for(let i=0;i<=9;i++) {
    department[i].onclick = function() {
        // alert('a');
        // 把menu收起来
        getDom('menu').className = "menu active-menu";
        setTimeout(() => {
            getDom('menu').className = "menu active-menu active-menu-finally";
        }, 1000);
        // 对应的icon变大
        let cardContainer = document.getElementsByClassName('menu-card-container');
        setTimeout(function() {
            if(i<=4) {
                // 第一页
                cardContainer[0].className = "menu-card-container active-card";
            } else if(i<=6) {
                cardContainer[1].className = "menu-card-container active-card";
            } else {
                cardContainer[2].className = "menu-card-container active-card";
            }
        },2000);
        // 显示对应的studio
        openPage(i+1);
    }
}
// 打开某一页
function openPage(pageNum) {
    // 先赋值到pageNow
    pageNow = pageNum;
    // 通过修改transform来切换页面
    // 获取到外面的包装和内部的元素
    let studioContainer = getDom('studio');
    let studio = document.getElementsByClassName('studio-main');
    // 获取包装的宽度
    let studioWidth = window.getComputedStyle(getDom('studio')).width;
    studioContainer.style.transform = "translateX(-" + (pageNum-1)*parseFloat(studioWidth) + "px)";
    studio[pageNum-1].style.opacity = "1";
    // 改下面的点
    let studioFooter = getDom("studio-footer");
    if(pageNum<=5) {
        for(let i=0;i<=4;i++) {
            if(pageNum-1 === i) {
                studioFooter.children[i].className = "footer-circle active-circle";
            } else {
                studioFooter.children[i].className = "footer-circle";
            }
        }
    } else if(pageNum<=7) {
        if(pageNum === 6) {
            studioFooter.children[0].className = "footer-circle active-circle";
            studioFooter.children[1].className = "footer-circle";
        } else {
            studioFooter.children[0].className = "footer-circle";
            studioFooter.children[1].className = "footer-circle active-circle";
        }
        studioFooter.children[2].className = "footer-circle unuse-circle";
        studioFooter.children[3].className = "footer-circle unuse-circle";
        studioFooter.children[4].className = "footer-circle unuse-circle";
    } else {
        studioFooter.children[3].className = "footer-circle unuse-circle";
        studioFooter.children[4].className = "footer-circle unuse-circle";
        for(let i=7;i<=9;i++) {
            if(pageNum-1 === i) {
                studioFooter.children[i-7].className = "footer-circle active-circle";
            } else {
                studioFooter.children[i-7].className = "footer-circle";
            }
        }
    }
    // 改上面的副导航栏
    let cardContainer = document.getElementsByClassName('menu-card-container');
    cardContainer[0].className = "menu-card-container";
    cardContainer[1].className = "menu-card-container";
    cardContainer[2].className = "menu-card-container";
    if(pageNum <= 5) {
        cardContainer[0].className = "menu-card-container active-card";
    } else if(pageNum <= 7){
        cardContainer[1].className = "menu-card-container active-card";
    } else {
        cardContainer[2].className = "menu-card-container active-card";
    }
}
// 点击menu-icon
let menuIcon = document.getElementsByClassName('menu-icon');
for(let i=0;i<=2;i++) {
    menuIcon[i].onclick = function() {
        if(getDom('menu').className !== "menu") {
            console.log("切换");
            if(i === 0) {
                openPage(1);
            } else if(i === 1) {
                openPage(6);
            } else {
                openPage(8);
            }
        }
    }
}
// 点击返回
getDom('back').onclick = function() {
    if(getDom('menu').className !== "menu") {
        console.log("返回");
        getDom('menu').className = "menu active-menu";
        setTimeout(() => {
            getDom('menu').className = "menu";
        }, 1000);
    }
}