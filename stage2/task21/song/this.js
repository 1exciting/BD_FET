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

//参数1表示输入框，参数2是显示，参数3若有为按钮，
doallthing("taginput","tag");
doallthing('textArea','contain','submit')

//封装函数在这里 taginput表示输入，tag表示显示框，button表示按钮
function doallthing(taginput,tag){
	var taginput = document.getElementById(taginput);
	var tag = document.getElementById(tag);
	var tagObj = new createList(tag);
	addEvent(tag,'mouseover',function(e){
		if(e.target && e.target.nodeName == 'SPAN'){
			e.target.firstChild.insertData(0,'点击删除');
			e.target.className="red";
		}
	});
	addEvent(tag,'mouseout',function(e) {
		if(e.target && e.target.nodeName == "SPAN") { 
			e.target.firstChild.deleteData(0,4);
			e.target.className="";
		}
	});
	if(!arguments[2]){
		addEvent(taginput,'keyup',showtag);
	}else{
		var button = document.getElementById(arguments[2]);
		addEvent(button,'click',showtag);
	}
	function addDivEvent(tag){
		for(var i=0;i<tag.childNodes.length;i++){
			//闭包
			(function(i){
				addEvent(tag.childNodes[i],'click',function(){
					return tagObj.delebyi(i);
				});
			})(i);
		}
	}
	function showtag(){
		if(/[^0-9a-zA-Z\u4e00-\u9fa5]+/.test(taginput.value) || event.keyCode == 13){
			var data = splitInput(taginput.value);
			data.forEach(function(d){
				if(tagObj.queue.indexOf(d) === -1){
					tagObj.rightPush(d);
					if(tagObj.length>10){
						tagObj.leftShift();
					}
				}
			});
			tagObj.render();
			taginput.value = '';
		}
	}
	function createList(list){
		this.queue = [];
		this.render = function(){
			var str = "";
			this.queue.forEach(function(e){
				str += '<span>' + e + '</span>';
			});
			list.innerHTML = str;
			addDivEvent(tag)
		};
		this.delebyi = function(id){
			this.queue.splice(id,1);
			this.render()
		}
	}
	createList.prototype.rightPush = function(str){
		this.queue.push(str);
		this.render();
	};
	createList.prototype.leftShift = function(){
		this.queue.shift();
		this.render();
	};
	function splitInput(str){
		return str.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	};
}