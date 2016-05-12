function mozLive(e){var t=this
return t.defaults={src:null,dest:"self",action:"",task:"replace",tasktarget:null,parameters:{},errors:{maintenance:"We can not process your request right now. Please try again later."}},t.processResult=function(e){if(void 0!==t.options.parameters.callback&&t.options.parameters.callback(e),"refresh"===t.options.task)return void(window.location.href="/m/refresh/")
if("redirect"===t.options.task)return void(void 0!==t.options.parameters.href&&(window.location.href=t.options.parameters.href))
if("redirect-response"==t.options.task)return void(window.location.href=e)
if("replace-html"==t.options.task){var n=document.open("text/html")
return n.write(e),void n.close()}var a=null,o=null
if(null!==t.options.dest&&"self"!==t.options.dest&&(a=t.options.dest),"self"===t.options.dest&&(a=t.options.src),null!=a&&(void 0!==a.id?o=$('[data-cid="'+a.id+'"]'):void 0!==a.name&&(o=$('[data-name="'+a.name+'"]'))),null!=o)switch(t.options.task){case"replace":null==t.options.tasktarget?$(o).replaceWith(e):$(o).find(t.options.tasktarget).replaceWith(e)
break
case"append":$(o).append(e)}},t.run=function(){var e=this
$.ajax({url:"/m/mozlive/",type:"post",data:{action:e.options.action,url:window.location.pathname,src:e.options.src,parameters:e.options.parameters},success:function(t){1==t.error?"maintenance"==t.reason&&alert(e.options.errors.maintenance):e.processResult(t)}})},t.options=$.extend({},this.defaults,e),t.run(),!1}function isSmallTouchDevice(){function e(){return"ontouchstart"in window||"onmsgesturechange"in window}return e()&&(window.screen.width<480||window.screen.height<480)}function initializeMap(e){geocoder=new google.maps.Geocoder
var t=new google.maps.LatLng(e.data("lat"),e.data("lng")),n={center:t,zoom:e.data("zoom"),mapTypeId:google.maps.MapTypeId.ROADMAP,streetViewControl:!0}
map=new google.maps.Map(e.get(0),n),map.setCenter(t)
new google.maps.Marker({map:map,position:t})
return map}function MapApiLoaded(){$(".moze-maps").each(function(){initializeMap($(this))})}function isExternalLinkOrImage(e){var t=RegExp("(http|https)://[^.]+.[^.]+","g"),n=RegExp("^(http|https)://(www.)?(mozello|youtube|facebook|twitter).[a-z]{2,3}(/|$)","g"),a=RegExp("^(http|https)://site-[0-9]+.mozfiles.com","g")
return!e.match(t)||e.match(n)||e.match(a)?!1:!0}function receiveMessage(e){"http://www.mozello.com"==e.origin&&"highlight-links"==e.data&&($(".mz_editable img").each(function(){var e=$(this).attr("src").trim()
isExternalLinkOrImage(e)&&$(this).css("border","4px dotted blue")}),$(".mz_editable a").each(function(){var e=$(this).attr("href").trim()
isExternalLinkOrImage(e)&&($(this).css("border-bottom","4px dotted red"),$(this).find("img").css("border-bottom","4px dotted red"))}))}$(document).ready(function(){function e(e){return e.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")}function t(e){for(var t=0,n=arguments.length;n>t;t++){var a=arguments[t],o=$(a)
if(o.scrollTop()>0)return a
o.scrollTop(1)
var r=o.scrollTop()>0
if(o.scrollTop(0),r)return a}return[]}var n=e(location.pathname),a=t("html","body")
$("a[href*=#]").each(function(){var t=e(this.pathname)||n
if(n==t&&(location.hostname==this.hostname||!this.hostname)&&this.hash.replace(/#/,"")){var o=$(this.hash),r=this.hash
if(r){var i=o.offset().top
$(this).click(function(e){e.preventDefault(),$(a).animate({scrollTop:i},400,function(){location.hash=r})})}}})}),$(document).ready(function(){function e(){if($(".moze-maps").length>0){var e=$("body").attr("lang")
e||(e="en"),$.getScript("http://maps.google.com/maps/api/js?v=3.exp&sensor=false&callback=MapApiLoaded&language="+e,function(){})}}if(!$("body").hasClass("backend")){var t=70,n=!0,a=!1
isSmallTouchDevice()&&(t=5,n=!1,a=!0),$("ul.moze-gallery.pictures li a, .mz_catalog a.fancy").fancybox({padding:0,margin:t,arrows:n,openEffect:"none",closeEffect:"none",afterShow:function(){$("a.fancybox-prev").css("left","-60px"),$("a.fancybox-next").css("right","-60px"),a&&($("a.fancybox-close").css("right","-3px"),$("a.fancybox-close").css("top","-3px"))}})
var o=$("#bigbar-overlay")
o.length&&""==$.trim(o.find(".moze-wysiwyg-editor:visible").text())&&o.css("background-color","transparent")}var r=function(){var e=$(".moze-gallery-overlay").width(),t=parseInt($("body").css("font-size"))
e=Math.min(.09*e,t),$(".moze-gallery-overlay").css("font-size",e)}
r(),$(window).resize(function(){r()}),$("body").hasClass("backend")||e(),$("body").hasClass("backend")||$(".mz_banner").mozbannerplay({})}),window.addEventListener&&window.addEventListener("message",receiveMessage,!1)
