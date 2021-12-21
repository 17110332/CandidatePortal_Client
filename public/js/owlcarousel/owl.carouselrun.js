$(document).ready(function() {
    setTimeout(function(){
      var owl = $('.owl-carousel');
      owl.owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          responsiveClass:true,
          responsive:{
              0:{
                  items:2,
                  nav:true,
                  slideBy: 2,
                  dots: false
              },
              600:{
                  items:4,
                  nav:false,
                  slideBy: 2,
                  dots: false
              },
              1000:{
                  items: 6,
                  nav:true,
                  loop:false,
                  slideBy: 2
              }
          }
      });
    },700)
      
  })