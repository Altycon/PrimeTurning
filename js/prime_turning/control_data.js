function setNumberCountDisplay(n){
    document.querySelector('.controls').dataset.count = `${n}`;
}
function getControlData(){
    const form = new FormData(document.querySelector('.controls'));
    const hexCompositeColorAlpha = '4d';
    const hexPrimeColorAplpha = '80';
    return {
        startX: +form.get('startX'),
        startY: +form.get('startY'),
        resolution: +form.get('resolution'),
        size: +form.get('size'),
        maxNumber: +form.get('maxNumber'),
        compositeColor: form.get('compositeColor') + hexCompositeColorAlpha,
        primeColor: form.get('primeColor') //+ hexPrimeColorAplpha
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