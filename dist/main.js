!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n=e=>{const t=e,r=[];return{position:t,damage:r,hit:e=>{for(let n of t)n[0]===e[0]&&n[1]===e[1]&&r.push(e)},isSunk:()=>t.length===r.length}};var a=e=>{const t=[];for(let r=0;r<e;r++){t.push([]);for(let n=0;n<e;n++)t[r].push(" ")}const r=[],a=[];return{board:t,ships:r,placeShips:e=>{let a=n(e);return r.push(a),e.forEach(e=>{let r=e[0],n=e[1];t[r][n]="S"}),r},receiveAttack:e=>{let n=e[0],o=e[1],l=t[n][o];if(l.includes("S"))t[n][o]="X",r.forEach(t=>{t.hit(e)});else{if(" "!==l)return!1;t[n][o]="M"}a.push(e)},attempts:a,allSunk:()=>{return r.every(e=>e.isSunk())}}};var o=(e,t,r)=>{const n=r,a=[],o=[],l=e=>{let t=[];for(;!d(t,e);){t=[Math.floor(Math.random()*Math.floor(n.board.length)),Math.floor(Math.random()*Math.floor(n.board.length))]}return t},d=(e,t)=>{return 2===e.length&&-1===t.findIndex(t=>t[0]===e[0]&&t[1]===e[1])};return{playerName:e,gameboard:n,type:t,makeMove:()=>{let e=l(o);return o.push(e),e},attempts:o,makeShips:()=>{let e=l(a);return a.push(e),a}}};(()=>{let e,t,r=a(5),n=a(5),l=o("You","person",r),d=o("Bot","bot",n);const s=()=>{if(!0===t.gameboard.allSunk()){let t;t="bot"===e.type?`${e.playerName} wins!`:`${e.playerName} win!`,u(t)}else{let r=e;e=t,t=r,i()}},i=()=>{let r;"bot"===e.type?(r=e.makeMove(),t.gameboard.receiveAttack(r),u(),s()):"person"===e.type&&document.querySelectorAll("#bot .col").forEach(n=>{n.addEventListener("click",n=>{let a=n.target.id;""!==a&&(r=a.split("-").map(e=>Number(e)),e.attempts.push(r),t.gameboard.receiveAttack(r),u(),s())})})},u=e=>{document.getElementById("add-ship").value="";let t=document.getElementById("display");t.innerHTML="",e=e||"",document.getElementById("message").textContent=e;let r=[l,d];for(let e of r){let r=document.createElement("div");r.classList.add("gameboard"),r.setAttribute("id",e.type);let n=e.gameboard.board.length;for(let t=0;t<n;t++){let a=document.createElement("div");a.classList.add("row");for(let r=0;r<n;r++){let n=document.createElement("span");n.classList.add("col"),n.setAttribute("id",`${t}-${r}`),"S"===e.gameboard.board[t][r]&&"person"===e.type&&n.classList.add("ship"),"M"===e.gameboard.board[t][r]&&n.classList.add("missed"),"X"===e.gameboard.board[t][r]&&n.classList.add("hit"),a.appendChild(n)}r.appendChild(a)}t.appendChild(r)}};return{setup:()=>{const r=document.querySelector("form");r.addEventListener("submit",()=>{event.preventDefault();let e=[],t=document.getElementById("add-ship").value.split(",").map(e=>Number(e));if(t[0]>=5||t[1]>=5){u("Invalid coordinate!")}else{e.push(t),l.gameboard.placeShips(e);let r=d.makeShips();d.gameboard.placeShips(r),u()}}),e=l,t=d;const n=document.getElementById("done");n.addEventListener("click",()=>{r.style.display="none",n.style.display="none",i()}),u()}}})().setup()}]);