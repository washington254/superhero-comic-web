/*
    Name: f8
    Version: 1.0
    Author: pixelwars
*/



(function ($) { 
  "use strict";


  /* global variables */
  var has_click_sound = false;
  var has_hover_sound = false;
  var has_page_switch_sound = false;
  var html, body, page_switch_sound;


  
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  /* DOCUMENT LOAD */
  $(function () {
	  

    // cache common elements
    html = $('html');
    body = $('body');


    // ------------------------------
    // Remove no-js class
    html.removeClass("no-js").addClass("ready");
    // ------------------------------

    // ------------------------------
    // Fix for : position fixed mask elements should be applied to body 
    // since adding filter to .site-content breaks fixed positioned elements inside it.
    if ($('.is-masked').length) {
      html.addClass('is-masked');
    }
    if ($('.iasg').length && $('.intro-content').length ) {
      html.addClass('has-iasg');
    }
    if ($('.p-hover-bg-list').length ) {
      html.addClass('is-not-masked-if-light-mode');
    }
    const bg_media = $('.bg-media');
    if (bg_media.length) {
      body.append(bg_media);
    }



    // ------------------------------
		// MENU
		var $menu = $('.nav-menu');

		// add classes for list elements with submenu
		$menu.find('li').each(function () {
			if ($(this).children('ul').length) {
				$(this).addClass('has-submenu');
			}
		});

    /* Mobile Menu */
    $('.menu-toggle').on( 'click', function() {
      html.toggleClass("is-menu-toggled-on");
    });
    /* Mobile Menu */

		// add classes
		$menu.find('li').each(function () {
			if ($(this).children('ul').length) {
				$(this).addClass('has-submenu');
				$(this).find('> a').append('<span class="submenu-toggle"></span>');
			}
		});

		var $submenuTrigger = $('.has-submenu .submenu-toggle');
		// submenu link click event
		$submenuTrigger.on("click", function () {
			$(this).parent().parent().toggleClass('active');
			$(this).parent().siblings('ul').toggleClass('active');
			return false;
		});
		// ------------------------------
    // ------------------------------


    // Scrolled Down class for menu bg change on hover */
    function throttle (callback, limit) {
      var tick = false;
      return function () {
        if (!tick) {
          callback.call();
          tick = true;
          setTimeout(function () {
            tick = false;
          }, limit);
        }
      }
    }
    function isScrolledDown() {
      if (window.scrollY > 60) {
        html.addClass('scrolled-down');
      } else {
        html.removeClass('scrolled-down');
      }
    }
    window.addEventListener("scroll", throttle(isScrolledDown, 160));
    // ------------------------------


    // ------------------------------
		// GLITCH
		var glitch = $('.bg-media.glitch');
		if(glitch.length) {
      $('.glitch + .intro-content h1').addClass('glitch-text').attr('data-text', $('.glitch + .intro-content h1').text());
      var el = glitch.find('div');
      for(var i=0; i<4; i++) {
        el.clone().insertAfter(el);
      }
		}
    // ------------------------------




    // ------------------------------
    // CLICK SOUND
    has_click_sound = body.hasClass("has-click-sound");
    if (has_click_sound) {
      var click = document.createElement("audio");
      click.src = body.data("click-sound");
      click.preload = "auto";
      html.on("mousedown", function (e) {
        click.pause();
        click.currentTime = 0;
        click.play();
      });
    }
    // ------------------------------


    // ------------------------------
    // HOVER SOUND
    has_hover_sound = body.hasClass("has-hover-sound");
    if (has_hover_sound) {
      var hover = document.createElement("audio");
      hover.src = body.data("hover-sound");
      hover.preload = "auto";
      $(document).on('mouseover', 'a, button, input[type=submit], input[type=button]', function() {
        if(html.hasClass("lenis-scrolling")) return;
        hover.pause();
        hover.currentTime = 0;
        hover.play();
      });
    }
    // ------------------------------


    // ------------------------------
    // PAGE SWITCH SOUND
    has_page_switch_sound = body.hasClass("has-page-switch-sound");
    if (has_page_switch_sound) {
      page_switch_sound = document.createElement("audio");
      page_switch_sound .src = body.data("page-switch-sound");
      page_switch_sound.preload = "auto";
    }
    // ------------------------------

  
    // ------------------------------
    // PAGE TRANSITIONS
    $('a').on("click", function(event) {
      if( location.hostname === this.hostname || !this.hostname.length ) {
        
        var href = $(this).attr('href');

        // return on blank links and files
        if((href.startsWith("#")) || 
          ($(this).attr('target') === "_blank") || 
          href.includes('jpg') || 
          href.includes('jpeg') || 
          href.includes('png') || 
          href.includes('gif') || 
          href.includes('webp')|| 
          href.includes('pdf') || 
          href.includes('zip') ) return;

        event.preventDefault();
        html.addClass('page-out');

        var overlay = document.getElementsByClassName('overlay')[0];
        var style = window.getComputedStyle(overlay);
        var duration = style.getPropertyValue('transition-duration');

        duration = ( duration.indexOf( 'ms' ) >- 1 ) ? parseFloat( duration ) : parseFloat( duration ) * 1000;
        
        if (has_page_switch_sound) {
          page_switch_sound.play();
        }
      
        setTimeout(function(){ 
          location.href = href;
          }, duration + 200);

        // fix for: overlay is blocking content when navigating with browser back button.
        setTimeout(function(){ 
          html.removeClass('page-out');
          }, duration + 550);
      }
      });
		// ------------------------------

    
    // ------------------------------
    // MOUSE CLCIK RIPPLE EFFECT
    var has_click_ripple_effect = body.hasClass("has-click-ripple-effect");
    if (has_click_ripple_effect) {
      body.append('<i class="ripple"></i>');
      var ripple = $('i.ripple');
      html.on("mousedown", function (e) {
        ripple.addClass("active").css("left", e.pageX).css("top", e.pageY);
        $('.cursor').addClass("active");
      });
      html.on("mouseup", function (e) {
        $('.cursor').removeClass("active");
      });
      ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
        return ripple.removeClass("active");
      });
    }
    // ------------------------------



    // ------------------------------
    // DISABLE RIGHT CLICK
    if(body.hasClass('is-right-click-disabled')) {
      var copy_notice = $('.copy-notice');
      document.addEventListener("contextmenu", function(e){
        e.preventDefault();
        copy_notice.addClass('is-active');
      });
      copy_notice.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        $(this).removeClass('is-active');
      });
    }
    // ------------------------------



    // ------------------------------
    // BACK TO TOP
    var back_to_top = $(".back-to-top");
    if (back_to_top.length) {
      var $window = $(window);
      var scrollTrigger = $window.height() - 400, // px
        backToTop = function () {
          var scrollTop = $window.scrollTop();
          if (scrollTop > scrollTrigger) {
            back_to_top.addClass("show");
          } else {
            back_to_top.removeClass("show");
          }
        };
      backToTop();
      back_to_top.on("click", function (e) {
        e.preventDefault();
        $("html,body")
          .stop()
          .animate( { scrollTop: 0 }, 900, "easeInOutExpo" );
      });
      var scrolled = false;
      window.addEventListener("scroll", () => {
        scrolled = true;
      });

      setInterval(function() {
          if ( scrolled ) {
            scrolled = false;
            backToTop();
          }
      }, 128);
    }
    // ------------------------------


    // ------------------------------
    // STICKY SIDEBAR
    sticky_sidebar();
    $(window).resize(function () {
      sticky_sidebar_update(); // fix for : sticky sidebar overlap when resized to mobile view
    });
    // ------------------------------


    // ------------------------------
    // SETUP
    setup();
    // ------------------------------


  });
  // DOCUMENT READY
  // ------------------------------------------------------------





  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // WINDOW ONLOAD
  $(window).on("load", function () {

    
    // re-cache elements
    html = $('html');
    body = $('body');
    var overlay = $('.overlay');

    if($('.has-request-click').length) {
      html.addClass("before-loaded");
      overlay.on( 'click', function() {
        html.removeClass("before-loaded").addClass("loaded page-in");
      });
    } else {
      html.addClass("loaded page-in");
    }
	  
    overlay.bind( 'transitionend', function() {
      if(!html.hasClass('loaded')) return;
      overlay.addClass('no-transition').addClass('ended'); 
      setTimeout(function(){ 
        overlay.removeClass('no-transition'); 
        }, 100);
      html.removeClass("page-in");
      
    });
	


    sticky_sidebar_update();

    // FS SLIDER
    fsSlider();


    
    //$('.blog-regular .featured-image').attr('data-scroll', '');

    // word reveal animation
    Splitting({ target: 'h1:not(.glitch-text):not(.p-title):not(.site-title)' });

    // line reveal animation
    Splitting({ target: '.intro-content p, .site-info p, .p-excerpt', by: 'lines' });

    ScrollOut({
      targets: 'h1, .intro-content p, .site-info p, .p-excerpt',
      cssProps: {
        visibleY: true
      },
      once: true
    });

    ScrollOut({
      targets: '.blog-regular .featured-image img, .blog-regular .entry-header, .blog-regular .entry-content, .portfolio.is-vertical .p-entry',
      cssProps: {
        visibleY: true,
        viewportY: true
        //scrollPercentY: true
      },
      offset: 10,
      threshold: -500
    });

    ScrollOut({
      targets: '.portfolio.is-horizontal .p-entry',
      cssProps: {
        visibleX: true,
        viewportX: true
        //scrollPercentY: true
      },
      offset: 10,
      threshold: -500
    });

    ScrollOut({
      targets: 'html[data-horizontal-scroll="false"] .wp-block-media-text, html[data-horizontal-scroll="false"] .wp-block-image',
      cssProps: {
        visibleY: true
      },
      once: true,
      offset: 0
    });

    // bug : --visible-x:NaN set on objects!!!
    ScrollOut({
      targets: 'html[data-horizontal-scroll="true"] .wp-block-media-text, html[data-horizontal-scroll="true"] .wp-block-image',
      cssProps: {
        visibleX: true,
        viewportX: true
      },
      once: true,
      offset: 0
    });


    // setTimeout(function(){  }, 6000);

    


  });
  // WINDOW ONLOAD
  // ------------------------------------------------------------



  // ------------------------------
  // ------------------------------
  // FUNCTIONS
  // ------------------------------
  // ------------------------------




  // ------------------------------
  // SETUP : plugins
  function setup() {

    // COOL LINKS
    coolLinks();

    // MASONRY
    setupMasonry();

    // LIGHTBOX
    setupLightbox();

    // FORMS
    setupForms();

    // CONTACT FORM
    setupContactForm();


  }
  // ------------------------------



  // ------------------------------
  // STICKY SIDEBAR
  var stickySidebar;
  function sticky_sidebar() {

    var sidebar = $('#secondary');
    if (sidebar.length) {
      jQuery.support.touch = 'ontouchend' in document;
      if (window.matchMedia("(min-width: 768px)").matches && !(jQuery.support.touch) && ($('#primary').height() > sidebar.height())) {
        stickySidebar = new StickySidebar('#secondary', {
          topSpacing: 0,
          bottomSpacing: 0,
          resizeSensor: true,
          containerSelector: '.site-middle > div',
          innerWrapperSelector: '.sidebar-wrap'
        });

      }
    }
  }
  // ------------------------------


  // ------------------------------
  // UPDATE STICKY SIDEBAR
  function sticky_sidebar_update() {
    if ($('#secondary').length) {
      jQuery.support.touch = 'ontouchend' in document;
      if (stickySidebar && window.matchMedia("(min-width: 768px)").matches && !(jQuery.support.touch) && ($('#primary').height() > $('#secondary').height())) {

        stickySidebar.updateSticky();

      }
      // fix for : sticky sidebar overlap when resized to mobile view
      if (window.matchMedia("(max-width: 767px)").matches) {

        if (stickySidebar) {
          stickySidebar.destroy();
        }

      }
    }
  }
  // ------------------------------



  // ------------------------------
  // COOL LINKS
  function coolLinks() {
    $('.menu-wrap > ul > li > a, .footer-social a, .entry-title a, .entry-content:not(.intro-content) > p:not(.more) > a:not(.button):not(.social-link), .nav-single a, .latest-posts a, .cat-links a, .media-cell-desc a, .comment-reply-link, .comment-meta .fn a, #filters a, .post-edit-link, .logged-in-as a, .widget_recent_entries a, .tptn_after_thumb .tptn_link, .widget_categories a, .widget_archive a, .widget_pages a, .widget_meta a, .widget_recent_comments a, .widget_rss a, .widget_nav_menu a, .wp-caption-text a').addClass('cool-link');
  }
  // ------------------------------




