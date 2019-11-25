// tweaks via javascript
$(document).ready(function(){

	// set .bg-by-attr item by data-image attribute
	$(".bg-by-attr").each(function() {
		var attr = $(this).attr('data-image');

		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background-image', 'url(' + attr + ')');
		}

	});
	
	// open external links in a new tab/window
	$('a').filter(function() {
		return this.hostname && this.hostname !== location.hostname;
	}).attr('target', '_blank').append('<sup class="fas fa-external-link-alt ml-1"></sup>');

	// activate Bootstrap tooltips
	$('[data-toggle="tooltip"]').tooltip();
	
	// encode current url to qr-code and put it into #url-qr-wrap
	var qrcode = new QRCode({
		content: window.location.href,
		padding: 0,
		width: 96,
		height: 96,
		color: "#494f54",
		background: "#ffffff",
		ecl: "M"
	});
	var svg = qrcode.svg();
	$("#url-qr-wrap").append(svg);
	
	
	// targeting popover contents of .share-toggles
	$('.popover-toggles').popover({
		//container: 'body',
		html: true,
		placement: 'bottom',
		sanitize: false,
		content: function() {
			var pop_target = $(this).attr("data-popover-content");
			return $(pop_target).children(".popover-content").clone();
		}
	});
	
	// search-op list
	$(".search-op").each(function() {

		$(".search-op-input").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$(this).closest(".search-op").find(".search-op-list").children().filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
			if( value.length > 0 ) {
				$(this).siblings('.clear').removeClass('d-none');
			} else {
				$(this).siblings('.clear').addClass('d-none');
				$(this).closest(".search-op").find(".search-op-list").children().show();
			}
		});

		$(".clear").click(function() {
			$(this).addClass("d-none").siblings(".search-op-input").val(null);
			$(this).closest(".search-op").find(".search-op-list").children().show();
		});

	});
	
	// Click .btn-copy buttons to copy to clipboard

	var clipboard = new ClipboardJS('.btn-copy');

	clipboard.on('success', function(e) {
	  	setTooltip('Success!');
		hideTooltip();
		e.clearSelection();
	});

	clipboard.on('error', function(e) {
		setTooltip('Oops, something went wrong.');
		hideTooltip();
	});


	// Set Tooltips for .btn-copy buttons

	$('.btn-copy').tooltip({
	  trigger: 'click',
	});

	function setTooltip(message) {
	  $('.btn-copy').tooltip('hide')
	    .attr('data-original-title', message)
	    .tooltip('show');
	}

	function hideTooltip() {
	  setTimeout(function() {
	    $('.btn-copy').tooltip('hide').attr('data-original-title', 'Copy it');
	  }, 700);
	}

		
});

// using Web Share API if it is available
const shareButton = document.querySelector('#share-toggle-sns');

if (navigator.share) { 
	shareButton.classList.remove("popover-toggles");
}
    
shareButton.addEventListener('click', event => {
   navigator.share({
      title: document.title,
      text: document.title,
      url: document.URL,
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
});




// Scrolls smoothly to anchor
$(document).ready(function(){
// Add smooth scrolling to all .sjump links
$(".sjump").on('click', function(event) {

// Make sure this.hash has a value before overriding default behavior
if (this.hash !== "") {
  // Prevent default anchor click behavior
  event.preventDefault();

  // Store hash
  var hash = this.hash;

  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 800, function(){

    // Add hash (#) to URL when done scrolling (default click behavior)
    //window.location.hash = hash;
  });
} // End if
});
});

//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function() {
if ($(this).scrollTop() > 200) {
    if (!fixed) {
	fixed = true;
	// $('#to-top').css({position:'fixed', display:'block'});
	$('#to-top').show("slow", function() {
	    $('#to-top').css({
		position: 'fixed',
		display: 'block'
	    });
	});
    }
} else {
    if (fixed) {
	fixed = false;
	$('#to-top').hide("slow", function() {
	    $('#to-top').css({
		display: 'none'
	    });
	});
    }
}
});
