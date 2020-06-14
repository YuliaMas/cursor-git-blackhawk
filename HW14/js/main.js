$(document.body).append(`
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<!--        <link rel="stylesheet" href="../css/main.css">-->
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    `);
$(window).on("load", () => {
  console.log("on load");
  $(".preloader").fadeOut(200);
  $(".review-slider").slick({
    prevArrow: $(".arrow-left"),
    nextArrow: $(".arrow-right"),
  });
});
