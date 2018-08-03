

/*newstab*/
$(document).ready(function (ev) {
    $('#custom_carousel').on('slide.bs.carousel', function (evt) {
        $('#custom_carousel .controls li.active').removeClass('active');
        $('#custom_carousel .controls li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active');
    })
});

/*qa*/
$(".qa_box > a").on("click", function() {
    if ($(this).hasClass('active')) {
        $(this).removeClass("active");
        $(this).siblings('.qa_content').slideUp(200);
    } else {
        $(".qa_box > a").removeClass("active");
        $(this).addClass("active");
        $('.qa_content').slideUp(200);
        $(this).siblings('.qa_content').slideDown(200);
    }
});

// 滾動menu 改變


  $(document).ready(function () {
            $window = $(window);
            $(window).scroll(function () {

                if ($window.scrollTop() > 100)                //當卷軸大於100px時
                    $(".header_box").addClass("active");       //在ID menufix 增加class
                else
                    $(".header_box").removeClass("active");  //小於100px時 移除 class

                if ($window.scrollTop() > 300)                           //當卷軸大於300px時
                    $("#menufix").addClass("active_more");        //在ID menufix 增加class
                else
                    $("#menufix").removeClass("active_more");  //小於300px時 移除 class
            });

        });



// 圖片全滿
(function ($) {
  $.fn.coverImage = function(contain) {
    this.each(function() {
      var $this = $(this),
        src = $this.get(0).src,
        $wrapper = $this.parent();

      if (contain) {
        $wrapper.css({
          'background': 'url(' + src + ') 50% 50%/contain no-repeat'
        });
      } else {
        $wrapper.css({
          'background': 'url(' + src + ') 50% 50%/cover no-repeat'
        });
      }

      $this.remove();
    });

    return this;
  };
})(jQuery);

jQuery('.cover-image').coverImage();


// 會員tab
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})