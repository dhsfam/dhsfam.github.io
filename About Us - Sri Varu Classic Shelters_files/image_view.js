define(['jquery','internal/sitebuilder/common/ModuleClassLoader'],function($,ModuleClassLoader){var module={},extend={};extend.styles={"default":{"global":{"css":"view.less"},"slug":"default"}};if(!extend.styles['default']['global']){extend.styles['default']['global']={};}
extend.styles['default']['global']['js']=null;extend.defaultStyle=extend.styles['default'];module.fancybox={cssPath:webs.props.staticServer+"/static/global/js/fancybox/jquery.fancybox-1.3.4.css",jsPath:webs.props.staticServer+"/static/global/js/fancybox/jquery.fancybox-1.3.4.pack"};var addCCImage=function(parent,events){if(this.data.imageType=='flickr'){try{webs.page.addCCImage({title:this.data.flickr.title,artist:this.data.flickr.ownerName,url:'https://www.flickr.com/photos/'+this.data.flickr.ownerId+'/'+this.data.flickr.photoId},parent,events);}catch(ex){webs.log.error('Unable to create ccImage',this.data,ex);}}};var resizeImageForMobile=function(){var DEFAULT_OUTER_WIDTH=320;var self=this;var frame=self.el.find('.webs-frame').eq(0),img=self.el.find('img'),currentWidth=frame.length>0?frame.outerWidth():img.outerWidth(),contentWidth=self.el.hasClass('webs-container')?self.el.width():self.el.parents('.webs-container').eq(0).width(),widthDelta=currentWidth-contentWidth,wrapper=self.el.find('.webs-image-wrapper-1'),wrapHeight=wrapper.height(),wrapWidth=wrapper.width(),newWidth=wrapWidth-widthDelta,ratio=newWidth/wrapWidth,newHeight=wrapHeight*ratio;if(ratio<1){wrapper.add(img).css({width:newWidth,height:newHeight});}
self.el.addClass('mobile-visible');};if(webs&&webs.theme&&webs.theme.mobile){module.oneLoaded=function(){resizeImageForMobile.call(this);addCCImage.call(this,'#outer .container','touch click');}}else{module.oneLoaded=function(){addCCImage.call(this);if(this.data.linkInfo&&this.data.linkInfo.lightbox&&this.data.linkInfo.enabled){if(!webs.fancybox){try{$("head").append('<link rel="stylesheet" type="text/css" href="'+this.fancybox.cssPath+'"/>');webs.fancybox=true;}catch(ex){webs.log.error("Unable to setup fancybox",this.data,ex);}}
var self=this,href=self.data.rotate!==0?webs.props.imageProcessorServer+'/rotate/'+self.data.rotate+'/'+self.data.url:self.data.url;require({paths:{fancybox:this.fancybox.jsPath}},["fancybox"],function(){self.el.find("a").attr({href:href,title:self.data.linkInfo.caption}).addClass('lightbox-link').fancybox();});}};}
return ModuleClassLoader.register('image',module,extend);});