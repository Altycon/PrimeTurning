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
function isPrime(num){
    if(num < 2) return false;
    const sqrtnum = Math.sqrt(num);
    for(var i = 2; i < sqrtnum; i++){
        if(num % i === 0) return false;
    }   
    return num > 1;
};

export {
    DPI,
    TWO_PI,
    HALF_PI,
    random,
    scale,
    fixCanvas,
    isPrime
}