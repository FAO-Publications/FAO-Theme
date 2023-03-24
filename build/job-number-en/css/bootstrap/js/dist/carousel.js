/*! For license information please see carousel.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("./util/index"),require("./dom/event-handler"),require("./dom/manipulator"),require("./dom/selector-engine"),require("./util/swipe"),require("./base-component")):"function"==typeof define&&define.amd?define(["./util/index","./dom/event-handler","./dom/manipulator","./dom/selector-engine","./util/swipe","./base-component"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).Carousel=t(e.Index,e.EventHandler,e.Manipulator,e.SelectorEngine,e.Swipe,e.BaseComponent)}(this,(function(e,t,i,s,n,r){"use strict";const a=e=>e&&"object"==typeof e&&"default"in e?e:{default:e},l=a(t),o=a(i),d=a(s),c=a(n),u=a(r),h=".bs.carousel",_=".data-api",f="next",m="prev",g="left",v="right",p=`slide${h}`,b=`slid${h}`,y=`keydown${h}`,I=`mouseenter${h}`,E=`mouseleave${h}`,T=`dragstart${h}`,w=`load${h}${_}`,x=`click${h}${_}`,A="carousel",L="active",C=".active",k=".carousel-item",O=C+k,$={ArrowLeft:v,ArrowRight:g},S={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},D={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class q extends u.default{constructor(e,t){super(e,t),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=d.default.findOne(".carousel-indicators",this._element),this._addEventListeners(),this._config.ride===A&&this.cycle()}static get Default(){return S}static get DefaultType(){return D}static get NAME(){return"carousel"}next(){this._slide(f)}nextWhenVisible(){!document.hidden&&e.isVisible(this._element)&&this.next()}prev(){this._slide(m)}pause(){this._isSliding&&e.triggerTransitionEnd(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval((()=>this.nextWhenVisible()),this._config.interval)}_maybeEnableCycle(){this._config.ride&&(this._isSliding?l.default.one(this._element,b,(()=>this.cycle())):this.cycle())}to(e){const t=this._getItems();if(e>t.length-1||e<0)return;if(this._isSliding)return void l.default.one(this._element,b,(()=>this.to(e)));const i=this._getItemIndex(this._getActive());if(i===e)return;const s=e>i?f:m;this._slide(s,t[e])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(e){return e.defaultInterval=e.interval,e}_addEventListeners(){this._config.keyboard&&l.default.on(this._element,y,(e=>this._keydown(e))),"hover"===this._config.pause&&(l.default.on(this._element,I,(()=>this.pause())),l.default.on(this._element,E,(()=>this._maybeEnableCycle()))),this._config.touch&&c.default.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const e of d.default.find(".carousel-item img",this._element))l.default.on(e,T,(e=>e.preventDefault()));const e={leftCallback:()=>this._slide(this._directionToOrder(g)),rightCallback:()=>this._slide(this._directionToOrder(v)),endCallback:()=>{"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((()=>this._maybeEnableCycle()),500+this._config.interval))}};this._swipeHelper=new c.default(this._element,e)}_keydown(e){if(/input|textarea/i.test(e.target.tagName))return;const t=$[e.key];t&&(e.preventDefault(),this._slide(this._directionToOrder(t)))}_getItemIndex(e){return this._getItems().indexOf(e)}_setActiveIndicatorElement(e){if(!this._indicatorsElement)return;const t=d.default.findOne(C,this._indicatorsElement);t.classList.remove(L),t.removeAttribute("aria-current");const i=d.default.findOne(`[data-bs-slide-to="${e}"]`,this._indicatorsElement);i&&(i.classList.add(L),i.setAttribute("aria-current","true"))}_updateInterval(){const e=this._activeElement||this._getActive();if(!e)return;const t=Number.parseInt(e.getAttribute("data-bs-interval"),10);this._config.interval=t||this._config.defaultInterval}_slide(t,i=null){if(this._isSliding)return;const s=this._getActive(),n=t===f,r=i||e.getNextActiveElement(this._getItems(),s,n,this._config.wrap);if(r===s)return;const a=this._getItemIndex(r),o=e=>l.default.trigger(this._element,e,{relatedTarget:r,direction:this._orderToDirection(t),from:this._getItemIndex(s),to:a});if(o(p).defaultPrevented)return;if(!s||!r)return;const d=Boolean(this._interval);this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(a),this._activeElement=r;const c=n?"carousel-item-start":"carousel-item-end",u=n?"carousel-item-next":"carousel-item-prev";r.classList.add(u),e.reflow(r),s.classList.add(c),r.classList.add(c),this._queueCallback((()=>{r.classList.remove(c,u),r.classList.add(L),s.classList.remove(L,u,c),this._isSliding=!1,o(b)}),s,this._isAnimated()),d&&this.cycle()}_isAnimated(){return this._element.classList.contains("slide")}_getActive(){return d.default.findOne(O,this._element)}_getItems(){return d.default.find(k,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(t){return e.isRTL()?t===g?m:f:t===g?f:m}_orderToDirection(t){return e.isRTL()?t===m?g:v:t===m?v:g}static jQueryInterface(e){return this.each((function(){const t=q.getOrCreateInstance(this,e);if("number"!=typeof e){if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`);t[e]()}}else t.to(e)}))}}return l.default.on(document,x,"[data-bs-slide], [data-bs-slide-to]",(function(t){const i=e.getElementFromSelector(this);if(!i||!i.classList.contains(A))return;t.preventDefault();const s=q.getOrCreateInstance(i),n=this.getAttribute("data-bs-slide-to");return n?(s.to(n),void s._maybeEnableCycle()):"next"===o.default.getDataAttribute(this,"slide")?(s.next(),void s._maybeEnableCycle()):(s.prev(),void s._maybeEnableCycle())})),l.default.on(window,w,(()=>{const e=d.default.find('[data-bs-ride="carousel"]');for(const t of e)q.getOrCreateInstance(t)})),e.defineJQueryPlugin(q),q}));