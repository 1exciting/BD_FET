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
	if (contents.children.length>60) {
		alert("node > 60");
		return;
	}
	if((/^[1-9][0-9]*$/).test(value)){
		if (parseInt(value)>=10&&parseInt(value)<=100) {
			var newNode = document.createElement('a');
			newNode.setAttribute("style","height:"+2*value+"px");
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
	if (contents.children.length>60) {
		alert("node > 60");
		return;
	}
	if((/^[1-9][0-9]*$/).test(value)){
		var newNode = document.createElement('a');
		newNode.setAttribute("style","height:"+2*value+"px");
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
		alert(contents.children[0].getAttribute('style'));
		contents.removeChild(contents.children[0]);
	}else{
		alert("Error, no data")
	}
});

//右侧出
addEventHandler(inputs[4],'click',function(){
	var len = contents.children.length;
	if (len > 0) {
		alert(contents.children[len-1].getAttribute('style'));
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
		str +=`<a style="height:${2*number}px"></a>`;
	}
	contents.innerHTML = str;
	for(let j=0;j< contents.children.length;j++){
		deleteEvent(contents.children[j]);
	}
});

//排序
addEventHandler(inputs[6],'click',bubbleSort.bind(this,contents));

//冒泡
function bubbleSort(contents){
	var alists = contents.children,
		len = alists.length,j=1, timer;
	var i = len,
	 	flag = false;
	timer = setInterval(function() {
		/*for(let k = 0; k< len;k++){
			alists[k].style.backgroundColor = "red";
		};*/
        if(i <= 1) {
            clearInterval(timer);
        }
        if(j === i) {
            --i;
            j = 1;
            if (!flag) {
            	clearInterval(timer);
            }
            flag = false;
        }
        if (alists[j-1].offsetHeight > alists[j].offsetHeight) {
            var temp = alists[j-1].offsetHeight;
			alists[j-1].offsetHeight = alists[j].offsetHeight;
			alists[j-1].style.height = alists[j].offsetHeight+"px";
			alists[j-1].style.backgroundColor = "red";
			alists[j].offsetHeight = temp;
			alists[j].style.height = temp+"px";
			alists[j].style.backgroundColor = "blue";
            flag = true;
        }
		j++;

	},50);
}


