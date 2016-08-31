/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city=document.getElementById("aqi-city-input");
var value=document.getElementById("aqi-value-input");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city_d=city.value.trim();
	var value_d=value.value.trim();
	if(!city_d.match(/^[a-zA-Z\u4E00-\u9FA5 ]+$/)){
		alert("城市必须是字母或汉字！")
	}
	else if(!value_d.match(/^[0-9]{1,4}$/)){
		alert("数字不合法")
	}else{
		aqiData[city_d]=value_d;
	}
};
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var d in aqiData){
        items += "<tr><td>"+d+"</td><td>"+aqiData[d]+"</td><td><button data-city='"+d+"'>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = d?items:"";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var a=event.target.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[a]
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").addEventListener('click',addBtnHandle)
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById("aqi-table").addEventListener('click',function(e){
  	if(e.target.nodeName.toLowerCase()==='button')
  		delBtnHandle(e)
  });
}

init();