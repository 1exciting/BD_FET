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
var textarea = document.getElementById('area');
var loves = document.getElementById('love');
var arrlists = [],lovelists =[];

//兴趣爱好
addEventHandler(inputs[1],'click',function(event){
	var str = textarea.value.trim();
	// console.log(str)
	var arrs = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
            if (e != null && e.length > 0) {
                return true;
            } else {
                return false;
            }
        });

	if (arrs.length>0) {
		for(let i = 0; i<arrs.length;i++){
			if (lovelists.indexOf(arrs[i])<0) {
				if(lovelists.length>=10){
					loves.removeChild(loves.firstElementChild);
					let value =event.target.textContent.replace(/删除：/,'');
					let index = lovelists.indexOf(value);
					lovelists.splice(index,1);
				}
				var newNode = document.createElement('a');
				newNode.textContent = arrs[i];
				loves.appendChild(newNode);
				deleteEvent(newNode,loves,lovelists);
				mouseoverEvent(newNode,'#F5CF86');
				lovelists.push(arrs[i]);
			}
		}	
	}else{
		alert("input is invalid!")
	}	
});

//点击删除
function deleteEvent(node,parentNode,listArr){
	addEventHandler(node,'click',function(event){
		parentNode.removeChild(node);
		let value =event.target.textContent.replace(/删除：/,'');
		let index = listArr.indexOf(value);
		listArr.splice(index,1);
	});
}

//鼠标over
function mouseoverEvent(node,bgc){
	addEventHandler(node,'mouseover',function(event){
		event.target.textContent = '删除：'+event.target.textContent;
		event.target.style.backgroundColor='red';
	});
	addEventHandler(node,'mouseout',function(event){
		event.target.textContent = event.target.textContent.replace(/删除：/,'');
		event.target.style.backgroundColor=bgc;
	});
}
//空格，逗号，回车
addEventHandler(inputs[0],'keyup',function(event){
	if (event.keyCode===13||event.keyCode===32||event.keyCode===188) {
		var item = inputs[0].value.trim();
		if (event.keyCode===188) {
			item = item.substring(0,item.length-1);
		}
		if (item && arrlists.indexOf(item)<0) {
			if (arrlists.length>=10) {
				contents.removeChild(contents.firstElementChild);
				let value =event.target.textContent.replace(/删除：/,'');
				let index = arrlists.indexOf(value);
				arrlists.splice(index,1);
			}
			var newNode = document.createElement('a');
			newNode.textContent = item;
			contents.appendChild(newNode);
			deleteEvent(newNode,contents,arrlists);
			mouseoverEvent(newNode,'#8397FD');
			arrlists.push(item);
		}
	}	
});


