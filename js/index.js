import { APP_STATE } from "./state.js";
import { DPI, fixCanvas } from "./utilities.js";
import { addProcessNotification } from "./notifications/process_notification.js";
import { addControlButtonListeners } from "./prime_turning/controls.js";
import { setControlDataPropertyValue } from "./prime_turning/control_data.js";



function initializeApp(){
    
    addProcessNotification('Application started.');
    
    APP_STATE.CANVAS = fixCanvas(document.querySelector('.canvas'),DPI);
    
    APP_STATE.CTX = APP_STATE.CANVAS.getContext('2d');
    APP_STATE.CANVAS_WIDTH = APP_STATE.CANVAS.width;
    APP_STATE.CANVAS_HEIGHT = APP_STATE.CANVAS.height;

    setControlDataPropertyValue('startX', APP_STATE.CANVAS_WIDTH*0.5);
    setControlDataPropertyValue('startY', APP_STATE.CANVAS_HEIGHT*0.5);

    addControlButtonListeners();
};
initializeApp();