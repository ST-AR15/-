/**
 * 
 * @param {HTMLElement} elementID 需要获取dom的ID
 */
function getDom(elementID) {
    return document.getElementById(elementID);
}
var sec = document.getElementsByClassName('section');
for(let i=0 ;sec[i]!==undefined ;i++) {
    sec[i].style.height = window.innerHeight + "px";
}
