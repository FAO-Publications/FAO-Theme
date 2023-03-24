import Manipulator from"../../../src/dom/manipulator";import{clearFixture,getFixture}from"../../helpers/fixture";describe("Manipulator",(()=>{let t;beforeAll((()=>{t=getFixture()})),afterEach((()=>{clearFixture()})),describe("setDataAttribute",(()=>{it("should set data attribute prefixed with bs",(()=>{t.innerHTML="<div></div>";const e=t.querySelector("div");Manipulator.setDataAttribute(e,"key","value"),expect(e.getAttribute("data-bs-key")).toEqual("value")})),it("should set data attribute in kebab case",(()=>{t.innerHTML="<div></div>";const e=t.querySelector("div");Manipulator.setDataAttribute(e,"testKey","value"),expect(e.getAttribute("data-bs-test-key")).toEqual("value")}))})),describe("removeDataAttribute",(()=>{it("should only remove bs-prefixed data attribute",(()=>{t.innerHTML='<div data-bs-key="value" data-key-bs="postfixed" data-key="value"></div>';const e=t.querySelector("div");Manipulator.removeDataAttribute(e,"key"),expect(e.getAttribute("data-bs-key")).toBeNull(),expect(e.getAttribute("data-key-bs")).toEqual("postfixed"),expect(e.getAttribute("data-key")).toEqual("value")})),it("should remove data attribute in kebab case",(()=>{t.innerHTML='<div data-bs-test-key="value"></div>';const e=t.querySelector("div");Manipulator.removeDataAttribute(e,"testKey"),expect(e.getAttribute("data-bs-test-key")).toBeNull()}))})),describe("getDataAttributes",(()=>{it("should return an empty object for null",(()=>{expect(Manipulator.getDataAttributes(null)).toEqual({}),expect().nothing()})),it("should get only bs-prefixed data attributes without bs namespace",(()=>{t.innerHTML='<div data-bs-toggle="tabs" data-bs-target="#element" data-another="value" data-target-bs="#element" data-in-bs-out="in-between"></div>';const e=t.querySelector("div");expect(Manipulator.getDataAttributes(e)).toEqual({toggle:"tabs",target:"#element"})})),it("should omit `bs-config` data attribute",(()=>{t.innerHTML='<div data-bs-toggle="tabs" data-bs-target="#element" data-bs-config=\'{"testBool":false}\'></div>';const e=t.querySelector("div");expect(Manipulator.getDataAttributes(e)).toEqual({toggle:"tabs",target:"#element"})}))})),describe("getDataAttribute",(()=>{it("should only get bs-prefixed data attribute",(()=>{t.innerHTML='<div data-bs-key="value" data-test-bs="postFixed" data-toggle="tab"></div>';const e=t.querySelector("div");expect(Manipulator.getDataAttribute(e,"key")).toEqual("value"),expect(Manipulator.getDataAttribute(e,"test")).toBeNull(),expect(Manipulator.getDataAttribute(e,"toggle")).toBeNull()})),it("should get data attribute in kebab case",(()=>{t.innerHTML='<div data-bs-test-key="value" ></div>';const e=t.querySelector("div");expect(Manipulator.getDataAttribute(e,"testKey")).toEqual("value")})),it("should normalize data",(()=>{t.innerHTML='<div data-bs-test="false" ></div>';const e=t.querySelector("div");expect(Manipulator.getDataAttribute(e,"test")).toBeFalse(),e.setAttribute("data-bs-test","true"),expect(Manipulator.getDataAttribute(e,"test")).toBeTrue(),e.setAttribute("data-bs-test","1"),expect(Manipulator.getDataAttribute(e,"test")).toEqual(1)})),it("should normalize json data",(()=>{t.innerHTML='<div data-bs-test=\'{"delay":{"show":100,"hide":10}}\'></div>';const e=t.querySelector("div");expect(Manipulator.getDataAttribute(e,"test")).toEqual({delay:{show:100,hide:10}});const a={"Super Hero":["Iron Man","Super Man"],testNum:90,url:"http://localhost:8080/test?foo=bar"},i=JSON.stringify(a);e.setAttribute("data-bs-test",encodeURIComponent(i)),expect(Manipulator.getDataAttribute(e,"test")).toEqual(a),e.setAttribute("data-bs-test",i),expect(Manipulator.getDataAttribute(e,"test")).toEqual(a)}))}))}));