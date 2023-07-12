import { APP_STATE } from "./state.js";
import { DPI, fixCanvas, isPrime } from "./utilities.js";
import { addProcessNotification } from "./notifications/process_notification.js";
import { addControlButtonListeners } from "./prime_turning/controls.js";



function initializeApp(){
    console.log('isPrime', isPrime(4))
    addProcessNotification('Application started.');
    
    APP_STATE.CANVAS = fixCanvas(document.querySelector('.canvas'),DPI);
    
    APP_STATE.CTX = APP_STATE.CANVAS.getContext('2d');
    APP_STATE.CANVAS_WIDTH = APP_STATE.CANVAS.width;
    APP_STATE.CANVAS_HEIGHT = APP_STATE.CANVAS.height;

    addControlButtonListeners();
};
initializeApp();