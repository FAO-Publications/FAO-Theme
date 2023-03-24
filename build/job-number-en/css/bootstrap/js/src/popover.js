import{defineJQueryPlugin}from"./util/index";import Tooltip from"./tooltip";const NAME="popover",SELECTOR_TITLE=".popover-header",SELECTOR_CONTENT=".popover-body",Default={...Tooltip.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},DefaultType={...Tooltip.DefaultType,content:"(null|string|element|function)"};class Popover extends Tooltip{static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[SELECTOR_TITLE]:this._getTitle(),".popover-body":this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(t){return this.each((function(){const e=Popover.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}defineJQueryPlugin(Popover);export default Popover;