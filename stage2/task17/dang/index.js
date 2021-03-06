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

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

var formGraTime = document.getElementById('form-gra-time'),
    citySelect = document.getElementById('city-select'),
    aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];

//事件绑定
function addEventHandler(element,type,handler){
    if (element.addEventListener) {
        element.addEventListener(type,handler,false);
    }else if (element.attachEvent) {
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
}

/**
 * 渲染图表
 */
function renderChart() {
    var color = '',
        innerhtml = '';
    console.log(chartData);
    for(var item in chartData){
        color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    	innerhtml += `<div title="${item}:${chartData[item]}" style="height:${chartData[item]}px; background-color:${color}"></div>`;
     }
    aqiChartWrap.innerHTML = innerhtml;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  pageState.nowGraTime=this.value;
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
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
	var graTime = document.getElementsByTagName('input');
	for(var i=0;i < graTime.length;i++){
		(function(m){
			addEventHandler(graTime[m],'click',graTimeChange);
		})(i);
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citys = '';
  for(var item in aqiSourceData){
  	citys += `<option>${item}</option>`;
  }
  citySelect.innerHTML = citys;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler(citySelect,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowCityData = aqiSourceData[pageState.nowSelectCity];
  var type = pageState.nowGraTime;
  switch(type){
  	case "day":
  		chartData = nowCityData;
  		break;
  	case "week":
  		chartData = {};
  		let countSum = 0,countDay = 0, countWeek=0;
  		for(let item in nowCityData){
  			countSum += nowCityData[item];
  			countDay++;
  			if (new Date(item).getDay()===6) {
  				countWeek++;
  				chartData['第'+countWeek+'周'] = Math.floor(countSum/countDay);
  				countSum = 0;
  				countDay = 0;
  			}
  		}
		if (countDay!==0) {
			countWeek++;
			chartData['第'+countWeek+'周'] = Math.floor(countSum/countDay);
		}
  		break;
  	case "month":
  		chartData = {};
  		let countSums = 0,countDays = 0, countMonth=0;
  		for(let item in nowCityData){
  			countSums += nowCityData[item];
        countDays++;
  			if (new Date(item).getMonth()!==countMonth) {
  				countMonth++;
  				chartData['第'+countMonth+'月'] = Math.floor(countSums/countDays);
  				countSums = 0;
  				countDays = 0;
  			}
  		}
      if (countDays!==0) {
        countMonth++;
        chartData['第'+countMonth+'月'] = Math.floor(countSums/countDays);
      }
  		break;	
  }	

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
  console.log(chartData)
}

init();
