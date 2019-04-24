'use strict';
var STYLE_MOUNTED = false;

class gd_SandBox{
    constructor(container, data){

        /*this.widgetsMounted = false;
        this.mountWidgets(container);
        
        if(!STYLE_MOUNTED)
        this.mountStyle();
        this.eventsSet = false;
        this.setEvents();
        if(data instanceof Array){
            this.loadData(data);
        }
        this.resetDocumentViewer();
    }

    loadData(data){
        this.body = BODY;
        this.style = STYLE;
        this.script = SCRIPT;
        this.fileList = data;

        this.fileList.forEach(file => {
            this.addFile(file);
        });*/

        this.editor = new _gd_sandbox_editor();
        container.appendChild(this.editor._textArea);
        let file = new _gd_sandbox_file(...data);
        this.editor.file = file;
        console.log(file.fileData);
        let t = new _gd_sandbox_viewer();
        document.body.appendChild(t.iframe);
        /*this.editor._textArea.addEventListener("keyup",() =>{
            t.document = file.content;
        });*/

        let button = document.createElement("button");
        button.innerHTML = "RELOAD";
        button.onclick = () =>{
            t.document = file.content;
        }
        document.body.appendChild(button);
        button.style.position = "absolute";
        button.style.bottom = "30%";
        button.style.left = "50%";



    }

    addFile(file){
        this.fileList.push(gd_SandBox_file(this, file));
        this.fileListViewer.appendChild(this.fileList[this.fileList.length - 1]);
    }
    __mkFile(file){

        if(!file.name instanceof String)
            file.name = "undefined";
        
        if(!file.content instanceof String)
            file.content = "";

        file.className = "gd_SandBox_fileName";

        file.open = false;
        file.doubleOpen = false;
    
        file.isIndex = file.name.toLowerCase() == "index.html" ? true : false;
        
        if(file.type instanceof String){
            file.type = file.type.toLowerCase();
            if(!FILE_TYPE.includes(file.type))
                file.type = "undefined";
        }
        else if(file.name != "undefined"){
            let dotIndex = file.name.lastIndexOf(".");

            if(dotIndex != -1){
                file.type = file.name.slice(dotIndex).toLowerCase();
                if(!FILE_TYPE.includes(file.type)){
                    file.type = "undefined";   
                }
            }
            else{
            }
        }
        else{
            file.type = "undefined";
        } 
        file.isStyle = div.type == "css";
        file.isScript = div.type == "js";
        
        if(div.isIndex){
            sandbox.body = div;
            return div;
        }
        else if(file.name.toLowerCase() == "style.css" ? true : false){
            sandbox.style = div;
            return div;
        }
        else if(file.name.toLowerCase() == "script.js" ? true : false){
            sandbox.script = div;
            return div;
        }

    }

    parseFiles(){
        let doc = `
        <body>${this.body.content}</body>
        <style>${this.style.content}</style>
        <script>${this.script.content}</script>
        `;
        this.parsed_document = document.createElement("html");
        this.parsed_document.innerHTML = doc;
        this.view_src = URL.createObjectURL(new Blob([doc], {type: "text/html",}));
    }
    resetDocumentViewer(){
        this.parseFiles();
        this.documentViewer.src = this.view_src;
        this.documentViewer.onload = function(){
            console.log("Document viewer ready");
        }
        //
    }
    setEvents(){

        this.fileListViewer.addEventListener("click", function( {target}){
            if(target !== this.fileListViewer){
                /*if( typeof target.open !== undefined && !target.open ){
                    this.editor1.value = target.content;
                    console.log(target.name + " Opened");
                }*/
                this.openFile(target);
            }
        }.bind(this) );

        this.selectedEditor = this.editor1;

        this.editors.forEach(editor => {
            
            editor.addEventListener("change", event => {
                //this.resetDocumentViewer();
            });

            editor.addEventListener("focus", event => {
                this.selectedEditor = event.target;
                if(!this.selectedEditor.selectedFile === null)
                    editor.value = editor.selectedFile.content;
                else if(this.selectedEditor.selectedFile === null){
                    this.addFile({name: "new file"});
                    this.openFile(this.fileList[this.fileList.length - 1]);
                }
                
            });

            editor.addEventListener("keyup", event => {
                if(editor.selectedFile.open){
                    editor.selectedFile.content = editor.value;
                    this.resetDocumentViewer();
                    if(editor.selectedFile.doubleOpen){
                        editor.sibling.value = editor.selectedFile.content;
                    }
                }
            });
        });
        
        this.observer = new MutationObserver(function(mutationArray){
            
            mutationArray.forEach(mutation => {
                if(mutation.type == "childList"){
                    
                    if(mutation.removedNodes.length > 0){
                        this.documentViewerSetup();
                    }
                }
            });
        }.bind(this));

        //this.observer.observe(this.documentViewer.contentDocument.documentElement, {"childList" : true,});

    }
    
    
    openFile(file){
        if(file.open){
            if(this.selectedEditor.selectedFile === null){
                file.doubleOpen = true;
                this.selectedEditor.selectedFile = file;
                this.selectedEditor.value = file.content;
                return;
            }
            if(this.selectedEditor.selectedFile !== file){
                if(!this.selectedEditor.selectedFile.doubleOpen){
                    this.selectedEditor.selectedFile.open = false;
                }
                this.selectedEditor.selectedFile.doubleOpen = false;
                this.selectedEditor.selectedFile = null;
                this.selectedEditor.selectedFile = file;
                file.doubleOpen = true;
                this.selectedEditor.value = file.content;
                return;
            }
        }
        else{
            if(this.selectedEditor.selectedFile === null){
                this.selectedEditor.selectedFile = file;
                this.selectedEditor.value = file.content;
                file.open = true;
                return;
            }
            
            if(!this.selectedEditor.selectedFile.doubleOpen){
                this.selectedEditor.selectedFile.open = false;
            }
            this.selectedEditor.selectedFile.doubleOpen = false;
            this.selectedEditor.selectedFile = null;
            this.selectedEditor.selectedFile = file;
            file.open = true;
            this.selectedEditor.value = file.content;
        }
    }

