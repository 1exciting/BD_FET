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
		if(this.list.length>=60){
			alert('input number bigger than 60!');
			return;
		}
		this.list.unshift([parseInt(num),'red']);
		this.reload();
	},
	rightin:function(num){
		if(this.list.length>=60){
			alert('input number bigger than 60!');
			return;
		}
		this.list.push([parseInt(num),'red']);
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
			html+='<div class="item '+this.list[i][1]+'" style="height:'+this.list[i][0]+'px"></div>';
		}
		contain.innerHTML=html;
		addDivEvent();
	},
	delebydiv:function(id){
		console.log(this.list[id][0]);
		this.list.splice(id,1);
		this.reload();
	},
	sort:function(){
		// timeout
		var time=300;
		var temp;
		//冒泡排序
		var i=1;//共length-1个循环
		var j=0;
		var flag=false;
		var timer=setInterval(function(){
			if(j!=0){
				queue.list[j-1][1]="red";
				queue.list[j][1]="green";
				queue.reload();
			}
			if(j>=queue.list.length-i){
				i++;
				j=0;
				if(flag==false){
					clearInterval(timer);
					return;
				}
				flag=false;
			}
			if(i>=queue.list.length){
				clearInterval(timer);
				return;
			}
			queue.list[j][1]=queue.list[j+1][1]="blue";
			queue.reload();
			if(queue.list[j][0]>queue.list[j+1][0]){
				flag=true;
				temp=queue.list[j];
				queue.list[j]=queue.list[j+1];
				queue.list[j+1]=temp;
				queue.reload();
			}
			j++;
		},time)
	},
	random:function(){
		var i=this.list.length;
		for(;i<=20;i++){
			this.list.unshift([parseInt(randomData()),'red']);
		}
		this.reload();
	}
}
//随机数 10-100
function randomData() {
    return Math.ceil(Math.random() * 90 + 10);
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
	if((/^[1-9][0-9]*$/).test(input) && parseInt(input)>=10 && parseInt(input)<=100){
		queue.leftin(input);
	}else{
		alert("input is invalid！")
	}
});
addEvent(button[2],'click',function(){
	var input=button[0].value;
	if((/^[1-9][0-9]*$/).test(input) && parseInt(input)>=10 && parseInt(input)<=100){
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
addEvent(button[5],'click',function(){
	queue.sort();
});
addEvent(button[6],'click',function(){
	queue.random();
});
