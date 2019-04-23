'use strict';

class _gd_sandbox_editor{
    constructor(){

        this._textArea = document.createElement("textarea");
        this._textArea.addEventListener("keyup", function(){
            this._file.content = this._textArea.value;
            console.log(this._file.fileData);
        }.bind(this));
    }

    set file(file){
        _gd_sandbox_file_isValid(file);
        if(file.open()){
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