<template>
	<section>
		<div class="page_title">
			<a class="back" @click="$router.go(-1)"></a>
			<span>{{ $t('gameResults') }}</span>
		</div>
		<main class="page-container betresults">
			<div class="container search">
				<div class="row">
					<div class="col-xs-7">
						<div class="form-group">
							<datetimepicker v-model="dateTime" class="input-group col-md-14 date" />
						</div>
					</div>

					<div class="col-xs-5">
						<div class="form-group">
							<select name="ors_to_attr_type" class="form-control" v-model="sport">
								<option :value="data.sbl_guid" v-for="data in sports" :key="data.sbl_guid">{{ $t(data.sbl_code) }}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<div class="form-group">
							<input type="button" :value="$t('search')" class="btn btn-pharaoh" @click="search()">
						</div>
					</div>
				</div>
			</div>
			<div class="container" v-if="total">

				<div class="selectbox2">
					<ul class="">
						<li>
							<select data-v-6df71744="" name="ors_to_attr_type" class="select-box" v-model="category" @change="onCategoryChange">
								<option value="">{{ $t('all') }}</option>
								<option :value="data.scy_guid" v-for="data in categorysFilter" :key="data.scy_guid">{{ $t(data.scy_code) }}</option>
							</select>
						</li>
						<li>
							<select data-v-6df71744="" name="ors_to_attr_type" class="select-box" v-model="league" @change="onLeagueChange">
								<option value="" class="getCredit-js">{{ $t('all') }}</option>
								<option :value="data.sle_guid" class="getCredit-js" v-for="data in leagueMap" :key="data.sle_code">{{ $t(data.sle_code) }}</option>
							</select>
						</li>
					</ul>
				</div>

				<div class="member_s_box clearfix">
					<div class="member_content" v-if="total">

						<template v-for="gSetDatas in datas">
							<!-- <pre>{{gSetDatas}}</pre> -->
							<div class="div_body" v-for="(data, index) in gSetDatas.plays" :key="index" @click="toggleSeps(gSetDatas.plays)" v-show="data.isShow">
								<div class="divRow" v-if="data.isTitle">
									<div class="divHead">{{ $t('leagueName') }}</div>
									<div class="divCell">{{ $t(data.sep_info.league_group.code) + ' ' + $t(data.sep_info.league.code) }}</div>
								</div>
								<div class="divRow" v-if="data.isTitle">
									<div class="divHead">{{ $t('gameTime') }}</div>
									<div class="divCell">{{ $moment(data.sep_start_time).Format('Y-m-d H:i') }}</div>
								</div>
								<div class="divRow">
									<div class="divHead">{{ $t('game') }}</div>
									<div class="divCell">
										{{ $t(data.sep_info.game.code) }}
										<span class="c-handicap" v-if="data.sep_cancel_note">
											({{ data.sep_cancel_note }})
										</span>
									</div>
								</div>
								<div class="divRow">
									<div class="divHead">{{ $t('masterSlaveTeam') }}</div>
									<div class="divCell" style="positioin:relative">
										<span class="rhome" v-for="team in data.sep_info.team" :key="team.stm_code">
											<b v-if="team.stm_sort != '0'">{{ $t('slave') }}</b>
											<b v-if="team.stm_sort == '0'">{{ $t('master') }}</b>
											({{ data.sep_results.info[team.stm_code] }}){{ $t(team.stm_code) }}<br>
										</span>
										<i v-if="data.isTitle" class="glyphicon glyphicon-triangle-bottom" style="position:absolute;right:5px;top:auto;bottom:0" />
									</div>
								</div>
							</div>
						</template>

					</div>
				</div>
			</div>
		</main>
	</section>
</template>

<script>
import GameResults from 'src/mixins/Sport/GameResults'

export default {
	mixins: [GameResults],
	watch: {
		category() {
			this.onGetCurrentLeague()
		}
	},
	mounted() {
		this.$bus.emit('hide.footer')
	}
}
</script>

<style lang="stylus" scoped>
.mDivHead
	display table-cell
	background-color #383838

.mDivCell
	background-color #222
</style>
