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
      this.ul = this.nav.querySelector("ul");;
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
              //ui_project: ui_project(name),
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
          this.ul.append(projectData.project.uiElement);
          this.events(projectData);
        }
      }.bind(this));
    }

    addFolder(path_str){
      let path_array = this.pathArray(path_str);
      
      let projectData = this.getProject(path_array[0]);
      path_array.shift();

      if(path_array.length > 0){
        path_array.forEach(function(pathElement){
          
        }.bind(this));
      }

      this.projectsList[0].project.addFolder(path);
      this.projectsList[0].ui_project.ui_object.append(ui_folder(path));

    }
    getProject(name){
      if(typeof this.projectsNameList[name] === "undefined")
        throw new Error("Project : '" + name + "' not found");
      
      return this.projectsList[this.projectsNameList[name]];
    }


    events(projectData){
      console.log("EVENTS");
      projectData.project.uiElement.addEventListener("contextmenu",this.navContextMenu);
    }

    navContextMenu(event){
      console.log(event.screenX);
      event.preventDefault();
      
    }


    pathArray(path_str){
      let path = path_str.split("/");
      path.shift();
      if(path[path.length - 1] == "")
        path.pop();
        
      return path;
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