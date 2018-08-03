import InterfaceConf from 'src/config/InterfaceConf'

class InterfaceController {
	/**
	 * @returns true 繼續底層route
	 * @returns false 結束底層route
	 */
	static async proccess(to, from, next) {
		if (location.origin.indexOf(InterfaceConf.Host.Payment) > -1) {
			this.store(to, from, next)
			return true
		} else if (_.find(InterfaceConf.Host.BackupList, domain => location.host.indexOf(domain) > -1)) {
			this.backup(to, from, next)
			return true
		}
		return false
	}

	static store(to, from, next) {
		if (to.name != 'interface-error' && (!to.params.pfc_guid || to.name != 'interface-store')) {
			next({ name: 'interface-error' })
		} else {
			next()
		}
	}

	static backup(to, from, next) {
		if (to.name != 'interface-backup') {
			next({ name: 'interface-backup' })
		} else {
			next()
		}
	}
}

export { InterfaceController as default }
