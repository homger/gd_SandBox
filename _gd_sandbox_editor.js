'use strict';

class _gd_sandbox_editor{
    constructor(){

        this._hasFile = false;
        this._textArea = document.createElement("textarea");
        this._textArea.className = "editor";

        this.keyActionSetup();
        
        this.keyAction = this.keyAction.bind(this);
        
        
        this._textArea.addEventListener("keyup", function(){
            this._file.content = this._textArea.value;
            console.log(`slect start:  ${this._textArea.selectionStart} || slect end: ${this._textArea.selectionEnd}`);
        }.bind(this));
        this._textArea.addEventListener("keydown", this.keyAction);

        this.uiElement = this._textArea;
    }
    get cursorIndex(){
        return this._textArea.selectionStart == this._textArea.selectionEnd ? this._textArea.selectionEnd : undefined;
    }
    
    set cursorIndex(index){
        /*if(index > this.textAreaValueLength){
            this._textArea.selectionStart = this.textAreaValueLength - 1;
            this._textArea.selectionEnd = this.textAreaValueLength - 1;
        }*/
        this._textArea.selectionStart += index;
        this._textArea.selectionEnd += index;
    }
    /*moveCursorIndex(index){
        this._textArea.selectionStart = index;
        this._textArea.selectionEnd = index;
    }*/
    get textAreaValueLength(){
        return this._textArea.value.length;
    }
    /*get textAreaValue(){
        return this._textArea.value;
    }
    set textAreaValue(value){
        return this._textArea.value = value;
    }*/
    get charAt(){
        return this._textArea.value[index];
    }
    get selectionActive(){
        return this._textArea.selectionStart == this._textArea.selectionEnd ? false : true;
    }
    get selectionStart(){
        return this._textArea.selectionStart;
    }
    set selectionStart(s_start){
        return this._textArea.selectionStart = s_start;
    }
    get selectionEnd(){
        return this._textArea.selectionEnd;
    }
    set selectionEnd(s_end){
        return this._textArea.selectionEnd = s_end;
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
        this.removeFile();
        if(file.open()){
            this._hasFile = true;
            this._file = file;
            this._textArea.value = this.file.content;
            this._file.editor = this;
        }
        else{
            throw new Error("file is already open");
        }
    }
    removeFile(){
      if(this._hasFile){
          this._file.close();
          this._file.editor = null;
          this._file = null;
          this._hasFile = false;
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
    insertText(text){
        if(this.selectionActive){

        }
        this.insertTextAtIndex(text, index);
    }
    
    insertTextAtIndex(text, index){
        
    }
    print(printValue, cursorOffset){
        const {selectionStart, selectionEnd} = this._textArea;
        let value = this._textArea.value;

        if(selectionStart != selectionEnd){
            this._textArea.value = `${value.slice(0,selectionStart)}${printValue}${value.slice(selectionEnd)}`;

            this._textArea.selectionEnd = selectionStart + printValue.length + cursorOffset;
            this._textArea.selectionStart = selectionStart + printValue.length + cursorOffset;
            return;
        }
        
        this._textArea.value = `${value.slice(0,selectionStart)}${printValue}${value.slice(selectionStart)}`;

        this._textArea.selectionEnd = selectionEnd + printValue.length + cursorOffset;
        this._textArea.selectionStart = selectionStart + printValue.length + cursorOffset;
        

        //console.log(value);
    }
    /*
    keyAction options = {
        printKey: true,
        printValue: "",
        cursorOffset: 0,
        specialAction: true,
        specialFunction: function(textArea){}
    }
    */

    keyActionSetup(){

        this.keyActionMap = new Map();

        this.addKeyAction("Tab", {printKey: true, printValue: "  "});
        this.addKeyAction("{", {printKey: true, printValue: "{}", cursorOffset: -1});
        this.addKeyAction("(", {printKey: true, printValue: "()", cursorOffset: -1});
        this.addKeyAction("Backspace", {specialAction: true, specialFunction: function(textArea){}});

    }
    addKeyAction(keyValue, options){
        this.keyActionMap.set(keyValue, options);
    }

    keyAction(keyboardEvent){
        
        console.log(keyboardEvent.key);
        let key = this.keyActionMap.get(keyboardEvent.key);
        if(key.printKey == true){
            this.print(key.printValue, key.cursorOffset);

            keyboardEvent.preventDefault();
        }
    }
    

}