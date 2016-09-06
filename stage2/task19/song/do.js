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
	isSort:false,
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
			this.list.shift();
			this.reload();
		}
	},
	rightpop:function(){
		if(this.isEmpty())
			alert("队列为空!")
		else{
			this.list.pop();
			this.reload();
		}
	},
	reload:function(){
		var html="";
		for(var i=0;i<this.list.length;i++){
			html+='<div class="item '+this.list[i][1]+'" style="height:'+this.list[i][0]*2+'px"></div>';
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
		if(this.isSort==true)
			return;
		// timeout
		var time;
		var input=button[6].value;
		if((/^[1-9][0-9]*$/).test(input)){
				time=parseInt(input);
			}else{
				alert("input is invalid！");
				time=100;
				button[7].value=100;
				return;
			}
		var temp;
		//冒泡排序
		var i=1;//共length-1个循环
		var j=0;
		var flag=false;
		this.isSort=true;
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
					this.isSort=false;
					return;
				}
				flag=false;
			}
			if(i>=queue.list.length){
				clearInterval(timer);
				this.isSort=false;
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
	insertSort:function(){
		if(this.isSort==true)
			return;
		this.isSort=true;
		// timeout
		var time;
		var input=button[6].value;
		if((/^[1-9][0-9]*$/).test(input)){
				time=parseInt(input);
			}else{
				alert("input is invalid！");
				time=100;
				button[6].value=100;
				return;
			}
		//插入排序
		var i=1;//共length-1个循环
		var j=i;
		var insertFlag=false;
		if(queue.list.length<=1){
			this.isSort=false;
			return;
		}
		var temp=queue.list[1];
		queue.list[0][1]='blue';
		var timer=setInterval(function(){
			if(insertFlag==false){
				queue.list[j][1]='blue';
			}
			if(insertFlag==true||j==0){
				queue.list[j]=temp;
				queue.reload();
				i++;
				j=i;
				temp=queue.list[i];
				insertFlag=false;
			}
			if(i>=queue.list.length){
				clearInterval(timer);
				this.isSort=false;
				return;
			}else{
				queue.list[i][1]='blue';
			}
			if(queue.list[j-1][0]>temp[0]&&j>0){
				queue.list[j]=queue.list[j-1];
				queue.list[j-1][1]='green';
				queue.reload();
				j--;
			}
			else{
				queue.list[j]=temp;
				insertFlag=true;
				queue.reload();
			}
		},time)
	},
	selectSort:function(){
		if(this.isSort==true)
			return;
		this.isSort=true;
		// timeout
		var time;
		var input=button[6].value;
		if((/^[1-9][0-9]*$/).test(input)){
				time=parseInt(input);
			}else{
				alert("input is invalid！");
				time=100;
				button[6].value=100;
				return;
			}
		//插入排序
		var i=0;//共length-1个循环
		var j=0;
		var max=queue.list[0][0];
		var index=0;
		queue.list[index][1]='blue';
		var temp;
		var timer=setInterval(function(){
			queue.list[j][1]='red';
			j++;
			if(i>=queue.list.length-1){
				clearInterval(timer);
				return;
			}
			queue.list[j][1]='blue';
			if(max<queue.list[j][0]){
				max=queue.list[j][0];
				queue.list[index][1]='red';
				index=j;
			}
			
			queue.list[index][1]='green';
			queue.reload();
			if(j>=queue.list.length-i-1){
				queue.list[index]=queue.list[j];
				queue.list[index][1]='red';
				queue.list[j]=[max,'green'];
				queue.reload();
				i++;
				j=0;
				index=0;
				max=queue.list[0][0];
			}

		},time);
	},
	random:function(){
		this.list=[];
		for(var i=0;i<40;i++){
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
addEvent(button[7],'click',function(){
	queue.sort();
});
addEvent(button[5],'click',function(){
	queue.random();
});
addEvent(button[8],'click',function(){
	queue.insertSort();
});
addEvent(button[9],'click',function(){
	queue.selectSort();
});
