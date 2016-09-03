//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

var contain=document.getElementById("contain");
var button=document.getElementsByTagName("input");

//定义队列
var queue={
	list:[],
	leftin:function(num){
		this.list.unshift(num);
		this.reload();
	},
	rightin:function(num){
		this.list.push(num);
		this.reload();
	},
	isEmpty:function(){
		return this.list.length==0;
	},
	leftpop:function(){
		if(this.isEmpty())
			alert("队列为空!")
		else{
			alert(this.list.shift());
			this.reload();
		}
	},
	rightpop:function(){
		if(this.isEmpty())
			alert("队列为空!")
		else{
			alert(this.list.pop());
			this.reload();
		}
	},
	reload:function(){
		var html="";
		for(var i=0;i<this.list.length;i++){
			html+='<div class="item">'+this.list[i]+'</div>';
		}
		contain.innerHTML=html;
		addDivEvent();
	},
	delebydiv:function(id){
		console.log(this.list[id]);
		this.list.splice(id,1);
		this.reload();
	}
}

//为队列的元素添加点击删除自己事件
function addDivEvent(){
	for(var i=0;i<contain.childNodes.length;i++){
		//闭包
		(function(i){
			addEvent(contain.childNodes[i],'click',function(){
				return queue.delebydiv(i);
			});
		})(i);
	}
}
//为进出的四个按钮添加事件
addEvent(button[1],'click',function(){
	var input=button[0].value;
	if((/^[1-9][0-9]*$/).test(input)){
		queue.leftin(input);
	}else{
		alert("input is invalid！")
	}
});
addEvent(button[2],'click',function(){
	var input=button[0].value;
	if((/^[1-9][0-9]*$/).test(input)){
		queue.rightin(input);
	}else{
		alert("input is invalid！")
	}
});
addEvent(button[3],'click',function(){
	queue.leftpop();
});
addEvent(button[4],'click',function(){
	queue.rightpop();
});
