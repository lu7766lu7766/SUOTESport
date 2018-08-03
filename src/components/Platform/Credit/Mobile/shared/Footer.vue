<template>
	<section>
		<footer class="footer">
			<ul class="footer-menu">
				<router-link :to="{ name: 'credit-mobile-bet-detail-report' }" tag="li" active-class="footer-menu-on" exact>
					<a>
						<span class="icon-news fa-3x"></span>
						<span>投注明細</span>
					</a>
				</router-link>
				<router-link :to="{ name: 'credit-mobile-wallet' }" tag="li" active-class="footer-menu-on" exact>
					<a>
						<span class="icon-m01 fa-3x"></span>
						<span>錢包資訊</span>
					</a>
				</router-link>
				<router-link :to="{ name: 'credit-mobile-index' }" tag="li" active-class="footer-menu-on" exact>
					<a>
						<span class="icon-game-1 fa-3x"></span>
						<span>遊戲大廳</span>
					</a>
				</router-link>
				<li>
					<a target="_blank" @click="menuClose(); checkService2Link()">
						<span class="icon-service fa-3x"></span>
						<span>線上客服</span>
					</a>
				</li>
				<li :class="{'footer-menu-on': $route.name=='credit-mobile-base-info'}">
					<a @click="menuClose2Route({ name: 'credit-mobile-base-info' })">
						<span class="icon-m05 fa-3x"></span>
						<span>個人資料</span>
					</a>
				</li>
			</ul>
		</footer>
	</section>
</template>

<script>
import Link from 'src/mixins/Common/Link'

export default {
	mixins: [Link],
	methods: {
		menuClose2Route(route) {
			this.menuClose()
			if (route) {
				this.$router.push(route)
			}
		},
		menuClose() {
			this.$bus.emit('close.menu')
		}
	}
}
</script>

<style scoped>
.footer-space {
	margin-top: 100px;
}
</style>
