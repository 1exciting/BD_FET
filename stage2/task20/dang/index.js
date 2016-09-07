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
var textarea = document.getElementById('area');
var inputs = document.getElementsByTagName('input');
var contents = document.getElementById('content');

//左侧人
addEventHandler(inputs[0],'click',function(){
	var str = textarea.value.trim();
	// console.log(str)
	var arrs = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
            if (e != null && e.length > 0) {
                return true;
            } else {
                return false;
            }
        });
	console.log(arrs)
	if (arrs.length>0) {
		arrs.forEach(function(item){
			var newNode = document.createElement('a');
			newNode.textContent = item;
			contents.appendChild(newNode);
		});	
	}else{
		alert("input is invalid!")
	}	
	// deleteEvent(newNode);
});

addEventHandler(inputs[1],'keydown',function(){
	var lists = contents.children;
	console.log(inputs[1].value)
	var str = inputs[1].value.trim();
	console.log(str)
	for(let i = 0;i <lists.length; i++){
		var ss = lists[i].textContent;
		console.log(ss)
		var ix = ss.indexOf(str);
		console.log(ix)
		if (ix>=0) {
			lists[i].innerHTML=`${ss.substring(0,ix)}<span style="background-color:#1cc">
			${ss.substring(ix,ix+ss.length)}</span>${ss.substring(ix+ss.length)}`;
		}else{
			lists[i].innerHTML = `${ss}`;
		}
	}
})
/*
//
function getFlags(str){
	var lists = contents.children;
	for(let i = 0;i <lists.length; i++){
		var ss = lists[i].textContent;
		console.log(ss)
		var ix = ss.indexOf(str);
		if (ix>=0) {
			lists[i].innerHTML=`${ss.substring(0,ix)}<span style="background-color:#1cc">
			${ss.substring(ix,ix+ss.length)}</span>${ss.substring(ix+ss.length)}`;
		}else{
			lists[i].innerHTML = ss;
		}
	}
}
*/


