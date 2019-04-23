'use strict';


class _gd_sandbox_viewer{
    constructor(){
        this.iframe = document.createElement("iframe");
        
    }


    set document(content){
        console.log(typeof this.iframe.srcdoc);
        if(typeof this.iframe.srcdoc == "string"){
            this.iframe.srcdoc = content;
        }
        else{
            this.iframe.addEventListener("load", function({target: iframe}){
                iframe.contentDocument.documentElement.innerHTML = content;
            });
        }
    }
    setDocument(){
        this.document(content);
        
    }
}