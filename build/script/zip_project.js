require('dotenv').config()
var myLib = require('./myLib')
var resolve = myLib.resolve
var end = myLib.end

var fs = require('fs')
var archiver = require('archiver')

var moment = require('moment')
var today = moment().format('YYYYMMDD')
var files = fs.readdirSync(resolve(`dist`))
var repeat = 1
var reg = new RegExp('^' + today)
files.forEach(file => {
	if (reg.test(file)) {
		// 取得開頭為今天日期的檔案
		repeat++
	} else if (end(file.split('.')) == 'zip') {
		// 刪除開頭不為今天日期的壓縮檔
		fs.unlink(resolve(`dist/${file}`), err => { })
	}
})

// 移動getapp網頁
// var shell = require('shelljs')
// shell.cp('-R', 'getapp.html', 'dist/')

// 建立壓縮檔
var user = process.env.AUTOHR || process.env.USER || 'GUEST'
var filename = today + (repeat < 10 ? '0' : '') + repeat.toString() + `_${user}.zip`
var output = fs.createWriteStream(resolve(`dist/${filename}`))
var archive = archiver('zip', {
	zlib: { level: 9 } // Sets the compression level.
})

// 寫入檔名進環境變數
var fs = require('fs')
var deployFile = fs.existsSync('deploy.json') ? JSON.parse(fs.readFileSync('deploy.json')) : {}
deployFile.fileName = filename
fs.writeFile(`deploy.json`, JSON.stringify(deployFile), function (err) {
	if (err) {
		return console.log(err)
	}
	console.log(`update env.json successed!!`)
})

// 確認檔案.htaccess
var shell = require('shelljs')
if (!fs.existsSync(resolve('dist/.htaccess'))) {
	shell.cp(resolve('.htaccess'), 'dist/')
	// Do something
}

console.log(`${filename} is zipping at ` + moment().format('YYYY-MM-DD hh:mm'))
// 壓縮檔案
archive.pipe(output)
archive.file(resolve('dist/index.html'), { name: 'index.html' })
archive.file(resolve('dist/.htaccess'), { name: '.htaccess' })
// archive.file(resolve('dist/getapp.html'), { name: 'getapp.html' })
archive.directory('dist/static/', 'static')
archive.finalize()
