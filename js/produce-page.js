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
}
let produceHeight = window.getComputedStyle(getDom('produce-container')).height;
produceHeight = parseFloat(produceHeight);
stepMove.wheelStepByStep("#produce-container", 100, "y", produceHeight, "px", 0, 4);
stepMove.touchStepByStep("#produce-container", 100, "y", produceHeight, "px", 0, 4);
function beforeUpScroll() {
    // console.log("上一页");
    // 当前页码是纯向下次数+1，下一页就是+2
    // 上一页就是+0
    let nextPage = stepMove.downTimes-stepMove.upTimes+3;
    let prvPage = nextPage-2;
    console.log(prvPage);
    // 给下一页一个active
    // todo 美工如果需要让这个active分步，那么就是改这里
    let wannaDom = "item" + prvPage;
    getDom(wannaDom).className = "produce-item active-item";
    let timer;
    clearTimeout(timer);
    timer = setTimeout(function() {
        getDom(wannaDom).className = "produce-item";
    },2500);   
    let progress = getDom("progress"+prvPage);
    let pageNow = prvPage + 1;
    let progressNow = getDom("progress"+pageNow);
    progressNow.className = "progress-item";
    progress.className = "progress-item active-progress"; 
}
function beforeDownScroll() {
    // console.log("下一页");
    // 当前页码是纯向下次数+1，下一页就是+2
    // 上一页就是+0
    let nextPage = stepMove.downTimes-stepMove.upTimes+1;
    // console.log(nextPage);
    // 给下一页一个active
    // todo 美工如果需要让这个active分步，那么就是改这里
    let wannaDom = "item" + nextPage;
    getDom(wannaDom).className = "produce-item active-item";
    let timer;
    clearTimeout(timer);
    timer = setTimeout(function() {
        getDom(wannaDom).className = "produce-item";
    },2500);  
    let progress = getDom("progress"+nextPage);
    let pageNow = nextPage-1;
    let progressNow = getDom("progress"+pageNow);
    progressNow.className = "progress-item";
    progress.className = "progress-item active-progress"; 
}
/**
 * 点击进度条滚动
 * stepMove.touchDirection === "up" || stepMove.wheelDirection == "down"
 * 这是需要修改的stepMove属性
 * 上面列出的情况会向下滚动
 */
function move(pageNum) {
    // // 获取当前页码
    // let pageNow = stepMove.downTimes-stepMove.upTimes+1;
    // // 想要移动的步数
    // let wannaStep;
    // if(pageNow < pageNum) {
    //     // 如果当前页码在需要的页码前面，就向后移动
    //     stepMove.touchDirection = "up";
    //     stepMove.wheelDirection = "down";
    //     wannaStep = pageNum - pageNow;
    //     for(let i=0;i<wannaStep;i++) {
    //         stepMove.scrollPage();
    //     }
    // } else if(pageNow > pageNum) {
    //     // 如果当前页码在需要的页码后面，就向前移动
    //     stepMove.touchDirection = "down";
    //     stepMove.wheelDirection = "up";
    //     wannaStep = pageNum - pageNow;
    //     for(let i=0;i<wannaStep;i++) {
    //         stepMove.scrollPage();
    //     }
    // }
    // 这个方法直接改transform
    let containDom = getDom("produce-container");
    let y = parseFloat(window.getComputedStyle(getDom('produce-container')).height) * (1-pageNum);
    containDom.style.transform = "translateY(" + y + "px)";
    // 获取当前页码
    let pageNow = stepMove.downTimes-stepMove.upTimes+1;
    // todo 通过当前页码和目标页码，修改stepMove里的downTime和upTime，并且让中间的所有item都active
    // todo 用这个方法移动后 滚轮还是记得第一个地方。需要修改stepMove来解决这个BUG
    stepMove.changeCount = y;
    if(pageNow < pageNum) {
        // 如果当前页码在前面
        stepMove.downTimes += (pageNum - pageNow);
        let produceItem = document.getElementsByClassName('produce-item');
        // 从下一页到最后一页都加上动画
        for(let i=pageNow;i<pageNum;i++) {
            produceItem[i].className = "produce-item active-item";
        }
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            for(let i=pageNow;i<pageNum;i++) {
                produceItem[i].className = "produce-item";
            }
        }, 2500);
    } else if(pageNow > pageNum) {
        // 如果当前页码在后面
        stepMove.upTimes += (pageNow - pageNum);
        let produceItem = document.getElementsByClassName('produce-item');
        // 从上一页到目标页都加上动画
        for(let i=pageNow-2;i>=pageNum-1;i--) {
            produceItem[i].className = "produce-item active-item";
        }
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            for(let i=pageNow-2;i>=pageNum-1;i--) {
                produceItem[i].className = "produce-item";
            }
        }, 2500);
    }
    // todo 切换progress的active
    let progress = getDom("progress"+pageNum);
    let progressNow = getDom("progress"+pageNow);
    progressNow.className = "progress-item";
    progress.className = "progress-item active-progress";
}
