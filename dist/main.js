!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n=e=>{const t=e,r=[];return{position:t,damage:r,hit:e=>{for(subarr of t)subarr[0]===e[0]&&subarr[1]===e[1]&&r.push(e)},isSunk:()=>t.length===r.length}};var o=e=>{const t=[];for(let r=0;r<e;r++){t.push([]);for(let n=0;n<e;n++)t[r].push(" ")}const r=[],o=[];return{board:t,ships:r,placeShips:o=>{let a=n(o);return r.push(a),o.forEach(r=>{if(!(r[0]<e&&r[1]<e))throw"Error: Invalid coordinate";{let e=r[0],n=r[1];t[e][n]="S"}}),r},receiveAttack:e=>{let n=e[0],a=e[1],l=t[n][a];if(l.includes("S"))t[n][a]="X",r.forEach(t=>{t.hit(e)});else{if(" "!==l)return!1;t[n][a]="M"}o.push(e)},attempts:o,allSunk:()=>{return r.every(e=>e.isSunk())}}};var a=(e,t)=>{const r=t,n=()=>{let e=Math.floor(Math.random()*Math.floor(r.board.length)),t=Math.floor(Math.random()*Math.floor(r.board.length));return move=[e,t],move},o=(e,t)=>{const r=e=>e[0]===t[0]&&e[1]===t[1];return-1===e.findIndex(r)&&(-1===e.findIndex(r)||void 0)};return{gameboard:r,validMove:o,getMove:()=>{let t,a=r.attempts;if("bot"===e){for(t=n(r);!o(a,t);)t=n(r);r.receiveAttack(t),a.push(t)}else document.querySelector("form").addEventListener("submit",()=>{input=document.getElementById("move").value,t=input.split(",").map(e=>Number(e))}),o(a,t)&&(r.receiveAttack(t),a.push(t));return t}}};let l=(()=>{const e=(e,t)=>{let r=o(5),n=a(e,r);return r.placeShips(t),n},t=e("person",[[1,2],[2,2]]),r=e("person",[[2,3],[3,3]]),n=t,l=r,u=()=>{if(move=n.getMove([1,1]),l.gameboard.receiveAttack(move),!0!==l.gameboard.allSunk()){let e=n;n=l,l=e}};return{render:()=>{const e=document.getElementById("display"),r=document.createElement("div");r.classList.add("gameboard");let n=t.gameboard.board.length;for(let e=0;e<n;e++){let e=document.createElement("div");e.classList.add("row");for(let t=0;t<n;t++){let t=document.createElement("span");t.classList.add("col"),e.appendChild(t)}r.appendChild(e)}e.appendChild(r)},play:()=>{for(;!0!==n.gameboard.allSunk();)u()}}})();l.render(),l.play()}]);