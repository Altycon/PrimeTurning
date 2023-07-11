
function getControlData(){
    const form = new FormData(document.querySelector('.controls'));
    const hexCompositeColorAlpha = '4d';
    const hexPrimeColorAplpha = '80';
    return {
        resolution: +form.get('resolution'),
        size: +form.get('size'),
        maxNumber: +form.get('maxNumber'),
        compositeColor: form.get('compositeColor') + hexCompositeColorAlpha,
        primeColor: form.get('primeColor') //+ hexPrimeColorAplpha
    }
};

export {
    getControlData
}