    mountWidgets(container){
        if(!this.widgetsMounted){
            this.widgetsMounted = true;
            
            
            this.container = document.createElement("div");
            this.documentViewer = document.createElement("iframe");
            //this.documentViewer.sandbox = "allow-cross-origin allow-same-origin allow-scripts";

            this.editor1 = document.createElement("textarea");
            this.editor2 = document.createElement("textarea");
            this.editor1.sibling = this.editor2;
            this.editor2.sibling = this.editor1;
            this.editors = [this.editor1, this.editor2];
            let gd_SandBox_editorContainer = document.createElement("div");
            gd_SandBox_editorContainer.className = "gd_SandBox_editorContainer";
            gd_SandBox_editorContainer.appendChild(this.editor1);
            gd_SandBox_editorContainer.appendChild(this.editor2);

            this.fileListViewer = document.createElement("div");
            this.controlPanel = document.createElement("div");
            
            let b = document.createElement("button");
            b.innerHTML = "RESET";
            b.onclick = this.resetDocumentViewer.bind(this);
            this.controlPanel.appendChild(b);
            
            container.appendChild(this.container);

            this.container.appendChild(this.controlPanel);
            this.container.appendChild(this.fileListViewer);
            this.container.appendChild(this.documentViewer);
            this.container.appendChild(gd_SandBox_editorContainer);

            this.container.className = "gd_SandBox_Container";
            this.documentViewer.className = "gd_SandBox_documentViewer";
            
            this.editors.forEach(editor => {
                editor.className = "gd_SandBox_editor";
                editor.selectedFile = null;
            });

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

var gd_SandBox_file = function(sandbox, file){

    let div = document.createElement("div");
    div.name = file.name ? file.name : undefined;


    
    div.content = file.content ? file.content : "";
    div.className = "gd_SandBox_fileName";
    div.innerHTML = div.name;
    div.open = file.open ? false : false;
    div.doubleOpen = false;

    div.isIndex = file.name.toLowerCase() == "index.html" ? true : false;
    
    div.type = typeof file.type !== undefined && file.type == "css" ||
    file.type == "js" ? file.type.toLowerCase() : div.name instanceof String ?
    
    div.name.slice(div.name.lastIndexOf(".")).toLowerCase() : undefined ;

    div.isStyle = div.type == "css";
    div.isScript = div.type == "js";
    
    if(div.isIndex){
        sandbox.body = div;
        return div;
    }
    else if(file.name.toLowerCase() == "style.css" ? true : false){
        sandbox.style = div;
        return div;
    }
    else if(file.name.toLowerCase() == "script.js" ? true : false){
        sandbox.script = div;
        return div;
    }

    return div;
}

const FILE_TYPE = ["css", "js", "html"];
const STYLE = ``;
const BODY = ` TEST 11`;
const SCRIPT = ``;
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