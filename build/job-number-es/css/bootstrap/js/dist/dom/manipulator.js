/*! For license information please see manipulator.js.LICENSE.txt */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Manipulator=e()}(this,(function(){"use strict";function t(t){if("true"===t)return!0;if("false"===t)return!1;if(t===Number(t).toString())return Number(t);if(""===t||"null"===t)return null;if("string"!=typeof t)return t;try{return JSON.parse(decodeURIComponent(t))}catch(e){return t}}function e(t){return t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}return{setDataAttribute(t,r,n){t.setAttribute(`data-bs-${e(r)}`,n)},removeDataAttribute(t,r){t.removeAttribute(`data-bs-${e(r)}`)},getDataAttributes(e){if(!e)return{};const r={},n=Object.keys(e.dataset).filter((t=>t.startsWith("bs")&&!t.startsWith("bsConfig")));for(const i of n){let n=i.replace(/^bs/,"");n=n.charAt(0).toLowerCase()+n.slice(1,n.length),r[n]=t(e.dataset[i])}return r},getDataAttribute:(r,n)=>t(r.getAttribute(`data-bs-${e(n)}`))}}));