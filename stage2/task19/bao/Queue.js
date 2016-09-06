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

Queue.prototype.random = function (c) {
	this.empty()
	let count = c || 20
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

	this.replayQueue.push(this.swapDom.bind(this, idxA, idxB))
}

//交换数组对应的 DOM
// 如果 idxA 和 idxB 相同 , 只会把他颜色变为蓝色
Queue.prototype.swapDom = function (idxA, idxB) {
	if (idxA === idxB) {
		this.root.children[idxB].style.backgroundColor = 'blue'
		return
	}

	let tmp = this.root.children[idxA].style.height
	this.root.children[idxA].style.height = this.root.children[idxB].style.height
	this.root.children[idxB].style.height = tmp

	this.root.children[idxA].style.backgroundColor = 'red'
	this.root.children[idxB].style.backgroundColor = 'blue'

	document.getElementById('info').innerHTML += `<br>swap ${idxA} and ${idxB} `

	return idxA
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
		if (this.replayQueue.length > 1) {
			this.replayQueue.shift()()
		} else if (this.replayQueue.length === 1) {
			let idx = this.replayQueue.shift()()
			idx ? this.swapDom(idx, idx) : null
		} else {
			return
		}
		setTimeout(delay.bind(this), 20)
	}

	delay.call(this)

//    this.replayQueue = []
}

Queue.prototype.bubbleSort = function () {
	let i,
		j

	for (i = 0; i < this.arr.length; i++) {
		for (j = 1; j < this.arr.length - i; j++) {
			if (this.arr[j - 1] > this.arr[j]) {
				this.swapArr(j - 1, j)
			}
		}
	}

	this.replay('Bubble Sort')
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
	}

	this.replay('Insert Sort')

}

Queue.prototype.quickSort = function () {

	function sort(l, r) {
		console.log(`${l} - ${r}`)
		if (l < r) {
			// let mid = Math.floor((l + r) / 2)

			//第一个数当中间值
			let i = l,
				j = r,
				pivot = this.arr[l]

			while (i < j) {
				while (i < j && this.arr[j] >= pivot) {
					j--
				}
				if (i < j) {
					this.arr[i] = this.arr[j]

					;
					(function (i, j, self) {
						self.addReplay(self.copyDom.bind(self, j, i))
					})(i, j, this)

					i++
				}

				while (i < j && this.arr[i] < pivot) {
					i++
				}
				if (i < j) {
					this.arr[j] = this.arr[i]

					;
					(function (i, j, self) {
						self.addReplay(self.copyDom.bind(self, i, j))
					})(i, j, this)

					j--
				}
			}

			this.arr[i] = pivot

			;
			(function (i, pivot, self) {
				self.addReplay(self.setDom.bind(self, i, pivot))
			})(i, pivot, this)

			sort.call(this, l, i - 1)
			sort.call(this, i + 1, r)
		}
	}

	sort.call(this, 0, this.arr.length - 1)

	this.replay('Quick Sort')
}

Queue.prototype.selectSort = function () {
	let i,
		j
	for (i = 0; i < this.arr.length; i++) {
		let max = i
		for (j = i + 1; j < this.arr.length; j++) {
			if (this.arr[j] < this.arr[max]) {
				max = j
			}

		}
		this.swapArr(max, i)
	}

	this.replay('Select Sort')

}

Queue.prototype.heapSort = function () {

	function heapify(start, end) {
		let lChild = start * 2 + 1,
			rChild = lChild + 1,
			largest = start

		if (lChild < end && this.arr[largest] < this.arr[lChild]) {
			largest = lChild
		}
		if (rChild < end && this.arr[largest] < this.arr[rChild]) {
			largest = rChild
		}
		if (largest != start) {
			this.swapArr(largest, start)
			heapify.call(this, largest, end)
		}
	}

	function buildHeap() {
		// console.log([...this.arr.keys()]);
		[...this.arr.keys()].slice(0, Math.floor(this.arr.length / 2)).reverse().forEach(x=> {
			// console.log(x)
			heapify.call(this, x, this.arr.length)
		})
	}

	buildHeap.call(this)

	for (let i = this.arr.length - 1; i > 0; i--) {
		this.swapArr(0, i)
		heapify.call(this, 0, i)
	}

	this.replay('Heap Sort')
}

Queue.prototype.shellSort = function () {
	let i,
		j,
		gap

	for (gap = Math.floor(this.arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
		for (i = 0; i < gap; i++) {
			for (j = i + gap; j < this.arr.length; j += gap)
				if (this.arr[j] < this.arr[j - gap]) {
					let temp = this.arr[j];
					let k = j - gap;
					while (k >= 0 && this.arr[k] > temp) {
						this.arr[k + gap] = this.arr[k]

						;
						(function (from, to, self) {
							self.addReplay(self.copyDom.bind(self, from, to))
						})(k, k + gap, this)

						k -= gap
					}
					this.arr[k + gap] = temp

					;
					(function (i, temp, self) {
						self.addReplay(self.setDom.bind(self, i, temp))
					})(k + gap, temp, this)

				}
		}
	}

	this.replay('Shell Sort')

}

Queue.prototype.mergeSort = function () {
	function merge(start, mid, end) {
		let i = start,
			j = mid,
			m = mid + 1,
			n = end,
			tmp = [],
			k = 0

		while (i <= j && m <= n) {
			if (this.arr[i] <= this.arr[m]) {
				tmp[k++] = this.arr[i++]
			} else {
				tmp[k++] = this.arr[m++]
			}
		}
		while (i <= j) {
			tmp[k++] = this.arr[i++]
		}
		while (m <= n) {
			tmp[k++] = this.arr[m++]
		}

		tmp.forEach((x, idx)=> {
			this.arr[start + idx] = x

			;
			(function (i, val, self) {
				self.addReplay(self.setDom.bind(self, i, val))
			})(start + idx, x, this)
		})
	}

	function sort(start, end) {
		if (start < end) {
			console.log(`${start}-${end}`)
			let mid = Math.floor((start + end) / 2)

			sort.call(this, start, mid)
			sort.call(this, mid + 1, end)
			merge.call(this, start, mid, end)
		}
	}


	sort.call(this, 0, this.arr.length - 1)

	this.replay('Merge Sort')
}