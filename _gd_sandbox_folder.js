'use strict';


class _gd_sandbox_folder{
    constructor(name){

        if(!(typeof name == "string"))
            throw new Error ("'name' typeof is not string");
        if(name.includes("/")){
            throw new Error ("'name' Is invalid");
            let index = name.lastIndexOf("/");
            if(index == name.length - 1 || name.includes("//")){
                throw new Error ("'name' Is invalid");
            }
        }

        this._path = "/";
        this._name = name;
        this._fullName = this._path + this._name;
        this._childPath = this._path + this.name + "/";
        this._files = [];
        this._folders = {};
        this._foldersList = [];
        this._filesList = [];
        /*if(typeof folders == "array"){
            folders.forEach(folder => {
                this.addFolder(folder);
            } );
        }
        if(typeof files == "array"){
            folders.forEach(file => {
                this._files.push(file);
            } );
        }*/
    }
    set path(path){
        console.log(path);
        this._path = path;
        this._childPath = path + this._name + "/";
        this._fullName = path + this._name;
    }
    set name(name){
        if(name.includes("/")){
            throw new Error ("'name' Is invalid");
        }
        this._name = name;
        this._childPath = this._path + name + "/";
        this._fullName = this._path + name;
    }
    get path(){
        return this._path;
    }
    get childPath(){
        return this._childPath;
    }
    get name(){
        return this._name;
    }
    get fullName(){
        return this._fullName;
    }
    get foldersList(){
        return this._foldersList;
    }
    get filesList(){
        return this._filesList;
    }
    addFolder(folder){
        
        if(this._foldersList.includes(folder.name)){
            this._folders[folder.name].mergeFolder(folder);
        }
        else{
            this._foldersList.push(folder.name);
            this._folders[folder.name] = folder;
            this._folders[folder.name].path = this._childPath;
        }
        folder._files.forEach(file => {
            this._files.push(file)
            file._path = this._childPath;
        } );
    }
    addFile(file){
        this._files.push(file);
        file._path = this._childPath;
        this._filesList.push(file.name);
    }
    mergeFolder(folder){
        folder._foldersList.forEach(folderName =>{
            this._folders[folderName].addFolder(floder);
        });
        folder._files.forEach(file => {
            this._files.push(file)
            file._path = this._childPath;
        } );
    }
}