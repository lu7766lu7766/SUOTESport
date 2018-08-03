<template>
  <a href="#" class="go-top">
    <span class="icon-25700 fa-3x finger"></span>
  </a>
</template>

<script>
export default {
  mounted () {
    this.$dataTick(() => {
      $('.go-top').fadeIn(200);
      // Show or hide the sticky footer button
      $(window).on('scroll', function() {
        if ($(this).scrollTop() < 100) {
            $('.go-top').fadeIn(200);
        } else {
            $('.go-top').fadeOut(200);
        }
      });

      // Animate the scroll to top
      $('.go-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $(document).height()}, 500);
      })
    })
  },
  destroyed () {
    $(window).off('scroll')
    $('.go-top').off('click')
  }
}
</script>