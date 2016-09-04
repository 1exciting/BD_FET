/**
 * Created by haven on 16/9/1.
 */

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = ''
	for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
	'#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: '北京',
	nowGraTime: "day"
}

const graTimeMap = {
	'day': '每日',
	'month': '每月',
	'week': "每周"
}


/**
 * 渲染图表
 * 从pageState 读取数据
 */
function renderChart() {
	const chart = document.querySelector("div.aqi-chart-wrap")
	const h1 = document.createElement('h1')
	h1.textContent = pageState.nowSelectCity + '01-03月' + graTimeMap[pageState.nowGraTime] + '空气质量报告'
	const ul = document.createElement('ul')
	let li = ''

	let idx = 0
	const width = 600 / Object.keys(chartData).length
	for (let key in chartData) {
		li += `<li style="width:${width * 2}+px "><div class="bar" style="top:${600 - chartData[key]}px;height:${chartData[key]}px;width:${width}px;background-color: ${colors[idx++ % 12]}"></div><div class="info" style="bottom:${chartData[key] + 10 }px; ">${key}<br>[aqi]${chartData[key]}</div></li>`
	}
	ul.innerHTML = li
	// chart.removeChild(chart.getElementsByTagName('ul')[0])
	chart.innerHTML = ""
	chart.appendChild(h1)
	chart.appendChild(ul)
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(opt) {
	// 确定是否选项发生了变化
	if (opt === pageState.nowGraTime) {
		return
	}

	pageState.nowGraTime = ['day', 'week', 'month'][opt]
	// 设置对应数据
	initAqiChartData();

	// 调用图表渲染函数

	renderChart()
}


/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// 确定是否选项发生了变化
	if (pageState.nowSelectCity == this.value) {
		return
	}
	pageState.nowSelectCity = this.value
	// 设置对应数据
	initAqiChartData();
	// 调用图表渲染函数
	renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	const radio = document.getElementsByName('gra-time')
	for (let i = 0; i < radio.length; i++)(function (m) {
		radio[m].addEventListener('click', graTimeChange.bind(null, m))
	})(i)

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
	const select = document.getElementById('city-select')
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var citys = '';
	for (var item in aqiSourceData) {
		citys += `<option>${item}</option>`;
	}
	select.innerHTML = citys;
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	select.addEventListener('change', citySelectChange)
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中
	chartData = {}

	if (pageState.nowGraTime === 'day') {
		chartData = aqiSourceData[pageState.nowSelectCity]
	} else if (pageState.nowGraTime === 'week') {
		//92 ri
		// let retArr = []
		const dataSource = aqiSourceData[pageState.nowSelectCity]
		const breakPoint = 7
		let count = 0
		Object.keys(dataSource)
			.forEach(function (cur, idx, arr) {
				if (idx === 0) {
					return
				}
				if (arr[idx - 1].slice(0, 7) === cur.slice(0, 7)) {

					let key = cur.slice(0, 7) + ' week ' + (Math.floor(count / breakPoint) + 1).toString()
					key in chartData ? chartData[key] += dataSource[cur] : chartData[key] = 0
					count++
				} else {
					count = 0
				}
			})
		Object.keys(chartData).forEach((key)=> {
			chartData[key] /= 7
		})
	} else {
		const dataSource = aqiSourceData[pageState.nowSelectCity]
		let counter = {}
		Object.keys(dataSource)
			.forEach((cur)=> {
				let month = cur.slice(0, 7)
				if (month in chartData) {
					chartData[month] += dataSource[cur]
				} else {
					chartData[month] = 0
				}
				if (month in counter) {
					counter[month]++
				} else {
					counter[month] = 0
				}
			})
		Object.keys(chartData)
			.forEach((key)=> {
				chartData[key] = (chartData[key] / counter[key]).toFixed(2)
			})
	}
}

/**
 * 初始化函数
 */
function init() {
	initGraTimeForm()
	initCitySelector();
	initAqiChartData();
	renderChart()
}

init();