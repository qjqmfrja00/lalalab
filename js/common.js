'use strict';
$(function() {
    //a 링크 이벤트 막기
    $(document).on('click', 'a[href="#"]', function(e){
        e.preventDefault();
    });
    
    //gnb 열기
    $('#header div.nav-btn a.btn-open').on('click', function() {
        var timerId = '';
        var timerSpeed = 500;
        timerId = setTimeout(function() {
            $('#header div.nav-btn a.btn-open').css({'display': 'none'});
            $('#header div.nav-btn a.btn-close').css({'display': 'block'});
        }, timerSpeed);
        $('#header').removeClass('off');
        $('#header').addClass('on');
        $('#header.on div.nav').slideDown(300);
        $('body').css({'height': '100%', 'overflow': 'hidden'});
    });
    //gnb 닫기
    $('#header div.nav-btn a.btn-close').on('click', function() {
        var timerId = '';
        var timerSpeed = 500;
        timerId = setTimeout(function() {
            $('#header div.nav-btn a.btn-open').css({'display': 'block'});
            $('#header div.nav-btn a.btn-close').css({'display': 'none'});
            $('#header').removeClass('on');
            $('body').css({'height': '100%', 'overflow': 'initial'});
        }, timerSpeed);
        $('#header').addClass('off');
        $('#header div.nav').delay(300).slideUp(300);
    });
    
    setScrollAnimation('#intro div.top-tt p.top', 'fadein-text', true);
    setScrollAnimation('#intro div.top-tt p.bottom', 'fadein-text', true);
    setScrollAnimation('#intro div.main-vid p.logo', 'spread-text-r', false);
    setScrollAnimation('#intro div.content p.logo', 'spread-text-l', false);
    setScrollAnimation('#lala-note h2', 'fadein-text', true);
    //스크롤 이펙트 - split
    function setScrollAnimation(selector, effect, order, extra) {
        var effectName = effect;
        var scrollTop = 0;
        var minShow = 0;
        var maxShow = 0;
        var inOrder = order;
        
        setTextSplit();
        checkVisivility();
        $(window).on('scroll resize', function() {
            checkVisivility();
        }); 
        
        function setTextSplit() {
            var text = $(selector).text();
            var numText = text.length;
            var newHtml = '';

            for (var i = 0; i < numText; i++) {
                if (text[i] === ' ') {
                    newHtml += '<span class="blank"></span>';
                } else {
                    newHtml += '<span>' + text[i] + ' </span>';
                }
            }
            $(selector).html(newHtml);
        }
        function checkVisivility() {
            scrollTop = $(document).scrollTop();
            minShow = $(selector).offset().top - $(window).height();
            maxShow = $(selector).offset().top + $(selector).outerHeight();
            if (scrollTop < minShow) {
                $(selector).find('span').removeClass(effectName);
            } else if (scrollTop > maxShow) {
                $(selector).find('span').removeClass(effectName);
            } else {
                if (inOrder === false) {
                    $(selector).find('span').addClass(effectName);
                } else if (inOrder === true) {
                    $(selector).find('span').each(function(i) {
                    setTimeout(function() {$(selector).find('span:eq(' + i + ')').addClass(effectName);}, (i * 80));
                    });
                }
            }
        }
  
    }
    
    setScrollEffext('#intro div.content div.desc', 'on', 0, 0.7);
    setScrollEffext('#showcase div.top-tt', 'on', 0, 0.7);
    setScrollEffext('#lala-note p', 'on', 300, 1);
    setScrollEffext('#lala-note a.more', 'on', 900, 1);
    setScrollEffext('#lala-insta', 'on', 0, 0.6);
    //스크롤 이펙트 - no split
    function setScrollEffext(selector, effect, time, extra) {
        var effectName = effect;
        var scrollTop = 0;
        var minShow = 0;
        var maxShow = 0;
        var timerId = '';
        var timerSpeed = time;
        
        checkVisivility();
        $(window).on('scroll resize', function() {
            checkVisivility();
        });
        
        function checkVisivility() {
            scrollTop = $(document).scrollTop();
            minShow = $(selector).offset().top - $(window).height() * extra;
            maxShow = $(selector).offset().top + $(selector).outerHeight();
            var offset = $(window).height()
            if (scrollTop < minShow) {
                $(selector).removeClass(effectName);
            } else if (scrollTop > maxShow) {
                $(selector).removeClass(effectName);
            } else {
                timerId = setTimeout(function() {$(selector).addClass(effectName);}, timerSpeed);
            }
        }
    }
    
    //무한 슬라이더
    setInfinitySlide('#showcase');
    function setInfinitySlide(selector) {
        var numSlide = $(selector).find('ul.slide li').length;
        var clone = '';
        
        $(selector).find('a.prev').on('click', function() {
            clone = $(selector).find('ul.slide li:nth-child(' + numSlide + ')').clone();
            $(selector).find('ul.slide li:nth-child(' + numSlide + ')').remove();
            $(selector).find('ul.slide').prepend(clone);
        });
        $(selector).find('a.next').on('click', function() {
            clone = $(selector).find('ul.slide li:nth-child(1)').clone();
            $(selector).find('ul.slide li:nth-child(1)').remove();
            $(selector).find('ul.slide').append(clone);
        });
    }
    
    //배너 슬라이더
    setBannerSlide('#lala-insta');
    function setBannerSlide(selector) {
        var offsetLeft = 0;
        var boxWidth = $(selector).find('div.wrapper').innerWidth();
        var barWidth = 0;
        var minOffsetLeft = 0;
        var moveDistance = $(selector).find('ul.slide li').outerWidth();
        var timerId = '';
        var startX = 0;
        var delX = 0;
        var offsetX = 0;
        
        barWidth = $(selector).find('ul.slide').innerWidth();
        minOffsetLeft = -(barWidth - boxWidth);
        $(window).on('resize', function() {
            clearTimeout(timerId);
            timerId = setTimeout(function() {
                offsetLeft = 0;
                moveDistance = $(selector).find('ul.slide li').outerWidth();
                $(selector).find('ul.slide').css({'left': 0});
            }, 300);
        });
        
        $(selector).find('a.prev').on('click', function() {
            moveBanner('prev');
        });
        $(selector).find('a.next').on('click', function() {
            moveBanner('next');
        });
        $(selector).find('ul.slide').on('touchstart', function(e) {
            if ($(window).width() < 1025) {
                e.preventDefault();
                $(this).css({'transition': 'none'});
                startX = e.touches[0].clientX;
                offsetX = $(this).position().left;
                $(document).on('touchmove', function(e) {
                    delX = e.touches[0].clientX - startX;
                    if ((delX > 0 && offsetLeft === 0) || (delX < 0 && offsetLeft === minOffsetLeft)) {
                        delX = delX / 10;
                    }  
                    $(selector).find('ul.slide').css({'left': (offsetX + delX) + 'px'});
                });
                $(document).on('touchend', function(e) {
                    if (delX < -50) {
                        moveBanner('next');
                    } else if (delX > 50) {
                        moveBanner('prev');
                    } else {
                         $(selector).find('ul.slide').css({'left': (offsetX) + 'px'});
                    }
                    $(document).off('touchmove touchend');
                });
            }
        });
        function moveBanner(direction) {
            if (direction === 'prev') {
                if (offsetLeft === 0) {
                    $(selector).find('ul.slide').stop(true).animate({'left': '10px'}, 50).animate({'left': 0}, 100);
                } else {
                    offsetLeft += moveDistance;
                    if (offsetLeft > 0) offsetLeft = 0;
                    $(selector).find('ul.slide').stop().animate({'left': offsetLeft + 'px'}, 500);
                }
            } else if (direction === 'next') {
                if (offsetLeft === minOffsetLeft) {
                     $(selector).find('ul.slide').stop(true).animate({'left': (minOffsetLeft - 10) + 'px'}, 50).animate({'left': minOffsetLeft + 'px'}, 100);
                } else {
                    offsetLeft -= moveDistance;
                    if (offsetLeft < minOffsetLeft) offsetLeft = minOffsetLeft;
                    $(selector).find('ul.slide').stop().animate({'left': offsetLeft + 'px'}, 500);
                }
            }
        }
    }
});