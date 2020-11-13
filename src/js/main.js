// Swiper JS
var postSliders = document.querySelectorAll('.js-post-carousel');

for (let i = 0; i < postSliders.length; i++) {
    const slides = postSliders[i].querySelectorAll('.swiper-slide');
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
/*btnSlide.onclick = function (event) {
    event.preventDefault()
    if(pInfo.classList.contains('_hide')) {
        footerSlide.style = `
            transform: translateY(0);
        `
        pInfo.classList.remove('_hide')
        this.classList.add('_active');
    } else {
        footerSlide.style = `
            transform: translateY(-${offsetBlock}px);
        `
        pInfo.classList.add('_hide')
        this.classList.remove('_active');
    }
}*/
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

