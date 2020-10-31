'use strict';

$(window).on("load", function() {
    stopload();
    function stopload() {
        $(".loading").fadeOut(500);
        $(".loading-tag").fadeOut(500);
        setTimeout(stopload(), 10000);
    }

    /*$('.contents-menu').css('transform', 'translateY(0)');*/
    $('.contents-menubar').css('transform', 'translateX(0)');
    
    var countvisitor = localStorage.getItem('visitor');
    if (countvisitor != null) {
        $("#visitors-day3").text("今日の来場者： " + countvisitor + "人");
    }
    
});


jQuery(function ($) {

    /*function fadeInUp() {
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
    fadeInUp();*/
    
    
    /*counttime*/
    function CountDays() {
        var starttime = new Date("October 30, 2020 09:30:00");
        var nowtime = new Date();
        var counttime = nowtime.getTime() - starttime.getTime();
        var d = Math.floor(counttime/86400000);
        counttime -= d*86400000;
        var h = Math.floor(counttime/3600000);
        counttime -= h*3600000;
        var m = Math.floor(counttime/60000);
        counttime -= m*60000;
        var s = Math.floor(counttime/1000);
        var dd = ('00' + d).slice(-2);
        var hh = ('00' + h).slice(-2);
        var mm = ('00' + m).slice(-2);
        var ss = ('00' + s).slice(-2);
        $('.countdown-day').text(dd);
        $('.countdown-hour').text(hh);
        $('.countdown-min').text(mm);
        $('.countdown-sec').text(ss);
        setInterval(CountDays, 1000);
    }
    CountDays();
    
    
    
    /*visitors-count*/
    function VisitorsCount() {
        var counter = localStorage.getItem('visitor');
        count++;
        localStorage.setItem('visitor', counter);
    }
    function VisitorsRC() {
        localStorage.removeItem('visitor');
        localStorage.setItem('visitor', 0);
    }
    
    

    /*スムーズスクロール*/
    var smoothlink = $('a[href^="#"]');
    smoothlink.click(function() {
      var href = $(this).attr("href");
      var target = $ (href == "#" || href == ""? 'html' : href);
      var position = target.offset().top - 8;
      $("html, body").animate({scrollTop: position}, 1000, 'swing');
      return false; /*URLに#以降文字列を出さない*/
    });


    /*bar*/
    var setE = $('.split'), delaySpeed = 200, fadeSpeed = 0;
    var setText = setE.html();
    setE.css('visibility', 'visible').children().addBack().contents().each(function(){
        var elmThis = $(this);
        if (this.nodeType == 3) {
            var $this = $(this);
            $this.replaceWith($this.text().replace(/(\S)/g, '<span class="textSplitLoad">$&</span>'));
        }
    });



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

        /*fadeInUp();*/

        windowScrollTop = $(this).scrollTop();
        if (windowScrollTop >= 120) {
            $('.pcmenu').css('transform', 'translate(0, -50%)');
        } else {
            $('.pcmenu').css('transform', 'translate(-20vw, -50%)');
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



    /*onload*/
$(window).on("load", function () {

    var splitLength = $('.textSplitLoad').length;
        setE.find('.textSplitLoad').each(function(i){
            var splitThis = $(this);
            var splitTxt = splitThis.text();
            splitThis.delay(i*(delaySpeed)).css({display:'inline-block',opacity:'0'}).animate({opacity:'1'},fadeSpeed);
        });
        setTimeout(function(){
                setE.html(setText);
        },splitLength*delaySpeed+fadeSpeed);

});


});
