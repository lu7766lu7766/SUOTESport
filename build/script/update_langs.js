;(async function() {
	var fs = require('fs'),
		request = require('async-request')
	var host = 'ibet88.cc'
	var apiHost = `http://${host}/api/`
	var headers = {
		'X-branch-source': host
	}
	// 所有語系
	var langs = ['zh_TW', 'zh_CN', 'en']
	request = request.defaults({
		headers,
		method: 'GET' // 必須大寫
	})
	var mReq = async (url, body) => {
		var res = await request(url, body)
		if (res.statusCode == 200) {
			var result = JSON.stringify(JSON.parse(res.body))
			return result
		} else {
		}
	}

	langs.forEach(async lang => {
		var res = await mReq(apiHost + 'sportGame/language/codeMapping/' + lang, {})
		var resObj = JSON.parse(res)
		// service 正確才覆寫
		if (resObj.code === 0) {
			// 寫入語系檔
			fs.writeFile(`./static/codes/${lang}.json`, res, function(err) {
				if (err) {
					return console.log(err)
				}
				console.log(`language ${lang} update successed!!`)
			})
		} else {
		}
	})
})()
