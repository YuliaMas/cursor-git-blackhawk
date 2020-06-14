$(document.body).append(`
<!--        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>-->
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
function videoLoader(block, video) {
  block.click(function () {
    if (block.hasClass("video_load")) {
      return false;
    }
    block.html(video);
    block.addClass("video_load");
  });
}

videoLoader(
  $("#video"),
  '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/M7lc1UVf-VE" frameborder="0"' +
    ' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
);
