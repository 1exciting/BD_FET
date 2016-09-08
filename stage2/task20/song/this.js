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
var textArea=document.querySelector("#textArea");

//定义队列
var queue={
	list:[],
	leftin:function(num){
		this.list.unshift([num,'red']);
		this.reload();
	},
	rightin:function(num){
		this.list.push([num,'red']);
		this.reload();
	},
	isEmpty:function(){
		return this.list.length==0;
	},
	leftpop:function(){
		if(this.isEmpty())
			alert("队列为空!")
		else{
			alert(this.list.shift()[0]);
			this.reload();
		}
	},
	rightpop:function(){
		if(this.isEmpty())
			alert("队列为空!")
		else{
			alert(this.list.pop()[0]);
			this.reload();
		}
	},
	reload:function(){
		var html="";
		for(var i=0;i<this.list.length;i++){
			html+='<div class="item '+this.list[i][1]+'">'+this.list[i][0]+'</div>';
		}
		contain.innerHTML=html;
		addDivEvent();
	},
	delebydiv:function(id){
		console.log(this.list[id]);
		this.list.splice(id,1);
		this.reload();
	},
	find:function(text){
		if(this.isEmpty())
			alert("队列为空!")
		else{
			var reg=new RegExp(text);
			this.list.forEach(function(item,index){
				if(reg.exec(item)){
					item[1]='blue';
				}else{
					item[1]='red';
				}
			});
			this.reload();
		}
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
	var str=textArea.value.trim();
	var str_list=str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){
		if((/^[0-9a-zA-Z\u4e00-\u9fa5]+$/).test(item)){
			return true;
		}else{
			return false;
		}
	});
	str_list.forEach(function(item,index){
		queue.leftin(item);
	});
});
addEvent(button[2],'click',function(){
	var str=textArea.value.trim();
	var str_list=str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(item){
		if((/^[0-9a-zA-Z\u4e00-\u9fa5]+$/).test(item)){
			return true;
		}else{
			return false;
		}
	});
	str_list.forEach(function(item,index){
		queue.rightin(item);
	});
});
addEvent(button[3],'click',function(){
	queue.leftpop();
});
addEvent(button[4],'click',function(){
	queue.rightpop();
});
addEvent(button[5],'click',function(){
	var text=button[6].value.trim();
	if(text=="")
		alert("input in none")
	else{
		queue.find(text);
	}
});

