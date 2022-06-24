(function(global){"use strict";var
createElement='createElement',doc=global.document,isProtocolRelativeRx=/^\/\//,head;if(doc){head=doc.head||(doc.head=doc.getElementsByTagName('head')[0]);}
function nameWithExt(name,defaultExt){return name.lastIndexOf('.')<=name.lastIndexOf('/')?name+'.'+defaultExt:name;}
function createLink(doc,href){var link=doc[createElement]('link');link.rel="stylesheet";link.type="text/css";link.href=href;return link;}
function fixProtocol(url,protocol){return url.replace(isProtocolRelativeRx,protocol+'//');}
define('link',{'load':function(resourceId,require,callback,config){var url,link,fix;url=require['toUrl'](nameWithExt(resourceId,'css'));fix='fixSchemalessUrls'in config?config['fixSchemalessUrls']:doc&&doc.location.protocol;url=fix?fixProtocol(url,fix):url;if(!doc){callback(url);}else{link=createLink(doc,url);head.appendChild(link);callback(link.sheet||link.styleSheet);}}});})(this);