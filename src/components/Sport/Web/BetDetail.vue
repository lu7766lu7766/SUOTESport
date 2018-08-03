<template>
	<section style="width:100%">
		<div class="AD_box">
			<a><img src="/resource/static/sport/images/ad/ad.jpg" class="img-responsive"></a>
		</div>
		<!-- AD_box ed -->
		<div class="BO_box">
			<h1 class="sports-news">{{ $t('betDetail') }}</h1>
			<div class="member_s_box clearfix">
				<!-- list -->
				<div class="member_content" v-if="groups.length">
					<div class="panel-group-news" id="accordion">
						<div class="panel panel-default" v-for="(group, index) in groups" :key="index">
							<div class="panel-heading2 accordion-toggle collapsed" @click="getDetails(group)">
								<h4 class="panel-title">&nbsp;
									<span class="pull-right total3"></span>
									<span class="pull-right total2">{{ $t('totalBetMoney') }} : {{ group.betMoney | currency(2) }}</span>
									<span class="pull-right total1">{{ $t('betCount') }} : {{ group.betTotal }}</span>
								</h4>
							</div>

							<div class="panel-collapse collapse" :class="{ 'in': group.isShow }">
								<div class="panel-body2">
									<table class="table-fill">
										<thead>
											<tr>
												<th class="text-left" width="15%">{{ $t('betID') }}</th>
												<th class="text-left" width="12%">{{ $t('accountDate') }}</th>
												<th class="text-left" width="30%">{{ $t('betContent') }}</th>
												<th class="text-left" width="12%">{{ $t('betMoney') }}</th>
												<th class="text-left" width="15%">{{ $t('winMoney') }}</th>
											</tr>
										</thead>
										<tbody class="table-hover">
											<tr v-for="(detail, index2) in group.details" :key="index2">
												<td class="text-left">
													{{ detail.number }}<br> {{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}
												</td>
												<td class="text-left">{{ $moment(detail.refer_date).Format('Y-m-d') }}</td>
												<td class="text-left">
													<hr>
													<t class="c_red2">{{ $t(detail.type) }}</t>
													<hr>
													<section v-for="(target, index3) in detail.targets_info" :key="index3">
														{{ $t(target.category) }} - {{ $t(target.play) }} - {{ $t(target.game) }}
														<br>
														<span v-html="getBetListTitle({
																stmList: target.bet_info.vs,
																spy_code: target.play,
																handicapStmCode: target.bet_info.master,
																isSoccer: isSoccerByScyCode(target.category),
																fraction: target.bet_info.fraction,
																percent: target.bet_info.percent,
																vs_score: target.vs_score
															})">
														</span>
														<hr>
														<span class="c_orange">{{ $t(target.bet_info.target) + ' ' }}{{ target.bet_info.odds | currency(3) }}</span>
														<hr>
													</section>
												</td>
												<td class="text-left">{{ detail.cash | currency }}</td>

												<td class="text-left t-green">{{ getWinMoney(detail) | currency(2) }}</td>
											</tr>
										</tbody>
									</table>
									<my-pager :lastPage="group.lastPage" :page="group.page" @change="pageChg" style="background-color: black" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- list end -->
				<div class="member_content" v-else>
					<div class="alliance-group">
						<div class="g_list-box">
							<div class="norace">
								{{ $t('noBetList') }}
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<!-- BO_box ed -->
	</section>
</template>

<script>
import BetDetail from 'src/mixins/Sport/BetDetail'

export default {
	mixins: [BetDetail],
	data() {
		return {
			isBetDetail: true,
			status: ['received']
		}
	},
	created() {
		this.onGetBetDetailGroup()
	}
}
</script>
