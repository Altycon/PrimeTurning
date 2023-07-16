const DPI = devicePixelRatio;
const TWO_PI = Math.PI*2;
const HALF_PI = Math.PI/2;

function random(min,max,bool){
    if(bool){
        return Math.floor(Math.random()*(max-min)+min)
    }
    return Math.random()*(max-min)+min;
}; 
function scale(num, InMin, InMax, OutMin, OutMax){
    return (num - InMin)*(OutMax-OutMin)/(InMax-InMin)+OutMin;
};
function fixCanvas(canvas,dpi,parent){
    let element;
    if(parent) element = parent;
    else element = canvas;
    const style_width = +getComputedStyle(element).getPropertyValue('width').slice(0,-2);
    const style_height = +getComputedStyle(element).getPropertyValue('height').slice(0,-2);
    canvas.setAttribute('width', (style_width * 4) * dpi);
    canvas.setAttribute('height', (style_height * 4) * dpi);
    return canvas;
};
function isPrime(value){
    if(value <= 1 || value === 4)return false;
    for(let i = 2; i < Math.sqrt(value); i++){
        if(value % i === 0){
            return false;
        }
    }
    return true;
};
function degreesToRadians(degrees){
    return degrees * Math.PI/180;
};

function setUserDisplayViewPosition(display, options){
    const style_width = +getComputedStyle(display).getPropertyValue('width').slice(0,-2);
    const style_height = +getComputedStyle(display).getPropertyValue('height').slice(0,-2);
    const rect = display.getBoundingClientRect();
    console.log(rect);
    if(options){
        display.scroll({
            top: options.y,
            left: options.x,
            behavior: "smooth",
        });
    }else{
        display.scroll({
            top: style_height*1.5,
            left: style_width*1.5,
            behavior: "smooth",
        });
    }
    
};

export {
    DPI,
    TWO_PI,
    HALF_PI,
    random,
    scale,
    fixCanvas,
    isPrime,
    degreesToRadians,
    setUserDisplayViewPosition
}