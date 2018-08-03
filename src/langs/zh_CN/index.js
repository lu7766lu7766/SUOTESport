import { data } from 'static/codes/zh_CN'
let lang = data.language // {} //resources.language
data.language
import payment from '../zh_TW/payment.js'
import betDetailTimeType from './betDetailTimeType.js'

//index
lang['money'] = '金额'
lang['handicap'] = '盘口'
lang['odds'] = '赔率'
lang['source'] = '原始'
lang['changed'] = '变更后'
lang['back'] = '返回'
lang['detail'] = '明细'
lang['area'] = '地区'
lang['event'] = '赛事'

//header
lang['index'] = '首页'
lang['eventList'] = '赛事列表'
lang['news'] = '最新公告'
lang['memberInfo'] = '会员资料'
lang['historyAccount'] = '历史帐务'
lang['betDetail'] = '投注明细'
lang['gameResults'] = '赛事结果'
lang['sportLive'] = '体育直播'
lang['relateWebsite'] = '相关网站'
lang['rules'] = '规则说明'
lang['guest'] = '访客'
lang['memberCenter'] = '会员中心'

//footer
lang['serviceCenter'] = '服务中心'
lang['websiteProtocol'] = '网站协议'
lang['relatedWebsite'] = '相关网站'
lang['playDescription'] = '规则说明'
lang['payOffRule'] = '派彩规则'

lang['collapseMenu'] = '收放选单'
lang['myFavorite'] = '我的最爱'
lang['live'] = '滚球中'
lang['notlive'] = '单式'
lang['singleMode'] = '单式'
lang['passLevel'] = '过关'
lang['betList'] = '投注列表'
lang['league'] = '联盟'
lang['time'] = '时间'

lang['account'] = '用户'
lang['name'] = '名称'
lang['surplus'] = '额度'
lang['dollar'] = '游戏币'
lang['point'] = '点'
lang['memberLogin'] = '会员登入'

lang['login'] = '立即登入'
lang['loginSuccess'] = '登入成功'
lang['loginError'] = '登入失敗'
lang['logout'] = '登出'
lang['logoutSuccess'] = '登出成功'
lang['logoutError'] = '登出失败'
lang['registerSuccess'] = '注册成功'
lang['registerCheckSuccess'] = '已发送短信, 请查收'
lang['registerCheckFail'] = '发送短信失败'

lang['SportGame'] = '体育博彩'
lang['PHAST'] = '电子游戏'
lang['PHALE'] = '真人视讯'
lang['PHAGO'] = '黄金期权'
lang['PHALT'] = '彩票'
lang['PHA3D'] = '3D电子游戏'
lang['PHABL'] = '彩球'
lang['PHALT'] = '彩票'
lang['s_wallet'] = lang['SportGame']
lang['c_wallet'] = '客户钱包'
lang['e_wallet'] = '电子钱包'
lang['TAMBT'] = '余额宝'

lang['alert.betSingleAtLeastOne'] = '请至少选取一个投注目标'
lang['alert.betMultiMustMoreThanOne'] = '过关投注目标必须大于1'
lang['alert.betMultiMustMoreWinMax'] = '超过最大派彩金额'
lang['alert.betMoneyAlert'] = '投注金额必须大于1'
lang['alert.overSgeBetMax'] = '超过场次单注上限'
lang['alert.leastOneSpo'] = '请至少选取一个投注目标'
lang['alert.quotaNotEnough'] = '餘額不足'

lang['alert.pleaseLogin'] = '请先登入！'

lang['all'] = '全部'
lang['dateFormat'] = 'm月 d日 (DD)'
lang['dateFormat2'] = 'm月 d日'
lang['fullDateFormat'] = 'Y年 m月 d日 (DD)'

lang['langChoice'] = '选择语系'

lang['start'] = '起'
lang['stop'] = '迄'
lang['game'] = '场次'
lang['play'] = '玩法'
lang['category'] = '球种'
lang['sport'] = '球类'
lang['search'] = '搜索'
lang['betCategory'] = '投注类型'

lang['runLine'] = '一输'
lang['accountOrPhone'] = '用户名/手机号码'
lang['account'] = '用户名'
lang['phoneNo'] = '手机号码'
lang['password'] = '密码'
lang['captcha'] = '验证码'

lang['hotGames'] = '最新赛事'
lang['noSession'] = '目前无场次'
lang['noBetCategory'] = '目前无投注类型'
lang['noBetList'] = '目前无注单'
lang['noEvent'] = '目前無賽事'
lang['noResult'] = '查无任何结果'
lang['noMessage'] = '目前无任何讯息'
lang['noLeague'] = '查无联盟'

// bet
lang['betMoney'] = '投注' + lang['money']
lang['winMoney'] = '可赢' + lang['money']
lang['singleBetMin'] = '单注下限'
lang['singleBetMax'] = '单注上限'
lang['singleTeamMax'] = '单队上限'
lang['sgeBetMax'] = '场次单注'
lang['bet'] = '投注'
lang['backWater'] = '返水'
lang['alert.overSingleBetMax'] = '已超过' + lang['singleMode'] + '单注上限'
lang['alert.overMultiBetMax'] = '已超过' + lang['passLevel'] + '单注上限'
lang['label.sourceHandicap'] = lang['source'] + lang['handicap']
lang['label.sourceOdds'] = lang['source'] + lang['odds']
lang['label.changedHandicap'] = lang['changed'] + lang['handicap']
lang['label.changedOdds'] = lang['changed'] + lang['odds']
lang['alert.betAgain'] = '是否要重新下注？'
lang['label.betSending'] = '注单递交中'
lang['label.levelCount'] = '过关关数'
lang['label.winMax'] = '最大派彩金额'
lang['label.clearBetList'] = '清除注单'
lang['label.betFaster'] = '快速投注'
lang['label.plsInputMoney'] = '请输入金额'
lang['label.betFasterInstro'] = '1.设定投注金额<br />2.点击投注项目<br />3.投注完成'
lang['alert.sysMsg'] = '系统讯息'
lang['alert.betFaster'] = '您已开启<span style="color:red">快速下注</span>模式<br>设置投注金额后<br>点击赔率及时进行投注'
lang['alert.pls-check-bet-detail'] = "请至投注明细确认注单"
lang['alert.net-not-stable-pls-check-bet-detail'] = '网路不稳 请至投注明细确认注单'

