'use strict';
var STYLE_MOUNTED = false;


class gd_SandBox{
    constructor(container, data){

        this.widgetsMounted = false;
        this.mountWidgets(container);
        
        if(!STYLE_MOUNTED)
        this.mountStyle();

        if(data instanceof Array){
            this.loadData(data);
        }
    }

    loadData(data){
        this.fileList = data;
        
        let cach;
        this.fileList.forEach(file => {
            cach = gd_SandBox_file(file);
            this.fileListViewer.appendChild(cach);
        });

        this.fileListViewer.addEventListener("click", function( {target}){
            if(target !== this.fileListViewer){
                if( typeof target.open !== undefined && !target.open ){
                    this.editor1.value = target.content;
                }
            }
        }.bind(this) );
    }

    mountWidgets(container){
        if(!this.widgetsMounted){
            this.widgetsMounted = true;
            
            
            this.container = document.createElement("div");
            this.documentViewer = document.createElement("iframe");

            this.editor1 = document.createElement("textarea");
            this.editor2 = document.createElement("textarea");

            let gd_SandBox_editorContainer = document.createElement("div");
            gd_SandBox_editorContainer.className = "gd_SandBox_editorContainer";
            gd_SandBox_editorContainer.appendChild(this.editor1);
            gd_SandBox_editorContainer.appendChild(this.editor2);

            this.fileListViewer = document.createElement("div");
            this.controlPanel = document.createElement("div");            
            container.appendChild(this.container);

            this.container.appendChild(this.controlPanel);
            this.container.appendChild(this.fileListViewer);
            this.container.appendChild(this.documentViewer);
            this.container.appendChild(gd_SandBox_editorContainer);

            this.container.className = "gd_SandBox_Container";
            this.documentViewer.className = "gd_SandBox_documentViewer";
            this.editor1.className = "gd_SandBox_editor";
            this.editor2.className = "gd_SandBox_editor";
            this.fileListViewer.className = "gd_SandBox_fileListViewer";
            this.controlPanel.className = "gd_SandBox_controlPanel";


        }
    }

    mountStyle(){
        STYLE_MOUNTED = true;
        let style = document.createElement("style");
        style.innerHTML = DEAFULT_STYLE_SHEET;
        document.head.appendChild(style);
    }
}

//gd_SandBox Default stylesheet

function gd_SandBox_file(file){

    let div = document.createElement("div");
    div.name = file.name ? file.name : undefined;
    div.type = file.type ? file.type : undefined;
    div.content = file.content ? file.content : "";
    div.className = "gd_SandBox_fileName";
    div.innerHTML = div.name;
    div.open = file.open ? false : false;
    return div;
}

const DEAFULT_STYLE_SHEET = `
        .gd_SandBox_Container{
            position: relative;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        .gd_SandBox_Container * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        .gd_SandBox_Container > .gd_SandBox_controlPanel{
            position: absolute;
            display: inline-block;
            top: 0;
            left: 0;
            height: 10%;
            width: 100%;
            border: 1px solid black;
        }
        .gd_SandBox_Container > .gd_SandBox_controlPanel > .gd_SandBox_reset{
            display: inline-block;
            position: relative;
        }
        .gd_SandBox_Container > .gd_SandBox_controlPanel > .gd_SandBox_autoReload{
            display: inline-block;
            position: relative;
            width: 25px;
            height: 25px;
            border: 2px solid black;
            border-radius: 5px;
        }

        .gd_SandBox_Container > .gd_SandBox_controlPanel > .gd_SandBox_autoReload > div{
            position: absolute;
            width: 95%;
            height: 95%;
            top: 2.5%;
            left: 2.5%;
            background-color: transparent;
            transition: background-color linear 0.2s;
            border: 2px solid black;
            border-radius: 5px;
        }

        .gd_SandBox_Container > .gd_SandBox_controlPanel > .gd_SandBox_autoReload.active > div{
            background-color: rgb(89, 255, 47);
        }
        .gd_SandBox_Container > .gd_SandBox_fileListViewer{
            position: absolute;
            display: inline-block;
            top: 10%;
            left: 0;
            height: 90%;
            width: 10%;
            overflow: auto;
        }
        .gd_SandBox_Container > .gd_SandBox_fileListViewer > .gd_SandBox_fileName{
            position: relative;
            padding: 5px;
            border: 1px solid #111111;
            border-radius: 5px;
        }
        .gd_SandBox_Container > .gd_SandBox_documentViewer{
            position: absolute;
            display: inline-block;
            top: 10%;
            left: 10%;
            height: 90%;
            width: 45%;
        }
        .gd_SandBox_Container > .gd_SandBox_editorContainer{
            position: absolute;
            display: inline-block;
            top: 10%;
            left: 55%;
            height: 90%;
            width: 45%;
        }
        .gd_SandBox_Container > .gd_SandBox_editorContainer > .gd_SandBox_editor{
            
            position: absolute;
            display: inline-block;
            top: 0%;
            left: 0%;
            height: 50%;
            width: 100%;
            resize: none;
            border: 2px solid rgb(224, 169, 15);
        }
        .gd_SandBox_Container > .gd_SandBox_editorContainer > .gd_SandBox_editor:nth-child(2){
            position: absolute;
            display: inline-block;
            top: 50%;
            left: 0%;
            height: 50%;
            width: 100%;
        }
        `;