

/*tab accordion*/
$(".tab_content").hide();
$(".tab_content:first").show();

$("ul.page_tabs li").click(function() {

    $(".tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();

    $("ul.page_tabs li").removeClass("active");
    $(this).addClass("active");
});
$('ul.page_tabs li').last().addClass("tab_last");

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
// faq
$(function(){
		// 幫 #qaContent 的 ul 子元素加上 .accordionPart
		// 接著再找出 li 中的第一個 div 子元素加上 .qa_title
		// 並幫其加上 hover 及 click 事件
		// 同時把兄弟元素加上 .qa_content 並隱藏起來
		$('#qaContent ul').addClass('accordionPart').find('li div:nth-child(1)').addClass('qa_title').hover(function(){
			$(this).addClass('qa_title_on');
		}, function(){
			$(this).removeClass('qa_title_on');
		}).click(function(){
			// 當點到標題時，若答案是隱藏時則顯示它，同時隱藏其它已經展開的項目
			// 反之則隱藏
			var $qa_content = $(this).next('div.qa_content');
			if(!$qa_content.is(':visible')){
				$('#qaContent ul li div.qa_content:visible').slideUp();
			}
			$qa_content.slideToggle();
		}).siblings().addClass('qa_content').hide();
});
/*game dialog*/

$(".casino,.game").fancybox({
    wrapCSS: 'fancybox-game',
    padding: 10,
    width: 590,
	Maxwidth: '100%',
	Maxheight: '100%',
    helpers: {
        overlay : {
            css : {
                'background' : 'rgba(0,0,0,.8)'
            }
        }
    },
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

// select
$(function () {
    $('.selectpicker').selectpicker();
});

/*odometer

setTimeout(function(){
    odometer.innerHTML = 500890;
	odometer2.innerHTML = 1456;
}, 800);*/