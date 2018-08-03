var Nightmare = require('nightmare')
require('nightmare-upload')(Nightmare)
const nightmare = Nightmare({
	show: true,
	typeInterval: 20,
	pollInterval: 50,
	waitTimeout: 15 * 60 * 1000 // 10 mins
})
var fs = require('fs')
var env = JSON.parse(fs.readFileSync('env.json'))
var deployFile = JSON.parse(fs.readFileSync('deploy.json'))
// console.log(`${env.packPath}${env.fileName}`)
var deploy = env.deploy
var url = deploy.url,
	userID = deploy.userID,
	pwd = deploy.pwd,
	isDev = process.argv.indexOf('-dev') > -1,
	targetBtn = isDev ? 'h4[title="TEST-www"]' : 'h4[title="PRD-www"]'

nightmare
	.goto(url)
	.wait('#username')
	.wait('#password')
	.wait(300)
	.type('#username', userID)
	.type('#password', pwd)
	.click('#signin_button')
	.wait('#awsc-services-container')
	.goto('https://ap-southeast-1.console.aws.amazon.com/elasticbeanstalk/home?region=ap-southeast-1')
	.wait(targetBtn)
	.click(targetBtn)
	.wait('.inline-block a.btn')
	.wait(1000) // 確認主機
	.click('.inline-block a.btn')
	.wait('input[name="file"]')
	.upload('input[name="file"]', `${env.packPath}${deployFile.fileName}`)
	.click('button.btn[ng-click="deploy()"]')
	// .click('input[name="file"]')
	.wait('.modal.modal-scrollable.ng-hide')
	.wait('i.icon-ok-sign')
	// .wait(5000)
	// .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
	.end()
	.then(() => {
		console.log(`auto deploy${isDev ? '-dev' : ''} success!!`)
	})
	.catch(error => {
		console.error('Search failed:', error)
	})
