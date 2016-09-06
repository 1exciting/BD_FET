/**
 * Created by haven on 16/9/6.
 */
function Queue(initial, root) {
	this.arr = []
	this.root = root
	this.replayQueue = []

	initial = initial || []
	initial.forEach((x)=>this.pushRight(x))
}

Queue.prototype.pushLeft = function () {
	let value = document.getElementById('number').value
	if (!/\d+/.test(value)) {
		alert('input invalid!')
		return
	}
	let n = parseInt(document.getElementById('number').value)
	if (n < 10 || n > 100) {
		alert('input invalid! 10<n<100')
		return
	}

	let figure = document.createElement('figure')
	figure.className = 'box'
	figure.style.height = n * 2 + 'px'
//    figure.appendChild(document.createTextNode(n))
	this.root.firstChild ? this.root.insertBefore(figure, this.root.firstChild) : this.root.appendChild(figure)
	this.arr.unshift(n)

}

Queue.prototype.pushRight = function (x) {
	let value = document.getElementById('number').value
	if (!x && !/\d+/.test(value)) {
		alert('input invalid!')
		return
	}
	let n = parseInt(document.getElementById('number').value) || x
	if (n < 10 || n > 100) {
		alert('input invalid! 10<n<100')
		return
	}
	let figure = document.createElement('figure')
	figure.className = 'box'
	figure.style.height = n * 2 + 'px'
//    figure.appendChild(document.createTextNode(n))

	this.root.appendChild(figure)
	this.arr.push(n)
}


Queue.prototype.popLeft = function () {
	if (this.arr.length <= 0) {
		alert('its empty!')
		return
	}
	alert(this.arr.shift())
	this.root.removeChild(this.root.firstElementChild)
}

Queue.prototype.popRight = function () {
	if (this.arr.length <= 0) {
		alert('its empty!')
		return
	}
	alert(this.arr.pop())
	this.root.removeChild(this.root.lastElementChild)
}

Queue.prototype.random = function () {
	this.empty()
	let count = 20
	while (count) {
		let item = Math.floor(Math.random() * 90 + 10)
		this.pushRight(item)
		count--
	}

}

Queue.prototype.empty = function () {
	document.getElementById('number').value = ''
	while (this.root.firstChild) {
		this.root.removeChild(this.root.firstChild)
	}
	this.arr = []
}

// 交换数组中的数据
Queue.prototype.swapArr = function (idxA, idxB) {
	//data
	let tmp = this.arr[idxA]
	this.arr[idxA] = this.arr[idxB]
	this.arr[idxB] = tmp

	console.log(`swap ${idxA} and ${idxB}`)
}

//交换数组对应的 DOM
Queue.prototype.swapDom = function (idxA, idxB) {
	//dom

	let tmp = this.root.children[idxA].style.height
	this.root.children[idxA].style.height = this.root.children[idxB].style.height
	this.root.children[idxB].style.height = tmp

	this.root.children[idxB].style.backgroundColor = 'blue'
	this.root.children[idxA].style.backgroundColor = 'red'


	document.getElementById('info').innerHTML += `<br>swap ${idxA} and ${idxB} `
}

/*
 将 from 的 DOM的高度赋值给 to DOM
 @from dom 的 index
 @to dom的 index
 */
Queue.prototype.copyDom = function (from, to) {
	this.root.children[to].style.height = this.root.children[from].style.height

	this.root.children[to].style.backgroundColor = 'blue'

	document.getElementById('info').innerHTML += `<br>copy ${from} to ${to} `

}

//设置 DOM 的高度
// @idx 是 DOM 的 index
Queue.prototype.setDom = function (idx, value) {
	this.root.children[idx].style.height = value * 2 + 'px'
	this.root.children[idx].style.backgroundColor = 'blue'

	document.getElementById('info').innerHTML += `<br>set ${idx} = ${value} `
}

// 将 fn 添加到 replay queue
Queue.prototype.addReplay = function (fn) {
	this.replayQueue.push(fn)
//    this.replayQueue.push(this.swapDom.bind(this, i, j))
}

//@msg 排序的名称
Queue.prototype.replay = function (msg) {
	//add info in dom
	let info = document.getElementById('info')
	info.innerText = `${msg}, Total operation is ${this.replayQueue.length} time`

	// replay dom swap

	function delay() {
		if (this.replayQueue.length > 0) {
			this.replayQueue.shift()()
			setTimeout(delay.bind(this), 50)
		}
	}

	delay.call(this)

//    this.replayQueue = []
}

Queue.prototype.bubbleSort = function () {
	let i,
		j,
		replayQueue = []

	for (i = 0; i < this.arr.length; i++) {
		for (j = 1; j < this.arr.length - i; j++) {


			if (this.arr[j - 1] > this.arr[j]) {
//            this.swap(j - 1, j)
				this.swapArr(j - 1, j)


				;
				(function (j, self) {
					replayQueue.push(self.swapDom.bind(self, j - 1, j))
				})(j, this)
			}

		}
	}

	//add info in dom
	let info = document.getElementById('info')
	info.innerText = `Bubble Sort, Total swap is ${replayQueue.length} time`

	// replay dom swap
	;
	(function delay() {
		if (replayQueue.length > 0) {
			replayQueue.shift()()
			setTimeout(delay, 50)
		}
	})()

}

Queue.prototype.insertSort = function () {
	let i,
		j
	for (i = 1; i < this.arr.length; i++) {
		j = i
		let target = this.arr[j]
		for (; j > 0 && this.arr[j - 1] > target; j--) {

			this.arr[j] = this.arr[j - 1]

			;
			(function (j, self) {
				self.addReplay(self.copyDom.bind(self, j - 1, j))
			})(j, this)

		}
		this.arr[j] = target

		;
		(function (j, target, self) {
			self.addReplay(self.setDom.bind(self, j, target))
		})(j, target, this)

//      this.addReplay(this.copyDom.bind(this, i, j))

	}

	this.replay('Insert Sort')

}

Queue.prototype.quickSort = function () {

}