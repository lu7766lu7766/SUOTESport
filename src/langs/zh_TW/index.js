import { data } from 'static/codes/zh_TW'
let lang = data.language // {} //resources.language
lang.ver = data.version
import payment from './payment.js'
import betDetailType from './betDetailType.js'
import betDetailTimeType from './betDetailTimeType.js'

//index
lang['money'] = '金額'
lang['handicap'] = '盤口'
lang['odds'] = '賠率'
lang['source'] = '原始'
lang['changed'] = '變更後'
lang['back'] = '返回'
lang['detail'] = '明細'
lang['area'] = '地區'
lang['event'] = '賽事'

//header
lang['index'] = '首頁'
lang['eventList'] = '賽事列表'
lang['news'] = '最新公告'
lang['memberInfo'] = '會員資料'
lang['historyAccount'] = '歷史帳務'
lang['betDetail'] = '投注明細'
lang['gameResults'] = '賽事結果'
lang['sportLive'] = '體育直播'
lang['rules'] = '規則說明'
lang['relateWebsite'] = '相關網站'
lang['guest'] = '訪客'
lang['memberCenter'] = '會員中心'

//footer
lang['serviceCenter'] = '服務中心'
lang['websiteProtocol'] = '網站協議'
lang['relatedWebsite'] = '相關網站'
lang['playDescription'] = '規則說明'

lang['collapseMenu'] = '收放選單'
lang['myFavorite'] = '我的最愛'
lang['live'] = '走地'
lang['notlive'] = '單式'
lang['singleMode'] = '單式'
lang['passLevel'] = '過關'
lang['betList'] = '投注列表'
lang['league'] = '聯盟'
lang['time'] = '時間'

lang['account'] = '帳戶'
lang['name'] = '名稱'
lang['surplus'] = '額度'
lang['dollar'] = '遊戲幣'
lang['point'] = '點'
lang['memberLogin'] = '會員登入'

lang['login'] = '立即登入'
lang['loginSuccess'] = '登入成功'
lang['loginError'] = '登入失敗'
lang['logout'] = '登出'
lang['logoutSuccess'] = '登出成功'
lang['logoutError'] = '登出失敗'
lang['registerSuccess'] = '註冊成功'
lang['registerCheckSuccess'] = '已發送簡訊, 請查收'
lang['registerCheckFail'] = '簡訊發送失敗'

lang['SportGame'] = '體育博彩'
lang['PHAST'] = '電子遊戲'
lang['PHALE'] = '真人視訊'
lang['PHALT'] = '彩票'
lang['PHAGO'] = '黃金期權'
lang['PHA3D'] = '3D電子遊戲'
lang['PHABL'] = '彩球'
lang['PHALT'] = '彩票'
lang['s_wallet'] = lang['SportGame']
lang['c_wallet'] = '客戶錢包'
lang['e_wallet'] = '主錢包'
lang['TAMBT'] = '餘額寶'

lang['alert.betSingleAtLeastOne'] = '請至少選取一個投注目標'
lang['alert.betMultiMustMoreThanOne'] = '過關投注目標必須大於1'
lang['alert.betMultiMustMoreWinMax'] = '超過最大派彩金額'
lang['alert.betMoneyAlert'] = '投注金額必須大於1'
lang['alert.overSgeBetMax'] = '超過場次單注上限'
lang['alert.leastOneSpo'] = '請至少選取一個投注目標'
lang['alert.quotaNotEnough'] = '餘額不足'

lang['alert.pleaseLogin'] = '請先登入！'

lang['all'] = '全部'
lang['dateFormat'] = 'm月 d日 (DD)'
lang['dateFormat2'] = 'm月 d日'
lang['fullDateFormat'] = 'Y年 m月 d日 (DD)'

lang['langChoice'] = '選擇語系'

lang['start'] = '起'
lang['stop'] = '迄'
lang['game'] = '場次'
lang['play'] = '玩法'
lang['category'] = '球種'
lang['sport'] = '球類'
lang['search'] = '搜索'
lang['betCategory'] = '投注類型'

lang['runLine'] = '一輸'
lang['account'] = '帳號'
lang['accountOrPhone'] = '帳號/手機號碼'
lang['phoneNo'] = '手機號碼'
lang['password'] = '密碼'
lang['captcha'] = '驗證碼'

lang['hotGames'] = '最新賽事'
lang['noSession'] = '目前無場次'
lang['noBetCategory'] = '目前無投注類型'
lang['noBetList'] = '目前無注單'
lang['noEvent'] = '目前無賽事'
lang['noResult'] = '查無任何結果'
lang['noMessage'] = '目前無任何訊息'
lang['noLeague'] = '查無聯盟'

