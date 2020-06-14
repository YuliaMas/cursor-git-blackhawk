// $(document).ready(function () {
//   $("head").append('<link rel="stylesheet" href="../css/main.min.css?v=1">');
// });
$(document.head).append(
  '<link rel="stylesheet" href="../css/main.min.css?v=1">'
);
$(document.body).append(`
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js" async defer></script>
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
