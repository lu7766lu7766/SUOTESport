<template>
	<section>
		<div id="helpbox" class="side-box1">
			<a class="service2 pointer" @click="checkService2Link()" target="_blank"><img src="/resource/static/platform-cash/store/images/service-call.png" alt="" /></a>
		</div>
		<!-- help box -->
		<div id="header-top">
			<div id="header-topc">
				<div class="header-l" data-user="0">
					<span class="R2">{{ accountID }}</span> 您好，歡迎來到！ {{ currencyStore.p78_pfc_name }}</div>
			</div>
		</div>
		<div id="header" class="clearfix">
			<div id="container">
				<h3 id="logo">
					<a href="#" class="logo-img">
						{{ currencyStore.p78_pfc_name }}
					</a>
				</h3>
			</div>
		</div>
		<div class="crumb clearfix" id="search-end">
			<div id="container">
				<ul class="menu">
					<router-link :to="{ name: 'currency-store-buy1', params: { pfc_guid: $route.params.pfc_guid } }" tag="li" active-class="active">
						<a class="crumb-item">購買</a>
					</router-link>
					<router-link :to="{ name: 'currency-store-sell1', params: { pfc_guid: $route.params.pfc_guid } }" tag="li" active-class="active">
						<a class="crumb-item">託售</a>
					</router-link>
					<router-link :to="{ name: 'currency-store-record', params: { pfc_guid: $route.params.pfc_guid } }" tag="li" active-class="active">
						<a class="crumb-item">交易記錄</a>
					</router-link>
					<router-link :to="{ name: 'currency-store-cvs-pay-step', params: { pfc_guid: $route.params.pfc_guid } }" tag="li" active-class="active">
						<a class="crumb-item">超商繳費步驟</a>
					</router-link>
				</ul>
			</div>
		</div>
		<div id="container" class="blue-style h-left-top" data-channel="2">

			<router-view></router-view>
			<div class="clear"></div>
		</div>

		<div id="foot" style="margin-top:15px;">
			<div class="foot-list" style="font-size:12px;font-weight:normal;">
				<div class="foot-copy-right">Copyright © 2004 - 2017 by Technology Co., Ltd. All Rights reserved.</div>
			</div>
		</div>
	</section>
</template>

<script>
import Loading from 'src/mixins/Common/Check/Loading'
import CheckLogin from 'src/mixins/Common/Check/CheckLogin'
import Bank from 'src/mixins/Platform/Bank'
import Link from 'src/mixins/Common/Link'
import Quota from 'src/mixins/Common/Quota'
import MemberLevel from 'src/mixins/Common/MemberLevel'
import { mapActions } from 'vuex'
import { PaymentType } from 'src/store/module/payment'

export default {
	mixins: [Loading, CheckLogin, Bank, Link, Quota, MemberLevel],
	head: {
		link: [
			{
				rel: 'icon',
				href: '/resource/static/sport-mobile/images/favicon.png',
				sizes: '16x16',
				type: 'image/png'
			},
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/bootstrap/css/bootstrap.min.css' },
			{ rel: 'stylesheet', href: '/resource/static/platform-cash/store/images/saved_resource.css' }
		]
	},
	computed: {
		isLogin() {
			return this.$store.state.Login.isLogin
		},
		currencyStore() {
			var store = this.$store.state.Payment.store
			if (store.p78_pfc_name) {
				document.title = store.p78_pfc_name
			}
			return store
		},
		accountID() {
			return this.userInfo && this.userInfo.account ? this.userInfo.account.p33_ant_account : ''
		}
	},
	created() {
		if (this.isLogin) {
			this.updateQuota()
			this.onGetMemberLevel()
		}
		this.$store.dispatch('GET_CURRENCY_STORE_BASIC')
		this.$swal('詐騙猖獗，請會員勿相信代操或相關修改注單之相關訊息。')
	}
}
</script>
