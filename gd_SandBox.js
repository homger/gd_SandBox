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

    addFolder(path_str, newFolderName){
      let folder = this.findFolder(path_str);
      folder.newFolder(newFolderName);
    }
    addFile(path_str, file){
      let folder = this.findFolder(path_str);
      folder.addFile(file);
    }
    findFolder(path_str){
      let path_array = this.pathArray(path_str);
      
      let project = this.getProject(path_array[0]);
      let folder = project.projectFolder;
      path_array.shift();

      let length = path_array.length;
      
      
      for(let i = 0; i < length; ++i){
        folder = folder.getFolderByName(path_array[i]);

      }
      return folder;
    }
    getProject(name){
      if(typeof this.projectsNameList[name] === "undefined")
        throw new Error("Project : '" + name + "' not found");
      
      return this.projectsList[this.projectsNameList[name]].project;
    }


    events(projectData){
      console.log("EVENTS");
      projectData.project.uiElement.addEventListener("contextmenu",this.navContextMenu);
      //projectData.project.uiElement.addEventListener("click",this.navClick.bind(this));

    }

    navContextMenu(event){
      console.log(event.screenX);
      event.preventDefault();
      this.contextMenuPop(event.target);
    }
    contextMenuPop(gd_element){
      
    }

    navClick(event){
      console.log(" click");
      if(event.target.className === "gd-folder-icon"){
        console.log("gd-folder-icon click");
        event.target.parentNode.parentNode._gd_oject.toggleUiContent();
      }
    }


    pathArray(path_str){
      let path = path_str.split("/");
      path.shift();
      if(path[path.length - 1] == "")
        path.pop();
        
      return path;
    }
    
}

const fileContextMenu = `
<div>

</div>
`;

const folderContextMenu = `
<div>
  <div>addFolder</div>
</div>
`;

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