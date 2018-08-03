<template>
  <div id="loading-box" class="vertical-container">
    <div class="warning">
      系統更新中<br> 稍候請重新整理網頁
    </div>
    <div class="loading-content">
      <div class="loading"></div>
      <div class="word">Loading</div>
    </div>
  </div>
</template>
  
<style lang="stylus" scoped>
.warning
  transform translateY(-80px)
  text-align center
  color #ffde00
  font-family '微軟正黑體', arial
</style>