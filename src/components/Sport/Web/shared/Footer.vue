<template>
  <footer class="light">
    <div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
          </div>
          <div class="col-md-8 text-right">
            <ul class="f_link">
              <router-link :to="{ name: 'sport-game-setting' }" tag="li">
                <a>{{ $t('memberInfo') }}</a>
              </router-link>
              <router-link :to="{ name: 'sport-bet-detail' }" tag="li">
                <a>{{ $t('betDetail') }}</a>
              </router-link>
              <!--<li><a href="#">相關連結</a></li>-->
              <li class="pointer" @click="openByRoute({ name: 'sport-service-relate' })">
                <a>{{ $t('relatedWebsite') }}</a>
              </li>
              <li class="pointer" @click="openByRoute({ name: 'sport-service-rule' })">
                <a>{{ $t('playDescription') }}</a>
              </li>
              <!--<li><a href="#">問題反映</a></li>-->
            </ul>
          </div>
        </div>
        <hr>
        <div class="Copyright">
          <p class="text-center">Copyright © 2017 SPORT GMAE . All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Link from 'src/mixins/Common/Link'

export default {
	mixins: [Link]
}
</script>
