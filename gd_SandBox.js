'use strict';
var STYLE_MOUNTED = false;

class gd_SandBox{
    constructor(container, data){
        this.container = document.createElement("main");
        this.container.innerHTML = `
        <header></header>
        `;
    }
}