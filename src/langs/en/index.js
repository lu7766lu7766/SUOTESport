import { data } from 'static/codes/en'
let lang = data.language // {} //resources.language
lang.ver = data.version
import payment from '../zh_TW/payment.js'
import betDetailTimeType from './betDetailTimeType.js'

//index
lang['money'] = 'Money'
lang['handicap'] = 'Handicap'
lang['odds'] = 'Gambling odds'
lang['source'] = 'Source'
lang['changed'] = 'Changed'
lang['back'] = 'Back'
lang['detail'] = 'Detail'
lang['area'] = 'Area'
lang['event'] = 'Event'

//header
lang['index'] = 'Index'
lang['eventList'] = 'Events'
lang['news'] = 'News'
lang['memberInfo'] = 'Member Info'
lang['historyAccount'] = 'History account'
lang['betDetail'] = 'Bet Detail'
lang['gameResults'] = 'Game Results'
lang['sportLive'] = 'Sport Live'
lang['relateWebsite'] = 'Relate Website'
lang['rules'] = 'Rules'
lang['guest'] = 'Guest'
lang['memberCenter'] = 'Member Center'

//footer
lang['serviceCenter'] = 'Service'
lang['websiteProtocol'] = 'Protocol'
lang['relatedWebsite'] = 'Related sites'
lang['playDescription'] = 'Playing method'
lang['payOffRule'] = 'PAYOFF rule'

lang['collapseMenu'] = 'Collapse Menu'
lang['myFavorite'] = 'Favorite'
lang['live'] = 'LIVE'
lang['notlive'] = 'Not LIVE'
lang['singleMode'] = 'SINGLE'
lang['passLevel'] = 'MUTILBET'
lang['betList'] = 'SYSTEM'
lang['league'] = 'League'
lang['time'] = 'Time'

lang['account'] = 'Account'
lang['name'] = 'Name'
lang['surplus'] = 'Surplus'
lang['dollar'] = 'Game currency'
lang['point'] = 'Point'
lang['memberLogin'] = 'Member Login'

lang['login'] = 'Login'
lang['loginSuccess'] = 'Login success'
lang['loginError'] = 'Login error'
lang['logout'] = 'Logout'
lang['logoutSuccess'] = 'Logout success'
lang['logoutError'] = 'Logout error'
lang['registerSuccess'] = 'Register Success'
lang['registerCheckSuccess'] = 'Sent text message, please check'
lang['registerCheckFail'] = 'Sent text message fail'

lang['SportGame'] = 'Sport Game'
lang['PHAST'] = '電子遊戲'
lang['PHALE'] = '真人視訊'
lang['PHAGO'] = '黃金期權'
lang['PHALT'] = '彩票'
lang['PHA3D'] = '3D電子遊戲'
lang['PHABL'] = '彩球'
lang['PHALT'] = '彩票'
lang['s_wallet'] = lang['SportGame']
lang['c_wallet'] = '客戶錢包'
lang['e_wallet'] = '主錢包'
lang['TAMBT'] = '餘額寶'

lang['alert.betSingleAtLeastOne'] = 'At least one target'
lang['alert.betMultiMustMoreThanOne'] = "Multi's target must be more than 1"
lang['alert.betMultiMustMoreWinMax'] = "It't over win max"
lang['alert.betMoneyAlert'] = 'The money must be more then 1 dollar'
lang['alert.overSgeBetMax'] = "It't over bet max"
lang['alert.leastOneSpo'] = 'Least selected one target'
lang['alert.quotaNotEnough'] = 'Your quota is not enough'

lang['alert.pleaseLogin'] = 'Please login first!'

lang['all'] = 'All'
lang['dateFormat'] = 'm-d (D)'
lang['dateFormat2'] = 'm-d'
lang['fullDateFormat'] = 'Y-m-d (D)'

lang['langChoice'] = 'Language'

