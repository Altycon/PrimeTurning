import { isPrime, degreesToRadians } from "../utilities.js";
import { addProcessNotification } from "../notifications/process_notification.js";

/**
 *  x = x-axis position, y = y-axis position
 *  c = color, s = size, p = primality
 */
function calculateDegreePositions(controlData){
    const numberPositions = [];
    let previousPosition;

    let x,y,c;
    let theta = degreesToRadians(90);

    for(let i = 1; i <= controlData.maxNumber; i++){
        let p;
        if(previousPosition){
            x = previousPosition.x + controlData.distance * Math.sin(theta);
            y = previousPosition.y + controlData.distance * Math.cos(theta);

        }else{
            x = controlData.startX;
            y = controlData.startY;
        }

        if(isPrime(i)){
            c = controlData.primeColor;
            p = 1;

            theta += degreesToRadians(-controlData.angle);
        }else{
            c = controlData.compositeColor;
            p = 0;
        }

        numberPositions.push({ x: x, y: y, c: c, s: controlData.size, p: p });
        
        previousPosition = {x: x, y: y };
    }
    addProcessNotification('Calculation and more finished.');
    return numberPositions;
}

function calculateNumberPositions(controlData){
    const numberPositions = [];
    let previousPosition;

    let direction = 0;
    let x,y,c;
    for(let i = 1; i <= controlData.maxNumber; i++){
        let p;
        if(previousPosition){
            x = previousPosition.x;
            y = previousPosition.y;

            switch(direction % 4){
                case 0:
                    x += controlData.distance;
                    break;
                case 1:
                    y += controlData.distance;
                    break;
                case 2:
                    x -= controlData.distance;
                    break;
                case 3:
                    y -= controlData.distance;
                    break;
            }

        }else{
            x = controlData.startX;
            y = controlData.startY;
        }
        
        if(isPrime(i)){
            direction++;
            c = controlData.primeColor;
            p = 1;
        }else{
            c = controlData.compositeColor;
            p = 0;
        }

        numberPositions.push({ x: x, y: y, c: c, s: controlData.size });
        
        previousPosition = {x: x, y: y };
    }
    addProcessNotification('Calculation finished.');
    return numberPositions;
};

export { 
    calculateDegreePositions,
    calculateNumberPositions 
};