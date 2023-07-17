import { DPI } from "../utilities.js";

const PRESETS = {
    "1": {
        shape: 'square',
        distance: 20,
        size: 5,
        angle: 90,
        maxNumber: 100
    },
    "2": {
        shape: 'point',
        distance: 10,
        size: 3,
        angle: 90,
        maxNumber: 500
    },
    "3": {
        shape: 'square',
        distance: 1,
        size: 0.5,
        angle: 1,
        maxNumber: 10000
    },
    "4": {
        shape: 'point',
        distance: 0.5,
        size: 1,
        angle: 90,
        maxNumber: 100000
    },
    "5": {
        shape: 'point',
        distance: 0.1,
        size: 0.5,
        angle: 90,
        maxNumber: 1000000
    },
}

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
function setControlDataRadioButton(name,value){
    const radios = [...document.querySelector('.controls').elements]
    .filter( element => element.name === name);

    radios.forEach( button => {
        button.checked = false;
    });
    radios.forEach( button => {
        if(button.value === value) button.checked = true;
    })
}

function presetControlData(presetValue){
    const presetKeys = Object.keys(PRESETS);
    for(const prop of presetKeys){
        if(prop === presetValue){
            const preset = PRESETS[prop];

            const keys = Object.keys(preset);
            for(const key of keys){
                const value = preset[key];
                if(key === 'shape'){
                    setControlDataRadioButton(key, value);
                }else{
                    setControlDataPropertyValue(key, value)  
                }
            }
        }
    }
};

export {
    setNumberCountDisplay,
    getControlData,
    setControlDataPropertyValue,
    presetControlData
}