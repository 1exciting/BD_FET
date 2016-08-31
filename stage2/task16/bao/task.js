/**
 * Created by haven on 16/8/31.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
// var _last = {}

const tb = document.getElementById("aqi-table")

var re_city = /^[\u4E00-\u9FA5a-zA-Z ]+$/
var re_aqi = /^\d+$/
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	const city = document.getElementById("aqi-city-input").value.trim()
	const aqi = document.getElementById("aqi-value-input").value.trim()

	if (city.match(re_city) && aqi.match(re_aqi)) {
		aqiData[city] = aqi
	} else {
		alert('wrong !')
	}

}

/**
 * 渲染aqi-table表格
 */
// Function.prototype.cacheRender

function renderAqiList() {
	let tr = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
	for (let key in aqiData) {
		tr += `<tr><td>${key}</td><td>${aqiData[key]}</td><td><button data-city="${key}">删除</button></td></tr>`
	}
	tb.innerHTML = tr

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
function delBtnHandle(city) {
	// do sth.
	delete aqiData[city]
	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").addEventListener('click', addBtnHandle)
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	tb.addEventListener('click', function (e) {
		if (e.target && e.target.nodeName === 'BUTTON') {
			// alert(e.target.city)
			delBtnHandle(e.target.dataset.city)
		}
	})
}

init();
