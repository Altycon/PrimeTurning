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
function fixCanvas(canvas,dpi){
    const style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
    const style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
    canvas.setAttribute('width', style_width * dpi);
    canvas.setAttribute('height', style_height * dpi);
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
}

export {
    DPI,
    TWO_PI,
    HALF_PI,
    random,
    scale,
    fixCanvas,
    isPrime,
    degreesToRadians
}