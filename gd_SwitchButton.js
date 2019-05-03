
var valid = ("1234567890").split("");
function gd_SwitchButton(width = 150){

        let height = "calc("+width+" / 3)";

        let SW_BUTTON = document.createElement("div");

        SW_BUTTON.__active = false;
        SW_BUTTON.innerHTML = "<div></div><div></div><div class='indicator'></div>";
        SW_BUTTON.className = "switch-button";
        SW_BUTTON._indicator = SW_BUTTON.querySelector(".indicator");
        /*SW_BUTTON.style.width = width;
        SW_BUTTON.style.height = height;*/

        setStyle(SW_BUTTON, width);
        
        SW_BUTTON.addEventListener("click", () => {
            SW_BUTTON.__active = !SW_BUTTON.__active;
            SW_BUTTON.classList.toggle("active");
            
            if(SW_BUTTON.__active){
                SW_BUTTON._indicator.style.left = SW_BUTTON._indicator._style.active.left;
                SW_BUTTON._indicator.style.transform = SW_BUTTON._indicator._style.active.transform;
            }
            else{
                SW_BUTTON._indicator.style.left = SW_BUTTON._indicator._style.inactive.left;
                SW_BUTTON._indicator.style.transform = SW_BUTTON._indicator._style.inactive.transform;
            }
        } );

        return SW_BUTTON;
    }

document.addEventListener("readystatechange", function(){
    if(document.readyState === "complete"){
        let style = document.createElement("style");
        style.innerHTML = STYLE;

        document.head.appendChild(style);
    }
});


function setStyle(button,  width){
    let childWidth = width / 3;
    button.style.borderLeft = 0;
    button.style.borderRight = 0;
    button.style.boxSizing = "border-box";
    button.style.width = width + "px";
    button.style.height = childWidth + "px";
    button.style.display  = "inline-block";
    

    let childs = button.querySelectorAll("div");
    let indicatorMultiplier = 0.9;
    childs.forEach((child, index) => {
        child.style.border = 0;
        child.style.boxSizing = "border-box";
        child.style.width = childWidth + "px";
        child.style.height = childWidth + "px";
        child.style.display  = "inline-block";
        child.style.position = "absolute";
        child.style.top = "calc(50% - "+childWidth/2+"px)";
        child.style.borderRadius = "50%";
        if(index == 0)
            child.style.left = -childWidth / 2 + "px";
        else if(index == 1)
            child.style.right = -childWidth / 2 + "px";
        else{
            child.style.left = -childWidth / 2 *indicatorMultiplier + "px";
            child.style.width = childWidth * indicatorMultiplier  + "px";
            child.style.height = childWidth * indicatorMultiplier  + "px";
            child.style.top = "calc(50% - "+indicatorMultiplier *childWidth/2+"px)";
            child._style = {
                active : {
                    left: width - childWidth / 2 *indicatorMultiplier  + "px",
                    transform: "rotate(360deg)",
                },
                inactive : {
                    left: -childWidth / 2 *indicatorMultiplier  + "px",
                    transform: "rotate(0deg)",
                },
            }
        }
    });
    
}
var STYLE = `
.switch-button{
    position: relative;
    top: 150px;
    left: 150px;
background-color: rgba(0,0,0,1);
}
.switch-button > div{
    background-color: inherit;
}
.switch-button > .indicator{
    background-color: blue;
    background: rgb(0,86,154);
    background: linear-gradient(45deg, rgba(0,86,154,1) 0%, rgba(0,219,255,1) 100%);
    transition: left linear 2.25s, transform linear 2.25s;
}
`;