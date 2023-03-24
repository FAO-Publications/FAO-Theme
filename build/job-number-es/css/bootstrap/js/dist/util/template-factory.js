/*! For license information please see template-factory.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("./sanitizer"),require("./index"),require("../dom/selector-engine"),require("./config")):"function"==typeof define&&define.amd?define(["./sanitizer","./index","../dom/selector-engine","./config"],e):(t="undefined"!=typeof globalThis?globalThis:t||self).TemplateFactory=e(t.Sanitizer,t.Index,t.SelectorEngine,t.Config)}(this,(function(t,e,n,i){"use strict";const o=t=>t&&"object"==typeof t&&"default"in t?t:{default:t},s=o(n),l=o(i),c={allowList:t.DefaultAllowlist,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},r={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},a={entry:"(string|element|function|null)",selector:"(string|element)"};class f extends l.default{constructor(t){super(),this._config=this._getConfig(t)}static get Default(){return c}static get DefaultType(){return r}static get NAME(){return"TemplateFactory"}getContent(){return Object.values(this._config.content).map((t=>this._resolvePossibleFunction(t))).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(t){return this._checkContent(t),this._config.content={...this._config.content,...t},this}toHtml(){const t=document.createElement("div");t.innerHTML=this._maybeSanitize(this._config.template);for(const[e,n]of Object.entries(this._config.content))this._setContent(t,n,e);const e=t.children[0],n=this._resolvePossibleFunction(this._config.extraClass);return n&&e.classList.add(...n.split(" ")),e}_typeCheckConfig(t){super._typeCheckConfig(t),this._checkContent(t.content)}_checkContent(t){for(const[e,n]of Object.entries(t))super._typeCheckConfig({selector:e,entry:n},a)}_setContent(t,n,i){const o=s.default.findOne(i,t);o&&((n=this._resolvePossibleFunction(n))?e.isElement(n)?this._putElementInTemplate(e.getElement(n),o):this._config.html?o.innerHTML=this._maybeSanitize(n):o.textContent=n:o.remove())}_maybeSanitize(e){return this._config.sanitize?t.sanitizeHtml(e,this._config.allowList,this._config.sanitizeFn):e}_resolvePossibleFunction(t){return"function"==typeof t?t(this):t}_putElementInTemplate(t,e){if(this._config.html)return e.innerHTML="",void e.append(t);e.textContent=t.textContent}}return f}));