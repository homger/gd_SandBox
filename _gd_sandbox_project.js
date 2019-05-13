'use strict';



class _gd_sandbox_project{
    constructor(project_name, projectFolder = new _gd_sandbox_folder(project_name) ){
        if( !(typeof project_name == "string") )
            throw new TypeError('typeof project_name == "string"');
        
        if(!(projectFolder instanceof _gd_sandbox_folder)){
            console.warn("No projectFolder given or invalid projectFolder");
            this.projectFolder = new _gd_sandbox_folder(project_name);
        }
        else{
            this.projectFolder = projectFolder;
        }
        
        this.name = project_name;
    }

    projectData(){
        return{
            name : this.name,
            content : this.projectFolder.folderData(),
        };
    }
}


function _projectFromProjectData(projectData){
    return new _gd_sandbox_project(projectData.name, _folderFromFolderData(projectData.content));
}