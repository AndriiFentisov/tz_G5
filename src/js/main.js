// Swiper JS
var postSliders = document.getElementsByClassName('js-post-carousel');

for (let i = 0; i < postSliders.length; i++) {
    const slides = postSliders[i].getElementsByClassName('swiper-slide');
    if(slides.length > 1) {
        const slider = new Swiper(postSliders[i], {
            slidesPerView: 1,
            pagination: {
                el: postSliders[i].querySelector('.swiper-pagination'),
                type: 'bullets',
                clickable: true
            },
            loop: true,
            speed: 400
        })
    }
}

const footerSlide = document.getElementById('js-footer-slide');
const btnSlide = document.getElementById('js-btn-slide');
const pInfo = document.getElementById('js-profile-info')
const offsetBlock = document.querySelector('.profile-info__interests').offsetHeight;
const offsetBottom = btnSlide.offsetHeight;

btnSlide.onclick = function (event) {
    event.preventDefault()
    if (pInfo.classList.contains('_open')) {
        footerSlide.style = `
            bottom: -${offsetBottom}px;
        `
        pInfo.classList.remove('_open')
        this.classList.add('_active');
    } else {
        footerSlide.style = `
            bottom: -${offsetBottom + offsetBlock}px;
        `
        pInfo.classList.add('_open')
        this.classList.remove('_active');
    }
}

// Object fit images
objectFitImages();

// Lazy Load images
window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.expand = 100;
lazySizesConfig.hFac = 0.4;
lazySizes.init();

// jQuery Accordion plugin
$(function () {
    // media query event handler
    if (matchMedia) {
        const mq = window.matchMedia("(min-width: 1024px)");
        mq.addListener(WidthChange);
        WidthChange(mq);

        // media query change
        function WidthChange(mq) {
            if (mq.matches) {
                $('#menu').trigger('destroy');
            } else {
                // Accordion
                $('#menu').slideAccordion();
            }

        }
    }
});

;(function ($) {
    $.fn.slideAccordion = function (opt) {
        // default options
        var options = $.extend({
            addClassBeforeAnimation: false,
            activeClass: 'js-active',
            opener: '.js-opener',
            slider: '.js-slide',
            animSpeed: 300,
            collapsible: true,
            event: 'click'
        }, opt);

        return this.each(function () {
            // options
            var accordion = $(this);
            var items = accordion.find(':has(' + options.slider + ')');

            items.each(function () {
                var item = $(this);
                var opener = item.find(options.opener);
                var slider = item.find(options.slider);

                opener.on(options.event, function (e) {
                    if (!slider.is(':animated')) {
                        if (item.hasClass(options.activeClass)) {
                            if (options.collapsible) {
                                slider.slideUp(options.animSpeed, function () {
                                    hideSlide(slider);
                                    item.removeClass(options.activeClass);
                                });
                            }
                        } else {
                            // show active
                            var levelItems = item.siblings('.' + options.activeClass);
                            var sliderElements = levelItems.find(options.slider);
                            item.addClass(options.activeClass);
                            showSlide(slider).hide().slideDown(options.animSpeed);

                            // collapse others
                            sliderElements.slideUp(options.animSpeed, function () {
                                levelItems.removeClass(options.activeClass);
                                hideSlide(sliderElements);
                            });
                        }
                    }
                    e.preventDefault();
                });
                if (item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
            });

            accordion.on('destroy', function () {
                items.each(function () {
                    var item = $(this);
                    var opener = item.find(options.opener);
                    var slider = item.find(options.slider);

                    opener.off(options.event);
                    item.removeClass(options.activeClass);
                    slider.prop('style', '');
                })
                accordion.off('destroy');
            })
        });
    };

    // accordion slide visibility
    var showSlide = function (slide) {
        return slide.css({ position: '', top: '', left: '', width: '' });
    };
    var hideSlide = function (slide) {
        return slide.show().css({ position: 'absolute', top: -9999, left: -9999, width: slide.width() });
    };
}(jQuery));
