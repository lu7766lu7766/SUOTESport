var path = require('path')
var fs = require('fs')
var _ = require('lodash')
require('dotenv').config()

var shell = require('shelljs')

var designPath = process.env.DESIGN_PATH
var designSportPath = process.env.DESIGN_SPORT_PATH
var tResourcePath = 'resource/static/'
var designTemplate = {
	[designPath + 'pharaoh(信用平台)']: 'platform-credit',
	[designPath + 'pharaoh(信用平台)_mobile']: 'platform-credit-mobile',
	[designPath + 'Pharaoh現金平台']: 'platform-cash',
	[designPath + 'Pharaoh現金平台mobile']: 'platform-cash-mobile',
	[designPath + '聚鑫信用平台']: 'platform-sin',
	[designPath + '聚鑫信用平台_mobile']: 'platform-sin-mobile',
	[designPath + 'Pharaohsportappweb']: 'sport-mobile',
	[designSportPath + 'web']: 'sport',
	[designSportPath + 'rule']: 'rule'
}
// 要複製的資料夾
var resourceList = ['css', 'img', 'images', 'store', 'bootstrap', 'plugins']

var myLib = require('./myLib')
var resolve = myLib.resolve

var shell = require('shelljs')
shell.exec(`pwd`)
shell.exec(`cd ${process.env.DESIGN_PATH} && git pull`)
shell.exec(`cd ${process.env.DESIGN_SPORT_PATH} && git checkout newGolden && git pull && git merge master && git push`)

_.forEach(designTemplate, (targetDir, designDir) => {
	_.forEach(resourceList, resourceDir => {
		// 原始資源檔位址
		let sResourceFullPath = path.join(resolve('.'), designDir, resourceDir)
		if (fs.existsSync(sResourceFullPath)) {
			shell.rm('-rf', resolve(targetDir + resourceDir))

			// 目的資源檔位址
			let tResourceFullPath = path.join(resolve('.'), tResourcePath, targetDir)
			shell.mkdir('-p', tResourceFullPath) // 防止資料夾不存在
			shell.cp('-R', sResourceFullPath, tResourceFullPath)
		}
	})
})

// 寫入檔名進環境變數
var fs = require('fs')
var uuidv4 = require('uuid/v4')
fs.writeFile(`resource.json`, JSON.stringify({ version: uuidv4() }), function (err) {
	if (err) {
		return console.log(err)
	}
	console.log(`update resource.json successed!!`)
})
