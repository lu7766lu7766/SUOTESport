console.log('rebuild index')

var myLib = require('./myLib')
var resolve = myLib.resolve
var end = myLib.end

var fs = require('fs')
var rootPath = require('../config/index').build.assetsPublicPath
/**
 * 把index.html所引入的js全部合併，並最小化
 */
var request = require('async-request')
var cheerio = require('cheerio')
$ = cheerio.load(fs.readFileSync(resolve('dist/index.html')))
var scriptList = [],
	cssList = []
$('head script').each(async (i, script) => {
	var src = script.attribs.src
	if (src.indexOf('//') > -1) {
		// online
		var fileName = end(src.split('/'))
		var res = await request(src)
		src = `dist/static/script/online.${fileName}`
		fs.writeFileSync(resolve(src), res.body)
	}
	scriptList.push(resolve(src))
})
$('head script').remove()
// $('script').remove()
$('link').each(async (i, link) => {
	var src = link.attribs.href
	if (src.indexOf('//') > -1) {
		// online
		var fileName = end(src.split('/'))
		var res = await request(src)
		src = `dist/static/style/online.${fileName}`
		fs.writeFileSync(resolve(src), res.body)
	}
	cssList.push(resolve(src))
})
$('link').remove()
$('head').append(
	`<link rel=stylesheet href=${rootPath}static/style/all.min.css></link><script src=${rootPath}static/script/all.min.js></script>`
)
var html =
	'<!DOCTYPE html>' +
	$('<div>')
		.append($('html').clone())
		.html()

var shell = require('shelljs')
shell.cp('-R', resolve(`dist/index.html`), resolve(`dist/index.copy.html`))
// fs.createReadStream(resolve(`dist/index.html`)).pipe(fs.createWriteStream(resolve(`dist/index.copy.html`)))
fs.writeFileSync(resolve(`dist/index.html`), html)

var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify')
gulp
	.src(scriptList)
	.pipe(uglify())
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest(resolve(`dist/static/script`)))
gulp
	.src(cssList)
	.pipe(minifyCSS())
	.pipe(concat('all.min.css'))
	.pipe(gulp.dest(resolve(`dist/static/style`)))
// index.html 重製結束
