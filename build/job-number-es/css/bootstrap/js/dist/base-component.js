/*! For license information please see base-component.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("./dom/data"),require("./util/index"),require("./dom/event-handler"),require("./util/config")):"function"==typeof define&&define.amd?define(["./dom/data","./util/index","./dom/event-handler","./util/config"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).BaseComponent=t(e.Data,e.Index,e.EventHandler,e.Config)}(this,(function(e,t,n,i){"use strict";const s=e=>e&&"object"==typeof e&&"default"in e?e:{default:e},o=s(e),r=s(n),u=s(i);class f extends u.default{constructor(e,n){super(),(e=t.getElement(e))&&(this._element=e,this._config=this._getConfig(n),o.default.set(this._element,this.constructor.DATA_KEY,this))}dispose(){o.default.remove(this._element,this.constructor.DATA_KEY),r.default.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,n,i=!0){t.executeAfterTransition(e,n,i)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return o.default.get(t.getElement(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"==typeof t?t:null)}static get VERSION(){return"5.2.3"}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}return f}));