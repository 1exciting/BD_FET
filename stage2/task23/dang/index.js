/**
 * Created by DangYang on 2016/9/16.
 */
//事件绑定
function addEventHandler(element,type,handler){
    if (element.addEventListener) {
        element.addEventListener(type,handler,false);
    }else if (element.attachEvent) {
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
}

var root = document.getElementById('root');
var inputs = document.getElementsByTagName('input');
var arr=[],divArrs=[],isroot=false,isfind = false,findindex=-1;

function levelOrder(element){
    if(!element){
        return;
    }
    arr.push(element);
    divArrs.push(element);
    divArrs[0].style.backgroundColor = '#fff';

    while (arr.length!==0){
        let el = arr.shift();
        if(el.children){
            [].forEach.call(el.children, function(ele){
                arr.push(ele);
                divArrs.push(ele);
                ele.style.backgroundColor = '#fff';
            });
        }
    }
}

function changeColor(str) {
    let i=0,timer;
    divArrs[i].style.backgroundColor = 'blue';
    if(isroot){
        divArrs[i].style.backgroundColor = 'red';
        alert(`find ${str}`);
        return;
    }
    timer = setInterval(function () {
        i++;
        if(i<divArrs.length){
            divArrs[i-1].style.backgroundColor = '#fff';
            divArrs[i].style.backgroundColor = 'blue';
            if(i===findindex){
                i=divArrs.length-1;
                return;
            }
        }else {
            clearInterval(timer);
            divArrs[i-1].style.backgroundColor = '#fff';
            if(isfind){
                alert(`find ${str}`);
                divArrs[findindex].style.backgroundColor = 'red';
            }else if(str){
                alert(`no find ${str}`);
            }
        }
    },500);
}

function findX(str) {
    for(let i = 0; i<divArrs.length;i++){
        if(/\s*(\w+)?\s*/.exec(divArrs[i].textContent)[1]===str){
            if(0===i){
                isroot=true;
                return;
            }
            isfind = true;
            findindex = i;
            return;
        }
    }
}
//遍历
addEventHandler(inputs[0],'click',function () {
    divArrs=[];
    isfind = false;
    isroot = false;
    findindex = -1;
    levelOrder(root);
    changeColor();
});

//查询
addEventHandler(inputs[2],'click',function () {
    divArrs=[];
    isfind = false;
    isroot = false;
    findindex = -1;
    var tValue = inputs[1].value.trim();
    if(!tValue){
        alert('输入查询值');
        return;
    }
    levelOrder(root);
    findX(tValue);
    changeColor(tValue);
});