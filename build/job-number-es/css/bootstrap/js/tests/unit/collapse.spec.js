import Collapse from"../../src/collapse";import EventHandler from"../../src/dom/event-handler";import{clearFixture,getFixture,jQueryMock}from"../helpers/fixture";describe("Collapse",(()=>{let e;beforeAll((()=>{e=getFixture()})),afterEach((()=>{clearFixture()})),describe("VERSION",(()=>{it("should return plugin version",(()=>{expect(Collapse.VERSION).toEqual(jasmine.any(String))}))})),describe("Default",(()=>{it("should return plugin default config",(()=>{expect(Collapse.Default).toEqual(jasmine.any(Object))}))})),describe("DATA_KEY",(()=>{it("should return plugin data key",(()=>{expect(Collapse.DATA_KEY).toEqual("bs.collapse")}))})),describe("constructor",(()=>{it("should take care of element either passed as a CSS selector or DOM element",(()=>{e.innerHTML='<div class="my-collapse"></div>';const l=e.querySelector("div.my-collapse"),a=new Collapse("div.my-collapse"),t=new Collapse(l);expect(a._element).toEqual(l),expect(t._element).toEqual(l)})),it("should allow jquery object in parent config",(()=>{e.innerHTML=['<div class="my-collapse">','  <div class="item">','    <a data-bs-toggle="collapse" href="#">Toggle item</a>','    <div class="collapse">Lorem ipsum</div>',"  </div>","</div>"].join("");const l=e.querySelector("div.collapse"),a=e.querySelector(".my-collapse"),t=new Collapse(l,{parent:{0:a,jquery:"foo"}});expect(t._config.parent).toEqual(a)})),it("should allow non jquery object in parent config",(()=>{e.innerHTML=['<div class="my-collapse">','  <div class="item">','    <a data-bs-toggle="collapse" href="#">Toggle item</a>','    <div class="collapse">Lorem ipsum</div>',"  </div>","</div>"].join("");const l=e.querySelector("div.collapse"),a=e.querySelector(".my-collapse"),t=new Collapse(l,{parent:a});expect(t._config.parent).toEqual(a)})),it("should allow string selector in parent config",(()=>{e.innerHTML=['<div class="my-collapse">','  <div class="item">','    <a data-bs-toggle="collapse" href="#">Toggle item</a>','    <div class="collapse">Lorem ipsum</div>',"  </div>","</div>"].join("");const l=e.querySelector("div.collapse"),a=e.querySelector(".my-collapse"),t=new Collapse(l,{parent:"div.my-collapse"});expect(t._config.parent).toEqual(a)}))})),describe("toggle",(()=>{it("should call show method if show class is not present",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div"),a=new Collapse(l),t=spyOn(a,"show");a.toggle(),expect(t).toHaveBeenCalled()})),it("should call hide method if show class is present",(()=>{e.innerHTML='<div class="show"></div>';const l=e.querySelector(".show"),a=new Collapse(l,{toggle:!1}),t=spyOn(a,"hide");a.toggle(),expect(t).toHaveBeenCalled()})),it("should find collapse children if they have collapse class too not only data-bs-parent",(()=>new Promise((l=>{e.innerHTML=['<div class="my-collapse">','  <div class="item">','    <a data-bs-toggle="collapse" href="#">Toggle item 1</a>','    <div id="collapse1" class="collapse show">Lorem ipsum 1</div>',"  </div>",'  <div class="item">','    <a id="triggerCollapse2" data-bs-toggle="collapse" href="#">Toggle item 2</a>','    <div id="collapse2" class="collapse">Lorem ipsum 2</div>',"  </div>","</div>"].join("");const a=e.querySelector(".my-collapse"),t=e.querySelector("#collapse1"),o=e.querySelector("#collapse2"),s=[].concat(...e.querySelectorAll(".collapse")).map((e=>new Collapse(e,{parent:a,toggle:!1})));o.addEventListener("shown.bs.collapse",(()=>{expect(o).toHaveClass("show"),expect(t).not.toHaveClass("show"),l()})),s[1].toggle()}))))})),describe("show",(()=>{it("should do nothing if is transitioning",(()=>{e.innerHTML="<div></div>";const l=spyOn(EventHandler,"trigger"),a=e.querySelector("div"),t=new Collapse(a,{toggle:!1});t._isTransitioning=!0,t.show(),expect(l).not.toHaveBeenCalled()})),it("should do nothing if already shown",(()=>{e.innerHTML='<div class="show"></div>';const l=spyOn(EventHandler,"trigger"),a=e.querySelector("div");new Collapse(a,{toggle:!1}).show(),expect(l).not.toHaveBeenCalled()})),it("should show a collapsed element",(()=>new Promise((l=>{e.innerHTML='<div class="collapse" style="height: 0px;"></div>';const a=e.querySelector("div"),t=new Collapse(a,{toggle:!1});a.addEventListener("show.bs.collapse",(()=>{expect(a.style.height).toEqual("0px")})),a.addEventListener("shown.bs.collapse",(()=>{expect(a).toHaveClass("show"),expect(a.style.height).toEqual(""),l()})),t.show()})))),it("should show a collapsed element on width",(()=>new Promise((l=>{e.innerHTML='<div class="collapse collapse-horizontal" style="width: 0px;"></div>';const a=e.querySelector("div"),t=new Collapse(a,{toggle:!1});a.addEventListener("show.bs.collapse",(()=>{expect(a.style.width).toEqual("0px")})),a.addEventListener("shown.bs.collapse",(()=>{expect(a).toHaveClass("show"),expect(a.style.width).toEqual(""),l()})),t.show()})))),it("should collapse only the first collapse",(()=>new Promise((l=>{e.innerHTML=['<div class="card" id="accordion1">','  <div id="collapse1" class="collapse"></div>',"</div>",'<div class="card" id="accordion2">','  <div id="collapse2" class="collapse show"></div>',"</div>"].join("");const a=e.querySelector("#collapse1"),t=e.querySelector("#collapse2"),o=new Collapse(a,{toggle:!1});a.addEventListener("shown.bs.collapse",(()=>{expect(a).toHaveClass("show"),expect(t).toHaveClass("show"),l()})),o.show()})))),it("should be able to handle toggling of other children siblings",(()=>new Promise((l=>{e.innerHTML=['<div id="parentGroup" class="accordion">','  <div id="parentHeader" class="accordion-header">','    <button data-bs-target="#parentContent" data-bs-toggle="collapse" role="button" class="accordion-toggle">Parent</button>',"  </div>",'  <div id="parentContent" class="accordion-collapse collapse" aria-labelledby="parentHeader" data-bs-parent="#parentGroup">','    <div class="accordion-body">','      <div id="childGroup" class="accordion">','        <div class="accordion-item">','          <div id="childHeader1" class="accordion-header">','            <button data-bs-target="#childContent1" data-bs-toggle="collapse" role="button" class="accordion-toggle">Child 1</button>',"          </div>",'          <div id="childContent1" class="accordion-collapse collapse" aria-labelledby="childHeader1" data-bs-parent="#childGroup">',"            <div>content</div>","          </div>","        </div>",'        <div class="accordion-item">','          <div id="childHeader2" class="accordion-header">','            <button data-bs-target="#childContent2" data-bs-toggle="collapse" role="button" class="accordion-toggle">Child 2</button>',"          </div>",'          <div id="childContent2" class="accordion-collapse collapse" aria-labelledby="childHeader2" data-bs-parent="#childGroup">',"            <div>content</div>","          </div>","        </div>","      </div>","    </div>","  </div>","</div>"].join("");const a=l=>e.querySelector(l),t=a('[data-bs-target="#parentContent"]'),o=a('[data-bs-target="#childContent1"]'),s=a('[data-bs-target="#childContent2"]'),n=a("#parentContent"),i=a("#childContent1"),c=a("#childContent2");n.addEventListener("shown.bs.collapse",(()=>{expect(n).toHaveClass("show"),o.click()})),i.addEventListener("shown.bs.collapse",(()=>{expect(i).toHaveClass("show"),s.click()})),c.addEventListener("shown.bs.collapse",(()=>{expect(c).toHaveClass("show"),expect(i).not.toHaveClass("show"),l()})),t.click()})))),it("should not change tab tabpanels descendants on accordion",(()=>new Promise((l=>{e.innerHTML=['<div class="accordion" id="accordionExample">','  <div class="accordion-item">','    <h2 class="accordion-header" id="headingOne">','      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">',"        Accordion Item #1","      </button>","    </h2>",'    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">','      <div class="accordion-body">',"        <nav>",'          <div class="nav nav-tabs" id="nav-tab" role="tablist">','            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>','            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>',"          </div>","        </nav>",'        <div class="tab-content" id="nav-tabContent">','          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">Home</div>','          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">Profile</div>',"        </div>","      </div>","    </div>","  </div>","</div>"].join("");const a=e.querySelector("#collapseOne"),t=e.querySelector("#nav-home"),o=new Collapse(a);let s=1;a.addEventListener("hidden.bs.collapse",(()=>{o.show()})),a.addEventListener("shown.bs.collapse",(()=>{expect(t).toHaveClass("show"),s++,2===s&&l(),o.hide()})),o.show()})))),it("should not fire shown when show is prevented",(()=>new Promise(((l,a)=>{e.innerHTML='<div class="collapse"></div>';const t=e.querySelector("div"),o=new Collapse(t,{toggle:!1});t.addEventListener("show.bs.collapse",(e=>{e.preventDefault(),setTimeout((()=>{expect().nothing(),l()}),10)})),t.addEventListener("shown.bs.collapse",(()=>{a(new Error("should not fire shown event"))})),o.show()}))))})),describe("hide",(()=>{it("should do nothing if is transitioning",(()=>{e.innerHTML="<div></div>";const l=spyOn(EventHandler,"trigger"),a=e.querySelector("div"),t=new Collapse(a,{toggle:!1});t._isTransitioning=!0,t.hide(),expect(l).not.toHaveBeenCalled()})),it("should do nothing if already shown",(()=>{e.innerHTML="<div></div>";const l=spyOn(EventHandler,"trigger"),a=e.querySelector("div");new Collapse(a,{toggle:!1}).hide(),expect(l).not.toHaveBeenCalled()})),it("should hide a collapsed element",(()=>new Promise((l=>{e.innerHTML='<div class="collapse show"></div>';const a=e.querySelector("div"),t=new Collapse(a,{toggle:!1});a.addEventListener("hidden.bs.collapse",(()=>{expect(a).not.toHaveClass("show"),expect(a.style.height).toEqual(""),l()})),t.hide()})))),it("should not fire hidden when hide is prevented",(()=>new Promise(((l,a)=>{e.innerHTML='<div class="collapse show"></div>';const t=e.querySelector("div"),o=new Collapse(t,{toggle:!1});t.addEventListener("hide.bs.collapse",(e=>{e.preventDefault(),setTimeout((()=>{expect().nothing(),l()}),10)})),t.addEventListener("hidden.bs.collapse",(()=>{a(new Error("should not fire hidden event"))})),o.hide()}))))})),describe("dispose",(()=>{it("should destroy a collapse",(()=>{e.innerHTML='<div class="collapse show"></div>';const l=e.querySelector("div"),a=new Collapse(l,{toggle:!1});expect(Collapse.getInstance(l)).toEqual(a),a.dispose(),expect(Collapse.getInstance(l)).toBeNull()}))})),describe("data-api",(()=>{it("should prevent url change if click on nested elements",(()=>new Promise((l=>{e.innerHTML=['<a role="button" data-bs-toggle="collapse" class="collapsed" href="#collapse">','  <span id="nested"></span>',"</a>",'<div id="collapse" class="collapse"></div>'].join("");const a=e.querySelector("a"),t=e.querySelector("#nested"),o=spyOn(Event.prototype,"preventDefault").and.callThrough();a.addEventListener("click",(e=>{expect(e.target.isEqualNode(t)).toBeTrue(),expect(e.delegateTarget.isEqualNode(a)).toBeTrue(),expect(o).toHaveBeenCalled(),l()})),t.click()})))),it("should show multiple collapsed elements",(()=>new Promise((l=>{e.innerHTML=['<a role="button" data-bs-toggle="collapse" class="collapsed" href=".multi"></a>','<div id="collapse1" class="collapse multi"></div>','<div id="collapse2" class="collapse multi"></div>'].join("");const a=e.querySelector("a"),t=e.querySelector("#collapse1");e.querySelector("#collapse2").addEventListener("shown.bs.collapse",(()=>{expect(a.getAttribute("aria-expanded")).toEqual("true"),expect(a).not.toHaveClass("collapsed"),expect(t).toHaveClass("show"),expect(t).toHaveClass("show"),l()})),a.click()})))),it("should hide multiple collapsed elements",(()=>new Promise((l=>{e.innerHTML=['<a role="button" data-bs-toggle="collapse" href=".multi"></a>','<div id="collapse1" class="collapse multi show"></div>','<div id="collapse2" class="collapse multi show"></div>'].join("");const a=e.querySelector("a"),t=e.querySelector("#collapse1");e.querySelector("#collapse2").addEventListener("hidden.bs.collapse",(()=>{expect(a.getAttribute("aria-expanded")).toEqual("false"),expect(a).toHaveClass("collapsed"),expect(t).not.toHaveClass("show"),expect(t).not.toHaveClass("show"),l()})),a.click()})))),it('should remove "collapsed" class from target when collapse is shown',(()=>new Promise((l=>{e.innerHTML=['<a id="link1" role="button" data-bs-toggle="collapse" class="collapsed" href="#" data-bs-target="#test1"></a>','<a id="link2" role="button" data-bs-toggle="collapse" class="collapsed" href="#" data-bs-target="#test1"></a>','<div id="test1"></div>'].join("");const a=e.querySelector("#link1"),t=e.querySelector("#link2");e.querySelector("#test1").addEventListener("shown.bs.collapse",(()=>{expect(a.getAttribute("aria-expanded")).toEqual("true"),expect(t.getAttribute("aria-expanded")).toEqual("true"),expect(a).not.toHaveClass("collapsed"),expect(t).not.toHaveClass("collapsed"),l()})),a.click()})))),it('should add "collapsed" class to target when collapse is hidden',(()=>new Promise((l=>{e.innerHTML=['<a id="link1" role="button" data-bs-toggle="collapse" href="#" data-bs-target="#test1"></a>','<a id="link2" role="button" data-bs-toggle="collapse" href="#" data-bs-target="#test1"></a>','<div id="test1" class="show"></div>'].join("");const a=e.querySelector("#link1"),t=e.querySelector("#link2");e.querySelector("#test1").addEventListener("hidden.bs.collapse",(()=>{expect(a.getAttribute("aria-expanded")).toEqual("false"),expect(t.getAttribute("aria-expanded")).toEqual("false"),expect(a).toHaveClass("collapsed"),expect(t).toHaveClass("collapsed"),l()})),a.click()})))),it("should allow accordion to use children other than card",(()=>new Promise((l=>{e.innerHTML=['<div id="accordion">','  <div class="item">','    <a id="linkTrigger" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"></a>','    <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-bs-parent="#accordion"></div>',"  </div>",'  <div class="item">','    <a id="linkTriggerTwo" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"></a>','    <div id="collapseTwo" class="collapse show" role="tabpanel" aria-labelledby="headingTwo" data-bs-parent="#accordion"></div>',"  </div>","</div>"].join("");const a=e.querySelector("#linkTrigger"),t=e.querySelector("#linkTriggerTwo"),o=e.querySelector("#collapseOne"),s=e.querySelector("#collapseTwo");o.addEventListener("shown.bs.collapse",(()=>{expect(o).toHaveClass("show"),expect(s).not.toHaveClass("show"),s.addEventListener("shown.bs.collapse",(()=>{expect(o).not.toHaveClass("show"),expect(s).toHaveClass("show"),l()})),t.click()})),a.click()})))),it("should not prevent event for input",(()=>new Promise((l=>{e.innerHTML=['<input type="checkbox" data-bs-toggle="collapse" data-bs-target="#collapsediv1">','<div id="collapsediv1"></div>'].join("");const a=e.querySelector("input"),t=e.querySelector("#collapsediv1");t.addEventListener("shown.bs.collapse",(()=>{expect(t).toHaveClass("show"),expect(a.checked).toBeTrue(),l()})),a.click()})))),it("should allow accordion to contain nested elements",(()=>new Promise((l=>{e.innerHTML=['<div id="accordion">','  <div class="row">','    <div class="col-lg-6">','      <div class="item">','        <a id="linkTrigger" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"></a>','        <div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-bs-parent="#accordion"></div>',"      </div>","    </div>",'    <div class="col-lg-6">','      <div class="item">','        <a id="linkTriggerTwo" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"></a>','        <div id="collapseTwo" class="collapse show" role="tabpanel" aria-labelledby="headingTwo" data-bs-parent="#accordion"></div>',"      </div>","    </div>","  </div>","</div>"].join("");const a=e.querySelector("#linkTrigger"),t=e.querySelector("#linkTriggerTwo"),o=e.querySelector("#collapseOne"),s=e.querySelector("#collapseTwo");o.addEventListener("shown.bs.collapse",(()=>{expect(o).toHaveClass("show"),expect(a).not.toHaveClass("collapsed"),expect(a.getAttribute("aria-expanded")).toEqual("true"),expect(s).not.toHaveClass("show"),expect(t).toHaveClass("collapsed"),expect(t.getAttribute("aria-expanded")).toEqual("false"),s.addEventListener("shown.bs.collapse",(()=>{expect(o).not.toHaveClass("show"),expect(a).toHaveClass("collapsed"),expect(a.getAttribute("aria-expanded")).toEqual("false"),expect(s).toHaveClass("show"),expect(t).not.toHaveClass("collapsed"),expect(t.getAttribute("aria-expanded")).toEqual("true"),l()})),t.click()})),a.click()})))),it("should allow accordion to target multiple elements",(()=>new Promise((l=>{e.innerHTML=['<div id="accordion">','  <a id="linkTriggerOne" data-bs-toggle="collapse" data-bs-target=".collapseOne" href="#" aria-expanded="false" aria-controls="collapseOne"></a>','  <a id="linkTriggerTwo" data-bs-toggle="collapse" data-bs-target=".collapseTwo" href="#" aria-expanded="false" aria-controls="collapseTwo"></a>','  <div id="collapseOneOne" class="collapse collapseOne" role="tabpanel" data-bs-parent="#accordion"></div>','  <div id="collapseOneTwo" class="collapse collapseOne" role="tabpanel" data-bs-parent="#accordion"></div>','  <div id="collapseTwoOne" class="collapse collapseTwo" role="tabpanel" data-bs-parent="#accordion"></div>','  <div id="collapseTwoTwo" class="collapse collapseTwo" role="tabpanel" data-bs-parent="#accordion"></div>',"</div>"].join("");const a=e.querySelector("#linkTriggerOne"),t=e.querySelector("#linkTriggerTwo"),o=e.querySelector("#collapseOneOne"),s=e.querySelector("#collapseOneTwo"),n=e.querySelector("#collapseTwoOne"),i=e.querySelector("#collapseTwoTwo"),c={one:!1,two:!1};function d(){expect(o).toHaveClass("show"),expect(s).toHaveClass("show"),expect(n).not.toHaveClass("show"),expect(i).not.toHaveClass("show"),t.click()}function r(){expect(o).not.toHaveClass("show"),expect(s).not.toHaveClass("show"),expect(n).toHaveClass("show"),expect(i).toHaveClass("show"),l()}o.addEventListener("shown.bs.collapse",(()=>{c.one?d():c.one=!0})),s.addEventListener("shown.bs.collapse",(()=>{c.one?d():c.one=!0})),n.addEventListener("shown.bs.collapse",(()=>{c.two?r():c.two=!0})),i.addEventListener("shown.bs.collapse",(()=>{c.two?r():c.two=!0})),a.click()})))),it("should collapse accordion children but not nested accordion children",(()=>new Promise((l=>{e.innerHTML=['<div id="accordion">','  <div class="item">','    <a id="linkTrigger" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"></a>','    <div id="collapseOne" data-bs-parent="#accordion" class="collapse" role="tabpanel" aria-labelledby="headingThree">','      <div id="nestedAccordion">','        <div class="item">','          <a id="nestedLinkTrigger" data-bs-toggle="collapse" href="#nestedCollapseOne" aria-expanded="false" aria-controls="nestedCollapseOne"></a>','          <div id="nestedCollapseOne" data-bs-parent="#nestedAccordion" class="collapse" role="tabpanel" aria-labelledby="headingThree"></div>',"        </div>","      </div>","    </div>","  </div>",'  <div class="item">','    <a id="linkTriggerTwo" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"></a>','    <div id="collapseTwo" data-bs-parent="#accordion" class="collapse show" role="tabpanel" aria-labelledby="headingTwo"></div>',"  </div>","</div>"].join("");const a=e.querySelector("#linkTrigger"),t=e.querySelector("#linkTriggerTwo"),o=e.querySelector("#nestedLinkTrigger"),s=e.querySelector("#collapseOne"),n=e.querySelector("#collapseTwo"),i=e.querySelector("#nestedCollapseOne");function c(){expect(s).toHaveClass("show"),expect(n).not.toHaveClass("show"),expect(i).toHaveClass("show"),n.addEventListener("shown.bs.collapse",(()=>{expect(s).not.toHaveClass("show"),expect(n).toHaveClass("show"),expect(i).toHaveClass("show"),l()})),t.click(),i.removeEventListener("shown.bs.collapse",c)}s.addEventListener("shown.bs.collapse",(function e(){expect(s).toHaveClass("show"),expect(n).not.toHaveClass("show"),expect(i).not.toHaveClass("show"),i.addEventListener("shown.bs.collapse",c),o.click(),s.removeEventListener("shown.bs.collapse",e)})),a.click()})))),it('should add "collapsed" class and set aria-expanded to triggers only when all the targeted collapse are hidden',(()=>new Promise((l=>{e.innerHTML=['<a id="trigger1" role="button" data-bs-toggle="collapse" href="#test1"></a>','<a id="trigger2" role="button" data-bs-toggle="collapse" href="#test2"></a>','<a id="trigger3" role="button" data-bs-toggle="collapse" href=".multi"></a>','<div id="test1" class="multi"></div>','<div id="test2" class="multi"></div>'].join("");const a=e.querySelector("#trigger1"),t=e.querySelector("#trigger2"),o=e.querySelector("#trigger3"),s=e.querySelector("#test1"),n=e.querySelector("#test2");n.addEventListener("shown.bs.collapse",(()=>{expect(a).not.toHaveClass("collapsed"),expect(a.getAttribute("aria-expanded")).toEqual("true"),expect(t).not.toHaveClass("collapsed"),expect(t.getAttribute("aria-expanded")).toEqual("true"),expect(o).not.toHaveClass("collapsed"),expect(o.getAttribute("aria-expanded")).toEqual("true"),n.addEventListener("hidden.bs.collapse",(()=>{expect(a).not.toHaveClass("collapsed"),expect(a.getAttribute("aria-expanded")).toEqual("true"),expect(t).toHaveClass("collapsed"),expect(t.getAttribute("aria-expanded")).toEqual("false"),expect(o).not.toHaveClass("collapsed"),expect(o.getAttribute("aria-expanded")).toEqual("true"),s.addEventListener("hidden.bs.collapse",(()=>{expect(a).toHaveClass("collapsed"),expect(a.getAttribute("aria-expanded")).toEqual("false"),expect(t).toHaveClass("collapsed"),expect(t.getAttribute("aria-expanded")).toEqual("false"),expect(o).toHaveClass("collapsed"),expect(o.getAttribute("aria-expanded")).toEqual("false"),l()})),a.click()})),t.click()})),o.click()}))))})),describe("jQueryInterface",(()=>{it("should create a collapse",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div");jQueryMock.fn.collapse=Collapse.jQueryInterface,jQueryMock.elements=[l],jQueryMock.fn.collapse.call(jQueryMock),expect(Collapse.getInstance(l)).not.toBeNull()})),it("should not re create a collapse",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div"),a=new Collapse(l);jQueryMock.fn.collapse=Collapse.jQueryInterface,jQueryMock.elements=[l],jQueryMock.fn.collapse.call(jQueryMock),expect(Collapse.getInstance(l)).toEqual(a)})),it("should throw error on undefined method",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div"),a="undefinedMethod";jQueryMock.fn.collapse=Collapse.jQueryInterface,jQueryMock.elements=[l],expect((()=>{jQueryMock.fn.collapse.call(jQueryMock,a)})).toThrowError(TypeError,`No method named "${a}"`)}))})),describe("getInstance",(()=>{it("should return collapse instance",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div"),a=new Collapse(l);expect(Collapse.getInstance(l)).toEqual(a),expect(Collapse.getInstance(l)).toBeInstanceOf(Collapse)})),it("should return null when there is no collapse instance",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div");expect(Collapse.getInstance(l)).toBeNull()}))})),describe("getOrCreateInstance",(()=>{it("should return collapse instance",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div"),a=new Collapse(l);expect(Collapse.getOrCreateInstance(l)).toEqual(a),expect(Collapse.getInstance(l)).toEqual(Collapse.getOrCreateInstance(l,{})),expect(Collapse.getOrCreateInstance(l)).toBeInstanceOf(Collapse)})),it("should return new instance when there is no collapse instance",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div");expect(Collapse.getInstance(l)).toBeNull(),expect(Collapse.getOrCreateInstance(l)).toBeInstanceOf(Collapse)})),it("should return new instance when there is no collapse instance with given configuration",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div");expect(Collapse.getInstance(l)).toBeNull();const a=Collapse.getOrCreateInstance(l,{toggle:!1});expect(a).toBeInstanceOf(Collapse),expect(a._config.toggle).toBeFalse()})),it("should return the instance when exists without given configuration",(()=>{e.innerHTML="<div></div>";const l=e.querySelector("div"),a=new Collapse(l,{toggle:!1});expect(Collapse.getInstance(l)).toEqual(a);const t=Collapse.getOrCreateInstance(l,{toggle:!0});expect(a).toBeInstanceOf(Collapse),expect(t).toEqual(a),expect(t._config.toggle).toBeFalse()}))}))}));