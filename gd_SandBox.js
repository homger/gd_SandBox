'use strict';

class gd_SandBox{
    constructor(container, parameters){
        let arguments_valid = _argumentsCheck(container, parameters);
        if(!arguments_valid.valid){
            console.log(arguments_valid.elements);
            throw new Error("args are invalid");
        }
        console.log(arguments_valid);
        this.initialSetUp(container, parameters);
        

    }

    initialSetUp(container, parameters){
        this.main_container = document.createElement("main");
        _layoutSetUp(this);
        _m_var_setup(this);

        container.append(this.main_container);
    }

    newProject(name){
        if(!(typeof name == "string")){
            name = "N/A";
        }
        this.projectsList.push([name, new _gd_sandbox_project(name)]);
    }



}

function _argumentsCheck(container, parameters){
    let data_object = {valid : true, elements : []}; //...
    
    data_object.elements.push(["container",(container instanceof HTMLElement)]);
    let length = data_object.elements.length;
    for(let i = 0; i < length; ++i){
        if(!data_object.elements[i][1]){
            data_object.valid = false;
            return data_object;
        }
    }
    
    return data_object;
}

function _layoutSetUp(sandbox){
    sandbox.main_container.className = "gd_SandBox";
    let nav = document.createElement("nav");
    let header = document.createElement("header");
    let working_section = document.createElement("section");
    let footer = document.createElement("footer");

    sandbox.gui_elements = [nav, header, working_section, footer];
    /*sandbox.gui_elements["nav"] = nav;
    sandbox.gui_elements["header"] = header;
    sandbox.gui_elements["working_section"] = working_section;
    sandbox.gui_elements["footer"] = footer;*/

    sandbox.gui_elements.forEach(function(element){
        element.className = "gd_SandBox_gui_element";
        sandbox.main_container.append(element);
    });
}

function _m_var_setup(sandbox){
    sandbox.projectsList = [];
}





document.addEventListener("readystatechange", function(){
    if(document.readyState === "complete"){
        let style = document.createElement("style");
        style.innerHTML = DEFAULT_STYLE;

        document.head.append(style);
    }
});



var DEFAULT_STYLE = [
    `
    .gd_SandBox{
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .gd_SandBox *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .gd_SandBox_gui_element{
        position: absolute;
        border: 1px solid red;
    }
    .gd_SandBox > header{
        top:0;
        left:0;
        height: 10%;
        width: 100%;
    }
    .gd_SandBox > nav{
        top:10%;
        left:0;
        height: 85%;
        width: 15%;
    }
    .gd_SandBox > section{
        top:10%;
        left:15%;
        height: 85%;
        width: 85%;
    }
    .gd_SandBox > footer{
        top:95%;
        left:0;
        height: 5%;
        width: 100%;
    }
    `,
];