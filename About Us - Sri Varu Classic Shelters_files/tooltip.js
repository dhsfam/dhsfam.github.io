define(['jquery','link'],function($){"use strict";require(['link!../../static/projects/finch/css/tooltip'],function(){});$.tooltip=$.fn.tooltip=function tooltip(opts){if(this.jquery){var tooltips=$([]);this.each(function(i,e){tooltips.push(tooltip($.extend({},opts,{"anchor":e}))[0]);});return tooltips;}
opts=$.extend({},{"content":"&nbsp;","style":"info","position":"southeast","offset":[5,5],"anchor":"cursor"},opts);if(typeof opts.anchor==="string"&&opts.anchor!=="cursor"){return $(opts.anchor).tooltip(opts);}
if(opts.anchor.nodeType){opts.anchor=$(opts.anchor);}
var $tt=$("<div></div>").addClass("w-tooltip").html(opts.content).appendTo($("body"));var $tooltipPoint=$("<div class=\"tooltip-tip\"><span class=\"tip\">&nbsp;</span><span class=\"overlay\">&nbsp;</span></div>");if(opts.style){$tt.addClass("w-tooltip-"+opts.style);}
if(opts.hideicon){$tt.addClass("w-tooltip-noicon");}
if(opts.anchor==="cursor"){$tt.css({"position":"fixed"});$("body").bind("mousemove",function(e){if(!$tt.hasClass("active")){return;}
var tooltipRightEdge=parseInt(e.clientX+$tt.width(),10);var current_position=opts.position;if(tooltipRightEdge>($("body").width()/2)+$tt.width()){current_position="southwest";}
if(e.clientY>$("body").height()-$tt.width()*0.75){current_position=current_position.replace("south","north");}
if(current_position.match(/(top|north)/i)){$tt.css({bottom:($(window).height()-e.clientY+opts.offset[1])+"px",top:""});}
else{$tt.css({top:(e.clientY+opts.offset[1])+"px",bottom:""});}
if(current_position.match(/(left|west)/i)){$tt.css({right:($(window).width()-e.clientX+opts.offset[0])+"px",left:""});}
else{$tt.css({left:(e.clientX+opts.offset[0])+"px",right:""});}});}
else if(opts.showTip){$tt.append($tooltipPoint);opts.tipOffset=opts.tipOffset||[0,0];}
$tt.reposition=function reposition(){var newPosition=0;var oldPosition=0;if(opts.anchor==="cursor"){return;}else if(opts.anchor&&opts.anchor.constructor===Array){$tt.css({"position":"absolute"});if(opts.position.match(/(top|north)/i)){$tt.css("bottom",($("body").height()-opts.anchor[1]+opts.offset[1])+"px");}else{$tt.css("top",(opts.anchor[1]+opts.offset[1])+"px");}
if(opts.position.match(/(left|west)/i)){$tt.css("right",($("body").width()-opts.anchor[0]+opts.offset[0])+"px");}else{$tt.css("left",(opts.anchor[0]+opts.offset[0])+"px");}
if(opts.showTip){repositionTip(0,opts);}}else if(opts.anchor&&opts.anchor.jquery){$tt.css({"position":"absolute"});var anchorPosition=opts.anchor.offset();if(opts.position.match(/(top|north)/i)){$tt.css("bottom",($("body").height()-anchorPosition.top+opts.anchor.outerHeight()+opts.offset[1])+"px");}
else{$tt.css("top",(anchorPosition.top+opts.anchor.outerHeight()+opts.offset[1])+"px");}
if(opts.position.match(/(left|west)/i)){$tt.css("right",$("body").width()-anchorPosition.left+opts.offset[0]+"px");}
else if(opts.position.match(/center/i)){$tt.css("left",anchorPosition.left-($tt.outerWidth()/2)+opts.offset[0]+"px");}
else{var minLeft=Math.abs(parseInt($tt.css("margin-left"),10));var maxLeft=$("body").width()-minLeft;newPosition=anchorPosition.left+opts.anchor.outerWidth()+opts.offset[0];oldPosition=newPosition;if(newPosition<minLeft){newPosition=minLeft;}else if(newPosition>maxLeft){newPosition=maxLeft;}
$tt.css("left",newPosition+"px");}
if(opts.showTip){repositionTip(newPosition-oldPosition,opts);}}else{throw(["Unsupported tooltip definition",opts]);}};$tt.updateOffset=function updateOffset(offset){if(opts.offset!==offset){opts.offset=offset;$tt.reposition();}};var repositionTip=function(shiftAmount,opts){var ttWidth=$tt.width(),ttPaddingLeft=parseInt($tt.css("padding-left"),10),anchorLeft=opts.anchor.offset().left,ttLeft=parseInt($tt.css("left"),10),iconWidth=opts.anchor.width(),tipPosition=anchorLeft-ttLeft+(iconWidth/4);if(tipPosition>ttWidth+ttPaddingLeft){tipPosition=ttWidth+ttPaddingLeft;}
$tooltipPoint.css("left",tipPosition+"px");};var windowResizeHandler=function(){$tt.reposition();};$(window).resize(windowResizeHandler);$tt.reposition();return $tt;};return $.tooltip;});