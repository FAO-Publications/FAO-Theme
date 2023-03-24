/*! For license information please see code-examples.js.LICENSE.txt */
(()=>{"use strict";const t="Copy to clipboard",e=['<div class="bd-code-snippet">','   <div class="bd-clipboard">','      <button type="button" class="btn-clipboard">','        <svg class="bi" role="img" aria-label="Copy"><use xlink:href="#clipboard"/></svg>',"      </button>","   </div>","</div>"].join("");function o(t,e){document.querySelectorAll(t).forEach((t=>{bootstrap.Tooltip.getOrCreateInstance(t,{title:e})}))}document.querySelectorAll(".highlight").forEach((t=>{t.closest(".bd-example-snippet")||(t.insertAdjacentHTML("beforebegin",e),t.previousElementSibling.append(t))})),o(".btn-clipboard",t),o(".btn-edit","Edit on StackBlitz");const i=new ClipboardJS(".btn-clipboard",{target:t=>t.closest(".bd-code-snippet").querySelector(".highlight")});i.on("success",(e=>{const o=e.trigger.querySelector(".bi").firstChild,i=bootstrap.Tooltip.getInstance(e.trigger),r="http://www.w3.org/1999/xlink",n=o.getAttributeNS(r,"href"),s=e.trigger.title;i.setContent({".tooltip-inner":"Copied!"}),e.trigger.addEventListener("hidden.bs.tooltip",(()=>{i.setContent({".tooltip-inner":t})}),{once:!0}),e.clearSelection(),o.setAttributeNS(r,"href",n.replace("clipboard","check2")),setTimeout((()=>{o.setAttributeNS(r,"href",n),e.trigger.title=s}),2e3)})),i.on("error",(e=>{const o=`Press ${/mac/i.test(navigator.userAgent)?"⌘":"Ctrl-"}C to copy`,i=bootstrap.Tooltip.getInstance(e.trigger);i.setContent({".tooltip-inner":o}),e.trigger.addEventListener("hidden.bs.tooltip",(()=>{i.setContent({".tooltip-inner":t})}),{once:!0})}))})();