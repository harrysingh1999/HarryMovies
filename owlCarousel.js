function top3Owl() {
  $("#carousel-top-3").owlCarousel({
    loop: true,
    center: true,
    dots: false,
    item: 2,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 900,
    autoplayHoverPause: true,
    stagePadding: 200,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
}

function castOwl() {
    $("#castDetails").owlCarousel({
        loop: false,
        margin: 14,
        nav: false,
        dots: true,
        autoplay: false,
        autoplayTimeout: 3000,
        smartSpeed: 900,
        autoplayHoverPause: true,
        responsive: {
         0: {
            items: 2,
            dots: false,
            autoplay: true,
            loop: true,
          },
          425: {
            items: 3,
            dots: false,
            autoplay: true,
            loop: true,
          },
          768: {
            items: 4,
          },
          1024: {
            items: 6,
          },
        },
      });
} 

function crewOwl() {
    $("#crewDetails").owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: false,
        autoplayTimeout: 3000,
        smartSpeed: 900,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 2,
            dots: false,
            autoplay: true,
            loop: true,
          },
          425: {
            items: 3,
            dots: false,
            autoplay: true,
            loop: true,
          },
          768: {
            items: 4,
          },
          1024: {
            items: 6,
          },
        },
      });
} 

function similarMoviesOwl() {
    $("#similarMovieDetails").owlCarousel({
        loop: true,
        margin: 8,
        nav: true,
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 900,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
            nav: false,
          },
          425: {
            items: 2,
            nav: false,
          },
          768: {
            items: 3,
            nav: false,
          },
          1000: {
            items: 4,
          },
        },
      });
}
