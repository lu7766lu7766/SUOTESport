<template>
	<footer class="footer_box">

		<div class="footer_menu">
			<div class="container">
				<div class="f_link">
					<ul>
						<li>
							<router-link :to="{name: 'cash-about'}">關於我們</router-link>
						</li>
						<li>
							<router-link :to="{name: 'cash-privacy'}">隱私權政策</router-link>
						</li>
						<li>
							<a class="pointer" @click="windowOpenNoStatus('//ibet0800.com')">備用網址</a>
						</li>
					</ul>
				</div>
				<div class="f_contactus">
					<h3>聯絡我們</h3>
					<ul>
						<li>
							<span>
								<i><img src="/resource/static/platform-cash/images/ct-icon1.png" width="29" height="29" alt="" /></i>iwinbet</span>
						</li>
						<li>
							<span>
								<i><img src="/resource/static/platform-cash/images/ct-icon2.png" width="29" height="29" alt="" /></i>@bym3386k</span>
						</li>
						<li>
							<span>
								<i><img src="/resource/static/platform-cash/images/ct-icon3.png" width="29" height="29" alt="" /></i>1608584476</span>
						</li>
					</ul>
				</div>
				<div class="f_linkphone">
					<span>
						<router-link :to="{name: 'cash-app-download'}"><img src="/resource/static/platform-cash/images/googleplay.png" alt="" /></router-link>
					</span>
					<span><img :src="$fileHost + appQRCodeUri" alt="" /></span>

				</div>
			</div>
		</div>

		<!-- footer_menu end -->
		<div class="partner">
			<div class="container">
				<ul>
					<li><img src="/resource/static/platform-cash/images/link-i1.png" alt=""></li>
					<li><img src="/resource/static/platform-cash/images/link-i2.png" alt=""></li>
					<li><img src="/resource/static/platform-cash/images/link-i3.png" alt=""></li>
				</ul>
			</div>
		</div>
		<!-- partner end -->
		<div class="copyright">
			<div class="browsers">
				<a href="https://www.google.com/chrome/browser/desktop/" class="chrome icon" target="_blank"></a>
				<a href="http://mozilla.com.tw/firefox/new/" class="firefox icon" target="_blank"></a>
				<a href="https://support.apple.com/downloads/#safari" class="safari icon" target="_blank"></a>
			</div>
			Pharaoh Casino Copyright &copy; 2017</div>
		<!-- copyright end -->
	</footer>
</template>

<script>
import Link from 'src/mixins/Platform/Link'

export default {
	mixins: [Link]
}
</script>