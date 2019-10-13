// Activate Bootstrap tooltips

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


// facilitate share buttons

$(function () {
    $(".share-button").each(function () {
        $(this).attr("href", $(this).attr("href") + "&url=" + document.URL + "&title=" + document.title);
    });
});

$(function() {
  $('.share-toggles').popover({
    //container: 'body',
    html: true,
    trigger: 'focus',
    placement: 'bottom',
    //sanitize: false,
    content: function() {
      var pop_target = $(this).attr("data-popover-content");
      return $(pop_target).children(".popover-content").html();
    }
  });
})

// encode current url to qr-code
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
document.getElementById("url-qr-wrap").innerHTML = svg;
