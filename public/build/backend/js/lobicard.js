!function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/build/",e(e.s="6gqc")}({"6gqc":function(module,exports){var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};Math.randomString=function(t){for(var e="",i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<t;n++)e+=i.charAt(Math.floor(Math.random()*i.length));return e},String.prototype.getCss=function(){for(var t={},e=this.valueOf().split(";"),i=0;i<e.length;i++)if(e[i]=$.trim(e[i]),e[i]){var n=e[i].split(":");t[$.trim(n[0])]=$.trim(n[1])}return t},String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")},String.prototype.toCamel=function(){return this.replace(/(\-[a-z])/g,function(t){return t.toUpperCase().replace("-","")})},String.prototype.toDash=function(){return this.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})},String.prototype.toUnderscore=function(){return this.replace(/([A-Z])/g,function(t){return"_"+t.toLowerCase()})},Number.prototype.isBetween=function(t,e,i){if(i){if(this.valueOf()<=e&&this.valueOf()>=t)return!0}else if(this.valueOf()<e&&this.valueOf()>t)return!0;return!1},$.fn.insertAt=function(t,e){var i=e;if("string"==typeof e&&(i=$(e)),0==(t=Math.min(i.children().length,t)))return i.prepend(this),this;var n=this.data("index");return this.attr("data-index",t),i.find(">*:nth-child("+t+")").after(this),i.children().each(function(e,i){var a=$(i);n<t&&e>n&&e<=t?a.attr("data-index",parseInt(a.data("data-index"),10)-1):n>=t&&e>t&&e<=n&&a.attr("data-index",parseInt(a.attr("data-index"),10)+1)}),this},$.fn.disableSelection=function(){return this.attr("unselectable","on").css("user-select","none").on("selectstart",!1)},$.fn.enableSelection=function(){return this.removeAttr("unselectable").css("user-select","initial").off("selectstart")},$(function(){var STORAGE_PREFIX="lobicard_",LobiCard=function(t,e){var i=this;this.hasRandomId=!1,this.storage=null,this.$el=t,i.$el.data("inner-id")||(i.hasRandomId=!0,i.$el.attr("data-inner-id",Math.randomString(10))),this.innerId=i.$el.data("inner-id"),this.$options=i._processInput(e),i.$heading=this.$el.find(">.card-header"),i.$body=this.$el.find(">.card-body"),i._init(),i.$el.css("display","none"),i._applyState(i.$options.state,i.$options.stateParams),i.$el.css("display","block"),i._applyIndex(i.$options.initialIndex)};LobiCard.prototype={_processInput:function(t){var e=this;t||(t={}),e.hasRandomId||(e.storage=localStorage.getItem(STORAGE_PREFIX+e.innerId),e.storage=JSON.parse(e.storage)||{});var i=e._getOptionsFromAttributes();t=$.extend({},$.fn.lobiCard.DEFAULTS,e.storage,t,i);for(var n=["unpin","reload","expand","minimize","close","editTitle"],a=0;a<n.length;a++){var o=n[a];"object"===_typeof(t[o])&&(t[o]=$.extend({},$.fn.lobiCard.DEFAULTS[o],t[o],i[o]))}return t},_init:function(){var t=this;t.$el.addClass("lobicard"),t.$heading.append(t._generateControls());var e=t.$el.parent();t._appendInnerIdToParent(e,t.innerId),t._enableSorting(),t._onToggleIconsBtnClick(),t._enableResponsiveness(),t._setBodyHeight(),t.$options.autoload&&t.load();var i="calc(100% - "+t.$heading.find(".dropdown-menu").children().length*t.$heading.find(".dropdown-menu li").first().outerWidth()+"px)";t.$heading.find(".card-title").css("max-width",i),t._triggerEvent("init")},isCardInit:function(){var t=this;return t.$el.hasClass("lobicard")&&t.$el.data("inner-id")},isPinned:function(){return!this.$el.hasClass("card-unpin")},pin:function(){var t=this;return t.disableResize(),t.disableDrag(),t._enableSorting(),t._offCardClick(),t.$el.removeClass("card-unpin").attr("old-style",t.$el.attr("style")).removeAttr("style").css("position","relative"),t.$body.css({width:"",height:""}),t._setBodyHeight(),t._insertInParent(),t},unpin:function(){var t=this;if(t.$el.hasClass("card-collapsed"))return t;if(t._disableSorting(),t.$el.attr("old-style"))t.$el.attr("style",t.$el.attr("old-style"));else{var e=t.$el.width(),i=t.$el.height(),n=Math.max(0,($(window).width()-t.$el.outerWidth())/2),a=Math.max(0,$(document).scrollTop()+($(window).height()-t.$el.outerHeight())/2);t.$el.css({left:n,top:a,width:e,height:i})}var o=t._getMaxZIndex();t.$el.css("z-index",o["z-index"]+1),t._onCardClick(),t.$el.addClass("card-unpin"),$("body").append(t.$el);var r=t._getAvailableWidth(t.$el.width()),l=t._getAvailableHeight(t.$el.height());t.$el.css({position:"absolute",width:r,height:l});var s=t._calculateBodyHeight(l),d=t._calculateBodyWidth(r);return t.$body.css({width:d,height:s}),t.$options.draggable&&t.enableDrag(),"none"!==t.$options.resize&&t.enableResize(),t},togglePin:function(){var t=this;return this.isPinned()?this.unpin():this.pin(),t},isMinimized:function(){var t=this;return t.$el.hasClass("card-minimized")||t.$el.hasClass("card-collapsed")},minimize:function(){var t=this;if(t._triggerEvent("beforeMinimize"),t.isMinimized())return t;if(t.isPinned())t.$body.slideUp(),t.$el.find(".card-footer").slideUp(),t.$el.addClass("card-collapsed"),t._saveState("collapsed"),t._changeClassOfControl(t.$heading.find('[data-func="minimize"]'));else{t.disableTooltips();var e,i,n=t._getFooterForMinimizedCards(),a=n.find(">*");if(i=n.offset().top,0===a.length)e=n.offset().left;else{var o=$(a[a.length-1]);e=o.offset().left+o.width()}t.$el.hasClass("card-expanded")||t.$el.attr("old-style",t.$el.attr("style")),t.$el.animate({left:e,top:i,width:200,height:n.height()},100,function(){t.$el.hasClass("card-expanded")&&(t.$el.removeClass("card-expanded"),t.$el.find('.card-header [data-func="expand"] .'+LobiCard.PRIVATE_OPTIONS.iconClass).removeClass(t.$options.expand.icon2).addClass(t.$options.expand.icon)),t.$el.addClass("card-minimized"),t.$el.removeAttr("style"),t.disableDrag(),t.disableResize(),t._expandOnHeaderClick(),n.append(t.$el),$("body").addClass("lobicard-minimized");var e="calc(100% - "+t.$heading.find(".dropdown-menu li>a:visible").length*t.$heading.find(".dropdown-menu li>a:visible").first().outerWidth()+"px)";t.$heading.find(".card-title").css("max-width",e),t._saveState("minimized"),t._triggerEvent("onMinimize")})}return t},maximize:function(){var t=this;if(t._triggerEvent("beforeMaximize"),!t.isMinimized())return t;if(t.isPinned())t.$body.slideDown(),t.$el.find(".card-footer").slideDown(),t.$el.removeClass("card-collapsed"),t._saveState("pinned"),t._changeClassOfControl(t.$heading.find('[data-func="minimize"]'));else{t.enableTooltips();var e=t.$el.attr("old-style").getCss();t.$el.css({position:e.position||"fixed","z-index":e["z-index"],left:t.$el.offset().left,top:t.$el.offset().top,width:t.$el.width(),height:t.$el.height()}),$("body").append(t.$el),delete e.position,delete e["z-index"],t.$el.animate(e,100,function(){t.$el.css("position",""),t.$el.removeClass("card-minimized"),t.$el.removeAttr("old-style"),t.$options.draggable&&t.enableDrag(),t.enableResize(),t._removeExpandOnHeaderClick();var e=t._getFooterForMinimizedCards();0===e.children().length&&e.remove(),$("body").removeClass("lobicard-minimized").addClass("lobicard-minimized");var i="calc(100% - "+t.$heading.find(".dropdown-menu li").length*t.$heading.find(".dropdown-menu li").first().outerWidth()+"px)";t.$heading.find(".card-title").css("max-width",i),t._updateUnpinnedState(),t._triggerEvent("onMaximize")})}return t},toggleMinimize:function(){var t=this;return t.isMinimized()?t.maximize():t.minimize(),t},isOnFullScreen:function(){return this.$el.hasClass("card-expanded")},toFullScreen:function(){var t=this;if(t._triggerEvent("beforeFullScreen"),t.$el.hasClass("card-collapsed"))return t;t._changeClassOfControl(t.$heading.find('[data-func="expand"]')),t.$el.css("position","fixed");var e=t._getMaxZIndex();if(t.isPinned()||t.isMinimized()){t.enableTooltips(),t.$el.css({"z-index":e["z-index"]+1,left:t.$el.offset().left,top:t.$el.offset().top-$(window).scrollTop(),width:t.$el.width(),height:t.$el.height()}),$("body").append(t.$el);var i=t._getFooterForMinimizedCards();0===i.children().length&&i.remove()}else t.$body.css({width:"",height:""}),t._setBodyHeight();t.isMinimized()?(t.$el.removeClass("card-minimized"),t._removeExpandOnHeaderClick()):(t.$el.attr("old-style",t.$el.attr("style")),t.disableResize());var n=$("."+LobiCard.PRIVATE_OPTIONS.toolbarClass),a=n.outerHeight()||0;return t.$el.animate({width:$(window).width(),height:$(window).height()-a,left:0,top:0},t.$options.expandAnimation,function(){t.$el.css({width:"",height:"",right:0,bottom:a}),t.$el.addClass("card-expanded"),$("body").css("overflow","hidden"),t.$body.css({width:t._calculateBodyWidth(t.$el.width()),height:t._calculateBodyHeight(t.$el.height())}),t.disableDrag(),t.isPinned()&&t._disableSorting(),t._saveState("fullscreen"),t._triggerEvent("onFullScreen")}),t},toSmallSize:function(){var t=this;t._triggerEvent("beforeSmallSize"),t._changeClassOfControl(t.$heading.find('[data-func="expand"]'));var e=t.$el.attr("old-style").getCss();return t.$el.animate({position:"absolute",left:e.left,top:e.top,width:e.width,height:e.height,right:e.right,bottom:e.bottom},t.$options.collapseAnimation,function(){t.$el.removeAttr("old-style"),t.$el.hasClass("card-unpin")?(t.$options.draggable&&t.enableDrag(),t.enableResize()):(t.$el.removeAttr("style"),t._insertInParent(),t._enableSorting()),t.$el.removeClass("card-expanded"),$("body").css("overflow","auto");var e="",i="";t.isPinned()?"auto"!==t.$options.bodyHeight&&(i=t.$options.bodyHeight):(e=t._calculateBodyWidth(t.getWidth()),i=t._calculateBodyHeight(t.getHeight())),"auto"!==t.$options.bodyHeight?t._saveState("pinnned"):t._updateUnpinnedState(),t.$body.css({width:e,height:i}),t._triggerEvent("onSmallSize")}),t},toggleSize:function(){var t=this;return t.isOnFullScreen()?t.toSmallSize():t.toFullScreen(),t},close:function(t){var e=this,t=void 0===t?100:t;return e._triggerEvent("beforeClose"),e.$el.hide(t,function(){e.isOnFullScreen()&&$("body").css("overflow","auto"),e._triggerEvent("onClose"),e.$el.remove();var t=e._getFooterForMinimizedCards();0===t.children().length&&t.remove()}),e},setPosition:function(t,e,i){var n=this,i=void 0===i?100:i;return n.isPinned()?n:(n.$el.animate({left:t,top:e},i),n)},setWidth:function(t,e){var i=this,e=void 0===e?100:e;if(i.isPinned())return i;var n=i._calculateBodyWidth(t);return i.$el.animate({width:t},e),i.$body.animate({width:n},e),i},setHeight:function(t,e){var i=this,e=void 0===e?100:e;if(i.isPinned())return i;var n=i._calculateBodyHeight(t);return i.$el.animate({height:t},e),i.$body.animate({height:n},e),i},setSize:function(t,e,i){var n=this,i=void 0===i?100:i;if(n.isPinned())return n;var a=n._calculateBodyHeight(e),o=n._calculateBodyWidth(t);return n.$el.animate({height:e,width:t},i),n.$body.animate({height:a,width:o},i),n},getPosition:function(){var t=this,e=t.$el.offset();return{x:e.left,y:e.top}},getWidth:function(){return this.$el.width()},getHeight:function(){return this.$el.height()},bringToFront:function(){var t=this;t._triggerEvent("beforeToFront");var e=t._getMaxZIndex();return e.id===t.$el.data("inner-id")?t:(t.$el.css("z-index",e["z-index"]+1),t._triggerEvent("onToFront"),t)},enableDrag:function(){var t=this;return t.$el.draggable({handle:".card-header",containment:t.$options.constrain,start:function(){t.$el.css("position","absolute")},stop:function(){t.$el.css("position",""),t._updateUnpinnedState()}}),t},disableDrag:function(){var t=this;return t.$el.hasClass("ui-draggable")&&t.$el.draggable("destroy"),t},enableResize:function(){var t=this,e=!1;return"vertical"===t.$options.resize?e="n, s":"horizontal"===t.$options.resize?e="e, w":"both"===t.$options.resize&&(e="all"),e?(t.$el.resizable({minWidth:t.$options.minWidth,maxWidth:t.$options.maxWidth,minHeight:t.$options.minHeight,maxHeight:t.$options.maxHeight,handles:e,start:function(){t.$el.disableSelection(),t._triggerEvent("resizeStart")},stop:function(){t.$el.enableSelection(),t._triggerEvent("resizeStop")},resize:function(){var e=t._calculateBodyHeight(t.$el.height()),i=t._calculateBodyWidth(t.$el.width());t.$body.css({width:i,height:e}),t._updateUnpinnedState(),t._triggerEvent("onResize")}}),t):t},disableResize:function(){var t=this;return t.$el.hasClass("ui-resizable")&&t.$el.resizable("destroy"),t},startLoading:function(){var t=this,e=t._generateWindow8Spinner();return t.$el.append(e),e.find(".spinner").css("margin-top",50),t},stopLoading:function(){var t=this;return t.$el.find(".spinner-wrapper").remove(),t},setLoadUrl:function(t){var e=this;return e.$options.loadUrl=t,e},load:function(t){var e=this;"string"==typeof(t=t||{})&&(t={url:t});var i=t.url||e.$options.loadUrl,n=t.data||"",a=t.callback||null;return i?(e._triggerEvent("beforeLoad"),e.startLoading(),e.$body.load(i,n,function(t,i,n){a&&"function"==typeof a&&e.callback(t,i,n),e.stopLoading(),e._triggerEvent("loaded",t,i,n)}),e):e},destroy:function(){var t=this;return t.disableDrag(),t.disableResize(),t.$options.sortable=!1,t._enableSorting(),t._removeInnerIdFromParent(t.innerId),t.$el.removeClass("lobicard").removeAttr("data-inner-id").removeAttr("data-index").removeData("lobiCard"),t.$heading.find(".dropdown").remove(),t.$el},startTitleEditing:function(){var t=this,e=t.$heading.find(".card-title").html().trim(),i=$('<input value="'+e+'"/>');return i.on("keydown",function(e){13===e.which?t.finishTitleEditing():27===e.which&&t.cancelTitleEditing()}),t.$heading.find(".card-title").data("old-title",e).html("").append(i),i[0].focus(),i[0].select(),t._changeClassOfControl(t.$heading.find('[data-func="editTitle"]')),t},isTitleEditing:function(){return this.$heading.find(".card-title input").length>0},cancelTitleEditing:function(){var t=this,e=t.$heading.find(".card-title");return e.html(e.data("old-title")).find("input").remove(),t._changeClassOfControl(t.$heading.find('[data-func="editTitle"]')),t},finishTitleEditing:function(){var t=this,e=t.$heading.find("input");return!1===t._triggerEvent("beforeTitleChange",e.val())?t:(t.$heading.find(".card-title").html(e.val()),e.remove(),t._changeClassOfControl(t.$heading.find('[data-func="editTitle"]')),t._triggerEvent("onTitleChange",e.val()),t)},enableTooltips:function(){var t=this;if($(window).width()<768)return t;var e=t.$heading.find(".dropdown-menu>li>a");return e.each(function(t,e){var i=$(e);i.attr("data-toggle","tooltip").attr("data-title",i.data("tooltip")).attr("data-placement","bottom")}),e.each(function(t,e){$(e).tooltip({container:"body",template:'<div class="tooltip lobicard-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'})}),t},disableTooltips:function(){var t=this;return t.$heading.find(".dropdown-menu>li>a").each(function(t,e){$(e).data("bs.tooltip")&&$(e).tooltip("dispose")}),t},_generateControls:function(){var t=this,e=t._generateDropdown(),i=e.find(".dropdown-menu");return!1!==t.$options.editTitle&&i.append(t._generateEditTitle()),!1!==t.$options.unpin&&i.append(t._generateUnpin()),!1!==t.$options.reload&&i.append(t._generateReload()),!1!==t.$options.minimize&&i.append(t._generateMinimize()),!1!==t.$options.expand&&i.append(t._generateExpand()),!1!==t.$options.close&&i.append(t._generateClose()),i.find(">li>a").on("click",function(t){t.preventDefault(),t.stopPropagation()}),e},_generateDropdown:function(){var t=this;return $('<div class="dropdown"></div>').append('<ul class="dropdown-menu dropdown-menu-right"></ul>').append('<div class="dropdown-toggle" data-toggle="dropdown"><span class="'+LobiCard.PRIVATE_OPTIONS.iconClass+" "+t.$options.toggleIcon+'"></div>')},_generateEditTitle:function(){var t=this,e=t.$options.editTitle,i=$('<a data-func="editTitle"></a>');return i.append('<i class="'+LobiCard.PRIVATE_OPTIONS.iconClass+" "+e.icon+'"></i>'),e.tooltip&&"string"==typeof e.tooltip&&(i.append('<span class="control-title">'+e.tooltip+"</span>"),i.attr("data-tooltip",e.tooltip)),t._attachEditTitleClickListener(i),$("<li></li>").append(i)},_attachEditTitleClickListener:function(t){var e=this;t.on("mousedown",function(t){t.stopPropagation()}),t.on("click",function(i){i.stopPropagation(),e.hideTooltip(t),e.isTitleEditing()?e.finishTitleEditing():e.startTitleEditing()})},hideTooltip:function(t){return t.data("bs.tooltip")&&t.tooltip("hide"),this},_generateUnpin:function(){var t=this,e=t.$options.unpin,i=$('<a data-func="unpin"></a>');return i.append('<i class="'+LobiCard.PRIVATE_OPTIONS.iconClass+" "+e.icon+'"></i>'),e.tooltip&&"string"==typeof e.tooltip&&(i.append('<span class="control-title">'+e.tooltip+"</span>"),i.attr("data-tooltip",e.tooltip)),t._attachUnpinClickListener(i),$("<li></li>").append(i)},_attachUnpinClickListener:function(t){var e=this;t.on("mousedown",function(t){t.stopPropagation()}),t.on("click",function(){e.hideTooltip(t),e.doTogglePin()})},_generateReload:function(){var t=this,e=t.$options.reload,i=$('<a data-func="reload"></a>');return i.append('<i class="'+LobiCard.PRIVATE_OPTIONS.iconClass+" "+e.icon+'"></i>'),e.tooltip&&"string"==typeof e.tooltip&&(i.append('<span class="control-title">'+e.tooltip+"</span>"),i.attr("data-tooltip",e.tooltip)),t._attachReloadClickListener(i),$("<li></li>").append(i)},_attachReloadClickListener:function(t){var e=this;t.on("mousedown",function(t){t.stopPropagation()}),t.on("click",function(){e.hideTooltip(t),e.load()})},_generateMinimize:function(){var t=this,e=t.$options.minimize,i=$('<a data-func="minimize"></a>');return i.append('<i class="'+LobiCard.PRIVATE_OPTIONS.iconClass+" "+e.icon+'"></i>'),e.tooltip&&"string"==typeof e.tooltip&&(i.append('<span class="control-title">'+e.tooltip+"</span>"),i.attr("data-tooltip",e.tooltip)),t._attachMinimizeClickListener(i),$("<li></li>").append(i)},_attachMinimizeClickListener:function(t){var e=this;t.on("mousedown",function(t){t.stopPropagation()}),t.on("click",function(i){i.stopPropagation(),e.hideTooltip(t),e.toggleMinimize()})},_generateExpand:function(){var t=this,e=t.$options.expand,i=$('<a data-func="expand"></a>');return i.append('<i class="'+LobiCard.PRIVATE_OPTIONS.iconClass+" "+e.icon+'"></i>'),e.tooltip&&"string"==typeof e.tooltip&&(i.append('<span class="control-title">'+e.tooltip+"</span>"),i.attr("data-tooltip",e.tooltip)),t._attachExpandClickListener(i),$("<li></li>").append(i)},_attachExpandClickListener:function(t){var e=this;t.on("mousedown",function(t){t.stopPropagation()}),t.on("click",function(i){i.stopPropagation(),e.hideTooltip(t),e.toggleSize()})},_generateClose:function(){var t=this,e=t.$options.close,i=$('<a data-func="close"></a>');return i.append('<i class="'+LobiCard.PRIVATE_OPTIONS.iconClass+" "+e.icon+'"></i>'),e.tooltip&&"string"==typeof e.tooltip&&(i.append('<span class="control-title">'+e.tooltip+"</span>"),i.attr("data-tooltip",e.tooltip)),t._attachCloseClickListener(i),$("<li></li>").append(i)},_attachCloseClickListener:function(t){var e=this;t.on("mousedown",function(t){t.stopPropagation()}),t.on("click",function(i){i.stopPropagation(),e.hideTooltip(t),e.close()})},_getMaxZIndex:function(){var t,e,i,n=$(".lobicard.card-unpin:not(.card-minimized.card-expanded)");if(0===n.length)return{id:"","z-index":LobiCard.PRIVATE_OPTIONS.initialZIndex};t=$(n[0]).attr("style");var a=$(n[0]).data("inner-id");e=t?t.getCss()["z-index"]:LobiCard.PRIVATE_OPTIONS.initialZIndex;for(var o=1;o<n.length;o++)t=$(n[o]).attr("style"),(i=t?t.getCss()["z-index"]:0)>e&&(a=$(n[o]).data("inner-id"),e=i);return{id:a,"z-index":parseInt(e,10)}},_onCardClick:function(){var t=this;t.$el.on("mousedown.lobiCard",function(){if(t.isPinned()||t.isMinimized()||t.isOnFullScreen())return!1;t.bringToFront()})},_offCardClick:function(){this.$el.off("mousedown.lobiCard")},_changeClassOfControl:function(t){var e=this;t=$(t);var i=e.$options[t.attr("data-func")];i.icon&&t.find("."+LobiCard.PRIVATE_OPTIONS.iconClass).toggleClass(i.icon).toggleClass(i.icon2)},_getFooterForMinimizedCards:function(){var t=$("."+LobiCard.PRIVATE_OPTIONS.toolbarClass);return 0===t.length&&(t=$('<div class="'+LobiCard.PRIVATE_OPTIONS.toolbarClass+'"></div>'),$("body").append(t)),t},_expandOnHeaderClick:function(){var t=this;t.$heading.on("click.lobiCard",function(){t.maximize(),t.bringToFront()})},_removeExpandOnHeaderClick:function(){this.$heading.off("click.lobiCard")},_getAvailableWidth:function(t){var e=this;return e.$options.maxWidth&&(t=Math.min(t,e.$options.maxWidth)),e.$options.minWidth&&(t=Math.max(t,e.$options.minWidth)),t},_getAvailableHeight:function(t){var e=this;return e.$options.maxHeight&&(t=Math.min(t,e.$options.maxHeight)),e.$options.minHeight&&(t=Math.max(t,e.$options.minHeight)),t},_calculateBodyHeight:function(t){var e=this;return t-e.$heading.outerHeight()-e.$el.find(".card-footer").outerHeight()},_calculateBodyWidth:function(t){return t-2},_appendInnerIdToParent:function(t,e){var i=this;if(void 0===t.attr(LobiCard.PRIVATE_OPTIONS.parentAttr))t.attr(LobiCard.PRIVATE_OPTIONS.parentAttr,e);else{if(t.attr(LobiCard.PRIVATE_OPTIONS.parentAttr).indexOf(e)>-1)return;var n=t.attr(LobiCard.PRIVATE_OPTIONS.parentAttr);t.attr(LobiCard.PRIVATE_OPTIONS.parentAttr,n+" "+e)}i.$el.attr("data-index",i.$el.index())},_insertInParent:function(){var t=this,e=$("["+LobiCard.PRIVATE_OPTIONS.parentAttr+"~="+t.innerId+"]");t.$el.insertAt(t.$el.attr("data-index"),e)},_generateWindow8Spinner:function(){var t=['<div class="spinner spinner-windows8">','<div class="wBall">','<div class="wInnerBall">',"</div>","</div>",'<div class="wBall">','<div class="wInnerBall">',"</div>","</div>",'<div class="wBall">','<div class="wInnerBall">',"</div>","</div>",'<div class="wBall">','<div class="wInnerBall">',"</div>","</div>",'<div class="wBall">','<div class="wInnerBall">',"</div>","</div>","</div>"].join("");return $('<div class="spinner-wrapper">'+t+"</div>")},_enableSorting:function(){var t=this,e=t.$el.parent();e.hasClass("ui-sortable")&&e.sortable("destroy"),t.$options.sortable?(t.$el.addClass("lobicard-sortable"),e.addClass("lobicard-parent-sortable")):t.$el.removeClass("lobicard-sortable"),e.sortable({connectWith:".lobicard-parent-sortable",items:".lobicard-sortable",handle:".card-header",cursor:"move",placeholder:"lobicard-placeholder",forcePlaceholderSize:!0,opacity:.7,revert:300,update:function(e,i){var n=i.item.data("inner-id");t._removeInnerIdFromParent(n),t._appendInnerIdToParent(i.item.parent(),n),t._updateDataIndices(i.item),t._triggerEvent("dragged")}})},_disableSorting:function(){var t=this,e=t.$el.parent();e.hasClass("ui-sortable")&&e.sortable("destroy")},_updateDataIndices:function(t){var e=this;t.parent().children().each(function(t,e){$(e).attr("data-index",t);var i=$(e).data("lobiCard");i&&i.$options.stateful&&!i.hasRandomId&&i._saveState("pinned",{index:t})}),e.$options.log&&console.log("Save indices in localstorage")},_removeInnerIdFromParent:function(t){var e=$("["+LobiCard.PRIVATE_OPTIONS.parentAttr+"~="+t+"]"),i=e.attr(LobiCard.PRIVATE_OPTIONS.parentAttr).replace(t,"").trim().replace(/\s{2,}/g," ");e.attr(LobiCard.PRIVATE_OPTIONS.parentAttr,i)},_onToggleIconsBtnClick:function(){var t=this;t.$heading.find(".toggle-controls").on("click.lobiCard",function(){t.$el.toggleClass("controls-expanded")})},_adjustForScreenSize:function(){var t=this;t.disableTooltips(),$(window).width()>768&&t.$options.tooltips&&t.enableTooltips(),t.isOnFullScreen()&&t.$body.css({width:t._calculateBodyWidth(t.$el.width()),height:t._calculateBodyHeight(t.$el.height())})},_enableResponsiveness:function(){var t=this;t._adjustForScreenSize(),$(window).on("resize.lobiCard",function(){t._adjustForScreenSize()})},_setBodyHeight:function(){var t=this;"auto"!==t.$options.bodyHeight&&t.$body.css({height:t.$options.bodyHeight,overflow:"auto"})},_getOptionsFromAttributes:function _getOptionsFromAttributes(){var me=this,$el=me.$el,options={};for(var key in $.fn.lobiCard.DEFAULTS){var k=key.toDash(),val=$el.data(k);void 0!==val&&("object"!==_typeof($.fn.lobiCard.DEFAULTS[key])?options[key]=val:options[key]=eval("("+val+")"))}return options},_saveState:function(t,e){var i=this;i.$options.log&&console.log("Save state ",t,e),!i.hasRandomId&&i.$options.stateful&&(i.storage.state=t,e&&(i.storage.stateParams=e),i._saveLocalStorage(i.storage))},_saveLocalStorage:function(t){var e=this;localStorage.setItem(STORAGE_PREFIX+e.innerId,JSON.stringify(t))},_applyState:function(t,e){var i=this;switch(t){case"pinned":e&&null!==e.index&&void 0!==e.index&&i._applyIndex(e.index);break;case"unpinned":i.unpin(),i.setPosition(e.left,e.top,0),i.setSize(e.width,e.height,0);break;case"minimized":i.unpin(),i.minimize();break;case"collapsed":i.minimize();break;case"fullscreen":i.toFullScreen()}},_applyIndex:function(t){var e=this;null!==t&&e.$el.insertAt(t,e.$el.parent())},_triggerEvent:function(t){var e=this,i=Array.prototype.slice.call(arguments,1);return i.unshift(e),e.$el.trigger(t+".lobiCard",i),!e.$options[t]||"function"!=typeof e.$options[t]||e.$options[t].apply(e,i)},doPin:function(){var t=this;return!1!==t._triggerEvent("beforePin")&&(t.pin(),t._saveState("pinned"),t._triggerEvent("onPin")),t},doUnpin:function(){var t=this;return!1!==t._triggerEvent("beforeUnpin")&&(t.unpin(),t._updateUnpinnedState(),t._triggerEvent("onUnpin")),t},doTogglePin:function(){var t=this;return this.isPinned()?this.doUnpin():this.doPin(),t},_updateUnpinnedState:function(){var t=this;t._saveState("unpinned",t.getAlignment())},getAlignment:function(){var t=this;return{top:t.$el.css("top"),left:t.$el.css("left"),width:t.$el.css("width"),height:t.$el.css("height")}}},$.fn.lobiCard=function(t){var e=arguments,i=null;return this.each(function(){var n=$(this),a=n.data("lobiCard"),o="object"===(void 0===t?"undefined":_typeof(t))&&t;a||n.data("lobiCard",a=new LobiCard(n,o)),"string"==typeof t&&(e=Array.prototype.slice.call(e,1),i=a[t].apply(a,e))}),i},LobiCard.PRIVATE_OPTIONS={parentAttr:"data-lobicard-child-inner-id",toolbarClass:"lobicard-minimized-toolbar",initialZIndex:1e4,iconClass:"card-control-icon"},$.fn.lobiCard.DEFAULTS={log:!1,draggable:!0,sortable:!1,connectWith:".ui-sortable",resize:"both",minWidth:200,minHeight:100,maxWidth:1200,maxHeight:700,loadUrl:"",autoload:!0,bodyHeight:"auto",tooltips:!0,toggleIcon:"fa fa-cog",expandAnimation:100,collapseAnimation:100,state:"pinned",initialIndex:null,stateful:!1,constrain:"document",unpin:{icon:"fa fa-arrows",tooltip:"Unpin"},reload:{icon:"fa fa-refresh",tooltip:"Reload"},minimize:{icon:"fa fa-chevron-up",icon2:"fa fa-chevron-down",tooltip:"Minimize"},expand:{icon:"fa fa-expand",icon2:"fa fa-compress",tooltip:"Fullscreen"},close:{icon:"fa fa-times-circle",tooltip:"Close"},editTitle:{icon:"fa fa-edit",icon2:"fa fa-save",tooltip:"Edit title"},beforeTitleChange:null},$(".lobicard").lobiCard()})}});