lang['start'] = 'Start'
lang['stop'] = 'Stop'
lang['game'] = 'Game'
lang['play'] = 'Play'
lang['category'] = 'Category'
lang['sport'] = 'Sport'
lang['search'] = 'Search'
lang['betCategory'] = 'Category'

lang['runLine'] = '1.5'
lang['account'] = 'account'
lang['accountOrPhone'] = 'Account/PhoneNo'
lang['phoneNo'] = 'cellPoneNo'
lang['password'] = 'password'
lang['captcha'] = 'verification code'

lang['hotGames'] = 'Popular events'
lang['noSession'] = 'There are no session'
lang['noBetCategory'] = 'There are no category'
lang['noBetList'] = 'There are no list'
lang['noEvent'] = 'There are no event'
lang['noResult'] = 'There are no result'
lang['noMessage'] = 'There are no message'

// bet
lang['betMoney'] = 'Bet'
lang['winMoney'] = 'Win'
lang['singleBetMin'] = 'Bet min'
lang['singleBetMax'] = 'Bet max'
lang['singleTeamMax'] = 'Team max'
lang['sgeBetMax'] = 'Game max'
lang['bet'] = 'Bet'
lang['backWater'] = 'Retreat'
lang['alert.overSingleBetMax'] = 'Over Single Bet Max'
lang['alert.overMultiBetMax'] = 'Over Multiple Bet Max'
lang['label.sourceHandicap'] = lang['source'] + ' ' + lang['handicap']
lang['label.sourceOdds'] = lang['source'] + ' ' + lang['odds']
lang['label.changedHandicap'] = lang['changed'] + ' ' + lang['handicap']
lang['label.changedOdds'] = lang['changed'] + ' ' + lang['odds']
lang['alert.betAgain'] = 'Do you want to bet again？'
lang['label.betSending'] = 'Beting'
lang['noLeague'] = 'No League'
lang['label.levelCount'] = 'Level Count'
lang['label.winMax'] = 'Win Max'
lang['label.clearBetList'] = 'Clear'
lang['label.betFaster'] = 'Bet Faster'
lang['label.plsInputMoney'] = 'Money'
lang['label.betFasterInstro'] = '1.Input the Money<br />2.Click button<br />3.Finish'
lang['alert.sysMsg'] = 'System Message'
lang['alert.betFaster'] = '您已開啟<span style="color:red">快速下注</span>模式<br>設置投注金額後<br>點擊賠率及時進行投注'
lang['alert.pls-check-bet-detail'] = "Please check result at bet detail page"
lang['alert.net-not-stable-pls-check-bet-detail'] = 'Network is not stable, please check result at bet detail page'

//memberInfo
lang['baseInfo'] = 'Base'
lang['gameSetting'] = 'Event'
lang['betSetting'] = 'Bet Setting'
lang['custom'] = 'Custom'
lang['customChips'] = lang['custom'] + 'Chips'
lang['currencyName'] = 'Currency'
lang['status'] = 'Status'
lang['control'] = 'Control'
lang['add'] = 'Add'
lang['edit'] = 'Edit'
lang['alert.updateSucc'] = 'Update success!'
lang['alert.updateFail'] = 'Update fail!'
lang['alert.pwdUpdateSucc'] = 'Password update success!'
lang['alert.pwdUpdateFail'] = 'Password update fail!!'
lang['alert.pwdNotMatch'] = "The passwords doesn't match !"
lang['nickName'] = 'Nick name'
lang['newPwd'] = 'New Password'
lang['confirmPwd'] = 'Confirm password'
lang['enter'] = 'Enter'
lang['confirm.changeNotSubmit'] = 'Your change is submit yet, do you want to submit？'
lang['alert.nameAndMoneyCantBeEmpty'] = "Name and Money can't be empty!"
lang['HALF'] = 'Half'
lang['HALF_LIVE'] = 'Live Half'
lang['label.customCurrencyTitle'] = '筹码设定 最多设定5个筹码'

