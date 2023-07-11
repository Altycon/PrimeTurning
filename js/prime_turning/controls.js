import { APP_STATE } from "../state.js";
import { addProcessNotification } from "../notifications/process_notification.js";
import { calculateNumberPositions } from "./calculate_positions.js";
import { renderPixel, renderNumberPositions, renderPoint } from "./rendering.js";
import { setNumberCountDisplay } from "./control_data.js";

const CONTROLS = {
    CALCULATE_BTN: document.querySelector('.js-calculate-btn'),
    RENDER_BTN: document.querySelector('.js-render-btn'),
    STOP_ANIMATION_BTN: document.querySelector('.js-stop-animate-btn'),
    ANIMATE_BTN: document.querySelector('.js-animate-btn'),
    PAUSE_ANIMATION_BTN: document.querySelector('.js-pause-animate-btn')
};

// Calculate
function calculatePositions(ev){
    ev.preventDefault();

    const startX = APP_STATE.CANVAS_WIDTH*0.75;
    const startY = APP_STATE.CANVAS_HEIGHT*0.75;
    APP_STATE.NUMBER_POSITIONS = calculateNumberPositions(
        startX, 
        startY
    );

    addProcessNotification('Calculation finished.');
};

function renderPositions(){
    if(!APP_STATE.NUMBER_POSITIONS.length === 0) return;

    renderNumberPositions(
        APP_STATE.CTX, 
        APP_STATE.NUMBER_POSITIONS, 
        'pixel'
    );
};
function addAnimationButtonListeners(){
    function stopAnimation(){
        cancelAnimationFrame(APP_STATE.ANIMATION_INTERVAL);
        APP_STATE.ANIMATION_INTERVAL = null;
    };
    function pauseAnimation(){
        cancelAnimationFrame(APP_STATE.ANIMATION_INTERVAL);
    };
    CONTROLS.STOP_ANIMATION_BTN.addEventListener('click', stopAnimation);
    CONTROLS.PAUSE_ANIMATION_BTN.addEventListener('click', pauseAnimation);
};
function animatePositions(){
    if(APP_STATE.NUMBER_POSITIONS.length === 0) return;
    addAnimationButtonListeners();
    const center = {
        x: APP_STATE.NUMBER_POSITIONS[0].x,
        y: APP_STATE.NUMBER_POSITIONS[0].y,
        c: 'hsl(180 100% 50%)',
        s: 3
    };
    APP_STATE.CTX.clearRect(0,0,APP_STATE.CANVAS_WIDTH,APP_STATE.CANVAS_HEIGHT);
    let i = 0;
    function animate(){
        if(i >= APP_STATE.NUMBER_POSITIONS.length){
            cancelAnimationFrame(APP_STATE.ANIMATION_INTERVAL);
            addProcessNotification('Animation Finished');
            return;
        }
        const position = APP_STATE.NUMBER_POSITIONS[i];
        renderPixel(APP_STATE.CTX, position);
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
};

export {
    addControlButtonListeners
}