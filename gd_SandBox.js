'use strict';
var STYLE_MOUNTED = false;

class gd_SandBox{
    constructor(container, data){
        this.container = document.createElement("main");
        //this.setupLayout();
        this.container.innerHTML = `
        <header>
            <div>
            </div>
            <div class="control">
            </div>
        </header>
        <nav></nav>
        <section class="edit-section">
            <header></header>
        </section>
        <footer></footer>
        `;
        //this.container.querySelector("header .control").appendChild(gd_SwitchButton("150px"));
        let d = document.createElement("section");
        d.className = "view-section";
        let iframe = document.createElement("iframe");
        iframe.src = "w";
        
        this.container.className ="cc";
        document.body.appendChild(d);
        container.appendChild(this.container);
        
        let files = [];
        files.push(new _gd_sandbox_file("ONE", "text/js",`
        document.getElementById('b').onclick = () => alert("MARCHE");
        
        `));
        files.push(new _gd_sandbox_file("TWO", "text/html","<span>TEST</span><button id='b'>B</button>"));
        let editors = [];
        editors.push(new _gd_sandbox_editor());
        editors.push(new _gd_sandbox_editor());
        
        this.container.querySelector(".edit-section").appendChild(editors[0]._textArea);
        editors[0].setFile(files[0]);
        let viewer = _gd_sandbox_viewer();
        viewer.style.backgroundColor = "white";
        d.appendChild(viewer);
        
        viewer.setDocument(files[1].content + "<script>" +files[0].content+"</script>");
        editors[0]._textArea.addEventListener("keyup", function(){
            viewer.setDocument(files[1].content + "<script>" +files[0].content+"</script>");
        });
        let ww = new _gd_window(d, this.container.querySelector("section"));

        //this.container.querySelector(".edit-section").appendChild(d)
        /*ww.size_half();
        ww.size_full();
        ww.size_half();*/
        //test(d);
        this.setupLayout();
    }

    setupLayout(){
        this.container.querySelector(".control").appendChild(
            gd_SwitchButton(() => {},25)
        );
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