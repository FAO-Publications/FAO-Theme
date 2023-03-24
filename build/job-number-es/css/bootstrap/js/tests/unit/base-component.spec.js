import BaseComponent from"../../src/base-component";import{clearFixture,getFixture}from"../helpers/fixture";import EventHandler from"../../src/dom/event-handler";import{noop}from"../../src/util";class DummyClass extends BaseComponent{constructor(e){super(e),EventHandler.on(this._element,`click${DummyClass.EVENT_KEY}`,noop)}static get NAME(){return"dummy"}}describe("Base Component",(()=>{let e;const t="dummy";let s,n;const o=()=>{e.innerHTML='<div id="foo"></div>',s=e.querySelector("#foo"),n=new DummyClass(s)};beforeAll((()=>{e=getFixture()})),afterEach((()=>{clearFixture()})),describe("Static Methods",(()=>{describe("VERSION",(()=>{it("should return version",(()=>{expect(DummyClass.VERSION).toEqual(jasmine.any(String))}))})),describe("DATA_KEY",(()=>{it("should return plugin data key",(()=>{expect(DummyClass.DATA_KEY).toEqual(`bs.${t}`)}))})),describe("NAME",(()=>{it("should throw an Error if it is not initialized",(()=>{expect((()=>{BaseComponent.NAME})).toThrowError(Error)})),it("should return plugin NAME",(()=>{expect(DummyClass.NAME).toEqual(t)}))})),describe("EVENT_KEY",(()=>{it("should return plugin event key",(()=>{expect(DummyClass.EVENT_KEY).toEqual(`.bs.${t}`)}))}))})),describe("Public Methods",(()=>{describe("constructor",(()=>{it("should accept element, either passed as a CSS selector or DOM element",(()=>{e.innerHTML=['<div id="foo"></div>','<div id="bar"></div>'].join("");const t=e.querySelector("#foo"),s=new DummyClass(t),n=new DummyClass("#bar");expect(s._element).toEqual(t),expect(n._element).toEqual(e.querySelector("#bar"))})),it("should not initialize and add element record to Data (caching), if argument `element` is not an HTML element",(()=>{e.innerHTML="";const t=e.querySelector("#foo"),s=new DummyClass(t),n=new DummyClass("#bar");expect(s._element).not.toBeDefined(),expect(n._element).not.toBeDefined()}))})),describe("dispose",(()=>{it("should dispose an component",(()=>{o(),expect(DummyClass.getInstance(s)).not.toBeNull(),n.dispose(),expect(DummyClass.getInstance(s)).toBeNull(),expect(n._element).toBeNull()})),it("should de-register element event listeners",(()=>{o();const e=spyOn(EventHandler,"off");n.dispose(),expect(e).toHaveBeenCalledWith(s,DummyClass.EVENT_KEY)}))})),describe("getInstance",(()=>{it("should return an instance",(()=>{o(),expect(DummyClass.getInstance(s)).toEqual(n),expect(DummyClass.getInstance(s)).toBeInstanceOf(DummyClass)})),it("should accept element, either passed as a CSS selector, jQuery element, or DOM element",(()=>{o(),expect(DummyClass.getInstance("#foo")).toEqual(n),expect(DummyClass.getInstance(s)).toEqual(n);const e={0:s,jquery:"foo"};expect(DummyClass.getInstance(e)).toEqual(n)})),it("should return null when there is no instance",(()=>{e.innerHTML="<div></div>";const t=e.querySelector("div");expect(DummyClass.getInstance(t)).toBeNull()}))})),describe("getOrCreateInstance",(()=>{it("should return an instance",(()=>{o(),expect(DummyClass.getOrCreateInstance(s)).toEqual(n),expect(DummyClass.getInstance(s)).toEqual(DummyClass.getOrCreateInstance(s,{})),expect(DummyClass.getOrCreateInstance(s)).toBeInstanceOf(DummyClass)})),it("should return new instance when there is no alert instance",(()=>{e.innerHTML='<div id="foo"></div>',s=e.querySelector("#foo"),expect(DummyClass.getInstance(s)).toBeNull(),expect(DummyClass.getOrCreateInstance(s)).toBeInstanceOf(DummyClass)}))}))}))}));