// ------------------------------
// FullScreen SLIDER
function fsSlider() {
  var fs_slider = $('.fs-slider');
  if(fs_slider.length) {
    
    var isSpeedingUp = fs_slider.hasClass('is-speeding-up');

    fs_slider.find('.fs-slide').each(function() {
        $(this).css('background-image', 'url(' + $(this).find('img').attr('src') + ')');
    });

    var firstSlide = fs_slider.find('.fs-slide').first();
    fadeImage(firstSlide);	  


    // fn : FADE IMAGE
    function fadeImage(slide) {

      if(isSpeedingUp) {
        var animationDuration = slide.css('animation-duration');
        const time = animationDuration.slice(0, -1); 
        animationDuration = (time * 1.84 / (slide.index() + 2)) + 0.1 + 's';
        slide.css({ 'animation-duration': animationDuration });
      }
      
      slide.addClass('in');
      slide.on('animationend', () => {
          if(slide.hasClass('out')) return;
          if(slide.is(':last-child')) {
            fs_slider.addClass('is-ended');
          } else {
            slide.removeClass('in').addClass('out');
            // recursive call : happy developer :P
            fadeImage(slide.next());
          }
      });  
    }
  }
}
// ------------------------------




  // ------------------------------
  // HOME ANIMATION
  function homeAnimation() {
    


    $('.full-screen-wrap').on('click', function () {
      $(this).toggleClass('active');
      toggleFullScreen();
    });


    // TOGGLE FULSCREEN
    function toggleFullScreen() {
      if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }



  }
  // ------------------------------




  // ------------------------------
  // MASONRY
  //fix for wp 5.9 gallery markup - missing inner container
  var wp_gallery = $('.wp-block-gallery');
  if(wp_gallery.length) {
    wp_gallery.each(function(index, el) {
      $(el).children('.wp-block-image').addClass('blocks-gallery-item');
      if($(el).children('.blocks-gallery-grid').length <= 0) {
         $(el).wrapInner( "<div class='blocks-gallery-grid'></div>");
      }
    });
  }

  function setupMasonry() {
    var masonry = $(".masonry, .gallery, .wp-block-gallery:not(.is-cropped) .blocks-gallery-grid");
    if (masonry.length) {

      

      masonry.each(function (index, el) {
        $(el).imagesLoaded(function () {

          // Horizontal layout
          if($('html[data-horizontal-scroll="true"]').length) {

            function setHorizontalMasonry() {

              var gallery_item = $(el).find('.blocks-gallery-item');
              var width_total = 0;
              var widthDelta = gallery_item.outerWidth(true);

              console.log(widthDelta);
  
              gallery_item.each(function() {
                width_total += parseInt($(this).outerWidth(true));
              });
  
              $(el).css('width', width_total / 2 + widthDelta);

            } 

            setHorizontalMasonry();
            var fnResizeCallTimer = null;
            window.addEventListener( "resize", function() {
                clearTimeout(fnResizeCallTimer);
                fnResizeCallTimer = setTimeout(setHorizontalMasonry, 100); 
            } );
            
          } else { // Vertical Layout
            if($(el).parent().hasClass('is-cropped')) 
              return;
            $(el).addClass('is-masonry').masonry();
          }

        });
      }); //each
    }
  }
  // ------------------------------



  // ------------------------------
  // LIGHTBOX - applied to porfolio and gallery post format
  function setupLightbox() {
    if ($(".has-mfp .lightbox, .has-mfp .gallery, .has-mfp .wp-block-gallery, .has-mfp .wp-block-image a").length) {
      $(".media-box, .gallery, .wp-block-gallery, .wp-block-image").each(function (index, element) {
        var $media_box = $(this);
        $media_box.magnificPopup({
          delegate:
            '.lightbox, figure a[href$=".jpg"], figure a[href$=".jpeg"], figure a[href$=".png"], figure a[href$=".gif"], .gallery-item a[href$=".jpg"], .gallery-item a[href$=".jpeg"], .gallery-item a[href$=".png"], .gallery-item a[href$=".gif"]',
          type: "image",
          image: {
            markup:
              '<div class="mfp-figure">' +
              '<div class="mfp-close"></div>' +
              '<div class="mfp-img"></div>' +
              "</div>" +
              '<div class="mfp-bottom-bar">' +
              '<div class="mfp-title"></div>' +
              '<div class="mfp-counter"></div>' +
              "</div>", // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

            cursor: "mfp-zoom-out-cur", // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor.
            verticalFit: true, // Fits image in area vertically
            tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
          },
          gallery: {
            enabled: true,
            tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
          },
          iframe: {
            markup:
              '<div class="mfp-iframe-scaler">' +
              '<div class="mfp-close"></div>' +
              '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
              '<div class="mfp-title">Some caption</div>' +
              "</div>"
          },
          mainClass: "mfp-zoom-in",
          tLoading: "",
          removalDelay: 300, //delay removal by X to allow out-animation
          callbacks: {
            markupParse: function (template, values, item) {
              var title = "";
              if (item.el.parents(".gallery-item").length) { // classic editor gallery
                title = item.el
                  .parents(".gallery-item")
                  .find(".gallery-caption")
                  .text();
              } else if (item.el.parents(".blocks-gallery-item").length) { // Gutenberg gallery
                title = item.el
                  .parents(".blocks-gallery-item")
                  .find("figcaption")
                  .text();
              }
              /* else if (item.el.hasClass("wp-block-image").length) { // Gutenberg image
                console.log(item.el);
                title = item.el
                  .find("figcaption")
                  .text();
              } */
              else {
                title =
                  item.el.data("title") == undefined
                    ? ""
                    : item.el.data("title");
              }
              //return title;
              values.title = title;
            },
            imageLoadComplete: function () {
              var self = this;
              setTimeout(function () {
                self.wrap.addClass("mfp-image-loaded");
              }, 16);
            },
            beforeClose: function () {
              // play bg audio when closing audio/video in a lightbox
              if (this.content.find('iframe[src*="soundcloud.com"]').length || this.content.find('iframe[src*="vimeo.com"]').length || this.content.find('iframe[src*="youtube.com"]').length || this.content.find('iframe[src*=".mp4"]').length) {
                if (!isUserTurnedOffMusic) {
                  if (music) {
                    music.play();
                    isLigtboxTurnedOffMusic = false;
                  }

                }
              }
            },
            close: function () {
              this.wrap.removeClass("mfp-image-loaded");

            },
            beforeAppend: function () {
              var self = this;

              // pause bg audio when opening audio/video in a lightbox
              if (this.content.find('iframe[src*="soundcloud.com"]').length || this.content.find('iframe[src*="vimeo.com"]').length || this.content.find('iframe[src*="youtube.com"]').length || this.content.find('iframe[src*=".mp4"]').length) {
                self.wrap.addClass("is-soundcloud");
                if (music) {
                  isLigtboxTurnedOffMusic = true;
                  music.pause();
                }
              }

              // square aspect ratio for soundcloud embeds
              if (this.content.find('iframe[src*="soundcloud.com"]').length) {
                self.wrap.addClass("is-soundcloud");
              } else {
                self.wrap.removeClass("is-soundcloud");
              }

              this.content.find("iframe").on("load", function () {
                setTimeout(function () {
                  self.wrap.addClass("mfp-image-loaded");
                }, 16);
              });
            }
          },
          closeBtnInside: false,
          closeOnContentClick: true,
          midClick: true
        });
      });
    }
  }
  // ------------------------------



  // ------------------------------
  // SETUP FORMS : FORM VALIDATION
  function setupForms() {
    // comment form validation fix
    if ($("#commentform").length) {
      $("#commentform").addClass("validate-form");
      $("#commentform")
        .find("input,textarea")
        .each(function (index, element) {
          if ($(this).attr("aria-required") == "true") {
            $(this).addClass("required");
          }
          if ($(this).attr("name") == "email") {
            $(this).addClass("email");
          }
        });
    }

    // mailchimp form validation fix
    var mailchimpForm = $(".mc4wp-form");
    if (mailchimpForm.length) {
      mailchimpForm.addClass("validate-form");
    }

    // validate form
    if ($(".validate-form").length) {
      $(".validate-form").each(function () {
        $(this).validate();
      });
    }
  }
  // ------------------------------

  // ------------------------------
  // SETUP CONTACT FORM
  function setupContactForm() {
    var contactForm = $("#contact-form");
    if (contactForm.length) {
      var $alert = $(".site-alert");
      if(!$alert.length) {
        contactForm.append('<div class="site-alert animated"></div>');
        }
      $alert = $(".site-alert");
      var $submit = contactForm.find(".submit");

      contactForm.on("submit", function () {
        if (contactForm.valid()) {
          NProgress.start();
          $submit.addClass("active loading");
          var formValues = contactForm.serialize();

          $.post(contactForm.attr("action"), formValues, function (data) {
            if (data === "success") {
              contactForm.clearForm();
            } else {
              $alert.addClass("error");
            }
            NProgress.done();
            $alert.show();
            setTimeout(function () {
              $alert.hide();
            }, 6000);
          });
        }
        return false;
      });

      $.fn.clearForm = function () {
        return this.each(function () {
          var type = this.type,
            tag = this.tagName.toLowerCase();
          if (tag == "form") return $(":input", this).clearForm();
          if (type == "text" || type == "password" || tag == "textarea")
            this.value = "";
          else if (type == "checkbox" || type == "radio") this.checked = false;
          else if (tag == "select") this.selectedIndex = -1;
        });
      };
    }
  }
  // ------------------------------


  


})(jQuery);