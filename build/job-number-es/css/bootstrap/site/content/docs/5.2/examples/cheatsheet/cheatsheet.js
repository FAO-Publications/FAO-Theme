(()=>{"use strict";function e(){const{hash:e}=window.location;if(""===e)return;const t=document.querySelector(`.bd-aside a[href="${e}"]`);if(!t)return;const o=document.querySelector(".bd-aside .active"),r=t.parentNode.parentNode.previousElementSibling;if(t.classList.add("active"),r.classList.contains("collapsed")&&r.click(),!o)return;const c=o.parentNode.parentNode.previousElementSibling;o.classList.remove("active"),c&&r!==c&&c.click()}document.querySelectorAll(".tooltip-demo").forEach((e=>{new bootstrap.Tooltip(e,{selector:'[data-bs-toggle="tooltip"]'})})),document.querySelectorAll('[data-bs-toggle="popover"]').forEach((e=>{new bootstrap.Popover(e)})),document.querySelectorAll(".toast").forEach((e=>{new bootstrap.Toast(e,{autohide:!1}).show()})),document.querySelectorAll('[href="#"], [type="submit"]').forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault()}))})),e(),window.addEventListener("hashchange",e)})();