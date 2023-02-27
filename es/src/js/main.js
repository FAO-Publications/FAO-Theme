$(document).ready(function() {

  // Reg Exp to format title if any HTML tag is present
  var theTitle = document.title.replace(/(<([^>]+)>)/gi, " ");
  document.title = theTitle;

  // homepage loader
  $('body.home').addClass('menu-open');

  // Reg Exp to take first 150 characters and inject it into meta descritpion tag
  if ($(".container").length) {
    var descr;
    var metaDescr = document.querySelector('meta[name="description"]').getAttribute("content");
    if ($(".container").find('p').first().length) {
      descr = $(".wrap").find('p').first().html().replace(/<[^>]*>?/gm, '');
      if (descr.length > 50) {
        metaDescr = descr.match(/(.{1,180}\w)\s/)[1] + '...';
      }
    }
    document.querySelector('meta[name="description"]').setAttribute("content", metaDescr);
  }



  // Set active link from menu
  var location = window.location.pathname.split('/').pop();

  $('nav ul li a').each(function() {
    if (this.href.split('/').pop() === location) {
      $(this).addClass('active');
      if ($(this).parent('li').parent('ul').parent('li').find('span.submenu').length){
      } else {
        $(this).parent('li').css('border-bottom', 'none');
      }
    }
  });


  $('li.active').unbind().click(function(){
    $(this).parent("ul").find("li").not(".active").toggle();
    $(this).parent("ul").toggleClass('grey');
  });

  $(document).click(function(){
    $('.language').find("li").not(".active").hide();
    $(".language ul").removeClass('grey');
  });

  $(".language").click(function(e){
    e.stopPropagation();
  });


  // Back to top
  $('.back-top').unbind().click(function(){
    $('html,body').animate({ scrollTop: 0});
  });

  // read more
  $('.plus').unbind().click(function(){
    $('html,body').animate({ scrollTop: $(".wrap").offset().top - 70});
  });

  $('#menu-toggle').unbind().click(function(){
    var scrlTop = $(window).scrollTop();

    if ($('#toggle').is(':checked')) {

      if (!$('html,body').hasClass('menu-open')) {
        $('.menu').addClass('menu-open slide-in');
        $('html,body').addClass('menu-open');
        setTimeout(function () {
          $('body').addClass('fixed');
          $('header').addClass('relative');
        }, 500);
        $('.menu').scrollTop(0);
        localStorage.setItem("scrollPosition", scrlTop);
      } else {
        $('.menu').removeClass('menu-open slide-in');
        $('html').removeClass('menu-open');
        $('body').removeClass('menu-open fixed');
        $('header').removeClass('relative');
        if(localStorage.scrollPosition) {
          $('html,body').scrollTop(localStorage.getItem("scrollPosition"));
        }
      }
    } else {
      return
    }
  });

  //info copy
  $('.copy-img').on('click', function(){
    $(this).next('.info-copy').toggleClass('show');
    $(this).find('.closed').toggle();
    $(this).find('.info').toggle();
  });

  // mobile swiper
 /* if ($(window).innerWidth() < 1200) {
    let xMove;
    let sensitivityInPx;

    let $sliderWrapper = $('.hero-swipe')
    $sliderWrapper.on('touchstart', function (event) {
      const xClick = event.originalEvent.touches[0].pageX;
      $(this).one('touchmove', function (event) {
        xMove = event.originalEvent.touches[0].pageX;
        sensitivityInPx = 7;

        $('.container, footer').css({display: 'none'});

        $('.main').css({ position: 'absolute', width: '100%', height: '100%', overflowY: 'hidden'});

        if (Math.floor(xClick - xMove) > sensitivityInPx) {
          $('.hero').css({position: 'absolute'});
          $('.hero-next').css({display: 'block', position: 'absolute'});

        } else if (Math.floor(xClick - xMove) < -sensitivityInPx) {
          $('.hero').css({position: 'absolute'});
          $('.hero-prev').css({ display: 'block', position: 'absolute'});
        }
      });
      $(this).on('touchend', function () {

        $(this).off('touchmove');
        if (Math.floor(xClick - xMove) > sensitivityInPx) {
          $('a.next')[0].click();
        } else if (Math.floor(xClick - xMove) < -sensitivityInPx) {
          $('a.prev')[0].click();
        }

      });
    });
  }*/

  // set hero images depending on screen resolution
  var imageBgs = document.querySelectorAll('[data-bg]');
  //var screenWidth = window.innerWidth;

  for(var i=0; i<imageBgs.length; i++) {
    /*if (screenWidth < 1200){
      // Load mobile image
      imageBgs[i].style.backgroundImage = 'url('+imageBgs[i].getAttribute('data-bg-mobile')+')';
    } else {
      // desktop image
      imageBgs[i].style.backgroundImage = 'url('+imageBgs[i].getAttribute('data-bg-desktop')+')';
    }*/

    imageBgs[i].style.backgroundImage = 'url('+imageBgs[i].getAttribute('data-bg-desktop')+')';


    /*if (imageBgs[i].classList.contains("hero-prev")) {
      imageBgs[i].setAttribute('id','preload-prev');
    }
    else {
      imageBgs[i].setAttribute('id','preload-next');
    }*/
  }
  scrollElements()
  checkVisible()
});