//gameResuult
lang['leagueName'] = 'League'
lang['gameTime'] = 'Time'
lang['masterSlaveTeam'] = 'Team'
lang['loseWinResult'] = 'Result'
lang['loseWinResultWithCommission'] = 'Result with commission'
lang['master'] = 'Master'
lang['slave'] = 'Slave'
lang['remark'] = 'Remark'

//betDetail
lang['betID'] = 'Bet Number'
lang['accountDate'] = 'Account Date'
lang['betTime'] = 'Bet Time'
lang['betContent'] = 'Content'
lang['alert.betweenTwoMonth'] = 'The time condition have to winthin two months!'
lang['alert.endMustBiggerThanStart'] = 'End time must bigger than start time!'
lang['result'] = 'Result'
lang['received'] = 'Received'
lang['checked_out'] = 'Checked out'
lang['recheckout'] = 'Recheckout'
lang['cancel'] = 'Cancel'
lang['alert.searchNoBetList'] = 'There are no bet list!'
lang['winTotalMoney'] = 'Win'
lang['resultTotalMoney'] = 'Result'
lang['betMoney'] = 'Bet Money'
lang['betCount'] = 'Bets'
lang['totalBetResult'] = 'Total bet result'
lang['totalBetCount'] = 'Bets Total'
lang['totalBetMoney'] = 'Bet total money'
lang['totalLoseWinResultWithCommission'] = 'Result with commission'
lang['label.lastDay'] = 'Last Week'
lang['label.afterDay'] = 'After Day'
lang['label.lastWeek'] = 'Last Week'
lang['label.thisWeek'] = 'This Week'
lang['label.lastMonth'] = 'Last Month'
lang['label.thisMonth'] = 'This Month'

//login
lang['alert.captchaError'] = 'You got wrong verification code!'

/** platform */
lang['header.cash-live'] = 'Live'
lang['header.cash-slot'] = 'Slot'
lang['header.cash-promotions'] = 'Promotions'
lang['header.cash-privacy'] = 'Privacy'
lang['header.cash-mobile'] = 'Mobile'
lang['header.cash-about'] = 'About'
lang['header.cash-register'] = 'Register'
lang['header.cash-promotions-detail'] = 'Promotions'
lang['header.cash-sport'] = 'Sport'
lang['header.cash-lottery'] = 'Lottery'
lang['header.cash-news'] = 'News'
lang['header.cash-message'] = 'Message'
lang['header.cash-member-center'] = lang['memberCenter']
lang['header.cash-faq'] = 'Q & A'
lang['header.cash-forget-pswd'] = 'Forget Password'
lang['header.cash-app-download'] = 'APP Download'
lang['header.cash-deal-introduce'] = 'Deal Introduction'
lang['header.cash-yebpay'] = 'Yepay'

lang['fightTeam'] = 'Team'
lang['allEvent'] = lang['event']
lang['time'] = 'Time'
lang['eventID'] = 'Event ID'
lang['refresh'] = 'Refresh'
lang['countDown'] = 'Count Down'

// 聯賽
const leagueScale = {
	smallJointEvent: '小型聯賽',
	middleJointEvent: '中型聯賽',
	bigJointEvent: '大型聯賽'
}

// 查詢
const search = {
	'search.league': '查詢聯盟'
}

// 直播
const live = {
	'live.live1': '直播一',
	'live.live2': '直播二',
	'live.live3': '直播三',
	'live.live': '直播',
	'live.live-list': '直播列表',
	'live.here-live': '現場直播',
	'live.pls-choose-channel': '請選擇頻道',
	'live.iwinbet': '皇璽會',
	'live.cannt-find-video': '找不到相關影片',
	'live.refresh': '重整'
}

lang = _.assign(lang, payment, betDetailTimeType, leagueScale, search, live)

export default lang
