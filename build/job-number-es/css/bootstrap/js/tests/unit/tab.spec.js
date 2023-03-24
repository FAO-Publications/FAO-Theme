import Tab from"../../src/tab";import{clearFixture,createEvent,getFixture,jQueryMock}from"../helpers/fixture";describe("Tab",(()=>{let e;beforeAll((()=>{e=getFixture()})),afterEach((()=>{clearFixture()})),describe("VERSION",(()=>{it("should return plugin version",(()=>{expect(Tab.VERSION).toEqual(jasmine.any(String))}))})),describe("constructor",(()=>{it("should take care of element either passed as a CSS selector or DOM element",(()=>{e.innerHTML=['<ul class="nav">','  <li><a href="#home" role="tab">Home</a></li>',"</ul>","<ul>",'  <li id="home"></li>',"</ul>"].join("");const t=e.querySelector('[href="#home"]'),a=new Tab('[href="#home"]'),n=new Tab(t);expect(a._element).toEqual(t),expect(n._element).toEqual(t)})),it("Do not Throw exception if not parent",(()=>{e.innerHTML=[e.innerHTML='<div class=""><div class="nav-link"></div></div>'].join("");const t=e.querySelector(".nav-link");expect((()=>{new Tab(t)})).not.toThrowError(TypeError)}))})),describe("show",(()=>{it("should activate element by tab id (using buttons, the preferred semantic way)",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav" role="tablist">','  <li><button type="button" data-bs-target="#home" role="tab">Home</button></li>','  <li><button type="button" id="triggerProfile" data-bs-target="#profile" role="tab">Profile</button></li>',"</ul>","<ul>",'  <li id="home" role="tabpanel"></li>','  <li id="profile" role="tabpanel"></li>',"</ul>"].join("");const a=e.querySelector("#triggerProfile"),n=new Tab(a);a.addEventListener("shown.bs.tab",(()=>{expect(e.querySelector("#profile")).toHaveClass("active"),expect(a.getAttribute("aria-selected")).toEqual("true"),t()})),n.show()})))),it("should activate element by tab id (using links for tabs - not ideal, but still supported)",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav" role="tablist">','  <li><a href="#home" role="tab">Home</a></li>','  <li><a id="triggerProfile" href="#profile" role="tab">Profile</a></li>',"</ul>","<ul>",'  <li id="home" role="tabpanel"></li>','  <li id="profile" role="tabpanel"></li>',"</ul>"].join("");const a=e.querySelector("#triggerProfile"),n=new Tab(a);a.addEventListener("shown.bs.tab",(()=>{expect(e.querySelector("#profile")).toHaveClass("active"),expect(a.getAttribute("aria-selected")).toEqual("true"),t()})),n.show()})))),it("should activate element by tab id in ordered list",(()=>new Promise((t=>{e.innerHTML=['<ol class="nav nav-pills">','  <li><button type="button" data-bs-target="#home" role="tab">Home</button></li>','  <li><button type="button" id="triggerProfile" href="#profile" role="tab">Profile</button></li>',"</ol>","<ol>",'  <li id="home" role="tabpanel"></li>','  <li id="profile" role="tabpanel"></li>',"</ol>"].join("");const a=e.querySelector("#triggerProfile"),n=new Tab(a);a.addEventListener("shown.bs.tab",(()=>{expect(e.querySelector("#profile")).toHaveClass("active"),t()})),n.show()})))),it("should activate element by tab id in nav list",(()=>new Promise((t=>{e.innerHTML=['<nav class="nav">','  <button type="button" data-bs-target="#home" role="tab">Home</button>','  <button type="button" id="triggerProfile" data-bs-target="#profile" role="tab">Profile</button>',"</nav>","<div>",'  <div id="home" role="tabpanel"></div>','  <div id="profile" role="tabpanel"></div>',"</div>"].join("");const a=e.querySelector("#triggerProfile"),n=new Tab(a);a.addEventListener("shown.bs.tab",(()=>{expect(e.querySelector("#profile")).toHaveClass("active"),t()})),n.show()})))),it("should activate element by tab id in list group",(()=>new Promise((t=>{e.innerHTML=['<div class="list-group" role="tablist">','  <button type="button" data-bs-target="#home" role="tab">Home</button>','  <button type="button" id="triggerProfile" data-bs-target="#profile" role="tab">Profile</button>',"</div>","<div>",'  <div id="home" role="tabpanel"></div>','  <div id="profile" role="tabpanel"></div>',"</div>"].join("");const a=e.querySelector("#triggerProfile"),n=new Tab(a);a.addEventListener("shown.bs.tab",(()=>{expect(e.querySelector("#profile")).toHaveClass("active"),t()})),n.show()})))),it("should not fire shown when show is prevented",(()=>new Promise(((t,a)=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const n=e.querySelector(".nav > div"),l=new Tab(n);n.addEventListener("show.bs.tab",(e=>{e.preventDefault(),setTimeout((()=>{expect().nothing(),t()}),30)})),n.addEventListener("shown.bs.tab",(()=>{a(new Error("should not trigger shown event"))})),l.show()})))),it("should not fire shown when tab is already active",(()=>new Promise(((t,a)=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>','  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#profile" class="nav-link" role="tab">Profile</button></li>',"</ul>",'<div class="tab-content">','  <div class="tab-pane active" id="home" role="tabpanel"></div>','  <div class="tab-pane" id="profile" role="tabpanel"></div>',"</div>"].join("");const n=e.querySelector("button.active"),l=new Tab(n);n.addEventListener("shown.bs.tab",(()=>{a(new Error("should not trigger shown event"))})),l.show(),setTimeout((()=>{expect().nothing(),t()}),30)})))),it("show and shown events should reference correct relatedTarget",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>','  <li class="nav-item" role="presentation"><button type="button" id="triggerProfile" data-bs-target="#profile" class="nav-link" role="tab">Profile</button></li>',"</ul>",'<div class="tab-content">','  <div class="tab-pane active" id="home" role="tabpanel"></div>','  <div class="tab-pane" id="profile" role="tabpanel"></div>',"</div>"].join("");const a=e.querySelector("#triggerProfile"),n=new Tab(a);a.addEventListener("show.bs.tab",(e=>{expect(e.relatedTarget.getAttribute("data-bs-target")).toEqual("#home")})),a.addEventListener("shown.bs.tab",(n=>{expect(n.relatedTarget.getAttribute("data-bs-target")).toEqual("#home"),expect(a.getAttribute("aria-selected")).toEqual("true"),expect(e.querySelector("button:not(.active)").getAttribute("aria-selected")).toEqual("false"),t()})),n.show()})))),it("should fire hide and hidden events",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav" role="tablist">','  <li><button type="button" data-bs-target="#home" role="tab">Home</button></li>','  <li><button type="button" data-bs-target="#profile" role="tab">Profile</button></li>',"</ul>"].join("");const a=e.querySelectorAll("button"),n=new Tab(a[0]),l=new Tab(a[1]);let o=!1;a[0].addEventListener("shown.bs.tab",(()=>{l.show()})),a[0].addEventListener("hide.bs.tab",(e=>{o=!0,expect(e.relatedTarget.getAttribute("data-bs-target")).toEqual("#profile")})),a[0].addEventListener("hidden.bs.tab",(e=>{expect(o).toBeTrue(),expect(e.relatedTarget.getAttribute("data-bs-target")).toEqual("#profile"),t()})),n.show()})))),it("should not fire hidden when hide is prevented",(()=>new Promise(((t,a)=>{e.innerHTML=['<ul class="nav" role="tablist">','  <li><button type="button" data-bs-target="#home" role="tab">Home</button></li>','  <li><button type="button" data-bs-target="#profile" role="tab">Profile</button></li>',"</ul>"].join("");const n=e.querySelectorAll("button"),l=new Tab(n[0]),o=new Tab(n[1]);n[0].addEventListener("shown.bs.tab",(()=>{o.show()})),n[0].addEventListener("hide.bs.tab",(e=>{e.preventDefault(),setTimeout((()=>{expect().nothing(),t()}),30)})),n[0].addEventListener("hidden.bs.tab",(()=>{a(new Error("should not trigger hidden"))})),l.show()})))),it("should handle removed tabs",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation">','    <a class="nav-link nav-tab" href="#profile" role="tab" data-bs-toggle="tab">','      <button class="btn-close" aria-label="Close"></button>',"    </a>","  </li>",'  <li class="nav-item" role="presentation">','    <a id="secondNav" class="nav-link nav-tab" href="#buzz" role="tab" data-bs-toggle="tab">','      <button class="btn-close" aria-label="Close"></button>',"    </a>","  </li>",'  <li class="nav-item" role="presentation">','    <a class="nav-link nav-tab" href="#references" role="tab" data-bs-toggle="tab">','      <button id="btnClose" class="btn-close" aria-label="Close"></button>',"    </a>","  </li>","</ul>",'<div class="tab-content">','  <div role="tabpanel" class="tab-pane fade show active" id="profile">test 1</div>','  <div role="tabpanel" class="tab-pane fade" id="buzz">test 2</div>','  <div role="tabpanel" class="tab-pane fade" id="references">test 3</div>',"</div>"].join("");const a=e.querySelector("#secondNav"),n=e.querySelector("#btnClose"),l=new Tab(a);a.addEventListener("shown.bs.tab",(()=>{expect(e.querySelectorAll(".nav-tab")).toHaveSize(2),t()})),n.addEventListener("click",(()=>{const t=n.parentNode,a=t.parentNode,o=t.getAttribute("href"),s=e.querySelector(o);a.remove(),s.remove(),l.show()})),n.click()})))),it("should not focus on opened tab",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav" role="tablist">','  <li><button type="button" id="home" data-bs-target="#home" role="tab">Home</button></li>','  <li><button type="button" id="triggerProfile" data-bs-target="#profile" role="tab">Profile</button></li>',"</ul>","<ul>",'  <li id="home" role="tabpanel"></li>','  <li id="profile" role="tabpanel"></li>',"</ul>"].join("");const a=e.querySelector("#home");a.focus();const n=e.querySelector("#triggerProfile"),l=new Tab(n);n.addEventListener("shown.bs.tab",(()=>{expect(document.activeElement).toBe(a),expect(document.activeElement).not.toBe(n),t()})),l.show()}))))})),describe("dispose",(()=>{it("should dispose a tab",(()=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const t=e.querySelector(".nav > div"),a=new Tab(e.querySelector(".nav > div"));expect(Tab.getInstance(t)).not.toBeNull(),a.dispose(),expect(Tab.getInstance(t)).toBeNull()}))})),describe("_activate",(()=>{it("should not be called if element argument is null",(()=>{e.innerHTML=['<ul class="nav" role="tablist">','  <li class="nav-link"></li>',"</ul>"].join("");const t=e.querySelector(".nav-link"),a=new Tab(t),n=jasmine.createSpy("spy"),l=spyOn(a,"_queueCallback");a._activate(null,n),expect(l).not.toHaveBeenCalled(),expect(n).not.toHaveBeenCalled()}))})),describe("_setInitialAttributes",(()=>{it("should put aria attributes",(()=>{e.innerHTML=['<ul class="nav">','  <li class="nav-link" id="foo" data-bs-target="#panel"></li>','  <li class="nav-link" data-bs-target="#panel2"></li>',"</ul>",'<div id="panel"></div>','<div id="panel2"></div>'].join("");const t=e.querySelector(".nav-link"),a=e.querySelector(".nav"),n=e.querySelectorAll(".nav-link"),l=e.querySelector("#panel"),o=e.querySelector("#panel2");expect(a.getAttribute("role")).toEqual(null),expect(t.getAttribute("role")).toEqual(null),expect(l.getAttribute("role")).toEqual(null),new Tab(t)._setInitialAttributes(a,n),expect(a.getAttribute("role")).toEqual("tablist"),expect(t.getAttribute("role")).toEqual("tab"),expect(l.getAttribute("role")).toEqual("tabpanel"),expect(o.getAttribute("role")).toEqual("tabpanel"),expect(l.hasAttribute("tabindex")).toBeFalse(),expect(l.hasAttribute("tabindex2")).toBeFalse(),expect(l.getAttribute("aria-labelledby")).toEqual("#foo"),expect(o.hasAttribute("aria-labelledby")).toBeFalse()}))})),describe("_keydown",(()=>{it("if event is not one of left/right/up/down arrow, ignore it",(()=>{e.innerHTML=['<ul class="nav">','  <li class="nav-link" data-bs-toggle="tab"></li>',"</ul>"].join("");const t=e.querySelector(".nav-link"),a=new Tab(t),n=createEvent("keydown");n.key="Enter";const l=spyOn(Event.prototype,"stopPropagation").and.callThrough(),o=spyOn(Event.prototype,"preventDefault").and.callThrough(),s=spyOn(a,"_keydown"),i=spyOn(a,"_getChildren");t.dispatchEvent(n),expect(s).toHaveBeenCalled(),expect(i).not.toHaveBeenCalled(),expect(l).not.toHaveBeenCalled(),expect(o).not.toHaveBeenCalled()})),it("if keydown event is right/down arrow, handle it",(()=>{e.innerHTML=['<div class="nav">','  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>','  <span id="tab2" class="nav-link" data-bs-toggle="tab"></span>','  <span id="tab3" class="nav-link" data-bs-toggle="tab"></span>',"</div>"].join("");const t=e.querySelector("#tab1"),a=e.querySelector("#tab2"),n=e.querySelector("#tab3"),l=new Tab(t),o=new Tab(a),s=new Tab(n),i=spyOn(l,"show").and.callThrough(),r=spyOn(o,"show").and.callThrough(),d=spyOn(s,"show").and.callThrough(),c=spyOn(t,"focus").and.callThrough(),b=spyOn(a,"focus").and.callThrough(),v=spyOn(n,"focus").and.callThrough(),u=spyOn(Event.prototype,"stopPropagation").and.callThrough(),p=spyOn(Event.prototype,"preventDefault").and.callThrough();let h=createEvent("keydown");h.key="ArrowRight",t.dispatchEvent(h),expect(r).toHaveBeenCalled(),expect(b).toHaveBeenCalled(),h=createEvent("keydown"),h.key="ArrowDown",a.dispatchEvent(h),expect(d).toHaveBeenCalled(),expect(v).toHaveBeenCalled(),n.dispatchEvent(h),expect(i).toHaveBeenCalled(),expect(c).toHaveBeenCalled(),expect(u).toHaveBeenCalledTimes(3),expect(p).toHaveBeenCalledTimes(3)})),it("if keydown event is left arrow, handle it",(()=>{e.innerHTML=['<div class="nav">','  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>','  <span id="tab2" class="nav-link" data-bs-toggle="tab"></span>',"</div>"].join("");const t=e.querySelector("#tab1"),a=e.querySelector("#tab2"),n=new Tab(t),l=new Tab(a),o=spyOn(n,"show").and.callThrough(),s=spyOn(l,"show").and.callThrough(),i=spyOn(t,"focus").and.callThrough(),r=spyOn(a,"focus").and.callThrough(),d=spyOn(Event.prototype,"stopPropagation").and.callThrough(),c=spyOn(Event.prototype,"preventDefault").and.callThrough();let b=createEvent("keydown");b.key="ArrowLeft",a.dispatchEvent(b),expect(o).toHaveBeenCalled(),expect(i).toHaveBeenCalled(),b=createEvent("keydown"),b.key="ArrowUp",t.dispatchEvent(b),expect(s).toHaveBeenCalled(),expect(r).toHaveBeenCalled(),expect(d).toHaveBeenCalledTimes(2),expect(c).toHaveBeenCalledTimes(2)})),it("if keydown event is right arrow and next element is disabled",(()=>{e.innerHTML=['<div class="nav">','  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>','  <span id="tab2" class="nav-link" data-bs-toggle="tab" disabled></span>','  <span id="tab3" class="nav-link disabled" data-bs-toggle="tab"></span>','  <span id="tab4" class="nav-link" data-bs-toggle="tab"></span>',"</div>"].join("");const t=e.querySelector("#tab1"),a=e.querySelector("#tab2"),n=e.querySelector("#tab3"),l=e.querySelector("#tab4"),o=new Tab(t),s=new Tab(a),i=new Tab(n),r=new Tab(l),d=spyOn(o,"show").and.callThrough(),c=spyOn(s,"show").and.callThrough(),b=spyOn(i,"show").and.callThrough(),v=spyOn(r,"show").and.callThrough(),u=spyOn(t,"focus").and.callThrough(),p=spyOn(a,"focus").and.callThrough(),h=spyOn(n,"focus").and.callThrough(),g=spyOn(l,"focus").and.callThrough(),w=createEvent("keydown");w.key="ArrowRight",t.dispatchEvent(w),expect(d).not.toHaveBeenCalled(),expect(c).not.toHaveBeenCalled(),expect(b).not.toHaveBeenCalled(),expect(v).toHaveBeenCalledTimes(1),expect(u).not.toHaveBeenCalled(),expect(p).not.toHaveBeenCalled(),expect(h).not.toHaveBeenCalled(),expect(g).toHaveBeenCalledTimes(1)})),it("if keydown event is left arrow and next element is disabled",(()=>{e.innerHTML=['<div class="nav">','  <span id="tab1" class="nav-link" data-bs-toggle="tab"></span>','  <span id="tab2" class="nav-link" data-bs-toggle="tab" disabled></span>','  <span id="tab3" class="nav-link disabled" data-bs-toggle="tab"></span>','  <span id="tab4" class="nav-link" data-bs-toggle="tab"></span>',"</div>"].join("");const t=e.querySelector("#tab1"),a=e.querySelector("#tab2"),n=e.querySelector("#tab3"),l=e.querySelector("#tab4"),o=new Tab(t),s=new Tab(a),i=new Tab(n),r=new Tab(l),d=spyOn(o,"show").and.callThrough(),c=spyOn(s,"show").and.callThrough(),b=spyOn(i,"show").and.callThrough(),v=spyOn(r,"show").and.callThrough(),u=spyOn(t,"focus").and.callThrough(),p=spyOn(a,"focus").and.callThrough(),h=spyOn(n,"focus").and.callThrough(),g=spyOn(l,"focus").and.callThrough(),w=createEvent("keydown");w.key="ArrowLeft",l.dispatchEvent(w),expect(v).not.toHaveBeenCalled(),expect(b).not.toHaveBeenCalled(),expect(c).not.toHaveBeenCalled(),expect(d).toHaveBeenCalledTimes(1),expect(g).not.toHaveBeenCalled(),expect(h).not.toHaveBeenCalled(),expect(p).not.toHaveBeenCalled(),expect(u).toHaveBeenCalledTimes(1)}))})),describe("jQueryInterface",(()=>{it("should create a tab",(()=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const t=e.querySelector(".nav > div");jQueryMock.fn.tab=Tab.jQueryInterface,jQueryMock.elements=[t],jQueryMock.fn.tab.call(jQueryMock),expect(Tab.getInstance(t)).not.toBeNull()})),it("should not re create a tab",(()=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const t=e.querySelector(".nav > div"),a=new Tab(t);jQueryMock.fn.tab=Tab.jQueryInterface,jQueryMock.elements=[t],jQueryMock.fn.tab.call(jQueryMock),expect(Tab.getInstance(t)).toEqual(a)})),it("should call a tab method",(()=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const t=e.querySelector(".nav > div"),a=new Tab(t),n=spyOn(a,"show");jQueryMock.fn.tab=Tab.jQueryInterface,jQueryMock.elements=[t],jQueryMock.fn.tab.call(jQueryMock,"show"),expect(Tab.getInstance(t)).toEqual(a),expect(n).toHaveBeenCalled()})),it("should throw error on undefined method",(()=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const t=e.querySelector(".nav > div"),a="undefinedMethod";jQueryMock.fn.tab=Tab.jQueryInterface,jQueryMock.elements=[t],expect((()=>{jQueryMock.fn.tab.call(jQueryMock,a)})).toThrowError(TypeError,`No method named "${a}"`)}))})),describe("getInstance",(()=>{it("should return null if there is no instance",(()=>{expect(Tab.getInstance(e)).toBeNull()})),it("should return this instance",(()=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const t=e.querySelector(".nav > div"),a=new Tab(t);expect(Tab.getInstance(t)).toEqual(a),expect(Tab.getInstance(t)).toBeInstanceOf(Tab)}))})),describe("getOrCreateInstance",(()=>{it("should return tab instance",(()=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const t=e.querySelector("div"),a=new Tab(t);expect(Tab.getOrCreateInstance(t)).toEqual(a),expect(Tab.getInstance(t)).toEqual(Tab.getOrCreateInstance(t,{})),expect(Tab.getOrCreateInstance(t)).toBeInstanceOf(Tab)})),it("should return new instance when there is no tab instance",(()=>{e.innerHTML='<div class="nav"><div class="nav-link"></div></div>';const t=e.querySelector("div");expect(Tab.getInstance(t)).toBeNull(),expect(Tab.getOrCreateInstance(t)).toBeInstanceOf(Tab)}))})),describe("data-api",(()=>{it("should create dynamically a tab",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>','  <li class="nav-item" role="presentation"><button type="button" id="triggerProfile" data-bs-toggle="tab" data-bs-target="#profile" class="nav-link" role="tab">Profile</button></li>',"</ul>",'<div class="tab-content">','  <div class="tab-pane active" id="home" role="tabpanel"></div>','  <div class="tab-pane" id="profile" role="tabpanel"></div>',"</div>"].join("");const a=e.querySelector("#triggerProfile");a.addEventListener("shown.bs.tab",(()=>{expect(a).toHaveClass("active"),expect(e.querySelector("#profile")).toHaveClass("active"),t()})),a.click()})))),it("selected tab should deactivate previous selected link in dropdown",(()=>{e.innerHTML=['<ul class="nav nav-tabs">','  <li class="nav-item"><a class="nav-link" href="#home" data-bs-toggle="tab">Home</a></li>','  <li class="nav-item"><a class="nav-link" href="#profile" data-bs-toggle="tab">Profile</a></li>','  <li class="nav-item dropdown">','    <a class="nav-link dropdown-toggle active" data-bs-toggle="dropdown" href="#">Dropdown</a>','    <div class="dropdown-menu">','      <a class="dropdown-item active" href="#dropdown1" id="dropdown1-tab" data-bs-toggle="tab">@fat</a>','      <a class="dropdown-item" href="#dropdown2" id="dropdown2-tab" data-bs-toggle="tab">@mdo</a>',"    </div>","  </li>","</ul>"].join("");const t=e.querySelector("li:first-child a");t.click(),expect(t).toHaveClass("active"),expect(e.querySelector("li:last-child a")).not.toHaveClass("active"),expect(e.querySelector("li:last-child .dropdown-menu a:first-child")).not.toHaveClass("active")})),it("selecting a dropdown tab does not activate another",(()=>{const t=['<ul class="nav nav-tabs" id="nav1">','  <li class="nav-item active"><a class="nav-link" href="#home" data-bs-toggle="tab">Home</a></li>','  <li class="nav-item dropdown">','    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Dropdown</a>','    <div class="dropdown-menu">','      <a class="dropdown-item" href="#dropdown1" id="dropdown1-tab" data-bs-toggle="tab">@fat</a>',"    </div>","  </li>","</ul>"].join(""),a=['<ul class="nav nav-tabs" id="nav2">','  <li class="nav-item active"><a class="nav-link" href="#home" data-bs-toggle="tab">Home</a></li>','  <li class="nav-item dropdown">','    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Dropdown</a>','    <div class="dropdown-menu">','      <a class="dropdown-item" href="#dropdown1" id="dropdown1-tab" data-bs-toggle="tab">@fat</a>',"    </div>","  </li>","</ul>"].join("");e.innerHTML=t+a;const n=e.querySelector("#nav1 .dropdown-item");n.click(),expect(n).toHaveClass("active"),expect(e.querySelector("#nav1 .dropdown-toggle")).toHaveClass("active"),expect(e.querySelector("#nav2 .dropdown-toggle")).not.toHaveClass("active"),expect(e.querySelector("#nav2 .dropdown-item")).not.toHaveClass("active")})),it("should support li > .dropdown-item",(()=>{e.innerHTML=['<ul class="nav nav-tabs">','  <li class="nav-item"><a class="nav-link active" href="#home" data-bs-toggle="tab">Home</a></li>','  <li class="nav-item"><a class="nav-link" href="#profile" data-bs-toggle="tab">Profile</a></li>','  <li class="nav-item dropdown">','    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">Dropdown</a>','    <ul class="dropdown-menu">','      <li><a class="dropdown-item" href="#dropdown1" id="dropdown1-tab" data-bs-toggle="tab">@fat</a></li>','      <li><a class="dropdown-item" href="#dropdown2" id="dropdown2-tab" data-bs-toggle="tab">@mdo</a></li>',"    </ul>","  </li>","</ul>"].join("");const t=e.querySelectorAll(".dropdown-item");t[1].click(),expect(t[0]).not.toHaveClass("active"),expect(t[1]).toHaveClass("active"),expect(e.querySelector(".nav-link")).not.toHaveClass("active")})),it("should handle nested tabs",(()=>new Promise((t=>{e.innerHTML=['<nav class="nav nav-tabs" role="tablist">','  <button type="button" id="tab1" data-bs-target="#x-tab1" class="nav-link" data-bs-toggle="tab" role="tab" aria-controls="x-tab1">Tab 1</button>','  <button type="button" data-bs-target="#x-tab2" class="nav-link active" data-bs-toggle="tab" role="tab" aria-controls="x-tab2" aria-selected="true">Tab 2</button>','  <button type="button" data-bs-target="#x-tab3" class="nav-link" data-bs-toggle="tab" role="tab" aria-controls="x-tab3">Tab 3</button>',"</nav>",'<div class="tab-content">','  <div class="tab-pane" id="x-tab1" role="tabpanel">','    <nav class="nav nav-tabs" role="tablist">','      <button type="button" data-bs-target="#nested-tab1" class="nav-link active" data-bs-toggle="tab" role="tab" aria-controls="x-tab1" aria-selected="true">Nested Tab 1</button>','      <button type="button" id="tabNested2" data-bs-target="#nested-tab2" class="nav-link" data-bs-toggle="tab" role="tab" aria-controls="x-profile">Nested Tab2</button>',"    </nav>",'    <div class="tab-content">','      <div class="tab-pane active" id="nested-tab1" role="tabpanel">Nested Tab1 Content</div>','      <div class="tab-pane" id="nested-tab2" role="tabpanel">Nested Tab2 Content</div>',"    </div>","  </div>",'  <div class="tab-pane active" id="x-tab2" role="tabpanel">Tab2 Content</div>','  <div class="tab-pane" id="x-tab3" role="tabpanel">Tab3 Content</div>',"</div>"].join("");const a=e.querySelector("#tab1"),n=e.querySelector("#tabNested2"),l=e.querySelector("#x-tab1");n.addEventListener("shown.bs.tab",(()=>{expect(l).toHaveClass("active"),t()})),a.addEventListener("shown.bs.tab",(()=>{expect(l).toHaveClass("active"),n.click()})),a.click()})))),it("should not remove fade class if no active pane is present",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation"><button type="button" id="tab-home" data-bs-target="#home" class="nav-link" data-bs-toggle="tab" role="tab">Home</button></li>','  <li class="nav-item" role="presentation"><button type="button" id="tab-profile" data-bs-target="#profile" class="nav-link" data-bs-toggle="tab" role="tab">Profile</button></li>',"</ul>",'<div class="tab-content">','  <div class="tab-pane fade" id="home" role="tabpanel"></div>','  <div class="tab-pane fade" id="profile" role="tabpanel"></div>',"</div>"].join("");const a=e.querySelector("#tab-profile"),n=e.querySelector("#tab-home"),l=e.querySelector("#profile"),o=e.querySelector("#home");n.addEventListener("shown.bs.tab",(()=>{setTimeout((()=>{expect(l).toHaveClass("fade"),expect(l).not.toHaveClass("show"),expect(o).toHaveClass("fade"),expect(o).toHaveClass("show"),t()}),10)})),a.addEventListener("shown.bs.tab",(()=>{setTimeout((()=>{expect(l).toHaveClass("fade"),expect(l).toHaveClass("show"),n.click()}),10)})),a.click()})))),it("should add `show` class to tab panes if there is no `.fade` class",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation">','    <button type="button" class="nav-link nav-tab" data-bs-target="#home" role="tab" data-bs-toggle="tab">Home</button>',"  </li>",'  <li class="nav-item" role="presentation">','    <button type="button" id="secondNav" class="nav-link nav-tab" data-bs-target="#profile" role="tab" data-bs-toggle="tab">Profile</button>',"  </li>","</ul>",'<div class="tab-content">','  <div role="tabpanel" class="tab-pane" id="home">test 1</div>','  <div role="tabpanel" class="tab-pane" id="profile">test 2</div>',"</div>"].join("");const a=e.querySelector("#secondNav");a.addEventListener("shown.bs.tab",(()=>{expect(e.querySelectorAll(".tab-content .show")).toHaveSize(1),t()})),a.click()})))),it("should add show class to tab panes if there is a `.fade` class",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation">','    <button type="button" class="nav-link nav-tab" data-bs-target="#home" role="tab" data-bs-toggle="tab">Home</button>',"  </li>",'  <li class="nav-item" role="presentation">','    <button type="button" id="secondNav" class="nav-link nav-tab" data-bs-target="#profile" role="tab" data-bs-toggle="tab">Profile</button>',"  </li>","</ul>",'<div class="tab-content">','  <div role="tabpanel" class="tab-pane fade" id="home">test 1</div>','  <div role="tabpanel" class="tab-pane fade" id="profile">test 2</div>',"</div>"].join("");const a=e.querySelector("#secondNav");a.addEventListener("shown.bs.tab",(()=>{setTimeout((()=>{expect(e.querySelectorAll(".show")).toHaveSize(1),t()}),10)})),a.click()})))),it("should prevent default when the trigger is <a> or <area>",(()=>new Promise((t=>{e.innerHTML=['<ul class="nav" role="tablist">','  <li><a type="button" href="#test"  class="active" role="tab" data-bs-toggle="tab">Home</a></li>','  <li><a type="button" href="#test2" role="tab" data-bs-toggle="tab">Home</a></li>',"</ul>"].join("");const a=e.querySelector('[href="#test2"]'),n=spyOn(Event.prototype,"preventDefault").and.callThrough();a.addEventListener("shown.bs.tab",(()=>{expect(a).toHaveClass("active"),expect(n).toHaveBeenCalled(),t()})),a.click()})))),it("should not fire shown when tab has disabled attribute",(()=>new Promise(((t,a)=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#home" class="nav-link active" role="tab" aria-selected="true">Home</button></li>','  <li class="nav-item" role="presentation"><button type="button" data-bs-target="#profile" class="nav-link" disabled role="tab">Profile</button></li>',"</ul>",'<div class="tab-content">','  <div class="tab-pane active" id="home" role="tabpanel"></div>','  <div class="tab-pane" id="profile" role="tabpanel"></div>',"</div>"].join("");const n=e.querySelector("button[disabled]");n.addEventListener("shown.bs.tab",(()=>{a(new Error("should not trigger shown event"))})),n.click(),setTimeout((()=>{expect().nothing(),t()}),30)})))),it("should not fire shown when tab has disabled class",(()=>new Promise(((t,a)=>{e.innerHTML=['<ul class="nav nav-tabs" role="tablist">','  <li class="nav-item" role="presentation"><a href="#home" class="nav-link active" role="tab" aria-selected="true">Home</a></li>','  <li class="nav-item" role="presentation"><a href="#profile" class="nav-link disabled" role="tab">Profile</a></li>',"</ul>",'<div class="tab-content">','  <div class="tab-pane active" id="home" role="tabpanel"></div>','  <div class="tab-pane" id="profile" role="tabpanel"></div>',"</div>"].join("");const n=e.querySelector("a.disabled");n.addEventListener("shown.bs.tab",(()=>{a(new Error("should not trigger shown event"))})),n.click(),setTimeout((()=>{expect().nothing(),t()}),30)}))))}))}));