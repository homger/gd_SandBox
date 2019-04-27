'use strict';
var STYLE_MOUNTED = false;

class gd_SandBox{
    constructor(container, data){
        this.container = document.createElement("main");
        this.container.innerHTML = `
        <header></header>
        <nav></nav>
        <section class="edit-section">
            <header></header>
        </section>
        <section class="view-section"></section>
        <footer></footer>
        `;



        this.container.className ="cc";
        container.appendChild(this.container);
    }
}