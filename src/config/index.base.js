var Sys = {}
var ua = navigator.userAgent.toLowerCase()
var s
(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? (Sys.ie = s[1]) : (s = ua.match(/msie ([\d.]+)/)) ?
	(Sys.ie = s[1]) : (s = ua.match(/firefox\/([\d.]+)/)) ?
		(Sys.firefox = s[1]) : (s = ua.match(/chrome\/([\d.]+)/)) ?
			(Sys.chrome = s[1]) : (s = ua.match(/opera.([\d.]+)/)) ?
				(Sys.opera = s[1]) : (s = ua.match(/version\/([\d.]+).*safari/)) ?
					(Sys.safari = s[1]) : 0
var browserVer =
	Sys.ie ? ('IE: ' + Sys.ie) :
		Sys.firefox ? ('Firefox: ' + Sys.firefox) :
			Sys.chrome ? ('Chrome: ' + Sys.chrome) :
				Sys.opera ? ('Opera: ' + Sys.opera) :
					Sys.safari ? ('Safari: ' + Sys.safari) :
						'unknow'

module.exports = {
	liveHost: `/static/live1Player.swf`,
	isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	browserVer,
	browser: Sys
}
