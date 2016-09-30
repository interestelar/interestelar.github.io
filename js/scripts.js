(function($){

	// Declare global variables
	var map,
		mapLatLng;
	
	$(window).on('load', function(){

		// Remove loading indicator
		setTimeout(function(){
			$('#preload-content').fadeOut(400, function(){
				$('#preload').fadeOut(800);				
				$('.fadeInLeft, .fadeInRight').addClass('animate');
			});
		}, 400);

	});

	$(document).ready( function(){

		// Create a countdown instance. Change the launchDay according to your needs.
		// The month ranges from 0 to 11. I specify the month from 1 to 12 and manually subtract the 1.
		// Thus the launchDay below denotes 5 December, 2015.
		var launchDay = new Date(2017, 12-1, 5);
		$('#countdown-timer').countdown({
			until: launchDay,
			format: 'DHMS'
		});

		// Invoke the Placeholder plugin
		$('input, textarea').placeholder();

		// Validate newsletter form
		$('<div class="spinner"><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div></div>').hide().appendTo('.newsletter');
		$('<div class="success"></div>').hide().appendTo('.newsletter');
		$('#newsletter-form').validate({
			rules: {
				newsletter_email: { required: true, email: true }
			},
			messages: {
				newsletter_email: {
					required: 'Email address is required',
					email: 'Email address is not valid'
				}
			},
			errorElement: 'span',
			errorPlacement: function(error, element){
				error.appendTo(element.parent());
			},
			submitHandler: function(form){
				$(form).hide();
				$('.newsletter').find('.spinner').css({ opacity: 0 }).show().animate({ opacity: 1 });
				$.post($(form).attr('action'), $(form).serialize(), function(data){
					$('.newsletter').find('.spinner').animate({opacity: 0}, function(){
						$(this).hide();
						$('.newsletter').find('.success').show().html('<i class="icon ion-ios7-checkmark-outline"></i> Thank you for subscribing!').animate({opacity: 1});
					});
				});
				return false;
			}
		});

		// Add tabs functionality to the right side content
		jgtContentTabs();

	});

	// Add tabs functionality to the right side content
	function jgtContentTabs(){
		var tabsNav = $('#menu'),
			tabsWrap = $('#main');

		tabsWrap.find('.main-section:gt(0)').hide();
		tabsNav.find('li:first').addClass('active');
		tabsNav.find('a').click(function(e){
			tabsWrap.find('.main-section').hide();
			tabsWrap.find($($(this).attr('href'))).fadeIn(800);
			tabsNav.find('li').removeClass('active');
			$(this).parent().addClass('active');
			e.preventDefault();

		});
	}


	// Random image from Flickr as background
  $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
     {
        tags: "space, cosmos, universe",
        format: "json"
      },

      //The callback function
      function(data) {

      	//console.log(data);

	    	//Get random photo from the api's items array
	      var randomPhoto = data.items[Math.floor(Math.random() * data.items.length)];  

	      console.log(randomPhoto);

	      var photo_author = randomPhoto.author.split('(')[1].split(')')[0];
	      var photo_id = randomPhoto.media.m.split('/').pop().split('_')[0];
	      var photo_title = randomPhoto.title;
	      var photo_link = randomPhoto.link;

      	$.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&jsoncallback=?", 
      	{
      		api_key: "7a9118c38985c3be8f3c117d5734a6a6",
      		format: "json",
      		photo_id: photo_id
      	}, function(json_data) {

      			console.log(json_data);

      			var photosArray = json_data.sizes.size;
      			var photoUrlOriginal = photosArray[photosArray.length - 1].source;
      			console.log(photoUrlOriginal);

	          var attr = '<a href="' +photo_link+ '"> \
	        		' +photo_title+ ' - ' +photo_author+ ' \
	        		</a>';

	        	$('.bg-overlay').append(attr);

	          $('<img/>').attr('src', photoUrlOriginal).load(function() {
	          	$(this).remove();
	          	$('.inner.fadeInLeft').css({
	          		background: "rgba(8, 14, 21, 0.7)",
	          	});
	          	$('.left-wrap').css({
		            height: "100vh",
		          	//Use the randomPhoto's link
		            backgroundImage: "url("+photoUrlOriginal+")",
		            backgroundPosition: "center",
		            backgroundRepeat: "no-repeat",
		            backgroundSize: "cover",
	          	});
	          });

      	});
       });

})(jQuery);