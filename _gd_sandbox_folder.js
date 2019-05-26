'use strict';


class _gd_sandbox_folder{
    constructor(name, path = "/", files = new Map(), folders = new Map(), 
    creationDate = Date.now(), lastModified = Date.now() ){

        if(!(typeof name == "string"))
            throw new Error ("'name' typeof is not string");
        if(name.includes("/")){
            throw new Error ("'name' Is invalid");
        }

        this._name = name;
        this._path = path;
        this._fullName = this._path + this._name;
        this._childPath = this._path + this.name + "/";
        this._files = files;
        this._folders = folders;
        this._creationDate = creationDate;
        this._lastModified = lastModified;
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
        let cach = [];
        this._folders.forEach(folder => cach.push(folder.folderData()));
        return cach;
    }
    get foldersName(){
        let cach = [];
        this._folders.forEach(folder => cach.push(folder.name));
        return cach;
    }
    get files(){
        let cach = [];
        this._files.forEach(file => cach.push(file.fileData));
        return cach;
    }
    getFileArray(){
        let cach = [];
        this._files.forEach(file => cach.push(file));
        return cach;
    }
    get filesName(){
        let cach = [];
        this._files.forEach(file => cach.push(file._name));
        return cach;
    }
    get folderContentList(){
        let cach = [];
        this._folders.forEach(folder => cach.push([folder.name]));
        return[{
            files: this.filesList,
            folders: cach,
        }];
    }
    get folderContent(){
        let cach = [];
        
        this._folders.forEach(folder => cach.push(folder.folderContent) );
        return[this.name,{
            files: this.files,
            folders: cach,
        }];
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

    _folderFromArray(folderArray){
        if(!(folderArray instanceof Array)){
            throw new Error("folderArray is not instanceof Array");
        }
    }
    folderData(){
        return{
            name: this._name,
            path: this._path,
            files: this.files,
            folders: this.folders,
            creationDate: this._creationDate,
            lastModified: this._lastModified,
        }
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
        cach.push([element.name,element]);
    });
    return cach;
}

function is_gd_sandbox_folder(folder){
    return (folder instanceof _gd_sandbox_folder);
}

function _folderFromFolderData(folderData){
    let folder_cach;
    let filesMap = new Map();
    let foldersMap = new Map();
    folderData.files.forEach(file => filesMap.set(file.name, _fileFromFileData(file)) );
    
    folderData.folders.forEach(folder => foldersMap.set(folder.name, _folderFromFolderData(folder)));

    folder_cach = new _gd_sandbox_folder(folderData.name, folderData.path, 
        filesMap, foldersMap, folderData.creationDate, folderData.lastModified);
    ;
    return folder_cach;
}