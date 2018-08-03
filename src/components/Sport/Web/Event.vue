<template>
  <section style="width:100%">

    <div class="AD_box">
      <a><img src="/resource/static/sport/images/ad/ad.jpg" class="img-responsive"></a>
    </div>

    <div class="BO_box">
      <h1 class="sports-info-header_header3">
        <a class="pointer BetGameTournament" @click="$router.go(-1)">
          <i class="fa fa-caret-left" aria-hidden="true"></i> {{ $t('back') }}</a>
        {{ this.getFightStmsName(teams) }}
        <p>
          <small>{{ $moment(start_time).Format($t('fullDateFormat')) }}</small>
        </p>
      </h1>
    </div>

    <div class="alliance-group">
      <game-list-sport :sets="sets" />
    </div>

  </section>
</template>

<script>
import EventMore from 'src/mixins/Sport/EventMore'

export default {
	name: 'event',
	mixins: [EventMore],
	components: {
		GameListSport: require('@/Sport/Web/shared/GameListSport')
	}
}
</script>
