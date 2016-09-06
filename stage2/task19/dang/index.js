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

var inputs = document.getElementsByTagName('input');
var contents = document.getElementById('content');

//左侧人
addEventHandler(inputs[1],'click',function(){
	var value = inputs[0].value;
	if((/^[1-9][0-9]*$/).test(value)){
		if (parseInt(value)>=10&&parseInt(value)<=100) {
			var newNode = document.createElement('a');
			newNode.textContent = value;
			if (contents.children.length===0) {
				contents.appendChild(newNode);
			}else{
				contents.insertBefore(newNode,contents.children[0]);
			}	
		}else{
			alert("number: 10-100");
			return;
		}
		
	}else{
		alert("input is invalid!")
		return;
	}	
	deleteEvent(newNode);
});

//右侧人
addEventHandler(inputs[2],'click',function(){
	var value = inputs[0].value;
	if((/^[1-9][0-9]*$/).test(value)){
		var newNode = document.createElement('a');
		newNode.textContent = value;
		contents.appendChild(newNode);
	}else{
		alert("input is invalid!")
		return;
	}
	deleteEvent(newNode);
});

//左侧出
addEventHandler(inputs[3],'click',function(){
	if (contents.children.length>0) {
		alert(contents.children[0].innerText);
		contents.removeChild(contents.children[0]);
	}else{
		alert("Error, no data")
	}
});

//右侧出
addEventHandler(inputs[4],'click',function(){
	var len = contents.children.length;
	if (len > 0) {
		alert(contents.children[len-1].innerText);
		contents.removeChild(contents.children[len-1]);
	}else{
		alert("Error, no data")
	}
});

//点击删除
function deleteEvent(node){
	addEventHandler(node,'click',function(){
		contents.removeChild(node);
	});
}

//随机插入0-60个数据
addEventHandler(inputs[5],'click',function(){
	var n = Math.floor(Math.random()*61);
	var str = '';
	for (let i = 0; i <= n; i++) {
		var number = Math.floor(Math.random()*81+10);
		str +=`<a style="height:${number}px"></a>`;
	}
	contents.innerHTML = str;
});

//排序
addEventHandler(inputs[6],'click',function(){
	
});


