const gaOption = {
	id: 'UA-115432950-1',
	gsv: '6m_ud9McznbGenRQ73hvCRYPUSpGL0teA6-Z-ZBh_5c'
}

class GAController {
	/**
	 * branch
	 */
	static branchGAOption = {
		'www.iwinbet.net': gaOption,
		'iwinbet.net': gaOption,
		'ibet99.cc': gaOption,
		'jac.ibet66.cc': gaOption
	}

	/**
	 * subDomain
	 */
	static userGAID = {
		'fa0488': 'UA-112450215-1'
	}

	static proccess() {
		const subDomain = location.hostname.split('.')[0]
		if (this.userGAID[subDomain]) {
			this.addIDScript(this.userGAID[subDomain])
		}

		if (this.branchGAOption[location.hostname]) {
			if (this.branchGAOption[location.hostname].id) {
				this.addIDScript(this.branchGAOption[location.hostname].id)
			}
			if (this.branchGAOption[location.hostname].gsv) {
				this.addGSVScript(this.branchGAOption[location.hostname].gsv)
			}
		}
	}

	static addIDScript(id) {
		$.getScript(`https://www.googletagmanager.com/gtag/js?id=${id}`)
		window.dataLayer = window.dataLayer || []
		function gtag() {
			dataLayer.push(arguments)
		}
		gtag('js', new Date())
		gtag('config', id)
	}

	static addGSVScript(gsv) {
		$("head").append(`<meta name="google-site-verification" content="${gsv}" />`)
	}
}

export { GAController as default }
