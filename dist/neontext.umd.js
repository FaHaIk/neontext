var e,n;e=this,n=function(e){function n(){return(n=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var f in t)Object.prototype.hasOwnProperty.call(t,f)&&(e[f]=t[f])}return e}).apply(this,arguments)}function t(e,n){for(var t=document.getElementById(n.elem),o=0;o<e.length;o++)if("\n"==e[o])t.appendChild(document.createElement("br"));else{var r=document.createElement("span");if(r.setAttribute("class","data"),r.innerText=e[o],n.random){var i=f(0,n.colors.length-1);r.style.textShadow="0px 0px "+n.blur+"px "+n.colors[i]}t.appendChild(r)}if(!n.random)for(var a=0;a<n.colors.length;a++)for(var u=0;u<t.querySelectorAll("span:nth-of-type("+n.colors.length+"n + "+(a+1)+")").length;u++)t.querySelectorAll("span:nth-of-type("+n.colors.length+"n + "+(a+1)+")")[u].style.textShadow="0px 0px "+n.blur+"px "+n.colors[a]}function f(e,n){return e=Math.ceil(e),n=Math.floor(n),Math.floor(Math.random()*(n-e+1))+e}function o(e){var n=document.getElementById(e);return Array.from(n.innerText)}function r(e){for(var n=document.getElementById(e);n.firstChild;)n.removeChild(n.firstChild)}e.t=t,e.o=f,e.i=r,e.u=o,e.neonify=function(e){var f=n({},e);if(f.elem)if(document.getElementById(f.elem)){f.elem=f.elem,f.colors=f.colors||["#ff00ff","#00ffff","#ffff00"],f.blur=f.blur||5,f.random=f.random||!1;var i=o(f.elem);r(f.elem),t(i,f)}else console.error('No element with the id "'+f.elem+'" found.');else console.error("No 'elem' property set in options.")}},"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).neontext={});
//# sourceMappingURL=neontext.umd.js.map