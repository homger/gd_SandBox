'use strict';


function a(){

}
function _gd_window(htmlBlockType = "div"){
    let block = document.createElement(htmlBlockType);

    block._move = function(e){
        if(block._m_down){
            console.log(e.x);
            block.style.top = e.y - block._of_y + "px";
            block.style.left = e.x - block._of_x + "px";
        }
    };

    block.addEventListener("mousedown", function(event){
        block._of_x = event.offsetX;
        block._of_y = event.offsetY;
        block._m_down = true;
        window.addEventListener("mousemove", block._move);
    });
    /*block.addEventListener("mouseleave", function(){
        block._m_down = false;
    });*/
    block.addEventListener("mouseup", function(){
        block._m_down = false;
        window.removeEventListener("mousemove", block._move);
    });
    //block.addEventListener("mousemove", );
    
    return block;
}