// bet
lang['betMoney'] = '投注' + lang['money']
lang['winMoney'] = '可贏' + lang['money']
lang['singleBetMin'] = '單注下限'
lang['singleBetMax'] = '單注上限'
lang['singleTeamMax'] = '單隊上限'
lang['sgeBetMax'] = '場次單注'
lang['bet'] = '投注'
lang['backWater'] = '退水'
lang['alert.overSingleBetMax'] = '已超過' + lang['singleMode'] + '單注上限'
lang['alert.overMultiBetMax'] = '已超過' + lang['passLevel'] + '單注上限'
lang['label.sourceHandicap'] = lang['source'] + lang['handicap']
lang['label.sourceOdds'] = lang['source'] + lang['odds']
lang['label.changedHandicap'] = lang['changed'] + lang['handicap']
lang['label.changedOdds'] = lang['changed'] + lang['odds']
lang['alert.betAgain'] = '是否要重新下注？'
lang['label.betSending'] = '注單遞交中'
lang['label.levelCount'] = '過關關數'
lang['label.winMax'] = '最大派彩金額'
lang['label.clearBetList'] = '清除注單'
lang['label.betFaster'] = '快速投注'
lang['label.plsInputMoney'] = '請輸入金額'
lang['label.betFasterInstro'] = '1.設定投注金額<br />2.點擊投注項目<br />3.投注完成'
lang['alert.sysMsg'] = '系統訊息'
lang['alert.betFaster'] = '您已開啟<span style="color:red">快速下注</span>模式<br>設置投注金額後<br>點擊賠率及時進行投注'
lang['alert.pls-check-bet-detail'] = '請至投注明細確認注單'
lang['alert.net-not-stable-pls-check-bet-detail'] = '網路不穩 請至投注明細確認注單'

//memberInfo
lang['baseInfo'] = '基本資料'
lang['gameSetting'] = '賽事設定'
lang['betSetting'] = '投注設定'
lang['custom'] = '自訂'
lang['customChips'] = lang['custom'] + '籌碼'
lang['currencyName'] = '代幣' + lang['name']
lang['status'] = '狀態'
lang['control'] = '控制'
lang['add'] = '新增'
lang['edit'] = '編輯'
lang['alert.updateSucc'] = '更新成功!'
lang['alert.updateFail'] = '更新失敗!'
lang['alert.pwdUpdateSucc'] = '密碼更新成功!'
lang['alert.pwdUpdateFail'] = '密碼更新失敗!'
lang['alert.pwdNotMatch'] = '新密碼與確認密碼不相符，請重新輸入!'
lang['nickName'] = '暱稱'
lang['newPwd'] = '新密碼'
lang['confirmPwd'] = '再次確認密碼'
lang['enter'] = '確定'
lang['confirm.changeNotSubmit'] = '修改尚未送出，是否送出？'
lang['alert.nameAndMoneyCantBeEmpty'] = '名稱與金額不得為空！'
lang['HALF'] = '半場'
lang['HALF_LIVE'] = '走地半場'
lang['label.customCurrencyTitle'] = '籌碼設定 最多設定5個籌碼'

//gameResuult
lang['leagueName'] = '聯盟名稱'
lang['gameTime'] = '賽事時間'
lang['masterSlaveTeam'] = '主客隊'
lang['loseWinResult'] = '輸贏結果'
lang['loseWinResultWithCommission'] = '輸贏結果(含退水)'
lang['master'] = '主'
lang['slave'] = '客'
lang['remark'] = '備註'

//betDetail
lang['betID'] = '注單編號'
lang['accountDate'] = '帳務日期'
lang['betTime'] = '投注時間'
lang['betContent'] = '投注內容'
lang['alert.betweenTwoMonth'] = '搜尋時間範圍必須小於兩個月!'
lang['alert.endMustBiggerThanStart'] = '結束時間需大於開始時間!'
lang['result'] = '結果'
lang['received'] = '下注成功'
lang['checked_out'] = '已結帳'
lang['recheckout'] = '已結帳'
lang['cancel'] = '退組'
lang['alert.searchNoBetList'] = '查無注單'
lang['winTotalMoney'] = '可贏總金額'
lang['resultTotalMoney'] = '輸贏總金額'
lang['betMoney'] = '投注金額'
lang['betCount'] = '投注筆數'
lang['totalBetResult'] = '總投注結果'
lang['totalBetCount'] = '總投注筆數'
lang['totalBetMoney'] = '總投注金額'
lang['totalLoseWinResultWithCommission'] = '總輸贏結果(含退水)'
lang['label.lastDay'] = '前一天'
lang['label.afterDay'] = '後一天'
lang['label.lastWeek'] = '上週'
lang['label.thisWeek'] = '本週'
lang['label.lastMonth'] = '上月'
lang['label.thisMonth'] = '本月'

//login
lang['alert.captchaError'] = '驗證碼錯誤!'

/** platform */
lang['header.cash-promotions'] = '優惠活動'
lang['header.cash-privacy'] = '隱私權政策'
lang['header.cash-mobile'] = '手機投注'
lang['header.cash-about'] = '關於我們'
lang['header.cash-register'] = '會員註冊'
lang['header.cash-promotions-detail'] = '優惠活動'
lang['header.cash-live'] = '真人視訊'
lang['header.cash-slot'] = '電子遊戲'
lang['header.cash-sport'] = '體育賽事'
lang['header.cash-lottery'] = '彩票遊戲'
lang['header.cash-news'] = '最新公告'
lang['header.cash-message'] = '站內訊息'
lang['header.cash-member-center'] = lang['memberCenter']
lang['header.cash-faq'] = '常見問題'
lang['header.cash-forget-pswd'] = '忘記密碼'
lang['header.cash-app-download'] = '手機投注'
lang['header.cash-deal-introduce'] = '交易說明'
lang['header.cash-yebpay'] = '餘額寶'

lang['fightTeam'] = '對戰隊伍'
lang['allEvent'] = '所有' + lang['event']
lang['time'] = '時間'
lang['eventID'] = '賽事編號'
lang['refresh'] = '刷新'
lang['countDown'] = '倒數'

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

lang = _.assign(lang, payment, betDetailType, betDetailTimeType, leagueScale, search, live)

export default lang
