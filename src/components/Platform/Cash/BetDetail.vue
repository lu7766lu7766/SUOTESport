<template>
	<section>
		<!-- Back to top button  -->
		<back-top />
		<div class="page-container member">
			<div class="container">
				<!-- 運彩 -->
				<div class="col-md-12 flex2" v-if="betDetailType[reportType].code == betDetailType.sport.code">
					<div class="col-md-10 col-md-offset-1 member_title clearfix">
						<span>體育博彩</span>
					</div>
					<form class="col-md-10 col-md-offset-1 form-horizontal member_form">
						<table class="member_table member_record" cellpadding="0">
							<tbody>
								<tr>
									<th width="15%">注單編號</th>
									<th width="8%">類型</th>
									<th width="15%">玩法</th>
									<th width="40%">投注內容</th>
									<th width="10%">投注金額</th>
									<th width="10%">輸贏結果(含退水)</th>
									<th width="6%">退水</th>
								</tr>
								<tr v-for="detail in details" :key="detail.number">
									<td data-th="注單編號">
										{{ detail.number }}
										<br> {{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}</td>
									<td data-th="類型">
										{{ detail.type=='normal' ? $t(detail.targets_info[0].category) : $t(detail.type) }}
									</td>
									<td data-th="玩法">
										{{ detail.type=='normal' ? ($t(detail.targets_info[0].game) + '-' + $t(detail.targets_info[0].play)) : '-' }}
									</td>
									<td data-th="投注內容">
										<section v-for="(target, index) in detail.targets_info" :key="index">
											{{ $t(target.category) }} - {{ $t(target.game) }} - {{ $t(target.play) }}
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
											<span class="color1">{{ $t(target.bet_info.target) + ' ' + target.bet_info.odds }}</span>
											<hr>
										</section>
									</td>
									<td data-th="投注金額">{{ detail.cash | currency }}</td>
									<td data-th="輸贏結果(含退水)">
										<span :class="{[detail.result < 0 || detail.status == 'received' ? 'color-red': 'color-green']: true}">
											{{ detail.status == 'received' ? '未結帳' : $currency(detail.result, 2) }}
										</span>
									</td>
									<td data-th="退水">
										<span class="color-green">{{ detail.commission }}</span>
									</td>
								</tr>
							</tbody>
						</table>
						<cash-pager class="listab sabrosus list_web" :page="page" :lastPage="lastPage" @change="pageChg" />
						<div class="clear"></div>
						<!-- listab -->
					</form>
				</div>

				<!-- 其他遊戲 -->
				<div class="col-md-12 flex2" v-else>
					<div class="col-md-10 col-md-offset-1 member_title clearfix">
						<span>{{ $t(betDetailType[reportType].code) }}</span>
					</div>
					<form class="col-md-10 col-md-offset-1 form-horizontal member_form">
						<table class="member_table member_record" cellpadding="0">
							<tbody>
								<tr>
									<th width="15%">注單編號</th>
									<th width="8%">類型</th>
									<th width="8%">玩法</th>
									<th width="32%">投注內容</th>
									<th width="10%">投注金額</th>
									<th width="10%">輸贏結果(含退水)</th>
									<th width="6%">退水</th>
								</tr>
								<tr v-for="detail in details" :key="detail.number">
									<td data-th="注單編號">
										{{ detail.number }}<br>{{ $moment(detail.bet_time).Format('Y-m-d H:i:s') }}
									</td>
									<td data-th="類型">{{ detail.game_type ? $t(betDetailType[reportType].gameType[detail.game_type]) : '-' }}</td>
									<td data-th="玩法">{{ detail.play_type ? $t(betDetailType[reportType].playType[detail.play_type]) : '-' }}</td>
									<td data-th="投注內容">
										<section v-if="detail.game_result">
											<span v-html="detail.game_result"></span>
											<hr>
										</section>
										<span class="color1" v-html="detail.context"></span>
									</td>
									<td data-th="投注金額">{{ detail.cash | currency }}</td>
									<td data-th="輸贏結果(含退水)">
										<span :class="{[detail.result < 0 ? 'color-red': 'color-green']: true}">
											{{ $currency(detail.result, 2) }}
										</span>
									</td>
									<td data-th="退水">
										<span class="color-green">{{ detail.commission }}</span>
									</td>
								</tr>
							</tbody>
						</table>
						<cash-pager class="listab sabrosus list_web" :page="page" :lastPage="lastPage" @change="pageChg" />
						<div class="clear"></div>
						<!-- listab -->
					</form>

				</div>
			</div>
		</div>
	</section>
</template>

<script>
import BetDetail from 'src/mixins/Platform/BetDetail'
import Loading from 'src/mixins/Common/Check/Loading'

export default {
	mixins: [BetDetail, Loading],
	components: {
		BackTop: require('@/shared/BackTop'),
		CashPager: require('@/Platform/Cash/Web/shared/MyPager')
	},
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/bootstrap/css/bootstrap.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/css/mystyle.css' }
		]
	}
}
</script>
