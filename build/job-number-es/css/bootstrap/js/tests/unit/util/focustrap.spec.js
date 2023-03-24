import FocusTrap from"../../../src/util/focustrap";import EventHandler from"../../../src/dom/event-handler";import SelectorEngine from"../../../src/dom/selector-engine";import{clearFixture,createEvent,getFixture}from"../../helpers/fixture";describe("FocusTrap",(()=>{let e;beforeAll((()=>{e=getFixture()})),afterEach((()=>{clearFixture()})),describe("activate",(()=>{it("should autofocus itself by default",(()=>{e.innerHTML='<div id="focustrap" tabindex="-1"></div>';const t=e.querySelector("div"),n=spyOn(t,"focus");new FocusTrap({trapElement:t}).activate(),expect(n).toHaveBeenCalled()})),it("if configured not to autofocus, should not autofocus itself",(()=>{e.innerHTML='<div id="focustrap" tabindex="-1"></div>';const t=e.querySelector("div"),n=spyOn(t,"focus");new FocusTrap({trapElement:t,autofocus:!1}).activate(),expect(n).not.toHaveBeenCalled()})),it("should force focus inside focus trap if it can",(()=>new Promise((t=>{e.innerHTML=['<a href="#" id="outside">outside</a>','<div id="focustrap" tabindex="-1">','  <a href="#" id="inside">inside</a>',"</div>"].join("");const n=e.querySelector("div");new FocusTrap({trapElement:n}).activate();const o=document.getElementById("inside"),i=()=>{expect(a).toHaveBeenCalled(),document.removeEventListener("focusin",i),t()},a=spyOn(o,"focus");spyOn(SelectorEngine,"focusableChildren").and.callFake((()=>[o])),document.addEventListener("focusin",i);const s=createEvent("focusin",{bubbles:!0});Object.defineProperty(s,"target",{value:document.getElementById("outside")}),document.dispatchEvent(s)})))),it("should wrap focus around forward on tab",(()=>new Promise((t=>{e.innerHTML=['<a href="#" id="outside">outside</a>','<div id="focustrap" tabindex="-1">','  <a href="#" id="first">first</a>','  <a href="#" id="inside">inside</a>','  <a href="#" id="last">last</a>',"</div>"].join("");const n=e.querySelector("div");new FocusTrap({trapElement:n}).activate();const o=document.getElementById("first"),i=document.getElementById("inside"),a=document.getElementById("last"),s=document.getElementById("outside");spyOn(SelectorEngine,"focusableChildren").and.callFake((()=>[o,i,a]));const c=spyOn(o,"focus").and.callThrough(),d=()=>{expect(c).toHaveBeenCalled(),o.removeEventListener("focusin",d),t()};o.addEventListener("focusin",d);const r=createEvent("keydown");r.key="Tab",document.dispatchEvent(r),s.focus()})))),it("should wrap focus around backwards on shift-tab",(()=>new Promise((t=>{e.innerHTML=['<a href="#" id="outside">outside</a>','<div id="focustrap" tabindex="-1">','  <a href="#" id="first">first</a>','  <a href="#" id="inside">inside</a>','  <a href="#" id="last">last</a>',"</div>"].join("");const n=e.querySelector("div");new FocusTrap({trapElement:n}).activate();const o=document.getElementById("first"),i=document.getElementById("inside"),a=document.getElementById("last"),s=document.getElementById("outside");spyOn(SelectorEngine,"focusableChildren").and.callFake((()=>[o,i,a]));const c=spyOn(a,"focus").and.callThrough(),d=()=>{expect(c).toHaveBeenCalled(),a.removeEventListener("focusin",d),t()};a.addEventListener("focusin",d);const r=createEvent("keydown");r.key="Tab",r.shiftKey=!0,document.dispatchEvent(r),s.focus()})))),it("should force focus on itself if there is no focusable content",(()=>new Promise((t=>{e.innerHTML=['<a href="#" id="outside">outside</a>','<div id="focustrap" tabindex="-1"></div>'].join("");const n=e.querySelector("div"),o=new FocusTrap({trapElement:n});o.activate();const i=()=>{expect(a).toHaveBeenCalled(),document.removeEventListener("focusin",i),t()},a=spyOn(o._config.trapElement,"focus");document.addEventListener("focusin",i);const s=createEvent("focusin",{bubbles:!0});Object.defineProperty(s,"target",{value:document.getElementById("outside")}),document.dispatchEvent(s)}))))})),describe("deactivate",(()=>{it("should flag itself as no longer active",(()=>{const t=new FocusTrap({trapElement:e});t.activate(),expect(t._isActive).toBeTrue(),t.deactivate(),expect(t._isActive).toBeFalse()})),it("should remove all event listeners",(()=>{const t=new FocusTrap({trapElement:e});t.activate();const n=spyOn(EventHandler,"off");t.deactivate(),expect(n).toHaveBeenCalled()})),it("doesn't try removing event listeners unless it needs to (in case it hasn't been activated)",(()=>{const t=new FocusTrap({trapElement:e}),n=spyOn(EventHandler,"off");t.deactivate(),expect(n).not.toHaveBeenCalled()}))}))}));