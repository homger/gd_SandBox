'use strict';

function get_offsetXY(element){
    let e = element.parentNode;
    let top = 0, left = 0;

    while(e.nodeName != document.nodeName){
        console.log(e.nodeName);
        top += e.offsetTop;
        left += e.offsetLeft;
        e = e.parentNode;
    }
    return{
        top,
        left,
    }
}


function _gd_window(htmlBlockElementToMove,boundingBlock = document.body, default_z_index = -1, moving_z_index = 2){
    let block = document.createElement("div");
    block.style.position = "absolute";
    //block.style.boxSizing = "border-box";
    block.style.top = "0";
    block.style.left = "0";
    block.style.width = "100%";
    block.style.height = "100%";
    block.default_z_index = default_z_index;
    block.moving_z_index = moving_z_index;

    block._top = 0, block._left = 0;
    let offsetObj = get_offsetXY(boundingBlock);
    block._offsetTop = offsetObj.top;
    block._offsetLeft = offsetObj.left;
    block._move = function(e){
        let W = block.offsetWidth;
        let H = block.offsetHeight;
        if(block._m_down){
            block._top = e.y - block._of_y;
            block._left = e.x - block._of_x;
            if(block._top > boundingBlock.clientHeight + block._offsetTop - H)
                block._top = boundingBlock.clientHeight + block._offsetTop  - H;
            else if(block._top < block._offsetTop)
                block._top = block._offsetTop;
            
            if(block._left > boundingBlock.clientWidth + block._offsetLeft - W)
                block._left = boundingBlock.clientWidth + block._offsetLeft - W;
            else if(block._left < block._offsetLeft)
                block._left = block._offsetLeft;
            

            htmlBlockElementToMove.style.top = block._top  - block._offsetTop + "px";
            htmlBlockElementToMove.style.left = block._left - block._offsetLeft + "px";
        }
    };
    block._stop = function(e){
        if(block._m_down){
            block._m_down = false;
            block.style.zIndex = block.default_z_index;
            window.removeEventListener("mouseup", block._stop);
            //boundingBlock.removeEventListener("mouseleave", block._stop);
            window.removeEventListener("mousemove", block._move);
        }
    }
    block.addEventListener("mousedown", function(event){
        if(!block._m_down){
            block._of_x = event.offsetX;
            block._of_y = event.offsetY;
            block.style.zIndex = block.moving_z_index;
            window.addEventListener("mousemove", block._move);
            //boundingBlock.addEventListener("mouseleave", block._stop);
            window.addEventListener("mouseup", block._stop);
            block._m_down = true;
            console.log("DOWN");
        }
    });
    
    block.addEventListener("mouseup", function(){
        if(block._m_down){
            block._m_down = false;
            block.style.zIndex = block.default_z_index;
            window.removeEventListener("mousemove", block._move);
            console.log("UP");
        }
    });

    htmlBlockElementToMove.appendChild(block);
    
    
    return block;
}