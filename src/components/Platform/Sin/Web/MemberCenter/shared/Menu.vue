<template>
  <div class="col-md-3 flex1 meber-left">
    <div class="meber-menu">
      <ul>
        <router-link tag="li" active-class="active" exact :to="{name: 'sin-member-base-info'}">
          <a>
            <i></i> 個人資料</a>
        </router-link>
        <router-link tag="li" active-class="active" exact :to="{name: 'sin-member-wallet'}">
          <a>
            <i></i> 錢包資訊</a>
        </router-link>
        <router-link tag="li" active-class="active" exact :to="{name: 'sin-member-betdetail-report'}">
          <a>
            <i></i> 投注明細</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>
  
  <script>
export default {
	name: '',
	data: () => ({})
}
</script>
  
  <style scoped>

</style>
