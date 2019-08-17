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

        window.addEventListener("contextmenu", this.navContextMenu);
        this.___windowClick = this.___windowClick.bind(this);
        this.removeContextMenu = this.removeContextMenu.bind(this);

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
      this.contextMenuNameList = [];
      this.contextMenuSetup();
      
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
      //projectData.project.uiElement.addEventListener("contextmenu",this.navContextMenu);
      //projectData.project.uiElement.addEventListener("click",this.navClick.bind(this));

    }

    navContextMenu(event){
      console.log(event.screenX);
      event.preventDefault();
      let gd_object = event.target;
      while(true){
        console.log("ITé --");
        let length = this.contextMenuNameList.length;
        for(let i = 0; i< length; ++i){
          if(hasClass(gd_object, this.contextMenuNameList[i])){
            
            this.choosenFolder = gd_object;
            console.log(gd_object);
            this.contextMenuPop(gd_object._gd_oject,
              {
                x: event.pageX,
                y: event.pageY,
              });
          }
        }
        gd_object = gd_object.parentNode;
        if(gd_object.tagName == "BODY" || gd_object.tagName == "body")
          return;
      }
    }
    contextMenuPop(gd_element, xy){
      console.log(gd_element.uiElement._type);

      this.chosenContextMenu = this.contextMenuList[gd_element.uiElement._type];
      this.openedContextmenuType = gd_element.uiElement._type;

      document.body.appendChild(this.chosenContextMenu);

      let _xy = this.contextMenuBounding(xy);
      this.chosenContextMenu.style.top = _xy.y + "px";
      this.chosenContextMenu.style.left = _xy.x + "px";

      window.addEventListener("mousedown", this.___windowClick);
    }

    ___windowClick(event){
      if(event.target.parentNode === this.chosenContextMenu 
        || event.target === this.chosenContextMenu){
          return;
        }
      document.body.removeChild(this.chosenContextMenu);
      window.removeEventListener("mousedown", this.___windowClick);
    }
    removeContextMenu(){
      document.body.removeChild(this.chosenContextMenu);
      window.removeEventListener("mousedown", this.___windowClick);
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

    contextMenuBounding({x,y}){
      let _y = y + this.chosenContextMenu.offsetHeight - document.documentElement.offsetHeight;
      let _x = x + this.chosenContextMenu.offsetWidth - document.documentElement.offsetWidth;
      console.log("_y  :  " + _y);
      if(_y > 0)
        _y  = y - _y;
      else
        _y = y;
      if(_x > 0)
      _x  = x - _x;
      else
        _x = x;
        
      return {x:_x,y:_y};
    }
    contextMenuSetup(){
      this.contextMenuList = [];
      this.contextMenuMake("folder",[
        ["Add Folder", function(){
          this.choosenFolder.newFolder(prompt("New Folder name", "N/A"));
        }.bind(this), "add-folder"],
      ]);
      }

    contextMenuMake(contextMenuName, options){
      this.contextMenuNameList.push(contextMenuName);
      this.contextMenuList[contextMenuName] = document.createElement("div");
      this.contextMenuList[contextMenuName].className = "context-menu";

      let cach;
      options.forEach((option) => {
        cach = document.createElement("div");
        cach.innerHTML = option[0];
        cach.onclick = function(){
          this.removeContextMenu();
          option[1]();
        }.bind(this);
        if(typeof option[3] === "string")
          cach.className = option[3];
        
          this.contextMenuList[contextMenuName].append(cach);
      });

    }
}
div
const fileContextMenu = `
<div>

</div>
`;

const folderContextMenu = `
<div style="background-color:yellow;width:50px;height:100">
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


function hasClass(element, _class){
  let index = element.className.indexOf(_class);

  if(index > -1){
    if(checkBorder(element.className, index, _class.length)){
      console.log(element.className);
    }
    return checkBorder(element.className, index, _class.length);
  }
  return false;
}

function checkBorder(string, index, length){
  let m_length = length - 1;
  if(index > 0 && string[index - 1] !== " ")
    return false;
  if(string.length > index + length && string[index + length] !== " ")
    return false;
  return true;
}