// viewport height 100%
function viewportHeight() {
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.document.documentElement.clientHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Remove loader home
function removeLoader(){
  $( "#loadingDiv" ).fadeOut(500, function() {
    // fadeOut complete. Remove the loading div
    $( "#loadingDiv" ).remove(); //makes page more lightweight
  });
  $('body.home').removeClass('menu-open');

}


// checkif element is visible in viewport
function checkVisible(){
  $(".popUp").each(function(i, el) {
    var el = $(el);
    var top_of_element = el.offset().top;
    var bottom_of_element = el.offset().top + el.outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
      el.addClass("pop");
    } else {
      return
    }
  });
}

// on back browser press, simulate back button click
$(window).bind("pageshow", function(event) {
  if (event.originalEvent.persisted) {
    if ($("a.prev").length) {
      $('a.prev')[0].click();
    }
  }
});

// Keyboard navigation through pages
$(document).on("keydown", function (event) {
  if (event.which === 37 && $("a.prev").length) {
    $('a.prev')[0].click();
  } else if (event.which === 39 && $("a.next").length) {
    $('a.next')[0].click();
  }
});

$('a.prev').click(function(event){
  let newLoc = event.currentTarget.href;
  $(".hero-content .title").remove();
  $(".hero-content, .navigation-top").css('z-index','999999');
  $(".hero .navigation-bars nav ul li a.active").addClass('no-animation');

  $(".hero-prev").append($(".hero-content, .navigation-top").clone());
  $(".hero .hero-content, .hero .navigation-top").hide();

  event.preventDefault();
  $('.container, footer').css({display: 'none'});
  $('.main').css({ position: 'absolute', width: '100%', height: '102%', overflowY: 'hidden'});
  $('.hero').addClass('show-next');
  $('.hero-prev').css({ display: 'block', position: 'absolute'});
  setTimeout(function() {
    window.location.href = newLoc;
  }, 600);
});

$('a.next').click(function(event){
  let newLoc = event.currentTarget.href;
  $(".hero-content .title").remove();
  $(".hero-content, .navigation-top").css('z-index','999999');
  $(".hero .navigation-bars nav ul li a.active").addClass('no-animation');
  $(".hero-next").append($(".hero-content, .navigation-top").clone());
  $(".hero .hero-content, .hero .navigation-top").hide();


  event.preventDefault();
  $('.container, footer').css({display: 'none'});
  $('.main').css({ position: 'absolute', width: '100%', height: '102%', overflowY: 'hidden'});
  $('.hero').addClass('show-prev');
  $('.hero-next').css({display: 'block', position: 'absolute'});
  setTimeout(function() {
    window.location.href = newLoc;
  }, 600);
});

$( window ).on( "load", function() {
  $('body').addClass('loaded');
  //remove flicker on page load
  setTimeout(function () {
    $('.info-copy').css('display','flex');
  }, 500);

  setTimeout(removeLoader, 200); //wait for page load

});

function scrollElements() {
  $(window).on('scroll', function () {

    $.each($('img'), function() {
      if ( $(this).attr('data-src') && $(this).offset().top < ($(window).scrollTop() + $(window).height() + 100) ) {
          var source = $(this).data('src');
          $(this).attr('src', source);
          $(this).addClass('popUp up')
          $(this).removeAttr('data-src');
      }
    })

    checkVisible();
  });
}

$(window).on("orientationchange resize", function () {
  $('.menu').removeClass('menu-open slide-in');
  $('html').removeClass('menu-open');
  $('body').removeClass('menu-open fixed');
  $('header').removeClass('relative');
  $('#toggle').prop('checked', false);
  $('.language').find("li").not(".active").removeClass('vis');
  $(".language ul").removeClass('grey');
  checkVisible();
  viewportHeight();

}).resize();


