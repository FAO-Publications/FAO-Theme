const MAX_UID=1e6,MILLISECONDS_MULTIPLIER=1e3,TRANSITION_END="transitionend",toType=e=>null==e?`${e}`:Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),getUID=e=>{do{e+=Math.floor(1e6*Math.random())}while(document.getElementById(e));return e},getSelector=e=>{let t=e.getAttribute("data-bs-target");if(!t||"#"===t){let n=e.getAttribute("href");if(!n||!n.includes("#")&&!n.startsWith("."))return null;n.includes("#")&&!n.startsWith("#")&&(n=`#${n.split("#")[1]}`),t=n&&"#"!==n?n.trim():null}return t},getSelectorFromElement=e=>{const t=getSelector(e);return t&&document.querySelector(t)?t:null},getElementFromSelector=e=>{const t=getSelector(e);return t?document.querySelector(t):null},getTransitionDurationFromElement=e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);const o=Number.parseFloat(t),r=Number.parseFloat(n);return o||r?(t=t.split(",")[0],n=n.split(",")[0],1e3*(Number.parseFloat(t)+Number.parseFloat(n))):0},triggerTransitionEnd=e=>{e.dispatchEvent(new Event(TRANSITION_END))},isElement=e=>!(!e||"object"!=typeof e)&&(void 0!==e.jquery&&(e=e[0]),void 0!==e.nodeType),getElement=e=>isElement(e)?e.jquery?e[0]:e:"string"==typeof e&&e.length>0?document.querySelector(e):null,isVisible=e=>{if(!isElement(e)||0===e.getClientRects().length)return!1;const t="visible"===getComputedStyle(e).getPropertyValue("visibility"),n=e.closest("details:not([open])");if(!n)return t;if(n!==e){const t=e.closest("summary");if(t&&t.parentNode!==n)return!1;if(null===t)return!1}return t},isDisabled=e=>!e||e.nodeType!==Node.ELEMENT_NODE||!!e.classList.contains("disabled")||(void 0!==e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled")),findShadowRoot=e=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof e.getRootNode){const t=e.getRootNode();return t instanceof ShadowRoot?t:null}return e instanceof ShadowRoot?e:e.parentNode?findShadowRoot(e.parentNode):null},noop=()=>{},reflow=e=>{e.offsetHeight},getjQuery=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,DOMContentLoadedCallbacks=[],onDOMContentLoaded=e=>{"loading"===document.readyState?(DOMContentLoadedCallbacks.length||document.addEventListener("DOMContentLoaded",(()=>{for(const e of DOMContentLoadedCallbacks)e()})),DOMContentLoadedCallbacks.push(e)):e()},isRTL=()=>"rtl"===document.documentElement.dir,defineJQueryPlugin=e=>{onDOMContentLoaded((()=>{const t=getjQuery();if(t){const n=e.NAME,o=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=o,e.jQueryInterface)}}))},execute=e=>{"function"==typeof e&&e()},executeAfterTransition=(e,t,n=!0)=>{if(!n)return void execute(e);const o=getTransitionDurationFromElement(t)+5;let r=!1;const i=({target:n})=>{n===t&&(r=!0,t.removeEventListener(TRANSITION_END,i),execute(e))};t.addEventListener(TRANSITION_END,i),setTimeout((()=>{r||triggerTransitionEnd(t)}),o)},getNextActiveElement=(e,t,n,o)=>{const r=e.length;let i=e.indexOf(t);return-1===i?!n&&o?e[r-1]:e[0]:(i+=n?1:-1,o&&(i=(i+r)%r),e[Math.max(0,Math.min(i,r-1))])};export{defineJQueryPlugin,execute,executeAfterTransition,findShadowRoot,getElement,getElementFromSelector,getjQuery,getNextActiveElement,getSelectorFromElement,getTransitionDurationFromElement,getUID,isDisabled,isElement,isRTL,isVisible,noop,onDOMContentLoaded,reflow,triggerTransitionEnd,toType};