!function(){var t={body:document.querySelector("body"),btn:document.querySelector("button"),btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};t.btnStart.style.width="100px",t.btnStart.style.height="50px",t.btnStop.style.width="100px",t.btnStop.style.height="50px",t.btnStop.setAttribute("disabled",!0);var e=null;t.btnStart.addEventListener("click",(function(){t.btnStop.removeAttribute("disabled",!0),t.btnStart.setAttribute("disabled",!0),e=setInterval((function(){t.body.style.backgroundColor="".concat("#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)))}),1e3)})),t.btnStop.addEventListener("click",(function(){t.btnStart.removeAttribute("disabled",!0),t.btnStop.setAttribute("disabled",!0),clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.c38fe2cc.js.map
