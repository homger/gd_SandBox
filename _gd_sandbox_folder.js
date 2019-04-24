'use strict';


class _gd_sandbox_folder{
    constructor(name, {folders, files}){

        if(!(typeof name == "string"))
            throw new Error ("'name' typeof is not string");
        if(name.includes("/")){
            let index = name.lastIndexOf("/");
            if(index == name.length - 1 || name.includes("//")){
                throw new Error ("'name' Is invalid");
            }
        }

        this.name = name;
        this._files = [];
        this._folders = {};
        this.folderNames = [];
        if(typeof folders == "array"){
            folders.forEach(folder => {
                this.addFolder(folder);
            } );
        }
        if(typeof files == "array"){
            folders.forEach(file => {
                this._files.push(file);
            } );
        }
    }

    addFolder(folder){
        
        if(this.folderNames.includes(folder.name)){
            this._folders[folder.name].mergeFolder(folder);
        }
        else{
            this.folderNames.push(folder.name);
            this._folders[folder.name] = folder;
        }
    }
    addFile(file){
        this._files.push(file);
    }
    mergeFolder(folder){
        folder.folderNames.forEach(folderName =>{
            this._folders[folderName].addFolder(floder);
        });
        folder._files.forEach(file => this._files.push(file) );
    }
}