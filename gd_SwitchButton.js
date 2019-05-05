
let c = document.getElementById("c");

class sb{
    constructor(buttonSize = 1, container){
        if(isNaN(buttonSize)){
            throw new Error("buttonSize is not a number");
        }
        if( (container instanceof HTMLElement)){
            this.dom_container = container;
        }
        else{
            this.dom_container = null;
        }

        this.mainContainer = document.createElement("div");
        /**
         */
        this.mainContainer.className = "mainContainer";
         /* 
         */
        this.mainContainer.style.width = "100%";
        this.mainContainer.style.height = "100%";
        this.mainContainer.style.position = "relative";

        this.makeButtonContainer();
        this.mainContainer.appendChild(this.buttonContainer);
        if(this.dom_container){
            console.log("mount call");
            this.mount();
            console.log("mount called");
        }

    }

    makeButtonContainer(){
        this.buttonContainer = document.createElement("div");
        this.buttonContainer.style.height = "100%";
        this.buttonContainer.style.position = "absolute";
        this.buttonContainer.style.top = "0";
        this.buttonContainer.style.zIndex = "1";
        this.buttonContainer.style.borderLeft = 0;
        this.buttonContainer.style.borderRight = 0;

        this.buttonContainerSides = [];
        let side;
        for(let i = 0; i < 2; ++i){
            side = document.createElement("div");
            side.style.borderRadius = "50%";
            side.style.position = "absolute";
            side.style.height = "100%";
            side.style.zIndex = "0";
            if(i == 0)
                side.style.left = 0;
            else
                side.style.right = 0;
            this.buttonContainerSides.push(side);
            this.mainContainer.appendChild(side);
        }

        this.button = document.createElement("div");
        this.button.style.position = "absolute";
        this.button.style.top = "0";

        this.buttonContainer.appendChild(this.button);
    }
    mount(){

        let observer = new MutationObserver((mutationList, observer) => {
            mutationList.forEach(mutation => {
                console.log("dom_container mutation observed");
                if(mutation.type == "childList"){
                    console.log("mutation type == 'childList'");
                    let length = mutation.addedNodes.length;
                    console.log("this.buttonContainer :  " + this.mainContainer);
                    for(let i = 0; i < length; ++i){
                        console.log("ADDED NODE : " + mutation.addedNodes[i]);
                        if(mutation.addedNodes[i] === this.mainContainer){
                            console.log("mutation.addedNodes[i] === this.buttonContainer");
                            this.fixStyle();
                            observer.disconnect();
                            console.log("mutation obsever disconnect");
                            break;
                        }
                    }
                }
            });

        }) ;

        observer.observe(this.dom_container,{childList: true});
        this.dom_container.appendChild(this.mainContainer);
    }

    fixStyle(){
        let buttonContainerStyle = window.getComputedStyle(this.buttonContainer);
        let height = this.buttonContainer.offsetHeight;

        this.buttonContainer.style.width = this.mainContainer.offsetWidth - height + "px";
        this.buttonContainer.style.left = height / 2 + "px";
        
        let b_top = buttonContainerStyle.getPropertyValue("border-top-width");
        let b_top_color = buttonContainerStyle.getPropertyValue("border-top-color");
        let b_top_style = buttonContainerStyle.getPropertyValue("border-top-style");

        let borderWidth = b_top.substring(0,b_top.length - 2);

        console.log(borderWidth);
        this.buttonContainer.style.top = -borderWidth + "px";

        let length = this.buttonContainerSides.length;
        let side;
        for(let i = 0; i < length; ++i){
            side = this.buttonContainerSides[i];
            side.style.width = height;
            side.style.top = -borderWidth + "px";
            side.style.border = borderWidth + "px " +  b_top_style + " " + b_top_color;
        }
        console.log("STYLE FIXED");
    }
}