import Backdrop from"../../../src/util/backdrop";import{getTransitionDurationFromElement}from"../../../src/util/index";import{clearFixture,getFixture}from"../../helpers/fixture";const CLASS_BACKDROP=".modal-backdrop",CLASS_NAME_FADE="fade",CLASS_NAME_SHOW="show";describe("Backdrop",(()=>{let e;beforeAll((()=>{e=getFixture()})),afterEach((()=>{clearFixture();const e=document.querySelectorAll(CLASS_BACKDROP);for(const o of e)o.remove()})),describe("show",(()=>{it('should append the backdrop html once on show and include the "show" class if it is "shown"',(()=>new Promise((e=>{const o=new Backdrop({isVisible:!0,isAnimated:!1}),t=()=>document.querySelectorAll(CLASS_BACKDROP);expect(t()).toHaveSize(0),o.show(),o.show((()=>{expect(t()).toHaveSize(1);for(const e of t())expect(e).toHaveClass("show");e()}))})))),it('should not append the backdrop html if it is not "shown"',(()=>new Promise((e=>{const o=new Backdrop({isVisible:!1,isAnimated:!0}),t=()=>document.querySelectorAll(CLASS_BACKDROP);expect(t()).toHaveSize(0),o.show((()=>{expect(t()).toHaveSize(0),e()}))})))),it('should append the backdrop html once and include the "fade" class if it is "shown" and "animated"',(()=>new Promise((e=>{const o=new Backdrop({isVisible:!0,isAnimated:!0}),t=()=>document.querySelectorAll(CLASS_BACKDROP);expect(t()).toHaveSize(0),o.show((()=>{expect(t()).toHaveSize(1);for(const e of t())expect(e).toHaveClass("fade");e()}))}))))})),describe("hide",(()=>{it("should remove the backdrop html",(()=>new Promise((e=>{const o=new Backdrop({isVisible:!0,isAnimated:!0}),t=()=>document.body.querySelectorAll(CLASS_BACKDROP);expect(t()).toHaveSize(0),o.show((()=>{expect(t()).toHaveSize(1),o.hide((()=>{expect(t()).toHaveSize(0),e()}))}))})))),it('should remove the "show" class',(()=>new Promise((e=>{const o=new Backdrop({isVisible:!0,isAnimated:!0}),t=o._getElement();o.show(),o.hide((()=>{expect(t).not.toHaveClass("show"),e()}))})))),it('should not try to remove Node on remove method if it is not "shown"',(()=>new Promise((e=>{const o=new Backdrop({isVisible:!1,isAnimated:!0}),t=()=>document.querySelectorAll(CLASS_BACKDROP),i=spyOn(o,"dispose").and.callThrough();expect(t()).toHaveSize(0),expect(o._isAppended).toBeFalse(),o.show((()=>{o.hide((()=>{expect(t()).toHaveSize(0),expect(i).not.toHaveBeenCalled(),expect(o._isAppended).toBeFalse(),e()}))}))})))),it("should not error if the backdrop no longer has a parent",(()=>new Promise((o=>{e.innerHTML='<div id="wrapper"></div>';const t=e.querySelector("#wrapper"),i=new Backdrop({isVisible:!0,isAnimated:!0,rootElement:t});i.show((()=>{t.remove(),i.hide((()=>{expect(document.querySelectorAll(CLASS_BACKDROP)).toHaveSize(0),o()}))}))}))))})),describe("click callback",(()=>{it("should execute callback on click",(()=>new Promise((e=>{const o=jasmine.createSpy("spy");new Backdrop({isVisible:!0,isAnimated:!1,clickCallback:()=>o()}).show((()=>{const t=new Event("mousedown",{bubbles:!0,cancelable:!0});document.querySelector(CLASS_BACKDROP).dispatchEvent(t),setTimeout((()=>{expect(o).toHaveBeenCalled(),e()}),10)}))})))),describe("animation callbacks",(()=>{it("should show and hide backdrop after counting transition duration if it is animated",(()=>new Promise((e=>{const o=new Backdrop({isVisible:!0,isAnimated:!0}),t=jasmine.createSpy("spy2");o.show(t),o.hide((()=>{t(),setTimeout((()=>{expect(t).toHaveBeenCalledTimes(2),e()}),10)})),expect(t).not.toHaveBeenCalled()})))),it("should show and hide backdrop without a delay if it is not animated",(()=>new Promise((e=>{const o=jasmine.createSpy("spy",getTransitionDurationFromElement),t=new Backdrop({isVisible:!0,isAnimated:!1}),i=jasmine.createSpy("spy2");t.show(i),t.hide(i),setTimeout((()=>{expect(i).toHaveBeenCalled(),expect(o).not.toHaveBeenCalled(),e()}),10)})))),it('should not call delay callbacks if it is not "shown"',(()=>new Promise((e=>{const o=new Backdrop({isVisible:!1,isAnimated:!0}),t=jasmine.createSpy("spy",getTransitionDurationFromElement);o.show(),o.hide((()=>{expect(t).not.toHaveBeenCalled(),e()}))}))))})),describe("Config",(()=>{describe("rootElement initialization",(()=>{it('should be appended on "document.body" by default',(()=>new Promise((e=>{new Backdrop({isVisible:!0}).show((()=>{expect(document.querySelector(CLASS_BACKDROP).parentElement).toEqual(document.body),e()}))})))),it("should find the rootElement if passed as a string",(()=>new Promise((e=>{new Backdrop({isVisible:!0,rootElement:"body"}).show((()=>{expect(document.querySelector(CLASS_BACKDROP).parentElement).toEqual(document.body),e()}))})))),it("should be appended on any element given by the proper config",(()=>new Promise((o=>{e.innerHTML='<div id="wrapper"></div>';const t=e.querySelector("#wrapper");new Backdrop({isVisible:!0,rootElement:t}).show((()=>{expect(document.querySelector(CLASS_BACKDROP).parentElement).toEqual(t),o()}))}))))})),describe("ClassName",(()=>{it("should allow configuring className",(()=>new Promise((e=>{const o=new Backdrop({isVisible:!0,className:"foo"});o.show((()=>{expect(document.querySelector(".foo")).toEqual(o._getElement()),o.dispose(),e()}))}))))}))}))}))}));