//memberInfo
lang['baseInfo'] = '基本资料'
lang['gameSetting'] = '赛事设定'
lang['betSetting'] = '投注设定'
lang['custom'] = '自订'
lang['customChips'] = lang['custom'] + '筹码'
lang['currencyName'] = '代币' + lang['name']
lang['status'] = '状态'
lang['control'] = '控制'
lang['add'] = '新增' + lang['info']
lang['edit'] = '编辑'
lang['alert.updateSucc'] = '更新成功!'
lang['alert.updateFail'] = '更新失败!'
lang['alert.pwdUpdateSucc'] = '密码更新成功'
lang['alert.pwdUpdateFail'] = '密码更新失败!'
lang['alert.pwdNotMatch'] = '新密碼與確認密碼不相符，請重新輸入!'
lang['nickName'] = '暱稱'
lang['newPwd'] = '新密碼'
lang['confirmPwd'] = '再次確認密碼'
lang['enter'] = '確定'
lang['confirm.changeNotSubmit'] = '修改尚未送出，是否送出？'
lang['alert.nameAndMoneyCantBeEmpty'] = '名称与金额不得为空！'
lang['HALF'] = '半场'
lang['HALF_LIVE'] = '走地半场'
lang['label.customCurrencyTitle'] = '筹码设定 最多设定5个筹码'

//gameResuult
lang['leagueName'] = '联盟名称'
lang['gameTime'] = '赛事时间'
lang['masterSlaveTeam'] = '主客队'
lang['loseWinResult'] = '输赢结果'
lang['loseWinResultWithCommission'] = '输赢结果(含返水)'
lang['master'] = '主'
lang['slave'] = '客'
lang['remark'] = '备注'

//betDetail
lang['betID'] = '注单编号'
lang['accountDate'] = '帐务日期'
lang['betTime'] = '投注时间'
lang['betContent'] = '投注内容'
lang['alert.betweenTwoMonth'] = '搜寻时间范围必须小于两个月!'
lang['alert.endMustBiggerThanStart'] = '结束时间需大于开始时间!'
lang['result'] = '结果'
lang['received'] = '下注成功'
lang['checked_out'] = '已结帐'
lang['recheckout'] = '已结帐'
lang['cancel'] = '退组'
lang['alert.searchNoBetList'] = '查无注单'
lang['winTotalMoney'] = '可赢总金额'
lang['resultTotalMoney'] = '输赢总金额'
lang['betMoney'] = '投注金额'
lang['betCount'] = '投注笔数'
lang['totalBetCount'] = '投注总笔数'
lang['totalBetResult'] = '总投注结果'
lang['totalBetMoney'] = '投注总金额'
lang['totalLoseWinResultWithCommission'] = '总输赢结果(含返水)'
lang['label.lastDay'] = '前一天'
lang['label.afterDay'] = '后一天'
lang['label.lastWeek'] = '上周'
lang['label.thisWeek'] = '本周'
lang['label.lastMonth'] = '上月'
lang['label.thisMonth'] = '本月'

//login
lang['alert.captchaError'] = '验证码错误!'

/** platform */
lang['header.cash-promotions'] = '优惠活动'
lang['header.cash-privacy'] = '隐私权政策'
lang['header.cash-mobile'] = '手机投注'
lang['header.cash-about'] = '关于我们'
lang['header.cash-register'] = '会员注册'
lang['header.cash-promotions-detail'] = '优惠活动'
lang['header.cash-live'] = '真人视讯'
lang['header.cash-slot'] = '电子游戏'
lang['header.cash-sport'] = '体育赛事'
lang['header.cash-lottery'] = '彩票游戏'
lang['header.cash-news'] = '最新公告'
lang['header.cash-message'] = '站內讯息'
lang['header.cash-member-center'] = lang['memberCenter']
lang['header.cash-faq'] = '常见问题'
lang['header.cash-forget-pswd'] = '忘记密码'
lang['header.cash-app-download'] = '手机投注'
lang['header.cash-deal-introduce'] = '交易说明'
lang['header.cash-yebpay'] = '余额宝'

lang['fightTeam'] = '对战队伍'
lang['allEvent'] = '所有' + lang['event']
lang['time'] = '时间'
lang['eventID'] = '赛事编号'
lang['refresh'] = '刷新'
lang['countDown'] = '倒数'

// 聯賽
const leagueScale = {
	smallJointEvent: '小型联赛',
	middleJointEvent: '中型联赛',
	bigJointEvent: '大型联赛'
}

// 查詢
const search = {
	'search.league': '查询联盟'
}

// 直播
const live = {
	'live.live1': '直播一',
	'live.live2': '直播二',
	'live.live3': '直播三',
	'live.live': '直播',
	'live.live-list': '直播列表',
	'live.here-live': '现场直播',
	'live.pls-choose-channel': '请选择频道',
	'live.iwinbet': '皇玺会',
	'live.cannt-find-video': '找不到相关影片',
	'live.refresh': '重整'
}

lang = _.assign(lang, payment, betDetailTimeType, leagueScale, search, live)

export default lang
