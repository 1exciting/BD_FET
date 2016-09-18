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
class TreeNode{
	constructor(obj){
        this.title = obj.title;
        this.element = obj.element;
        this.element.node = this;
        this.childs = [];
    }
    addChild(title){
        var div = document.createElement('div');
        div.className = 'visible';
        var span = document.createElement('span');
        span.className = 'title';
        span.innerHTML = title;
        div.appendChild(span);
        var add = document.createElement('span');
        add.className = 'add';
        add.innerHTML = '+';
        div.appendChild(add);
        var del = document.createElement('span');
        del.className = 'del';
        del.innerHTML = '-';
        div.appendChild(del);
        var obj = {title:title,element:div}
        new TreeNode(obj);
        this.childs.push(div);
        this.element.appendChild(div);
    }
    delChild(){
        for(let i = 0; i < this.element.parentNode.node.childs.length;i++){
            if(this.element.parentNode.node.childs[i] == this.element){
                this.element.parentNode.node.childs.splice(i,1);
                break;
            }
        }
        this.element.parentNode.removeChild(this.element);
    }
    toggle(){
        if(this.childs.length){
            for(let i =0; i < this.childs.length; i++){
                if(this.childs[i].className == 'visible')
                    this.childs[i].className = 'hidden';
                else
                    this.childs[i].className = 'visible';
            }
        }
    }
    search(key){
        var flag = false;
        this.element.children[0].className = 'title'
        if(this.title == key){
            this.element.children[0].className = 'title red'
            flag = true;
        }
        for(let i = 0; i < this.childs.length; i++){
            if(this.childs[i].node.search(key) == true){
                for(let j = 0; j < this.childs.length; j++){
                    this.childs[j].className = 'visible';
                }
                flag = true;
            }
        }
        return flag;
    }
}
function $(select){
    return document.querySelector(select);
}
var obj = {
    title : $("#tree").children[0].children[0.].innerHTML,
    element : $("#tree").children[0]
}
var tree = new TreeNode(obj);
tree.addChild('a');
tree.childs[0].node.addChild('b')
addEvent(tree.element,'click',function(e){
    var target = e.target||e.srcElement;
    var domNode = target;
    while(!/visible|hidden/.test(domNode.className))
        domNode = domNode.parentNode;
    if(target.className.indexOf('title')!=-1){
        domNode.node.toggle();
    }
    else if(target.className == 'add'){
        domNode.node.addChild(prompt("请输入子结点的内容："));
    }
    else if(target.className == 'del'){
        domNode.node.delChild();
    }
})
addEvent($('#search'),'click',()=>{
 if (tree.search($("#searchText").value.trim()) == false){
    alert("can't find "+$("#searchText").value.trim())
 }
});