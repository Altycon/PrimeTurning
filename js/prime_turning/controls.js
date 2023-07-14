import { APP_STATE } from "../state.js";
import { addProcessNotification } from "../notifications/process_notification.js";
import { calculateNumberPositions } from "./calculate_positions.js";
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
function setPointerPosition({ clientX, clientY }){
    
    APP_STATE.POINTER.x = clientX * DPI;
    APP_STATE.POINTER.y = clientY * DPI;

    setControlDataPropertyValue('startX', APP_STATE.POINTER.x);
    setControlDataPropertyValue('startY', APP_STATE.POINTER.y);
};


// Calculate
function calculatePositions(ev){
    ev.preventDefault();

    const startX = APP_STATE.CANVAS_WIDTH;
    const startY = APP_STATE.CANVAS_HEIGHT;
    APP_STATE.NUMBER_POSITIONS = calculateNumberPositions();

    addProcessNotification('Calculation finished.');
};

function renderPositions(){
    if(!APP_STATE.NUMBER_POSITIONS.length === 0) return;

    renderNumberPositions(
        APP_STATE.CTX, 
        APP_STATE.NUMBER_POSITIONS, 
        'square'
    );
};


// Animation functions
function addAnimationButtonListeners(){

    function stopAnimation({ currentTarget }){

        cancelAnimationFrame(APP_STATE.ANIMATION_INTERVAL);
        APP_STATE.ANIMATION_INTERVAL = null;

        currentTarget.removeEventListener('click', stopAnimation);
        CONTROLS.PAUSE_ANIMATION_BTN.removeEventListener('click', pauseAnimation);
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