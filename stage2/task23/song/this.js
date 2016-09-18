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
class Tree{
	constructor(element){
		this.replayQueue = [];
		this.root = element;
		this.isFind = false;
		this.lock = false;
		this.doing = false;
	}
	_preOrder(ele){
		if(!ele){
			return;
		}
		this.replayQueue.push(ele);
		var now = this;
		[].forEach.call(ele.children,function(child){
			return now._preOrder(child)
		});
	}
	_preOrderFind(ele,key){
		if(this.isFind||!ele){
			return
		}
		if((/^\s*([\w\d]+)/).exec(ele.textContent)[1] === key){
			this.replayQueue.push(ele);
			this.isFind = true;
			return ;
		}
		this.replayQueue.push(ele);
		var now = this;
		[].forEach.call(ele.children,function(child){
			return now._preOrderFind(child,key);
		});
	}
	traverse(){
		if(this.doing){
			alert('doing')
			return
		}
		this.doing = true;
		this.replayQueue = [];
		this._preOrder(this.root);
		if(this.replayQueue.length){
			this._replay(0);
		}
	}
	_replay(i,cb){
		if (i > this.replayQueue.length) {
			cb ? cb() : {}
			this.doing = false;
			return
		}
		i >= this.replayQueue.length ? {} : this.replayQueue[i].style.backgroundColor = 'blue'
		i - 1 >= 0 ? this.replayQueue[i - 1].style.backgroundColor = 'white' : {}
		setTimeout(this._replay.bind(this), 500, i + 1, cb)
	}
    find(str) {
      if (this.lock) {
        alert('in animation')
        return
      }
      this.lock = true
      this.isFind = false
      this.replayQueue = []
      this._preOrderFind(this.root, str)

      if (this.replayQueue.length) {
        this._replay(0, ()=> {
          if (this.isFind) {
            alert(`find ${str}`)
            this.replayQueue[this.replayQueue.length - 1].style.backgroundColor = 'red'
          } else {
            alert(`not find ${str}`)
          }
          this.lock = false
        })
      }
    }
}
var root = document.getElementsByClassName('root')[0]
var inputs = document.getElementsByTagName('input');
var tree = new Tree(root);
//tree.traverse();
//tree.find('12')
addEvent(inputs[0],'click',tree.traverse.bind(tree))
addEvent(inputs[2],'click',function(){
	return tree.find.call(tree,inputs[1].value)
})
