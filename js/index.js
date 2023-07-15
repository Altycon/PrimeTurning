import { APP_STATE } from "./state.js";
import { DPI, fixCanvas } from "./utilities.js";
import { addProcessNotification } from "./notifications/process_notification.js";
import { addControlButtonListeners } from "./prime_turning/controls.js";
import { setControlDataPropertyValue } from "./prime_turning/control_data.js";

/**
 *      NOTES
 *  Add function to calculate turning at differnt angles...at the very least
 *      set up for moving 60 degrees to represent triangle movement
 *  - connect every 3 prime points to form a triangle ?
 *  - do the same to for square/pixel thing?
 *  - do the same for all general case shapes?
 */

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