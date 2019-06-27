'use strict';

class _gd_sandbox_editor{
    constructor(){

        this._hasFile = false;
        this._textArea = document.createElement("textarea");
        this._textArea.addEventListener("keyup", function(){
            this._file.content = this._textArea.value;
            console.log(this._file.fileData);
        }.bind(this));
    }
    set className(className){
        this._textArea.className = className;
    }
    get className(){
        return this._textArea.className;
    }
    set id(id){
        this._textArea.id = id;
    }
    get id(){
        return this._textArea.id;
    }
    set file(file){
        //_gd_sandbox_file_isValid(file);
        if(!is_gd_sandbox_file(file)){
            throw new Error("file is not instanceof _gd_sandbox_file");
        }
        if(this._hasFile){
            this._file.close();
            this._file = null;
            this._hasFile = false;
        }
        if(file.open()){
            this._hasFile = true;
            this._file = file;
            this._textArea.value = this.file.content;
        }
        else{
            throw new Error("file is already open");
        }
    }
    get file(){
        return this._file;
    }
    getfile(){
        return this.file;
    }
    setFile(file){
        this.file = file;
    }


}