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
        
        let d = document.createElement("section");
        d.className = "view-section";
        let iframe = document.createElement("iframe");
        iframe.src = "w";
        d.appendChild(iframe);
        this.container.className ="cc";
        this.container.appendChild(d);
        container.appendChild(this.container);
        _gd_window(d, this.container);

        //test(d);
    }
}
function test(_div){
    let d = document.querySelector(".view-section");
    let c = d;
    console.log(c.offsetLeft + " " + c.offsetTop +" __node name:" + c.nodeName);
    let i = 0;
    let left = 0;
    let top = 0;
    let a = c;
    do{
        /*if(i==1){
            let a = c;
            setTimeout(() => {
                console.log("GONA DO");
                console.log(a.offsetTop);
                a.style.left = 0 + "px";
                a.style.top = 0 + "px";

            }, 1000);
        }*/
        if(c.offsetLeft !== undefined){
            left += c.offsetLeft;
            top += c.offsetTop;
        }
        c = c.parentNode;
        console.log(c.offsetLeft + " " + c.offsetTop +" __node name:" + c.nodeName);
        ++i;
    }while(c.offsetLeft !== undefined);

    setTimeout(() => {
        console.log("GONA DO");
        console.log(a.offsetTop);

        a.style.position = "fixed";
        a.style.right = left - a.clientWidth  + "px";
        a.style.bottom = top - a.clientHeight + "px";

    }, 1000);
    
}