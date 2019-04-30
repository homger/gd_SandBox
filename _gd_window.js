'use strict';


class __gd_window{
    constructor(htmlBlockElementToMove, boundingBlock = document.body,
        default_z_index = -1, moving_z_index = 1){

            
            /*if(!parentTest(boundingBlock, html)){
                throw new Error("!boundingBlock.childNodes.includes(htmlBlockElementToMove) === false");
            }*/
            this.parentSetUp();
            this.movingDiv = document.createElement("div");
            this.default_z_index = default_z_index;
            this.moving_z_index = moving_z_index;

            this.top = 0, this.left = 0, this.boundingBlock = boundingBlock, 
            this.htmlBlockElementToMove = htmlBlockElementToMove, this._size = "mini";
            
            this._mouseDownPositionX = 0;
            this._mouseDownPositionY = 0;
            this.refreshGeometry = this.refreshGeometry.bind(this);
            this.styleSetup();
            this.refreshGeometry();

            this.mouseUp = this.mouseUp.bind(this);
            this.mouseMove = this.mouseMove.bind(this);
            this.mouseDown = this.mouseDown.bind(this);

            if(this._size == "mini")
                this.movingDiv.addEventListener("mousedown", this.mouseDown);

            htmlBlockElementToMove.appendChild(this.movingDiv);
            this.htmlBlockElementToMove.addEventListener("transitionend",() => {
                this.refreshGeometry()
                this.limitTopLeft();

                this.htmlBlockElementToMove.style.top = this.top + "px";
                this.htmlBlockElementToMove.style.left = this.left + "px";
            
            });
            //this.htmlBlockElementToMove.addEventListener("")
            this.mountControls();
    }

    refreshGeometry(){
        this.offsetTopLeft = get_offsetXY(this.boundingBlock);
        this.htmlBlockElementToMove_OffsetWidth = this.htmlBlockElementToMove.offsetWidth;
        this.htmlBlockElementToMove_OffsetHeight = this.htmlBlockElementToMove.offsetHeight;

        this.maxY = this.boundingBlock.offsetHeight + this.offsetTopLeft.top - this.htmlBlockElementToMove_OffsetHeight;
        this.maxX = this.boundingBlock.offsetWidth + this.offsetTopLeft.left - this.htmlBlockElementToMove_OffsetWidth;
        
        this.minY = this.offsetTopLeft.top;
        this.minX = this.offsetTopLeft.left;
    }

    limitTopLeft(){
        if(this.top > this.maxY)
            this.top = this.maxY;
        else if(this.top < this.minY)
            this.top = this.minY;

        if(this.left > this.maxX)
            this.left = this.maxX;
        else if(this.left < this.minX)
            this.left = this.minX;
    }

    mouseMove(event){
        this.top = event.pageY - this._mouseDownPositionY;
        this.left = event.pageX - this._mouseDownPositionX;
        this.limitTopLeft();

        this.htmlBlockElementToMove.style.top = this.top + "px";
        this.htmlBlockElementToMove.style.left = this.left + "px";
    }
    mouseDown(event){
        this._mouseDownPositionX = event.offsetX;
        this._mouseDownPositionY = event.offsetY;
        //this.movingDiv.style.zIndex = this.moving_z_index;
        window.addEventListener("mousemove", this.mouseMove);
        window.addEventListener("mouseup", this.mouseUp);
    }
    mouseUp(){
        //this.movingDiv.style.zIndex = this.default_z_index;
        window.removeEventListener("mousemove", this.mouseMove);
        window.removeEventListener("mouseup", this.mouseUp);
    }

    size_min(){
        if(this._size != "mini"){
            this._size = "mini";
            this.movingDiv.addEventListener("mousedown", this.mouseDown);
            this.htmlBlockElementToMove.style.height = this.boundingBlock.offsetHeight * 0.25 + "px";
            this.htmlBlockElementToMove.style.width =  this.boundingBlock.offsetWidth * 0.25 + "px";
            this.htmlBlockElementToMove.position = "absolute";
            this.refreshGeometry();
        }
    }
    size_half(){
        if(this._size != "half"){
            /*if(this._size == "mini")
                this.movingDiv.removeEventListener("mousedown", this.mouseDown);*/
            this._size = "half";
            /*this.htmlBlockElementToMove.style.top = "0px";
            this.htmlBlockElementToMove.style.left = "0px";*/
            this.htmlBlockElementToMove.style.height =  this.boundingBlock.offsetHeight + "px";
            this.htmlBlockElementToMove.style.width =  this.boundingBlock.offsetWidth * 0.5 + "px";
            this.refreshGeometry();
        }
    }
    size_full(){
        if(this._size != "full"){
            /*if(this._size == "mini")
                this.movingDiv.removeEventListener("mousedown", this.mouseDown);*/
            this._size = "full";
            /*this.htmlBlockElementToMove.style.top = "0px";
            this.htmlBlockElementToMove.style.left = "0px";*/
            this.htmlBlockElementToMove.style.height =  this.boundingBlock.offsetHeight + "px";
            this.htmlBlockElementToMove.style.width =  this.boundingBlock.offsetWidth + "px";
            this.refreshGeometry();
        }
    }

    mountControls(){
        let cach = [this.size_full, this.size_half, this.size_min];
        this.controlPanel = document.createElement("div");
        this.controlPanel.classList = "control-panel";
        /*this.controlPanel.innerHTML =  `
            <div onclick=${() => this.size_full()}></div>
            <div onclick=${() => this.size_half()}></div>
            <div onclick=${() => this.size_min()}></div>
        `;*/
        cach.forEach(element => {
            let _cach = document.createElement("div");
            _cach.onclick = element.bind(this);
            this.controlPanel.appendChild(_cach);
        });
        this.movingDiv.appendChild(this.controlPanel);
    }
    parentSetUp(){
        if(!(this.htmlBlockElementToMove.parentNode.nodeName === document.body.nodeName)){
            throw new Error("htmlBlockElementToMove is not direct child of document.body");
        }
        this.htmlBlockElementToMove.parentNode.childsNodes.removeChild(this.htmlBlockElementToMove);
    }
    styleSetup(){
        this.movingDiv.style.position = "absolute";
        this.movingDiv.style.boxSizing = "border-box";
        this.movingDiv.style.top = "0";
        this.movingDiv.style.left = "0";
        this.movingDiv.style.width = "100%";
        this.movingDiv.style.height = "100%";
        this.htmlBlockElementToMove.style.position = "fixed";
    }
}
function get_offsetXY(element){
    let e = element;
    let top = 0, left = 0;

    while(e.nodeName != document.nodeName){
        console.log(e.nodeName);
        top += e.offsetTop;
        left += e.offsetLeft;
        e = e.parentNode;
    }
    console.log(`TOP: ${top} |||||  LEFT: ${left}`);
    return{
        top,
        left,
    }
}