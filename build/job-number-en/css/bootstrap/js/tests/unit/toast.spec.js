import Toast from"../../src/toast";import{clearFixture,createEvent,getFixture,jQueryMock}from"../helpers/fixture";describe("Toast",(()=>{let e;beforeAll((()=>{e=getFixture()})),afterEach((()=>{clearFixture()})),describe("VERSION",(()=>{it("should return plugin version",(()=>{expect(Toast.VERSION).toEqual(jasmine.any(String))}))})),describe("DATA_KEY",(()=>{it("should return plugin data key",(()=>{expect(Toast.DATA_KEY).toEqual("bs.toast")}))})),describe("constructor",(()=>{it("should take care of element either passed as a CSS selector or DOM element",(()=>{e.innerHTML='<div class="toast"></div>';const t=e.querySelector(".toast"),o=new Toast(".toast"),s=new Toast(t);expect(o._element).toEqual(t),expect(s._element).toEqual(t)})),it("should allow to config in js",(()=>new Promise((t=>{e.innerHTML=['<div class="toast">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const o=e.querySelector("div"),s=new Toast(o,{delay:1});o.addEventListener("shown.bs.toast",(()=>{expect(o).toHaveClass("show"),t()})),s.show()})))),it("should close toast when close element with data-bs-dismiss attribute is set",(()=>new Promise((t=>{e.innerHTML=['<div class="toast" data-bs-delay="1" data-bs-autohide="false" data-bs-animation="false">','  <button type="button" class="ms-2 mb-1 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>',"</div>"].join("");const o=e.querySelector("div"),s=new Toast(o);o.addEventListener("shown.bs.toast",(()=>{expect(o).toHaveClass("show"),o.querySelector(".btn-close").click()})),o.addEventListener("hidden.bs.toast",(()=>{expect(o).not.toHaveClass("show"),t()})),s.show()}))))})),describe("Default",(()=>{it("should expose default setting to allow to override them",(()=>{Toast.Default.delay=1e3,e.innerHTML=['<div class="toast" data-bs-autohide="false" data-bs-animation="false">','  <button type="button" class="ms-2 mb-1 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>',"</div>"].join("");const t=e.querySelector("div"),o=new Toast(t);expect(o._config.delay).toEqual(1e3)}))})),describe("DefaultType",(()=>{it("should expose default setting types for read",(()=>{expect(Toast.DefaultType).toEqual(jasmine.any(Object))}))})),describe("show",(()=>{it("should auto hide",(()=>new Promise((t=>{e.innerHTML=['<div class="toast" data-bs-delay="1">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o);o.addEventListener("hidden.bs.toast",(()=>{expect(o).not.toHaveClass("show"),t()})),s.show()})))),it("should not add fade class",(()=>new Promise((t=>{e.innerHTML=['<div class="toast" data-bs-delay="1" data-bs-animation="false">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o);o.addEventListener("shown.bs.toast",(()=>{expect(o).not.toHaveClass("fade"),t()})),s.show()})))),it("should not trigger shown if show is prevented",(()=>new Promise(((t,o)=>{e.innerHTML=['<div class="toast" data-bs-delay="1" data-bs-animation="false">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const s=e.querySelector(".toast"),a=new Toast(s);s.addEventListener("show.bs.toast",(e=>{e.preventDefault(),setTimeout((()=>{expect(s).not.toHaveClass("show"),t()}),20)})),s.addEventListener("shown.bs.toast",(()=>{o(new Error("shown event should not be triggered if show is prevented"))})),a.show()})))),it("should clear timeout if toast is shown again before it is hidden",(()=>new Promise((t=>{e.innerHTML=['<div class="toast">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o);setTimeout((()=>{s._config.autohide=!1,o.addEventListener("shown.bs.toast",(()=>{expect(a).toHaveBeenCalled(),expect(s._timeout).toBeNull(),t()})),s.show()}),s._config.delay/2);const a=spyOn(s,"_clearTimeout").and.callThrough();s.show()})))),it("should clear timeout if toast is interacted with mouse",(()=>new Promise((t=>{e.innerHTML=['<div class="toast">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o),a=spyOn(s,"_clearTimeout").and.callThrough();setTimeout((()=>{a.calls.reset(),o.addEventListener("mouseover",(()=>{expect(s._clearTimeout).toHaveBeenCalledTimes(1),expect(s._timeout).toBeNull(),t()}));const e=createEvent("mouseover");o.dispatchEvent(e)}),s._config.delay/2),s.show()})))),it("should clear timeout if toast is interacted with keyboard",(()=>new Promise((t=>{e.innerHTML=['<button id="outside-focusable">outside focusable</button>','<div class="toast">','  <div class="toast-body">',"    a simple toast","    <button>with a button</button>","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o),a=spyOn(s,"_clearTimeout").and.callThrough();setTimeout((()=>{a.calls.reset(),o.addEventListener("focusin",(()=>{expect(s._clearTimeout).toHaveBeenCalledTimes(1),expect(s._timeout).toBeNull(),t()})),o.querySelector("button").focus()}),s._config.delay/2),s.show()})))),it("should still auto hide after being interacted with mouse and keyboard",(()=>new Promise((t=>{e.innerHTML=['<button id="outside-focusable">outside focusable</button>','<div class="toast">','  <div class="toast-body">',"    a simple toast","    <button>with a button</button>","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o);setTimeout((()=>{o.addEventListener("mouseover",(()=>{o.querySelector("button").focus()})),o.addEventListener("focusin",(()=>{const e=createEvent("mouseout");o.dispatchEvent(e)})),o.addEventListener("mouseout",(()=>{document.getElementById("outside-focusable").focus()})),o.addEventListener("focusout",(()=>{expect(s._timeout).not.toBeNull(),t()}));const e=createEvent("mouseover");o.dispatchEvent(e)}),s._config.delay/2),s.show()})))),it("should not auto hide if focus leaves but mouse pointer remains inside",(()=>new Promise((t=>{e.innerHTML=['<button id="outside-focusable">outside focusable</button>','<div class="toast">','  <div class="toast-body">',"    a simple toast","    <button>with a button</button>","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o);setTimeout((()=>{o.addEventListener("mouseover",(()=>{o.querySelector("button").focus()})),o.addEventListener("focusin",(()=>{document.getElementById("outside-focusable").focus()})),o.addEventListener("focusout",(()=>{expect(s._timeout).toBeNull(),t()}));const e=createEvent("mouseover");o.dispatchEvent(e)}),s._config.delay/2),s.show()})))),it("should not auto hide if mouse pointer leaves but focus remains inside",(()=>new Promise((t=>{e.innerHTML=['<button id="outside-focusable">outside focusable</button>','<div class="toast">','  <div class="toast-body">',"    a simple toast","    <button>with a button</button>","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o);setTimeout((()=>{o.addEventListener("mouseover",(()=>{o.querySelector("button").focus()})),o.addEventListener("focusin",(()=>{const e=createEvent("mouseout");o.dispatchEvent(e)})),o.addEventListener("mouseout",(()=>{expect(s._timeout).toBeNull(),t()}));const e=createEvent("mouseover");o.dispatchEvent(e)}),s._config.delay/2),s.show()}))))})),describe("hide",(()=>{it("should allow to hide toast manually",(()=>new Promise((t=>{e.innerHTML=['<div class="toast" data-bs-delay="1" data-bs-autohide="false">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const o=e.querySelector(".toast"),s=new Toast(o);o.addEventListener("shown.bs.toast",(()=>{s.hide()})),o.addEventListener("hidden.bs.toast",(()=>{expect(o).not.toHaveClass("show"),t()})),s.show()})))),it("should do nothing when we call hide on a non shown toast",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div"),o=new Toast(t),s=spyOn(t.classList,"contains");o.hide(),expect(s).toHaveBeenCalled()})),it("should not trigger hidden if hide is prevented",(()=>new Promise(((t,o)=>{e.innerHTML=['<div class="toast" data-bs-delay="1" data-bs-animation="false">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const s=e.querySelector(".toast"),a=new Toast(s);s.addEventListener("shown.bs.toast",(()=>{a.hide()})),s.addEventListener("hide.bs.toast",(e=>{e.preventDefault(),setTimeout((()=>{expect(s).toHaveClass("show"),t()}),20)})),s.addEventListener("hidden.bs.toast",(()=>{o(new Error("hidden event should not be triggered if hide is prevented"))})),a.show()}))))})),describe("dispose",(()=>{it("should allow to destroy toast",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div"),o=new Toast(t);expect(Toast.getInstance(t)).not.toBeNull(),o.dispose(),expect(Toast.getInstance(t)).toBeNull()})),it("should allow to destroy toast and hide it before that",(()=>new Promise((t=>{e.innerHTML=['<div class="toast" data-bs-delay="0" data-bs-autohide="false">','  <div class="toast-body">',"    a simple toast","  </div>","</div>"].join("");const o=e.querySelector("div"),s=new Toast(o),a=()=>{expect(o).toHaveClass("show"),expect(Toast.getInstance(o)).not.toBeNull(),s.dispose(),expect(Toast.getInstance(o)).toBeNull(),expect(o).not.toHaveClass("show"),t()};o.addEventListener("shown.bs.toast",(()=>{setTimeout(a,1)})),s.show()}))))})),describe("jQueryInterface",(()=>{it("should create a toast",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div");jQueryMock.fn.toast=Toast.jQueryInterface,jQueryMock.elements=[t],jQueryMock.fn.toast.call(jQueryMock),expect(Toast.getInstance(t)).not.toBeNull()})),it("should not re create a toast",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div"),o=new Toast(t);jQueryMock.fn.toast=Toast.jQueryInterface,jQueryMock.elements=[t],jQueryMock.fn.toast.call(jQueryMock),expect(Toast.getInstance(t)).toEqual(o)})),it("should call a toast method",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div"),o=new Toast(t),s=spyOn(o,"show");jQueryMock.fn.toast=Toast.jQueryInterface,jQueryMock.elements=[t],jQueryMock.fn.toast.call(jQueryMock,"show"),expect(Toast.getInstance(t)).toEqual(o),expect(s).toHaveBeenCalled()})),it("should throw error on undefined method",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div"),o="undefinedMethod";jQueryMock.fn.toast=Toast.jQueryInterface,jQueryMock.elements=[t],expect((()=>{jQueryMock.fn.toast.call(jQueryMock,o)})).toThrowError(TypeError,`No method named "${o}"`)}))})),describe("getInstance",(()=>{it("should return a toast instance",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div"),o=new Toast(t);expect(Toast.getInstance(t)).toEqual(o),expect(Toast.getInstance(t)).toBeInstanceOf(Toast)})),it("should return null when there is no toast instance",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div");expect(Toast.getInstance(t)).toBeNull()}))})),describe("getOrCreateInstance",(()=>{it("should return toast instance",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div"),o=new Toast(t);expect(Toast.getOrCreateInstance(t)).toEqual(o),expect(Toast.getInstance(t)).toEqual(Toast.getOrCreateInstance(t,{})),expect(Toast.getOrCreateInstance(t)).toBeInstanceOf(Toast)})),it("should return new instance when there is no toast instance",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div");expect(Toast.getInstance(t)).toBeNull(),expect(Toast.getOrCreateInstance(t)).toBeInstanceOf(Toast)})),it("should return new instance when there is no toast instance with given configuration",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div");expect(Toast.getInstance(t)).toBeNull();const o=Toast.getOrCreateInstance(t,{delay:1});expect(o).toBeInstanceOf(Toast),expect(o._config.delay).toEqual(1)})),it("should return the instance when exists without given configuration",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div"),o=new Toast(t,{delay:1});expect(Toast.getInstance(t)).toEqual(o);const s=Toast.getOrCreateInstance(t,{delay:2});expect(o).toBeInstanceOf(Toast),expect(s).toEqual(o),expect(s._config.delay).toEqual(1)}))}))}));