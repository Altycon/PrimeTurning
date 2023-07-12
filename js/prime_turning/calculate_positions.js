
import { getControlData } from "./control_data.js";
import { DPI,isPrime } from "../utilities.js";

function calculateNumberPositions(sx,sy){
    const controlData = getControlData();

    const numberPositions = [];
    let previousPosition;

    let direction = 0;
    let x,y,c;
    for(let i = 0; i <= controlData.maxNumber; i++){
        if(previousPosition){
            x = previousPosition.x;
            y = previousPosition.y;
        }else{
            x = sx * controlData.startX;
            y = sy * controlData.startY;
        }
        
        switch(direction % 4){
            case 0:
                x += controlData.resolution * DPI;
                break;
            case 1:
                y += controlData.resolution * DPI;
                break;
            case 2:
                x -= controlData.resolution * DPI;
                break;
            case 3:
                y -= controlData.resolution * DPI;
                break;
        }

        if(isPrime(i)){
            direction++;
            c = controlData.primeColor;
        }else{
            c = controlData.compositeColor;
        }

        numberPositions.push({ x: x, y: y, c: c, s: controlData.size * DPI });
        
        previousPosition = {x: x, y: y };
    }
    return numberPositions;
};

export { calculateNumberPositions };