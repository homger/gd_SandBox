'use strict';



class _gd_sandbox_project{
    constructor(project_name, projectFolder = new _gd_sandbox_folder(project_name, "div") ){
        if( !(typeof project_name == "string") )
            throw new TypeError('typeof project_name == "string"');
        
        if(!(projectFolder instanceof _gd_sandbox_folder)){
            console.warn("No projectFolder given or invalid projectFolder");
            this.projectFolder = new _gd_sandbox_folder(project_name);
        }
        else{
            this.projectFolder = projectFolder;
        }
        
        this.name = project_name;
        //this.projectFolder._make_ui_element();
        
        this.projectFolderUiElement = this.projectFolder.uiElement;
        this.projectFolderUiElement.className = "project";
        addClass(this.projectFolderUiElement._gd_oject.uiContent, "project-content");
        this.uiElement = document.createElement("li");
        this.uiElement.append(this.projectFolderUiElement);

        //this.projectFolder.toggleUiContent();
        console.log(this.projectFolder.folderContent);
    }

    projectData(){
        return{
            name : this.name,
            content : this.projectFolder.folderData(),
        };
    }
    addFolder(path){
      this.projectFolder.addFolder(new _gd_sandbox_folder(path));
    }
    addFile(path){
      this.projectFolder.addFolder(new _gd_sandbox_folder(path));
    }

    uiSetup(){
      let cach = this.projectFolder.folderContent;
      this.ui = ui_project(this.projectFolder.name, this.projectFolder);
      while(true){
        this.ui.append(ui_folder());
      }
    }
    
    __uiSetupAddFolder(master, folder){

    }
}

//FOR IE

function removeClass(element, _class){
  let index = element.className.indexOf(_class);

  if(index > -1){
    let classArray = element.className.split("");
    classArray.splice(index, _class.length);
    element.className = classArray.join("");
    return;
  }
}
function addClass(element, _class){
  let index = element.className.indexOf(_class);
  if(index == -1){
    element.className = element.className + " " + _class;
  }
}
function toggleClass(element, _class){
  let index = element.className.indexOf(_class);
  if(index > -1){
    let classArray = element.className.split("");
    classArray.splice(index, _class.length);
    element.className = classArray.join("");
    return;
  }
  element.className = element.className + " " + _class;
}

/*
function _projectFromProjectData(projectData){
    return new _gd_sandbox_project(projectData.name, _folderFromFolderData(projectData.content));
}


function ui_project(_gd_project_name, project){
  let ui_object = document.createElement("li");
  ui_object.__gd_object = project;
  ui_object.className = "project";
  

  ui_object.innerHTML = `<div class="name">${FOLDER_ICON}${_gd_project_name}</div>`;
  let ul = document.createElement("ul");
  ul.className = "folder project-content";
  ui_object.append(ul);
  
  //let project = new __project(ui_object, ul, name);
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
    this.ui_object._gd_type = "file";
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
    this.ui_object._gd_type = "folder";
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
    this.ui_object._gd_type = "project";
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

*/
