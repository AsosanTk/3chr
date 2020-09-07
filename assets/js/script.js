'use strict';

/*onload*/
$(window).on("load", function () {
    stopload();
})
setTimeout(stopload(), 10000);
function stopload() {
    $(".loading").delay(500).fadeOut(500);
    $(".loading-tag").delay(500).fadeOut(500);
}

jQuery(function ($) {
    
    function fadeInUp() {
        $('.fadeInUp').each(function() {
            var target = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > target - windowHeight) {
                $(this).css('opacity', '1');
                $(this).css('transform', 'translateY(0)');
            }
        });
    }
    fadeInUp();
    
    
    /*menu*/
    var menubtn = $('.btn-trigger');

    menubtn.click(function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('main').addClass('active');
            $('nav').fadeIn(500, 'swing');
        } else {
            $('main').removeClass('active');
            $('nav').fadeOut(500, 'swing');
        }
    });


    var startPos = 0;
    var windowScrollTop = 0;
    $(window).scroll(function () {
        
        fadeInUp();
        
        windowScrollTop = $(this).scrollTop();
        if (windowScrollTop >= 120) {
            $('.pcmenu').css('transform', 'translateX(0)');
        }
        
        if (!menubtn.hasClass('active')) {
            if (windowScrollTop >= startPos) {
                if (windowScrollTop >= 120) {
                    $('header').addClass('hide');
                }
            } else {
                $('header').removeClass('hide');
            }

        }
        startPos = windowScrollTop;
    });




    /*photoChange*/
    function photoChange(target) {

        var photolist = target.find('#top-photolist li');
        var imagenum = 0;
        var prevBtn = $('#prev a');
        var nextBtn = $('#next a');

        function open() {
            prevBtn.off('click'); /*clickオフ*/
            nextBtn.off('click');
            $(photolist[imagenum]).stop().fadeIn(2000, 'swing', checkControl);
        };

        function close() {
            $(photolist[imagenum]).stop().fadeOut(2000, 'swing');

        };

        function clickControl(type) {
            close();
            switch (type) {
                case 'prev':
                    if (imagenum == 0) {
                        imagenum = 4;
                    } else {
                        imagenum--;
                    }
                    break;

                case 'next':
                    if (imagenum == 4) {
                        imagenum = 0;
                    } else {
                        imagenum++;
                    }
                    break;
            }

            open();
        };

        function checkControl() {
            showControl(prevBtn);
            showControl(nextBtn);
        };


        function showControl(btn) {
            btn.show();
            btn.off('click').on('click', function () {
                clickControl($(this).parent().attr('id'));
            });
        };

        checkControl();
        open();

    };

    photoChange($('.mainimagescontents'));


});
