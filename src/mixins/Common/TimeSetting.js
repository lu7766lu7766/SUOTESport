export default {
	methods: {
		setTime(type, data = this, format = 'YYYY-MM-DD') {
			var start_time, stop_time
			switch (type) {
				case 'today':
					start_time = moment().format(format)
					stop_time = moment().format(format)
					break
				case 'lastDay':
					start_time = moment(data.stop_time)
						.subtract(1, 'days')
						.startOf('day')
						.format(format)
					stop_time = moment(data.stop_time)
						.subtract(1, 'days')
						.endOf('day')
						.format(format)
					break
				case 'afterDay':
					start_time = moment(data.stop_time)
						.add(1, 'days')
						.startOf('day')
						.format(format)
					stop_time = moment(data.stop_time)
						.add(1, 'days')
						.endOf('day')
						.format(format)
					break
				case 'lastWeek':
					// isoWeek start at monday
					start_time = moment()
						.subtract(1, 'weeks')
						.startOf('isoWeek')
						.format(format)
					stop_time = moment()
						.subtract(1, 'weeks')
						.endOf('isoWeek')
						.endOf('day')
						.format(format)
					break
				case 'thisWeek':
					start_time = moment()
						.startOf('isoWeek')
						.format(format)
					stop_time = moment()
						.endOf('day')
						.format(format)
					break
				case 'lastMonth':
					start_time = moment()
						.subtract(1, 'months')
						.startOf('month')
						.format(format)
					stop_time = moment()
						.subtract(1, 'months')
						.endOf('month')
						.endOf('day')
						.format(format)
					break
				case 'thisMonth':
					start_time = moment()
						.startOf('month')
						.format(format)
					stop_time = moment()
						.endOf('day')
						.format(format)
					break
				default:
					start_time = moment().format(format)
					stop_time = moment().format(format)
					break
			}

			_.assign(data, {
				start_time,
				stop_time
			})
		}
	}
}
