import TransformRecord from 'src/mixins/Common/Payment/TransformRecord'

var start_time = moment().format('YYYY-MM-DD'),
	end_time = moment().format('YYYY-MM-DD')

export default {
	mixins: [TransformRecord],
	data: () => ({
		cType: 'pointTransform',
		types: {
			pointTransform: {
				method: 'getPointTransform',
				name: '轉移',
				start_time,
				end_time,
				datas: [],
				total: 0,
				perPage: 20,
				page: 1,
				lastPage: 0
			}
		}
	})
}
