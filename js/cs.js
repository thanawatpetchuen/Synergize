var $item = $('#topcarousel .carousel-item'); 
var $wHeight = $(window).height();
var $wWidth = $(window).width();
$item.eq(0).addClass('active');
$item.height($wHeight); 
$item.width($wWidth);
console.log($wWidth);
$item.addClass('full-screen');

$('#topcarousel .carousel img').each(function() {
  var $src = $(this).attr('src');
  var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image' : 'url(' + $src + ')',
    'background-color' : $color
  });
  $(this).remove();
});

$(window).on('resize', function (){
  $wHeight = $(window).height();
  $wWidth = $(window).width();
  $item.height($wHeight);
  $item.width($wWidth);
});

$('#topcarousel .carousel').carousel({
  interval: 6000,
  pause: "false"
});