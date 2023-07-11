
import { getControlData } from "./control_data.js";
import { isPrime } from "../utilities.js";

function calculateNumberPositions(sx,sy){
    const controlData = getControlData();

    const numberPositions = [];
    let previousPosition;

    let direction = 0;
    let x,y,c;
    for(let i = 0; i < controlData.maxNumber; i++){
        if(previousPosition){
            x = previousPosition.x;
            y = previousPosition.y;
        }else{
            x = sx;
            y = sy;
        }
        c = controlData.compositeColor;
        if(isPrime(i)){
            direction++;
            c = controlData.primeColor;
        }

        numberPositions.push({ x: x, y: y, c: c, s: controlData.size });

        switch(direction % 4){
            case 0:
                x += controlData.resolution;
                break;
            case 1:
                y += controlData.resolution;
                break;
            case 2:
                x -= controlData.resolution;
                break;
            case 3:
                y -= controlData.resolution;
                break;
        }
        previousPosition = {x: x, y: y };
    }
    return numberPositions;
};

export { calculateNumberPositions };