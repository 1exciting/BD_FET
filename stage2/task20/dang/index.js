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
var arrlists = []
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
			arrlists.push(item);
		});	
	}else{
		alert("input is invalid!")
	}	
});


//查询按钮
/*addEventHandler(inputs[2],'click',function(){
	var lists = contents.children;
	console.log('key---',inputs[1].value)
	var str = inputs[1].value.trim();
	console.log(str)
	arrlists.forEach(function(ele,index){
		lists[index].innerHTML = ele.replace(new RegExp(str,"g"),`<span style="background-color:#1cc">${str}</span>`)
	});
})*/

//监听input keyup时间
addEventHandler(inputs[1],'keyup',function(){
	var lists = contents.children;
	console.log('key---',inputs[1].value)
	var str = inputs[1].value.trim();
	console.log(str)
	arrlists.forEach(function(ele,index){
		lists[index].innerHTML = ele.replace(new RegExp(str,"g"),`<span style="background-color:#1cc">${str}</span>`)
	});
})




