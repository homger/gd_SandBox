'use strict';

/*

option type: checkbox, function, value_range
*/
const _gd_sandbox_option_option_type = ["checkbox", "function", "value_range", "option"];



class _gd_sandbox_option extends _gd_event{
    constructor(name, type, description = "", value = undefined, optionArray = undefined){
        super();
        this.name = name;
        this.type = type;
        this.description = description;
        this.option = undefined;
        this.value = value;
        this.status = undefined;


        this.createOption();

        this.__addEventType("activated",["status"]);
        this.option.uiElement.addEventListener("click", this.activate.bind(this));
    }
    
    createOption(){
        switch(this.type){
            case "checkbox":
                this.option = new __gd_sandbox_option_checkbox(this.name);
                this.status = this.option.status
                this.option.optionDescription.innerHTML = this.description
                break;
            case "function":
                this.option = new __gd_sandbox_option_function(this.name, this.value);
                this.option.optionDescription.innerHTML = this.description
                break;
        }
    }
    get uiElement(){
        return this.option.uiElement
    }

    activate(){
        this.status = this.option.activate();
        this.dispatchEvent("activated");
    }
}

class __gd_sandbox_option_checkbox{
    constructor(name, status = false){
        this.status = status;
        this.name = name;
        this._make_ui_element();
    }
    _make_ui_element(){
        this.uiElement = document.createElement("div");
        this.uiElement.className = "option";
        
        this.uiItem = document.createElement("INPUT");
        this.uiItem.className = "name";
        this.uiItem.type = "checkbox";
  
        this.uiElement.append(this.uiItem);
        this.uiElement._gd_oject = this;
  
        this.uiElement._contextmenu_type = "option";

        this.optionDescription = document.createElement("span");
        this.uiElement.appendChild(this.optionDescription);
      }
    
    activate(){
        this.status = !this.status;
        this.uiItem.checked = this.status
        console.log("__gd_sandbox_option_checkbox");
        return this.status
    }
}

class __gd_sandbox_option_function{
    constructor(name, call_function){
        this.call_function = call_function;
        this.name = name;
        this._make_ui_element();
    }
    _make_ui_element(){
        this.uiElement = document.createElement("div");
        this.uiElement.className = "option";
        
        this.uiItem = document.createElement("button");
        this.uiItem.className = "name";
        this.uiItem.name = this.name;
  
        this.uiElement.append(this.uiItem);
        this.uiElement._gd_oject = this;
  
        this.uiElement._contextmenu_type = "option";

        this.optionDescription = document.createElement("span");
        this.uiElement.appendChild(this.optionDescription);
      }
    activate(){
        this.call_function();
        console.log("__gd_sandbox_option_function");
    }
}