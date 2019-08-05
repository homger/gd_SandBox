'use strict';

const PARAMETERS_DEFAULT_VALUE = {
  nav: null,
  header: null,
  editor: null,
  footer: null,
}
const UI_ELEMENTS_NAME = ["nav","header","editor","footer"]

class gd_SandBox{

    constructor(parameters = PARAMETERS_DEFAULT_VALUE){
        this.navContextMenu = this.navContextMenu.bind(this);

        this.parameters = objectDefaultValue(parameters, PARAMETERS_DEFAULT_VALUE);
        
        this.projectsList = [];
        this.projectsNameList = [];
        this.projectCount = 0;
        this.initialSetUp();

    }

    initialSetUp(){
      console.log("initialSetUp");
      UI_ELEMENTS_NAME.forEach(function(name){
        if(this.parameters[name] !== null){

          this.parameters[name].innerHTML = "";
          this[name] = this.parameters[name];
        }
      }.bind(this));

      this.nav.innerHTML = "<ul></ul>";
    }

    newProject(name){
        if(!(typeof name == "string")){
            name = "N/A";
        }
        if(typeof this.projectsNameList[name] === "undefined"){
          this.projectsNameList[name] = this.projectCount;
          this.projectsList.push(
            {
              name: name, 
              project: new _gd_sandbox_project(name),
              mounted: false,
              ui_project: ui_project(name),
              index: this.projectCount,
            }
            );
            
            ++this.projectCount;
            this.mountProjects();
        }
    }

    mountProjects(){
      this.projectsList.forEach(function(projectData){
        if(!projectData.mounted){
          this.nav.append(projectData.ui_project.ui_object);
          this.events(projectData);
        }
      }.bind(this));
    }

    addFolder(path){
      
    }

    events(projectData){
      console.log("EVENTS");
      projectData.ui_project.ui_object.addEventListener("contextmenu",this.navContextMenu);
    }

    navContextMenu(event){
      console.log(event.screenX);
      event.preventDefault();
      
    }
}


/*
use Object.freeze on defaultObject
*/
function objectDefaultValue(objectToCheck, defaultObject){
  if(typeof defaultObject !== "object"){
    throw new Error("Invalid defaultObject argument");
  }
  if(typeof objectToCheck !== "object"){
    console.warn("argument objectToCheck is not an object. defaultObject wil be copied");
    objectToCheck = {};
  }
  
  let keyArray = Object.keys(defaultObject);
  keyArray.forEach(function(key){
    if(typeof objectToCheck[key] !== typeof defaultObject[key]){
      objectToCheck[key] = defaultObject[key];
    }
  });
  return objectToCheck;
}


function ui_project(_gd_project_name){
  let ui_object = document.createElement("div");
  ui_object.className = "project";
  

  ui_object.innerHTML = `<div class="name">${FOLDER_ICON}${_gd_project_name}</div>`;
  let ul = document.createElement("ul");
  ul.className = "folder project-content";
  ui_object.append(ul);
  
  let project = new __project(ui_object, ul, name);
  return project;
}

function ui_folder(name){
  let ui_object = document.createElement("li");
  ui_object.className = "folder";

  let ul = document.createElement("ul");
  ul.className = "folder-content"
  let ul_content = "";

  ui_object.innerHTML = `<div class="name">${FOLDER_ICON}${name}<div>`;
  ui_object.appendChild(ul);
  
  let folder = new __folder(ui_object, ul, name);
  return folder;
}

function ui_file(name){
  
  let ui_object = document.createElement("li");
  ui_object.className = "file";
  
  ui_object.innerHTML = `
      <div class="name">${name}</div>
    `;
    let file = new __file(name, ui_object);
  return file;
}


class __file{
  constructor(name, ui_object){
    this.name = name;
    this.ui_object = ui_object;
  }

  setName(name){
    this.ui_object.querySelector(".name").innerHTML = name;
    this.name = name;
  }
  getName(){
    return this.name;
  }
}

class __folder{
  
  constructor(ui_object, ul, name){
    this.ui_object = ui_object;
    this.ul = ul;
    this.name = name;
  }

  setName(name){
    this.ui_object.querySelector(".name").innerHTML = name;
    this.name = name;
  }

  getName(){
    return this.name;
  }
  
  addItem(item){
    this.ul.append(item);
  }
  removeItem (item){
    this.ul.removeChild(item);
  }
}


class __project{
  
  constructor(ui_object, ul, name){
    this.ui_object = ui_object;
    this.ul = ul;
    this.name = name;
  }

  setName(name){
    this.ui_object.querySelector(".name").innerHTML = name;
    this.name = name;
  }

  getName(){
    return this.name;
  }
  
  addItem(item){
    this.ul.append(item);
  }
  removeItem (item){
    this.ul.removeChild(item);
  }
}