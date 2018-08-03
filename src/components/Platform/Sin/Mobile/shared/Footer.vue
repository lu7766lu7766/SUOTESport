<template>
	<section>
		<div class="remarks">
		</div>
		<footer class="footer">
			<ul class="footer-menu">
				<router-link :to="{ name: 'sin-mobile-bet-detail-report' }" tag="li" active-class="footer-menu-on" exact>
					<a>
						<span class="icon-news fa-3x"></span>
						<span>投注明細</span>
					</a>
				</router-link>
				<router-link :to="{ name: 'sin-mobile-wallet' }" tag="li" active-class="footer-menu-on" exact>
					<a>
						<span class="icon-m01 fa-3x"></span>
						<span>電子錢包</span>
					</a>
				</router-link>
				<router-link :to="{ name: 'sin-mobile-index' }" tag="li" active-class="footer-menu-on" exact>
					<a>
						<span class="icon-game-1 fa-3x"></span>
						<span>遊戲大廳</span>
					</a>
				</router-link>
				<li>
					<a target="_blank" @click="checkService2Link()">
						<span class="icon-service fa-3x"></span>
						<span>線上客服</span>
					</a>
				</li>
				<router-link :to="{ name: 'sin-mobile-base-info' }" tag="li" active-class="footer-menu-on" exact>
					<a>
						<span class="icon-m05 fa-3x"></span>
						<span>我的資料</span>
					</a>
				</router-link>
			</ul>
		</footer>
	</section>
</template>

<script>
import Link from 'src/mixins/Common/Link'

export default {
	mixins: [Link]
}
</script>

<style scoped>
.footer-space {
	margin-top: 100px;
}
</style>
