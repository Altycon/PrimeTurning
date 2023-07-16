import { addProcessNotification } from "../notifications/process_notification.js";
import { DPI, TWO_PI } from "../utilities.js";

function renderNumber(ctx,num,x,y){
    const fontSize = 10;
    ctx.fillStyle = 'hsl(0 0% 100% / 0.3';
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`${num}`, x, y + (fontSize*.4));
    ctx.fill();
};
function renderPoint(ctx, point){
    ctx.fillStyle = point.c;
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.s, 0, TWO_PI);
    ctx.fill();
};
function renderSquare(ctx, square){
    ctx.fillStyle = square.c;
    ctx.fillRect(square.x, square.y, square.s, square.s);
};
function renderNumberPositions(ctx,positions,type = 'square'){
   
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    const len = positions.length;
    switch(type){
        case 'square':
            for(let i = 0; i < len; i++){
                renderSquare(ctx, positions[i]);
            }
        break;
        case 'point':
            for(let i = 0; i < len; i++){
                renderPoint(ctx, positions[i]);
            }
        break;
    }
    renderPoint(ctx, 
        { 
            x: positions[0].x, 
            y: positions[0].y, 
            c: 'hsl(180 100% 50%)',
            s: 3 * (DPI > 1 ? DPI*0.5:DPI)
        });
    renderPoint(ctx, 
        { 
            x: positions[len - 1].x, 
            y: positions[len - 1].y, 
            c: 'hsl(60 100% 50%)',
            s: 3 * (DPI > 1 ? DPI*0.5:DPI)
        });
    addProcessNotification('Rendered.')
};

function renderText(ctx,text, x, y){
    const fs = 50 * DPI;
    const fs2 = 20 * DPI;
    const split = text.split(' ');
    ctx.font = `${fs}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'cornflowerblue';
    ctx.fillText(split[0], x, y);
    ctx.fillText(split[1], x, y + (fs*1.2));
    ctx.font = `${fs2}px sans-serif`;
    ctx.fillText('By Clayton McDaniel', x, y + (fs*1.2) + (fs*1.2))
};

export {
    renderNumber,
    renderPoint,
    renderSquare,
    renderNumberPositions,
    renderText
}