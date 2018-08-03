Date.prototype.Format = function (fmt) {
	var o = {
		Y: this.getFullYear(),
		'y+': this.getFullYear(),
		m: this.getMonth() + 1, //
		d: this.getDate(), //
		H: this.getHours(), //
		h: this.getHours() % 12,
		i: this.getMinutes(), //
		s: this.getSeconds(), //
		S: this.getMilliseconds(), //
		DD: this.getDay(),
		D: this.getDay(),
		ap: this.getHours() > 12 ? 'PM' : 'AM',
		z:
			(this.getTimezoneOffset() / -60 > -1 ? '+' : '-') +
			((this.getTimezoneOffset() / -60).toString().length == 1 ? '0' : '') +
			this.getTimezoneOffset() / -60 +
			'00' //時區 (this.getTimezoneOffset()/-60)
	}

	var day_list = ['日', '一', '二', '三', '四', '五', '六']
	var day_list_en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1 == 'DD'
					? day_list[o[k]]
					: RegExp.$1 == 'D'
						? day_list_en[o[k]]
						: RegExp.$1.length == 1
							? o[k].toString().length == 1 ? '0' + o[k] : o[k]
							: o[k].toString().substr(o[k].toString().length - RegExp.$1.length)
			)
	return fmt
}
var oneMinSecs = 60
var oneHourSecs = oneMinSecs * 60
var oneDaySecs = oneHourSecs * 24

Date.prototype.AddDay = function (day) {
	return new Date(this.getTime() + 1000 * oneDaySecs * day)
}

Date.prototype.GetTime = function () {
	return this.getTime() / 1000
}

String.prototype.GetMTime = function () {
	return moment(this).valueOf()
}

String.prototype.GetTime = function () {
	return this ? moment(this).valueOf() / 1000 : this
}

String.prototype.GetDayEndTime = function () {
	return this ? this.GetTime() + oneDaySecs - 1 : this
}

String.prototype.GetHourEndTime = function () {
	return this ? this.GetTime() + oneHourSecs - 1 : this
}

String.prototype.GetMinEndTime = function () {
	return this ? this.GetTime() + oneMinSecs - 1 : this
}

// 可以改用 https://raw.github.com/openexchangerates/accounting.js/master/accounting.min.js
// 只有3k大小 http://openexchangerates.github.io/accounting.js/
export function currency(value, fixed = 0, stringEmpty = false) {
	if (isNaN(parseFloat(value))) {
		value = 0
	}

	if ((stringEmpty && value === 0) || value === '0') {
		return '-'
	}

	var split = (parseFloat(value) + '').split('.')
	var decimal

	if (typeof split[1] == 'string') {
		fixed = fixed || split[1].length
		decimal = split[1]
	} else if (typeof split[1] == 'undefined') {
		decimal = fixed ? '0' : ''
	}
	if (decimal.length > fixed) {
		decimal = decimal.substr(0, fixed)
	}
	while (decimal.length < fixed) {
		decimal += '0'
	}

	var pos = 3
	var integer = split[0].split('').reverse()
	var len = integer.length
	len -= parseInt(split[0]) > 0 ? 0 : 1 // 複數的減號，要扣除長度
	while (pos < len++) {
		integer.splice(pos, 0, ',')
		pos += 4
	}

	var res = [integer.reverse().join('')]
	if (decimal) {
		res.push(decimal)
	}
	return res.join('.')
}

var padleft = function (len, word = '0') {
	// var res = this + ''
	// if (res.length >= len) return res
	// else return (word + res).PadLeft(len, word)
	// return 10
	return _.padStart(this, len, word)
}
Number.prototype.PadLeft = padleft
String.prototype.PadLeft = padleft

var unixToTime = function () {
	var dt = new Date(this)
	var hr = dt.getHours()
	var m = '0' + dt.getMinutes()
	var s = '0' + dt.getSeconds()
	return hr - 8 + ':' + m.substr(-2) + ':' + s.substr(-2)
}

Number.prototype.UnixToTime = unixToTime

var dateDiff = function (objDate) {
	var dtEnd = new Date(objDate)
	if (isNaN(dtEnd)) return undefined
	var hr = parseInt((dtEnd - this) / 3600000)
	var min = parseInt((dtEnd - this - hr * 3600000) / 60000)
	var sec = parseInt((dtEnd - this - hr * 3600000 - min * 60000) / 1000)
	return hr + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
}
Date.prototype.DateDiff = dateDiff

export function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

String.prototype.cutString = function (len = 20, replace = '...') {
	return this.length >= len
		? this.split('')
			.splice(0, len + 1)
			.join('') + replace
		: this
}
Array.prototype.end = function () {
	let len = this.length
	return len > 0 ? this[this.length - 1] : []
}

// ping
$.extend({
	ping: function (url, callBack) {
		var requestTime = new Date().getTime()

		function appendHttpPrefix(url) {
			//保證url帶http://
			var strReg = '^((https|http)?://){1}'
			var re = new RegExp(strReg)
			return re.test(url) ? url : 'http://' + url
		}
		$.ajax({
			url: appendHttpPrefix(url),
			type: 'GET',
			dataType: 'jsonp', //設成jsonp來解決cross-domain requests的問題
			timeout: 5000, //超過5秒沒回應就timeout
			cache: false, //不保留cache
			complete: function (jqXHR, textStatus) {
				var responseTime = new Date().getTime()
				var speed = responseTime - requestTime
				var status

				//因為dataType用jsonp格式，但是Server端未針對這部份進行處理，所以執行成功時
				//必定會發生"parsererror"(因為回傳的資料格式不為JavaScript，所以會"parsererror")。
				//此時將需將status手動改回"success"
				if (textStatus == 'parsererror') {
					status = 'success'
				} else {
					status = textStatus
				}

				callBack({
					url: url,
					speed,
					status: status
				})
			}
		})
	}
})

import store from 'src/store'

export async function callApi(fn, data = {}) {
	return await store.dispatch(fn, data) // , { root: true }
}

export function createApiBody(method = 'get', uri = '', data = {}, header = {}) {
	let apiHeader = {}
	apiHeader['X-branch-source'] = config.branchSource
	apiHeader['Content-Type'] = 'application/json'
	apiHeader = _.merge(apiHeader, header)
	if (apiHeader['Content-Type'] == 'application/x-www-form-urlencoded') {
		require('lib/object-traverse.min.js')
		require('lib/object-to-formdata.min.js')
		data = Object.toFormData(data)
	}
	let res = {
		url: config.apiHost + uri,
		headers: apiHeader,
		method,
		responseType: 'json',
		withCredentials: true
	}
	res[method == 'get' ? 'params' : 'data'] = data
	return res
}
