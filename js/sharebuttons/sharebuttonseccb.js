/*

    Simple social buttons for Mozello
    Written by Karlis Blumentals
    used some parts by Artem Sapegin

*/

function simpleShare(settings) {

    var base = this;

    base.defaults = {
        url: window.location.href.replace(window.location.hash, ''),
        title: document.title,
        media: $('meta[property="og:image"]').length ? $('meta[property="og:image"]').attr('content') : '',
        showLabels: true,
        showCount: true
    };

    base.options = $.extend({}, base.defaults, settings);

    var services = {
        facebook: {
            counterFunction: function(elem) {
                var apiUrl = 'https://api.facebook.com/method/links.getStats?urls={url}&format=json';
                var url = makeUrl(apiUrl, {
                    url: base.options.url
                });
                $.getJSON(url, function(data) {
                    addShareCount(elem, data[0].total_count);
                });
            },
            popupUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
            popupWidth: 600,
            popupHeight: 500
        },
        twitter: {
            popupUrl: 'https://twitter.com/intent/tweet?url={url}&text={title}',
            popupWidth: 600,
            popupHeight: 450
        },
        draugiem: {
            counterFunction: function(elem) {
                var apiUrl = 'https://www.draugiem.lv/say/ext/like_count.php?callback=?&url={url}';
                var url = makeUrl(apiUrl, {
                    url: base.options.url
                });
                $.getJSON(url, function(data) {
                    addShareCount(elem, data.count);
                });
            },
            popupUrl: 'https://www.draugiem.lv/say/ext/add.php?title={title}&link={url}&_n=1',
            popupWidth: 530,
            popupHeight: 400
        },
        vkontakte: {
            counterFunction: function(elem) {
                var apiUrl = 'https://vk.com/share.php?act=count&url={url}&index=1&callback=?';
                var url = makeUrl(apiUrl, {
                    url: base.options.url
                });
                // call api
                $.getJSON(url, function(data) {});
                // create VK object
                if (!window.VK) window.VK = {};
                window.VK.Share = {
                    count: function(idx, number) {
                        addShareCount(elem, number);
                    }
                }
            },
            popupUrl: 'https://vk.com/share.php?url={url}&title={title}',
            popupWidth: 550,
            popupHeight: 330
        },
        gplus: {
            popupUrl: 'https://plus.google.com/share?url={url}',
            popupWidth: 550,
            popupHeight: 500
        },
        pinterest: {
            counterFunction: function(elem) {
                var apiUrl = 'https://api.pinterest.com/v1/urls/count.json?callback=pinterestCounter&url={url}';
                var url = makeUrl(apiUrl, {
                    url: base.options.url
                });
                // call api
                $.getScript(url, function(data) {});
                // create pinterest callback
                window.pinterestCounter = function(json) {
                    addShareCount(elem, json.count);
                }
            },
            popupUrl: 'https://pinterest.com/pin/create/button/?url={url}&media={media}&description={title}',
            popupWidth: 630,
            popupHeight: 270
        }
    };

    function initButtons() {
        $('.ssb-container > a').each(function(){
            var service = $(this).data('service');
            var network = services[service];
            var name = $(this).attr('title');
            $(this).addClass('flat-' + service);
            if (base.options.showLabels) {
                $('<span class="ssb-label">' + name + '</span>').appendTo(this);
            }
            if (base.options.showCount) {
                $('<span class="ssb-counter"></span>').appendTo(this);
                // Share count
                if (network.counterFunction) {
                    network.counterFunction(this);
                }
            }
            // Sharing
            $(this).click(function(event) {
                event.preventDefault();
                var url = makeUrl(network.popupUrl, {
                    url: base.options.url,
                    title: base.options.title,
                    media: base.options.media
                });
                openPopup(url, this, network, {
                    width: network.popupWidth,
                    height: network.popupHeight
                });
                return false;
            });
        });
    }

    function addShareCount(elem, count) {
        if (count > 0) {
            $(elem).find('.ssb-counter').html(count);
        }
    }

    function makeUrl(url, context) {
        return template(url, context, encodeURIComponent);
    }

    function template(tmpl, context, filter) {
        return tmpl.replace(/\{([^\}]+)\}/g, function(m, key) {
            // If key doesn't exists in the context we should keep template tag as is
            return key in context ? (filter ? filter(context[key]) : context[key]) : m;
        });
    }

    function openPopup(url, elem, network, params) {
        var left = Math.round(screen.width/2 - params.width/2);
        var top = 0;
        if (screen.height > params.height) {
            top = Math.round(screen.height/3 - params.height/2);
        }
        var win = window.open(url, 'popup', 'left=' + left + ',top=' + top + ',' +
           'width=' + params.width + ',height=' + params.height + ',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
        if (win) {
            win.focus();
            var timer = setInterval($.proxy(function() {
                    if (!win.closed) return;
                    clearInterval(timer);
                    if (base.options.showCount) {
                        // Update count
                        if (network.counterFunction) {
                            network.counterFunction(elem);
                        }
                    }
            }, this), 1000);
        } else {
            location.href = url;
        }
    }

    function loadRelativeCss(jssrc, cssfile) {
        var src = jssrc.substring(0, jssrc.lastIndexOf("\/") + 1);
        var cssLink = $('<link rel="stylesheet" type="text/css" href="' + src + cssfile + '">');
        $("head").append(cssLink);
    };

    loadRelativeCss(sharebutton_src, 'sharebuttons.css');
    initButtons();

    return false;

}

// For dynamic CSS loading - this must be global
var scripts = document.getElementsByTagName("script"),
sharebutton_src = scripts[scripts.length-1].src;