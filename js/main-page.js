getDom("main-video").oncanplay = function() {
    getDom('main-section').style.backgroundSize = "0 0";
}
// 这个变量可以判断现在有没有打开东西
var isOpend = false;
// 这个变量保存的是现在打开的是下标为几的子
var chooseNow = -1;
// 晃动
document.addEventListener('pointermove',moveFun);
function moveFun() {
    // 没有打开东西的时候才能晃动
    if (!isOpend) {
        // let event = event || event.event;
        // IE兼容有误
        // console.log(window.event.clientY);
        let imgContainer = document.getElementsByClassName('concepts-image-container');
        let myX = event.pageX;
        let myY = event.pageY;
        // console.log(myX + " " + myY);
        // 假设鼠标到最右下角是全部移动10%
        // 这个移动的比例是wannaMove这个变量
        // 这个数字需要百分比
        let wannaMove = 5;
        let traX = (myX / innerWidth) * wannaMove;
        let traY = (myY / innerHeight) * wannaMove;
        traX = wannaMove - traX;
        traY = wannaMove - traY;
        // console.log(traX + " " + traY);
        imgContainer[0].style.transform = "translate(" + traX + "%, " + traY + "%)";
        imgContainer[1].style.transform = "translate(" + traX + "%, " + traY + "%)";
        imgContainer[2].style.transform = "translate(" + traX + "%, " + traY + "%)";
        imgContainer[3].style.transform = "translate(" + traX + "%, " + traY + "%)";
        imgContainer[4].style.transform = "translate(" + traX + "%, " + traY + "%)";
        let img = document.getElementsByClassName('concepts-image-wrapper');
        img[0].style.transform = "translate(" + traX + "%, " + traY + "%)";
        img[1].style.transform = "translate(" + traX + "%, " + traY + "%)";
        img[2].style.transform = "translate(" + traX + "%, " + traY + "%)";
        img[3].style.transform = "translate(" + traX + "%, " + traY + "%)";
        img[4].style.transform = "translate(" + traX + "%, " + traY + "%)";
    }
}
// 点击某个图片
let imgContainer = document.getElementsByClassName('concepts-image-container');
for (let i = 0; i < imgContainer.length; i++) {
    imgContainer[i].onclick = function () {
        if (!isOpend) {
            // 如果什么都没打开，就显示那个东西
            // 设定当前li的位置
            imgContainer[i].parentElement.parentElement.style.width = "80%";
            imgContainer[i].parentElement.parentElement.style.height = "80%";
            imgContainer[i].parentElement.parentElement.style.top = "10%";
            imgContainer[i].parentElement.parentElement.style.left = "10%";
            // 让其它li透明
            for (let j = 0; j < imgContainer.length; j++) {
                if (i !== j) {
                    imgContainer[j].parentElement.parentElement.style.opacity = "0.3";
                }
            }
            // 显示右边的内容
            // imgContainer[i].nextElementSibling.style.opacity = "1";
            setTimeout(() => {
                imgContainer[i].nextElementSibling.style.height = "100%";
            }, 300);
            setTimeout(() => {
                isOpend = true;    
            }, 10);
            chooseNow = i;
            // 让hover失效
            // let imgWrapper = document.getElementsByClassName('concepts-image-wrapper');
            // for(let k=0;k < imgContainer.length;k++) {
            //     imgContainer[k].className = "concepts-image-container unuse-image-container";
            //     imgWrapper[k].className = "concepts-image-container unuse-wrapper";
            // }
        }
    }
}
// 在某东西打开的情况下，点击任意地方复原
getDom("page3").onclick = function() {
    if(isOpend) {
        let imgContainer = document.getElementsByClassName('concepts-image-container');
        // 恢复li的位置
        imgContainer[chooseNow].parentElement.parentElement.style = "";
        // 其他li透明度恢复
        for (let j = 0; j < imgContainer.length; j++) {
            if (chooseNow !== j) {
                imgContainer[j].parentElement.parentElement.style.opacity = "1";
            }
        }
        // 让右边的内容消失
        imgContainer[chooseNow].nextElementSibling.style.height = "0";
        // 让hover生效
        isOpend = false;
        // let imgWrapper = document.getElementsByClassName('concepts-image-wrapper');
        // for(let k=0;k < imgContainer.length;k++) {
        //     imgContainer[k].className = "concepts-image-container";
        //     imgWrapper[k].className = "concepts-image-container";
        // }
    }
}
// 导航栏 在第一页半透明，在第二页不透明
function beforeDownScroll() {
    // 第二页 动效
    if(stepMove.downTimes - stepMove.upTimes === 1) {
        setTimeout(function() {
            getDom('introduce').className = "introduce active-introduce";
        },800);
    } else {
        setTimeout(() => {
            getDom('introduce').className = "introduce";    
        }, 800);
    }
    setTimeout(() => {
        console.log(stepMove.downTimes + " " + stepMove.upTimes);
        if(stepMove.upTimes !== stepMove.downTimes) {
            getDom('header').style.position = "fixed";
            getDom('header').style.backgroundColor = "rgba(13, 21, 43, 1)";
        } else {
            getDom('header').style.position = "absolute";
            getDom('header').style.backgroundColor = "rgba(13, 21, 43, 0.5)";
        }
    }, 100);
}
function beforeUpScroll() {
    // 第二页 动效
    if(stepMove.downTimes - stepMove.upTimes === 1) {
        setTimeout(function() {
            getDom('introduce').className = "introduce active-introduce";
        },800);
    } else {
        setTimeout(() => {
            getDom('introduce').className = "introduce";    
        }, 800);
    }
    setTimeout(() => {
        console.log(stepMove.downTimes + " " + stepMove.upTimes);
        if(stepMove.upTimes !== stepMove.downTimes) {
            getDom('header').style.position = "fixed";
            getDom('header').style.backgroundColor = "rgba(13, 21, 43, 1)";
        } else {
            getDom('header').style.position = "absolute";
            getDom('header').style.backgroundColor = "rgba(13, 21, 43, 0.5)";
        }
    }, 100);
}
// let height = window.innerHeight;
// stepMove.wheelStepByStep("#header", 100, "y", height, "px", 0, maxPage-1);
// stepMove.touchStepByStep("#header", 100, "y", height, "px", 0, maxPage-1);