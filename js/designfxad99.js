$(document).ready(function () {

    // Opens Gallery Pictures in a Fancybox.

    if (!$('body').hasClass('backend')) {
        var margin = 70;
        var show_arrows = true;
        var inside_close = false;
        if (isSmallTouchDevice()) {
            margin = 5;
            show_arrows = false;
            inside_close = true;
        }
        $('ul.moze-gallery.pictures li a, .mz_catalog a.fancy').fancybox({
            padding: 0,
            margin: margin,
            arrows: show_arrows,
            openEffect: 'none',
            closeEffect: 'none',
            // make prettier
            afterShow: function() {
                $('a.fancybox-prev').css('left', '-60px');
                $('a.fancybox-next').css('right', '-60px');
                if (inside_close) {
                    $('a.fancybox-close').css('right', '-3px');
                    $('a.fancybox-close').css('top', '-3px');
                }

            }
        });

        // Removes overlay if it is empty
        var olay = $('#bigbar-overlay')
        if (olay.length) {
            if ($.trim(olay.find('.moze-wysiwyg-editor:visible').text()) == '') {
                olay.css('background-color', 'transparent');
            }
        }
    }

    // Adjusts the title font size for images.

    var adjustFont = function () {
        var fontSize = $('.moze-gallery-overlay').width();
        var maxSize = parseInt($('body').css('font-size'));
        fontSize = Math.min(fontSize * 0.09, maxSize);
        $('.moze-gallery-overlay').css('font-size', fontSize);
    };

    adjustFont();
    $(window).resize(function () {
        adjustFont();
    });

    // Add Google Maps.

    function processMaps() {
        if ($('.moze-maps').length > 0) {
            var doc_lang = $('body').attr('lang');
            if (!doc_lang) {
                doc_lang = 'en';
            }
            $.getScript("http://maps.google.com/maps/api/js?v=3.exp&sensor=false&callback=MapApiLoaded&language=" + doc_lang, function () { });
        }
    }

    if (!$('body').hasClass('backend')) {
        processMaps();
    }

    // Loads MozBanner.

    if (!$('body').hasClass('backend')) {
        $('.mz_banner').mozbannerplay({});
    }

});

// Mobile detection

/* Detect mobiles */
function isSmallTouchDevice() {

    function isTouchDevice() {
      return 'ontouchstart' in window // works on most browsers
          || 'onmsgesturechange' in window; // works on ie10, mostly
    };

    return (isTouchDevice() && (window.screen.width < 480 || window.screen.height < 480));
}

// Google Maps stuff.

function initializeMap(jqelem) {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(jqelem.data('lat'), jqelem.data('lng'));
    var mapOptions = {
        center: latlng,
        zoom: jqelem.data('zoom'),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: true
    }
    map = new google.maps.Map(jqelem.get(0), mapOptions);
    map.setCenter(latlng);
    var marker = new google.maps.Marker({
        map: map,
        position: latlng
    });
    return map;
}

function MapApiLoaded() {
    $('.moze-maps').each(function () {
        initializeMap($(this));
    });
}

// Internal Mozello stuff

if (window.addEventListener) {
    window.addEventListener("message", receiveMessage, false);
}


function isExternalLinkOrImage(url) {
    var general_urls = new RegExp("(http|https)\:\/\/[^\.]+.[^\.]+", "g");
    var exclude_urls = new RegExp("^(http|https)\:\/\/(www\.)?(mozello|youtube|facebook|twitter)\.[a-z]{2,3}(\/|$)", "g");
    var content_urls = new RegExp("^(http|https)\:\/\/site\-[0-9]+\.mozfiles\.com", "g");
    if (url.match(general_urls) && !url.match(exclude_urls) && !url.match(content_urls)) {
        return true;
    }
    return false;
}

function receiveMessage(event)
{
    if (event.origin == "http://www.mozello.com") {
        if (event.data == 'highlight-links') {
            $('.mz_editable img').each(function () {
                var url = $(this).attr('src').trim();
                if (isExternalLinkOrImage(url)) {
                    $(this).css('border', '4px dotted blue');
                }
            });
            $('.mz_editable a').each(function () {
                var url = $(this).attr('href').trim();
                if (isExternalLinkOrImage(url)) {
                    $(this).css('border-bottom', '4px dotted red');
                    $(this).find('img').css('border-bottom', '4px dotted red');
                }
            });
        }
    }
}

/* End */