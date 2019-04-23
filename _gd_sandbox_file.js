'use strict';


/*function _gd_sandbox_file(name, MIME, content, creationDate = Date.now(), lastModified = Date.now()){
    
    
    _gd_sandbox_file.isValid(name, MIME, creationDate, lastModified);

    
    return {
        name : name,
        MIME : MIME,
        content : content,
        creationDate : creationDate,
        lastModified : lastModified,
    }

}

_gd_sandbox_file.isValid = function(name, MIME, creationDate, lastModified){
    
    if(!(typeof name == "string"))
        throw new Error ("Parameter : 'name' Is not typeof string");
    if(!(typeof MIME == "string"))
        throw new Error ("Parameter : 'MIME' Is not typeof string");
    if(isNaN(creationDate))
        throw new Error ("Parameter : 'creationDate' Is not a number");
    if(isNaN(lastModified))
        throw new Error ("Parameter : 'lastModified' Is not a number");

    return true;
}*/

class _gd_sandbox_file{
    constructor(name, MIME, content, creationDate = Date.now(), lastModified = Date.now()){
        
        this.isValid(name, MIME, creationDate, lastModified);
    
        this.name = name;
        this.MIME = MIME;
        this._content = content;
        this._creationDate = creationDate;
        this._lastModified = lastModified;
        this._open = false;
    }


    open(){
        if(this._open){
            console.warn(" _gd_sandbox_file is already open");
            return false;
        }
        this._open = true;
        return true;
    }
    close(){
        if(!this._open){
            console.warn(" _gd_sandbox_file is already closed");
            return false;
        }
        this._open = false;
        return true;
    }
    get content(){
        return this._content;
    }
    set content(value){
        this._content = value;
        this._lastModified = Date.now();
    }
    get creationDate(){
        return this._creationDate;
    }
    /*set creationDate(value){
        this._creationDate = value;
    }*/
    get lastModified(){
        return this._lastModified;
    }
    get fileData(){
        /*const {lastModified, creationDate, name, MIME, content} = this.file;
        let m = new Date(lastModified);
        let c = new Date(creationDate);*/
        return {
            lastModified: new Date(this._lastModified).toString(),//Date(this.file.lastModified).toString(),
            creationDate: new Date(this._creationDate).toString(),
            name: this._name,
            MIME: this.MIME,
            content: this.content,
        };

    }
    isValid(name, MIME, creationDate, lastModified){
        if(!(typeof name == "string"))
            throw new Error ("'name' typeof is not string");
        if(!(typeof MIME == "string"))
            throw new Error ("'MIME' typeof is not string");
        if(isNaN(creationDate))
            throw new Error ("'creationDate' is not number");
        if(isNaN(lastModified))
            throw new Error ("'lastModified' is not number");
    
        return true;
    }

}

function _gd_sandbox_file_isValid({name, MIME, creationDate, lastModified}){
    if(!(typeof name == "string"))
        return false;
    if(!(typeof MIME == "string"))
        return false;
    if(isNaN(creationDate))
        return false;
    if(isNaN(lastModified))
        return false;

    return true;
}