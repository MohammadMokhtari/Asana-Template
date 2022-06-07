import Swiper, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
  Thumbs,
} from 'swiper';

Swiper.use([Navigation, Pagination, EffectFade, Autoplay, Thumbs]);

const bannersSwiper = new Swiper('.banners_swiper', {
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  spaceBetween: 5,
  loop: true,
  mousewheel: true,

  navigation: {
    nextEl: '.offers_banner_nav_right_btn',
    prevEl: '.offers_banner_nav_left_btn',
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    type: 'bullets',
    clickable: true,
  },
  slidesPerView: 1,
  speed: 800,
  effect: 'fade',
});

const cat_banners_swiper = new Swiper('.cat_banners_swiper', {
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  spaceBetween: 5,
  loop: true,
  mousewheel: true,

  navigation: {
    nextEl: '.offers_banner_nav_right_btn',
    prevEl: '.offers_banner_nav_left_btn',
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    type: 'bullets',
    clickable: true,
  },
  slidesPerView: 1,
  speed: 800,
  effect: 'slide',
});

//discountSwiper

const productSwiper = new Swiper('.product_swiper', {
  slidesPerView: 6,
  fadeEffect: {
    crossFade: true,
  },
  //   autoplay: {
  //     delay: 3500,
  //     disableOnInteraction: false,
  //     pauseOnMouseEnter: true,
  //   },
  spaceBetween: 0,
  loop: true,
  mousewheel: true,
  speed: 500,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    980: {
      slidesPerView: 6,
      spaceBetween: 0,
    },
  },
});

const product__cart_swiper = new Swiper('.product__cart_swiper', {
  fadeEffect: {
    crossFade: true,
  },
  //   autoplay: {
  //     delay: 3500,
  //     disableOnInteraction: false,
  //     pauseOnMouseEnter: true,
  //   },
  spaceBetween: 0,
  loop: false,
  mousewheel: true,
  speed: 500,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
});

const productDetailsImgThumbsSwiper = new Swiper(
  '.productDetalsImagesThumbs_swiper',
  {
    loop: false,
    freeMode: true,
    watchSlidesProgress: true,
    spaceBetween: 0,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      980: {
        slidesPerView: 6,
        spaceBetween: 0,
      },
    },
  }
);

//bestSeillingProductSwiper
const productDetalsImagesSwiper = new Swiper('.productDetailsImages_swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: productDetailsImgThumbsSwiper,
  },
});
