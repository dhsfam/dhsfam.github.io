define(['jquery','internal/sitebuilder/common/ModuleClassLoader','translate!webs.module.slideshow'],function($,ModuleClassLoader,translate){var module={},extend={};extend.styles={"base":{"global":{"js":"base.view.js"},"slug":"base"},"white":{"name":"White","inherit":"base","global":{"css":"white.view.less","js":"white.view.js"},"default":true,"slug":"white"}};extend.styles['base']['global']['js']=(function(module,extend){$.extend(module,{initBase:function(){if(this.data.side==="none")return;this.thumbsWidth=this.thumbsUl.outerWidth();this.thumbsLeft=this.thumbsUl.position().left;this.thumbsContainerWidth=this.thumbsContainer.width();this.thumbsContainerOffset=this.thumbsContainer.offset().left;if(this.initStyle)this.initStyle();},scrollThumbs:function(e){if(this.data.side==="none")return;var
midPoint=this.data.width/2,pos=(e.clientX-this.thumbsContainerOffset),velocity=(pos-midPoint)/midPoint;this.thumbsWidth=this.thumbsUl.outerWidth();this.thumbsLeft=this.thumbsUl.position().left;this.thumbsContainerWidth=this.thumbsContainer.width();this.thumbsContainerOffset=this.thumbsContainer.offset().left;if(this.thumbsWidth>this.thumbsContainerWidth){var scrollable=this.thumbsContainerWidth-this.thumbsWidth;if(velocity<0&&this.thumbsLeft>=0)this.thumbsUl.css('left',0);else if(velocity>0&&this.thumbsLeft<=scrollable)this.thumbsUl.css('left',scrollable);else{this.thumbsUl.css('left',this.thumbsLeft+velocity*(scrollable*0.02));}}}});return module;});extend.styles['white']['global']['js']=(function(module,extend){$.extend(module,{initStyle:function(){},onPlay:function(restart,duration){},onPause:function(stop){},onReset:function(){}});return module;});extend.defaultStyle=extend.styles['white'];require([webs.props.staticServer+"/active-static/target/internal/sitebuilder/modules/common/transitions.js"]);var slideshowModule={oneLoaded:function(){this.afterLoaded();},afterLoaded:function(){var self=this;$(function(){self.preloadImages();});this.currentSlide=this.el.find(".w-slideshow-current");this.thumbsContainer=this.el.find(".w-slideshow-thumbnails");this.thumbsUl=this.el.find(".w-slideshow-thumbnails-ul");this.thumbsLi=this.el.find(".w-slideshow-thumbnails-li");this.navContainer=this.el.find(".w-slideshow-nav");this.playButton=this.el.find(".w-slideshow-play");this.maxWidth=null;this.scrollThumbsTimer=0;this.scrollTimer=0;this.remainingTime=0;this.startTime=0;this.transitioning=false;this.playing=false;this.slides=[];this.thumbsLi.eq(0).addClass('selected');this.loadSlides();if(this.initBase)this.initBase();if(this.data.autoplay&&this.slides.length>1)this.play(true);this.ready=true;if(this.slides.length<=1){this.el.find('.w-slideshow-thumbnails').addClass('no-scroll');}},events:{"click .w-slideshow-play":"playClick","click .w-slideshow-prev":"prevClick","click .w-slideshow-next":"nextClick","click .w-slideshow-thumbnails .w-slideshow-image_container":"thumbsClick","mousemove .w-slideshow-thumbnails":"thumbsMousemove","mouseleave .w-slideshow-thumbnails":"thumbsMouseleave"},prevClick:function(e){if(this.ready)
this.prev();e.preventDefault();return false;},nextClick:function(e){if(this.ready)
this.next();e.preventDefault();return false;},playClick:function(e){if(this.ready)
this[this.scrollTimer>0?"pause":"play"]();e.preventDefault();return false;},thumbsClick:function(e){if(this.ready){this.stop();this.select($(e.target).parents(".w-slideshow-figure"));}},thumbsMouseleave:function(){if(this.ready){clearInterval(this.scrollThumbsTimer);delete this.scrollThumbsTimer;}},thumbsMousemove:function(e){if(this.ready){var self=this;if(this.scrollThumbsTimer)clearInterval(this.scrollThumbsTimer);this.scrollThumbsTimer=setInterval(function(){self.scrollThumbs(e);},10);}},loadSlides:function(){var self=this;if(this.data.images.length===0){this.resizePlaceholder();return;}
this.slides=[];this.thumbsLi.each(function(i,li){var
$fig=i===0?self.currentSlide.children():$(li).children().clone(),$img=$fig.find("img");self.getImageDimension($img.data("srcLarge")||$img.attr("src"),function(w,h){self.postloadProcess($img,w,h);});if($img.data("srcLarge")){$img.attr("src",$img.data("srcLarge"));}
self.slides[i]=$fig.data("img",$img);});},resizePlaceholder:function(){var $elm=this.el.find(".w-slideshow-resize .bldr-placeholder-element"),height=$elm.parent().height(),padding=$elm.outerHeight()-$elm.height(),self=this;if(height<1)return setTimeout(function(){self.resizePlaceholder();},1000);$elm.css({width:"auto",height:(height-padding)+"px"});},getImageDimension:function(src,fn){var image=$("<img/>");image.load(function(){if(typeof fn==="function")fn(this.width,this.height);}).attr("src",src);if(image[0].complete&&typeof fn==="function"){setTimeout(function(){fn(image[0].width,image[0].height);},1);}},postloadProcess:function($img,_width,_height){var _ratio=_width/_height;var paddingNode=this.currentSlide.find(".w-slideshow-image_container");var widthPadding=paddingNode.outerWidth()-paddingNode.width();var heightPadding=paddingNode.outerHeight()-paddingNode.height();if(!this.maxWidth){this.maxWidth=this.data.width-widthPadding;this.maxHeight=this.data.height-heightPadding;}
var slideRatio=this.maxWidth/this.maxHeight;$img.data("width",_width).data("height",_height).data("ratio",_ratio);var cssObj={};if(_width<this.maxWidth&&_height<this.maxHeight){cssObj.display="inline-block";cssObj.top=parseInt((this.maxHeight-_height)/2,10);}else if(slideRatio>_ratio){cssObj.display="block";cssObj.height=this.maxHeight;cssObj.width=parseInt(this.maxHeight*_ratio,10);}else{cssObj.display="block";cssObj.width="auto";cssObj.height="auto";cssObj.top=parseInt((this.maxHeight-parseInt(this.maxWidth/_ratio,10))/2,10);}
$img.parent().css(cssObj);},scrollThumbs:function(){},select:function(fig,callback){var self=this,newThumb=fig.parent();callback=callback||function(){};if(this.playing)this.stop();if(this.transitioning||newThumb.hasClass('selected')){callback();return false;}
this.currentSlide=this.el.find(".w-slideshow-current");var
oldThumb=this.el.find('.w-slideshow-thumbnails .selected'),oldI=oldThumb.index(),oldFig=this.slides[oldI],slen=oldThumb.siblings().length,newI=newThumb.index(),newFig=this.slides[newI].appendTo(this.currentSlide),transition=webs.transitions[this.data.transition]||webs.transitions.none,invertTransition=(newI<oldI&&!(newI===0&&oldI===slen))||(newI===slen&&oldI===0);oldThumb.removeClass("selected");oldFig.addClass("outgoing");newThumb.addClass("selected");newFig.addClass("incoming");this.transitioning=true;transition(oldFig,newFig,400,invertTransition,function(){self.transitioning=false;oldFig.detach().removeClass("outgoing");newFig.removeClass('incoming').css('z-index','');callback();});if(!this.scrollThumbsTimer){var figLI=fig.parent(),width=this.thumbsContainer.width(),edgeLeft=this.thumbsContainer.offset().left,edgeRight=edgeLeft+width,figLeft=figLI.offset().left,figRight=figLeft+figLI.outerWidth();if(figRight>edgeRight){this.thumbsUl.animate({'left':'-='+(figRight-edgeRight)},100);}else if(figLeft<edgeLeft){this.thumbsUl.animate({'left':'+='+(edgeLeft-figLeft)},100);}}},prev:function(cb){var fig=this.el.find('.selected').prev().children(".w-slideshow-figure");if(fig.length===0){fig=this.el.find('.w-slideshow-thumbnails li:last-child .w-slideshow-figure');}
this.select(fig,cb);},next:function(cb){var fig=this.el.find('.selected').next().children(".w-slideshow-figure");if(fig.length===0){fig=this.el.find('.w-slideshow-thumbnails li:first-child .w-slideshow-figure');}
this.select(fig,cb);},play:function(restart){var self=this;this.el.find('.w-slideshow-play').addClass('w-slideshow-pause').attr('title',translate('webs.module.slideshow.pause'));this.playing=true;this.startTime=new Date();this.remainingTime=this.remainingTime>0?this.remainingTime:this.data.duration;this.scrollTimer=setTimeout(function(){var wasPlaying=self.playing;self.playing=false;self.remainingTime=0;self.next(function(){if(wasPlaying)self.play(true);});},this.remainingTime);if(restart)this.reset();if(this.onPlay)this.onPlay(restart,this.remainingTime);},pause:function(stop){this.el.find('.w-slideshow-play').removeClass('w-slideshow-pause').attr('title',translate('webs.module.slideshow.play'));this.playing=false;clearTimeout(this.scrollTimer);this.scrollTimer=0;this.remainingTime-=new Date()-this.startTime;if(stop){this.remainingTime=0;this.reset();}
if(this.onPause)this.onPause(stop);},stop:function(){return this.pause(true);},reset:function(){if(this.onReset)this.onReset();},preloadImages:function(){this.el.find('.w-slideshow-thumbnails-li img').each(function(){new Image().src=$(this).data('src-large');});}};var mobileSlideshow={events:{"touchstart .w-slideshow-thumbnails ul":"stopMobile"},oneLoaded:function(){this.afterLoaded();var parentHeight=$(".w-slideshow-thumbnails").height();$(".w-slideshow-image").each(function(){var self=$(this);if(self.height()>parentHeight){self.css({"top":(parentHeight-self.height())/2});}});$('.w-slideshow-thumbnails').on('touchmove mousemove',function(e){e.stopPropagation();});},stopMobile:function(){this.stop();this.el.find('.w-slideshow-thumbnails ul').off('touchstart');},next:function(cb){var current=this.el.find('.selected');var next;current.removeClass("selected");if(current.next().length===0){next=this.el.find('.w-slideshow-thumbnails li:first-child');next.addClass("selected");}else{next=current.next();}
next.addClass("selected");this.thumbsContainer.animate({scrollLeft:next.position().left-20},500);cb();}};$.extend(module,slideshowModule);if(webs&&webs.theme&&webs.theme.mobile){$.extend(module,mobileSlideshow);}
return ModuleClassLoader.register('slideshow',module,extend);});