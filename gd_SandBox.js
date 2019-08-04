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

        this.parameters = objectDefaultValue(parameters, PARAMETERS_DEFAULT_VALUE);
        
        this.projectsList = [];
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
        this.projectsList.push(
          {
            name: name, 
            project: new _gd_sandbox_project(name),
            mounted: false,
          }
          );
          this.mountProjects();
    }

    mountProjects(){
      this.projectsList.forEach(function(projectData){
        if(!projectData.mounted){
          this.nav.append(ui_project(this.projectsList[0][1].name))
        }
      }.bind(this));
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
  let project = document.createElement("div");
  project.className = "project";
  

  project.innerHTML = `<div class="name">${FOLDER_ICON}${_gd_project_name}</div>`;
  let ul = document.createElement("ul");
  ul.className = "folder project-content";
  project.append(ul);
  return project;
}

function ui_folder(name, content){
  let folder = document.createElement("li");
  folder.className = "folder";

  let ul = document.createElement("ul");
  ul.className = "folder-content"
  let ul_content = "";
  content.folders.forEach(function(folderName){
    ul_content += `<li class="folder">${folderName}</li>`;
  });

  ul.innerHTML = ul_content;

  content.files.forEach(function(fileName){
    ul.append(ui_file(fileName));
  });

  folder.innerHTML = `<div class="name">${FOLDER_ICON}${name}<div>`;
  folder.appendChild(ul);
  return folder;
}

function ui_file(name){
  
  let file = document.createElement("li");
  file.className = "file";
  
  file.innerHTML = `
      <div class="name">${name}</div>
    `;
  return file;
}
