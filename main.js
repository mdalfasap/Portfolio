(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});
	

})(jQuery);
const form = document.getElementById("gform");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const message = document.getElementById("message");

const setSuccess = (element) => {
  const inputElement = element.parentElement.querySelector(".form-control");
  const errorDisplay = element.parentElement.querySelector(".form-error");
  errorDisplay.innerText = "";
  inputElement.classList.remove("error");
  inputElement.classList.add("success");
};

const setError = (element, message) => {
  const inputElement = element.parentElement.querySelector(".form-control");
  const errorDisplay = element.parentElement.querySelector(".form-error");
  errorDisplay.innerText = message;
  inputElement.classList.add("error");
  inputElement.classList.remove("success");
};

const isValidEmail = (email) => {
  const regularEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularEx.test(String(email).toLowerCase());
};

const validateInput = () => {
  const nameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();
  if (nameValue === "") {
    setError(fullname, "Full name is required");
  } else {
    setSuccess(fullname);
  }
  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }
  if (messageValue === "") {
    setError(message, "Message is required");
  } else {
    setSuccess(message);
  }
};

const onSubmitForm = (e) => {
  e.preventDefault();
  validateInput();
  if (
    !email.classList.contains("error") &&
    !fullname.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    $.ajax({
      url: " https://script.google.com/macros/s/AKfycbw0SAFqKLkyAk9k37KNjeK72XYF6lDlcf-Jb-hOg5MFbepjZ1B_NyWRsVf5B7HOanEvLw/exec",
      data: $("#gform").serialize(),
      method: "post",
      success: function (response) {
        alert("Form submitted successfully");
        window.location.reload();
      },
      error: function (err) {
        alert("Something Went Wrong");
      },
    });
  }
};

form.addEventListener("submit", onSubmitForm);

 

