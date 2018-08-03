<template>
  <div class="newsbox">
    <i class="fa fa-volume-up" aria-hidden="true" v-if="showLogo"></i>
    <section v-html="content_html"></section>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      require: true
    },
    showLogo: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    content_html () {
      // onmouseover="this.stop();" onmouseout="this.start();"
      return `
      <marquee behavior="scroll" direction="left" >
        ${this.content}
      </marquee>`
    }
  }
}
</script>

<style lang="stylus" scoped>
// .newsbox
//   width: 380px
</style>
