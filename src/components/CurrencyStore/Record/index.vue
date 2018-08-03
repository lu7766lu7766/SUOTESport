<template>
	<section>
		<div id="hl-common" class="clearfix" style="display: block;">
			<div class="form-group">
				<div class="radio-box">
					<div class="datebar clearfix">
						<div class="form-group2">
							<label class="col-md-2 s_title">起</label>
							<div class="input-group col-md-9 date" id="datetimepicker1">
								<datetimepicker class="datepicker" type="datetimepicker" v-model="item.start_time" />
							</div>
						</div>
						<div class="form-group2">
							<label class="col-md-3 s_title">~ 迄</label>
							<div class="input-group col-md-8 date" id="datetimepicker2">
								<datetimepicker class="datepicker" type="datetimepicker" v-model="item.end_time" />
							</div>
						</div>
						<div class="form-group2">
							<label for="sel1" class="col-md-3 s_title">類型</label>
							<div class="col-md-9 no-padding">
								<select class="form-control select-s" id="sel1" v-model="cType">
									<option v-for="(data, type) in types" :value="type">{{ data.name }}</option>
								</select>
							</div>
						</div>
						<div class="form-group2 clearfix">
							<input type="button" @click="onMyGetData()" value="搜 尋" class="btn btn-search">
						</div>
					</div>
				</div>
			</div>
			<table width="100%" class="member_table member_record" cellpadding="0">
				<tbody>
					<tr>
						<th width="15%">訂單編號</th>
						<!-- <th width="8%">來源</th>
						<th width="15%">目的</th> -->
						<th width="15%">時間</th>
						<th width="12%">遊戲幣</th>
						<th width="12%">狀態</th>
						<th width="23%">備註</th>
					</tr>
					<tr v-if="!item.total">
						<td data-th="轉移" colspan="7">暫無交易資料</td>
					</tr>
					<tr v-for="data in item.datas">
						<td data-th="訂單編號">{{ data.p77_por_id.PadLeft(10) }}</td>
						<!-- <td data-th="來源">
							<span style="white-space:nowrap;" v-if="data.p77_por_p78_payment_flow_config_tiny_data">
								{{ data.p77_por_p78_payment_flow_config_tiny_data.name }}
							</span>
							<span v-else>無</span>
						</td>
						<td data-th="目的">{{ $t(data.p77_por_destination) }}</td> -->
						<td data-th="時間">{{ $moment(data.p77_por_created_at).Format('Y-m-d H:i:s') }}</td>
						<td data-th="遊戲幣">{{ data.p77_por_order_point | currency(2)}}</td>
						<td data-th="狀態">
							<span v-if="data.p77_por_order_status === 0" class="noneprocessed">未處理</span>
							<span v-if="data.p77_por_order_status === 1" class="noneprocessed">已初審</span>
							<span v-if="data.p77_por_order_status === 2" class="processed">已完成</span>
							<span v-if="data.p77_por_order_status === 8" class="noneprocessed">失敗</span>
							<span v-if="data.p77_por_order_status === 9" class="noneprocessed">取消</span>
						</td>
						<td data-th="備註">
							<section v-if="data.payment_flow">
								<section v-for="info in [data.payment_flow.p78_pfi_info]">
									<section v-if="info.ChoosePayment === paymentType.ATM">
										<p>銀行名稱:{{ $t(info.ChooseSubPayment) }}</p>
										<p>銀行代碼:{{ info.BankCode }}</p>
										<p>銀行帳號:{{ info.vAccount }}</p>
										<p>截止日期:{{ info.ExpireDate }}</p>
									</section>
									<section v-if="info.ChoosePayment === paymentType.CVS">
										<p>{{ $t(paymentMethod[paymentType.CVS][info.PaymentType]) }}</p>
										<p>繳費代碼:{{ info.PaymentNo }}</p>
										<p>截止時間:{{ info.ExpireDate }}</p>
									</section>
									<section v-if="info.ChoosePayment === paymentType.BankCard">
										<p>銀行名稱:{{ getBankCodeName(info.BankCode) }}</p>
										<p>銀行代碼:{{ info.BankCode }}</p>
										<p>銀行帳號:{{ info.BankNumber }}</p>
										<p>銀行戶名:{{ info.BankName }}</p>
									</section>
									<section v-if="info.ChoosePayment === paymentType.Credit"></section>
									<section v-if="info.ChoosePayment === paymentType.WebATM"></section>
								</section>
							</section>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<my-pager :lastPage="item.lastPage" :page="item.page" @change="pageChg" />
	</section>
</template>

<script>
import TransformRecord from 'src/mixins/Common/Payment/TransformRecord'
var start_time = moment()
		// .add(1, 'days')
		.subtract(1, 'weeks')
		.format('YYYY-MM-DD 00:00'),
	end_time = moment().format('YYYY-MM-DD 23:59')

export default {
	mixins: [TransformRecord],
	components: {
		MyPager: require('@/shared/MyPager')
	},
	data: () => ({
		cType: 'savePoint',
		types: {
			savePoint: {
				method: 'getSavePoint',
				name: '購買',
				start_time,
				end_time,
				datas: [],
				total: 0,
				perPage: 20,
				page: 1,
				lastPage: 0
			},
			treasureSell: {
				method: 'getTreasureSell',
				name: '託售',
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
</script>
