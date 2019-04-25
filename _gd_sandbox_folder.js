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
        this._files = new Map();
        this._folders = new Map();
    }
    set path(path){
        console.log(path);
        this._path = path;
        this._childPath = path + this._name + "/";
        this._fullName = path + this._name;
        this._folders.forEach(folder => folder.path = this._childPath);
        this._files.forEach(file => file.path = this._childPath);
    }
    set name(name){
        if(!(typeof name == "string"))
            throw new Error ("'name' typeof is not string");
        if(name.includes("/")){
            throw new Error ("'name' Is invalid");
        }
        this._name = name;
        this._childPath = this._path + name + "/";
        this._fullName = this._path + name;
        this._folders.forEach(folder => folder.path = this._childPath);
        this._files.forEach(file => file.path = this._childPath);
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
        return __nameArray(this._folders);
    }
    get filesList(){
        return __nameArray(this._files);
    }
    get folders(){
        return __valueArray(this._folders);
    }
    get files(){
        return __valueArray(this._files);
    }
    get folderContentList(){
        return{
            filesList: this.filesList,
            foldersList: this.foldersList,
        };
    }
    get folderContent(){
        return{
            files: this.files,
            folders: this.folders,
        };
    }
    addFolder(folder){
        if(!is_gd_sandbox_folder(folder)){
            throw new Error("folder is not instanceof _gd_sandbox_folder");
        }
        if(this._folders.has(folder.name)){
            this._folders.get(folder.name).mergeFolder(folder);
        }
        else{
            folder.path = this._childPath;
            this._folders.set(folder.name, folder);
        }
    }
    addFile(file){
        if(!is_gd_sandbox_file(file)){
            throw new Error("file is not instanceof _gd_sandbox_file");
        }
        this._files.set(file.name, file);
        file._path = this._childPath;
    }
    mergeFolder(folder){
        if(!is_gd_sandbox_folder(folder)){
            throw new Error("folder is not instanceof _gd_sandbox_folder");
        }
        folder.path = this._path;
        folder.folders.forEach((folder, name) =>{
            if(this._folders.has(name)){
                this._folders.get(name).mergeFolder(folder);
            }
            else{
                this._folders.set(name, folder);
            }
        });
        folder.files.forEach((file, name) => {
            this._files.set(name, file);
        } );
    }
}


function __nameArray(map){
    let cach = [];
    map.forEach(element => {
        if((element instanceof _gd_sandbox_folder)){
            cach.push(element.name, {
                folders: element.foldersList,
                files: element.filesList,
            })    
        }
        else
            cach.push(element.name);
    });
    return cach;
}

function __valueArray(map){
    let cach = [];
    map.forEach(element => {
        if((element instanceof _gd_sandbox_folder)){
            cach.push(element.name, {
                folders: element.foldersList,
                files: element.filesList,
            })    
        }
        else
            cach.push([element.name,element]);
    });
    return cach;
}

function is_gd_sandbox_folder(folder){
    return (folder instanceof _gd_sandbox_folder);
}

function __mapFromArray(arr){
    let map = new Map();
    arr.forEach((item) => map.set(eleme,value));
    return map;
}