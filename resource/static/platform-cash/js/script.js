// wow-js
new WOW().init();

/*tab accordion*/
$(".tab_content").hide();
$(".tab_content:first").show();

$("ul.page_tabs li").click(function () {

    $(".tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();

    $("ul.page_tabs li").removeClass("active");
    $(this).addClass("active");
});
$('ul.page_tabs li').last().addClass("tab_last");

/*qa*/
$(".qa_box > a").on("click", function () {
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
/*login dialog*/
$(".login").fancybox({
    wrapCSS: 'fancybox-login',
    padding: 40,
    width: 490,
    maxWidth: '100%',
    helpers: {
        overlay: {
            css: {
                'background': 'rgba(0,0,0,.8)'
            }
        }
    },
});

$(".casino,.game").fancybox({
    wrapCSS: 'fancybox-game',
    padding: 40,
    width: 1000,
    maxWidth: '100%',
    helpers: {
        overlay: {
            css: {
                'background': 'rgba(0,0,0,.8)'
            }
        }
    },
});


// select
$(function () {
    $('.selectpicker').selectpicker();
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

// back-top-js
$(document).ready(function () {

    // hide #back-top first
    $("#back-top").hide();

    // fade in #back-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});

// 圖片全滿
(function ($) {
    $.fn.coverImage = function (contain) {
        this.each(function () {
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
// shopcar

$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

$(function () {
    $('.btn-radio').click(function (e) {
        $('.btn-radio').not(this).removeClass('active')
            .siblings('input').prop('checked', false)
            .siblings('.img-radio').css('opacity', '0.5');
        $(this).addClass('active')
            .siblings('input').prop('checked', true)
            .siblings('.img-radio').css('opacity', '1');
    });
});




$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});


/*odometer

setTimeout(function(){
    odometer.innerHTML = 500890;
	odometer2.innerHTML = 1456;
}, 800);*/