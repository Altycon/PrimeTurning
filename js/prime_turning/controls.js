import { APP_STATE } from "../state.js";
import { getControlData } from "./control_data.js";
import { addProcessNotification } from "../notifications/process_notification.js";
import { calculateDegreePositions, calculateNumberPositions } from "./calculate_positions.js";
import { renderSquare, renderNumberPositions, renderPoint } from "./rendering.js";
import { setNumberCountDisplay, setControlDataPropertyValue } from "./control_data.js";
import { DPI } from "../utilities.js";

const CONTROLS = {
    CALCULATE_BTN: document.querySelector('.js-calculate-btn'),
    RENDER_BTN: document.querySelector('.js-render-btn'),
    STOP_ANIMATION_BTN: document.querySelector('.js-stop-animate-btn'),
    ANIMATE_BTN: document.querySelector('.js-animate-btn'),
    PAUSE_ANIMATION_BTN: document.querySelector('.js-pause-animate-btn')
};

// Pointer
function setPointerPosition({ offsetX, offsetY }){
    APP_STATE.POINTER.x = offsetX * DPI;
    APP_STATE.POINTER.y = offsetY * DPI;

    setControlDataPropertyValue('startX', APP_STATE.POINTER.x);
    setControlDataPropertyValue('startY', APP_STATE.POINTER.y);
};


// Calculate
function calculatePositions(ev){
    ev.preventDefault();

    const controlData = getControlData();
    APP_STATE.PRIME_TURNER_SHAPE = controlData.shape;

    if(controlData.angle === 90){
        APP_STATE.NUMBER_POSITIONS = calculateNumberPositions(controlData);
    }else{
        APP_STATE.NUMBER_POSITIONS = calculateDegreePositions(controlData);
    }
};

function renderPositions(){
    if(!APP_STATE.NUMBER_POSITIONS.length === 0) return;

    renderNumberPositions(
        APP_STATE.CTX, 
        APP_STATE.NUMBER_POSITIONS, 
        APP_STATE.PRIME_TURNER_SHAPE
    );
};


// Animation functions
function addAnimationButtonListeners(){

    function stopAnimation({ currentTarget }){

        cancelAnimationFrame(APP_STATE.ANIMATION_INTERVAL);
        APP_STATE.ANIMATION_INTERVAL = null;

        currentTarget.removeEventListener('click', stopAnimation);
        CONTROLS.PAUSE_ANIMATION_BTN.removeEventListener('click', pauseAnimation);
        addProcessNotification('Animation stopped')
    };

    function pauseAnimation(){
        cancelAnimationFrame(APP_STATE.ANIMATION_INTERVAL);
    };

    CONTROLS.STOP_ANIMATION_BTN.addEventListener('click', stopAnimation);
    CONTROLS.PAUSE_ANIMATION_BTN.addEventListener('click', pauseAnimation);
};


// Animate
function animatePositions(){
    if(APP_STATE.NUMBER_POSITIONS.length === 0) return;
    addAnimationButtonListeners();
    const center = {
        x: APP_STATE.NUMBER_POSITIONS[0].x,
        y: APP_STATE.NUMBER_POSITIONS[0].y,
        c: 'hsl(180 100% 50%)',
        s: 3 * (DPI > 1 ? DPI*0.5:DPI)
    };
    const end = {
        x: APP_STATE.NUMBER_POSITIONS[APP_STATE.NUMBER_POSITIONS.length-1].x,
        y: APP_STATE.NUMBER_POSITIONS[APP_STATE.NUMBER_POSITIONS.length-1].y,
        c: 'hsl(60 100% 50%)',
        s: 3 * (DPI > 1 ? DPI*0.5:DPI)
    };

    APP_STATE.CTX.clearRect(0,0,APP_STATE.CANVAS_WIDTH,APP_STATE.CANVAS_HEIGHT);
    let i = 0;

    function animate(){

        if(i >= APP_STATE.NUMBER_POSITIONS.length){
            cancelAnimationFrame(APP_STATE.ANIMATION_INTERVAL);
            addProcessNotification('Animation Finished');
            APP_STATE.ANIMATION_INTERVAL = null;
            return;
        }
        const position = APP_STATE.NUMBER_POSITIONS[i];
        renderSquare(APP_STATE.CTX, position);
        renderPoint(APP_STATE.CTX, center);
        renderPoint(APP_STATE.CTX, end);
        setNumberCountDisplay(i);
        i++;
        APP_STATE.ANIMATION_INTERVAL = requestAnimationFrame(animate);
    }
    animate();
};



function addControlButtonListeners(){
    CONTROLS.CALCULATE_BTN.addEventListener('click', calculatePositions);
    CONTROLS.RENDER_BTN.addEventListener('click', renderPositions);
    CONTROLS.ANIMATE_BTN.addEventListener('click', animatePositions);
    APP_STATE.CANVAS.addEventListener('pointerdown', setPointerPosition)
};

export {
    addControlButtonListeners
}