import { DPI } from "../utilities.js";

function setNumberCountDisplay(n){
    document.querySelector('.data-count').innerText = `${n}`;
}
function getControlData(){
    const form = new FormData(document.querySelector('.controls'));
    const hexCompositeColorAlpha = '4d';
    const hexPrimeColorAplpha = '80';

    return {
        startX: +form.get('startX'),
        startY: +form.get('startY'),
        shape: form.get('shape'),
        distance: +form.get('distance') * DPI,
        size: +form.get('size') * DPI,
        angle: +form.get('angle'),
        maxNumber: +form.get('maxNumber'),
        compositeColor: form.get('compositeColor') + hexCompositeColorAlpha,
        primeColor: form.get('primeColor'), //+ hexPrimeColorAplpha,
        backgroundColor: form.get('backgroundColor')
    }
};

function setControlDataPropertyValue(property, value){
    [...document.querySelector('.controls').elements]
    .filter( element => element.name === property)[0].value = value;
};

export {
    setNumberCountDisplay,
    getControlData,
    setControlDataPropertyValue
}