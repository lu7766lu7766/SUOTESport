const SPORT = 'sport' // 體育博彩
const LIVE = 'live' // 真人視訊
const SLOT = 'slot' // 電子遊戲
const GOLDEN = 'golden' // 黃金期權
const SLOT3D = '3d_slot' // 黃金期權
const BALL = 'ball' // 彩球
const LOTTERY = 'lottery' // 彩票

export default {
	[SPORT]: {
		code: 's_wallet'
	},
	[SLOT]: {
		code: 'PHAST',
		gameType: {
			1: 'PHAST.GT.1',
			2: 'PHAST.GT.2',
			3: 'PHAST.GT.3',
			4: 'PHAST.GT.4'
		},
		playType: {}
	},
	[LIVE]: {
		code: 'PHALE',
		gameType: {
			1: 'PHALE.GT.1',
			98: 'PHALE.GT.98',
			99: 'PHALE.GT.99'
		},
		playType: {}
	},
	[GOLDEN]: {
		code: 'PHAGO',
		gameType: {
			1: 'PHAGO.GT.HL60',
			2: 'PHAGO.GT.HL180',
			3: 'PHAGO.GT.HL300',
			4: 'PHAGO.GT.ST30',
			5: 'PHAGO.GT.ST60',
			6: 'PHAGO.GT.ST120',
			7: 'PHAGO.GT.ST300'
		},
		playType: {}
	},
	[SLOT3D]: {
		code: 'PHA3D',
		gameType: {
			1: 'PHA3D.GT.wealthgod',
			2: 'PHA3D.GT.chinpingmei',
			3: 'PHA3D.GT.egyptfirewheel',
			4: 'PHA3D.GT.condorhero',
			5: 'PHA3D.GT.longfeng'
		},
		playType: {}
	},
	[BALL]: {
		code: 'PHABL',
		gameType: {
			1: 'PHABL.GT.1',
			2: 'PHABL.GT.2',
			3: 'PHABL.GT.3'
		},
		playType: {
			1: 'PHABL.PT.1',
			2: 'PHABL.PT.2',
			3: 'PHABL.PT.3',
			4: 'PHABL.PT.4',
			5: 'PHABL.PT.5',
			6: 'PHABL.PT.6',
			7: 'PHABL.PT.7',
			8: 'PHABL.PT.8',
			9: 'PHABL.PT.9',
			10: 'PHABL.PT.10',
			11: 'PHABL.PT.11'
		}
	},
	[LOTTERY]: {
		code: 'PHALT',
		gameType: {
			1: 'PHALT.GT.1',
			2: 'PHALT.GT.2',
			3: 'PHALT.GT.3',
			4: 'PHALT.GT.4',
			5: 'PHALT.GT.5',
			6: 'PHALT.GT.6'
		},
		playType: {}
	}
}
