/*! For license information please see backdrop.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("../dom/event-handler"),require("./index"),require("./config")):"function"==typeof define&&define.amd?define(["../dom/event-handler","./index","./config"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).Backdrop=t(e.EventHandler,e.Index,e.Config)}(this,(function(e,t,i){"use strict";const n=e=>e&&"object"==typeof e&&"default"in e?e:{default:e},s=n(e),o=n(i),l="backdrop",a="show",d=`mousedown.bs.${l}`,c={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},r={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class f extends o.default{constructor(e){super(),this._config=this._getConfig(e),this._isAppended=!1,this._element=null}static get Default(){return c}static get DefaultType(){return r}static get NAME(){return l}show(e){if(!this._config.isVisible)return void t.execute(e);this._append();const i=this._getElement();this._config.isAnimated&&t.reflow(i),i.classList.add(a),this._emulateAnimation((()=>{t.execute(e)}))}hide(e){this._config.isVisible?(this._getElement().classList.remove(a),this._emulateAnimation((()=>{this.dispose(),t.execute(e)}))):t.execute(e)}dispose(){this._isAppended&&(s.default.off(this._element,d),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const e=document.createElement("div");e.className=this._config.className,this._config.isAnimated&&e.classList.add("fade"),this._element=e}return this._element}_configAfterMerge(e){return e.rootElement=t.getElement(e.rootElement),e}_append(){if(this._isAppended)return;const e=this._getElement();this._config.rootElement.append(e),s.default.on(e,d,(()=>{t.execute(this._config.clickCallback)})),this._isAppended=!0}_emulateAnimation(e){t.executeAfterTransition(e,this._getElement(),this._config.isAnimated)}}return f}));