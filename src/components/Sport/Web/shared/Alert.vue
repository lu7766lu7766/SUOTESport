<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;z-index:10000">
    <div class="modal-dialog">
      <div class="loginmodal-container">
        <p v-if="type == type_ref[0]" class="welcome">{{content}}</p>
        <h1 v-if="type == type_ref[1]">{{content}}
          <i class="fa fa-sign-in" aria-hidden="true"></i>
        </h1>
        <p v-if="type == type_ref[2]" class="p_norace">{{content}} </p>
        <p v-if="type == type_ref[3]" class="maintain">{{content}} </p>
        <p v-if="type == type_ref[4]" class="maintain" v-html="content"> </p>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from 'src/mixins/Common/Alert'
export default {
	name: 'alert',
	mixins: [Alert]
}
</script>

<style lang="stylus" scoped>
.loginmodal-container p.welcome, .loginmodal-container p.maintain
  margin-top 0px
  text-align center
  font-size 1.5em
  margin-top 10px
  mragin-buttom 10px
  color #E2C533
  font-weight 300

.loginmodal-container p.p_norace
  margin-top 0px
  text-align center
  font-size 1.5em
  margin-top 10px
  mragin-buttom 10px
  color white
  font-weight 300
</style>
