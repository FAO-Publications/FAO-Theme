import{defineJQueryPlugin,getElementFromSelector,isRTL,isVisible,reflow}from"./util/index";import EventHandler from"./dom/event-handler";import SelectorEngine from"./dom/selector-engine";import ScrollBarHelper from"./util/scrollbar";import BaseComponent from"./base-component";import Backdrop from"./util/backdrop";import FocusTrap from"./util/focustrap";import{enableDismissTrigger}from"./util/component-functions";const NAME="modal",DATA_KEY="bs.modal",EVENT_KEY=`.${DATA_KEY}`,DATA_API_KEY=".data-api",ESCAPE_KEY="Escape",EVENT_HIDE=`hide${EVENT_KEY}`,EVENT_HIDE_PREVENTED=`hidePrevented${EVENT_KEY}`,EVENT_HIDDEN=`hidden${EVENT_KEY}`,EVENT_SHOW=`show${EVENT_KEY}`,EVENT_SHOWN=`shown${EVENT_KEY}`,EVENT_RESIZE=`resize${EVENT_KEY}`,EVENT_CLICK_DISMISS=`click.dismiss${EVENT_KEY}`,EVENT_MOUSEDOWN_DISMISS=`mousedown.dismiss${EVENT_KEY}`,EVENT_KEYDOWN_DISMISS=`keydown.dismiss${EVENT_KEY}`,EVENT_CLICK_DATA_API=`click${EVENT_KEY}.data-api`,CLASS_NAME_OPEN="modal-open",CLASS_NAME_FADE="fade",CLASS_NAME_SHOW="show",CLASS_NAME_STATIC="modal-static",OPEN_SELECTOR=".modal.show",SELECTOR_DIALOG=".modal-dialog",SELECTOR_MODAL_BODY=".modal-body",SELECTOR_DATA_TOGGLE='[data-bs-toggle="modal"]',Default={backdrop:!0,focus:!0,keyboard:!0},DefaultType={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class Modal extends BaseComponent{constructor(e,t){super(e,t),this._dialog=SelectorEngine.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new ScrollBarHelper,this._addEventListeners()}static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||this._isTransitioning||EventHandler.trigger(this._element,EVENT_SHOW,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add("modal-open"),this._adjustDialog(),this._backdrop.show((()=>this._showElement(e))))}hide(){this._isShown&&!this._isTransitioning&&(EventHandler.trigger(this._element,EVENT_HIDE).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove("show"),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated())))}dispose(){for(const e of[window,this._dialog])EventHandler.off(e,EVENT_KEY);this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Backdrop({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new FocusTrap({trapElement:this._element})}_showElement(e){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const t=SelectorEngine.findOne(".modal-body",this._dialog);t&&(t.scrollTop=0),reflow(this._element),this._element.classList.add("show"),this._queueCallback((()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,EventHandler.trigger(this._element,EVENT_SHOWN,{relatedTarget:e})}),this._dialog,this._isAnimated())}_addEventListeners(){EventHandler.on(this._element,EVENT_KEYDOWN_DISMISS,(e=>{if("Escape"===e.key)return this._config.keyboard?(e.preventDefault(),void this.hide()):void this._triggerBackdropTransition()})),EventHandler.on(window,EVENT_RESIZE,(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()})),EventHandler.on(this._element,EVENT_MOUSEDOWN_DISMISS,(e=>{EventHandler.one(this._element,EVENT_CLICK_DISMISS,(t=>{this._element===e.target&&this._element===t.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())}))}))}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove("modal-open"),this._resetAdjustments(),this._scrollBar.reset(),EventHandler.trigger(this._element,EVENT_HIDDEN)}))}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(EventHandler.trigger(this._element,EVENT_HIDE_PREVENTED).defaultPrevented)return;const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._element.style.overflowY;"hidden"===t||this._element.classList.contains("modal-static")||(e||(this._element.style.overflowY="hidden"),this._element.classList.add("modal-static"),this._queueCallback((()=>{this._element.classList.remove("modal-static"),this._queueCallback((()=>{this._element.style.overflowY=t}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._scrollBar.getWidth(),i=t>0;if(i&&!e){const e=isRTL()?"paddingLeft":"paddingRight";this._element.style[e]=`${t}px`}if(!i&&e){const e=isRTL()?"paddingRight":"paddingLeft";this._element.style[e]=`${t}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(e,t){return this.each((function(){const i=Modal.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===i[e])throw new TypeError(`No method named "${e}"`);i[e](t)}}))}}EventHandler.on(document,EVENT_CLICK_DATA_API,SELECTOR_DATA_TOGGLE,(function(e){const t=getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&e.preventDefault(),EventHandler.one(t,EVENT_SHOW,(e=>{e.defaultPrevented||EventHandler.one(t,EVENT_HIDDEN,(()=>{isVisible(this)&&this.focus()}))}));const i=SelectorEngine.findOne(".modal.show");i&&Modal.getInstance(i).hide(),Modal.getOrCreateInstance(t).toggle(this)})),enableDismissTrigger(Modal),defineJQueryPlugin(Modal);export default Modal;