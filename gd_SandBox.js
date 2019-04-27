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
        <footer></footer>
        `;

        let d = _gd_window("section");
        d.className = "view-section";
        let iframe = document.createElement("iframe");
        iframe.src = "https://youtu.be/NZHzgXFKfuY";
        //d.appendChild(iframe);
        this.container.className ="cc";
        this.container.appendChild(d);
        container.appendChild(this.container);
    }
}