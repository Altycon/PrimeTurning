
function addProcessNotification(notification){
    const processDisplay = document.querySelector('.js-process-notification-display');
    const p = document.createElement('p');
    p.innerText = notification;
    processDisplay.appendChild(p);

    processDisplay.scroll({
        top: processDisplay.scrollHeight,
        left: 0,
        behavior: 'smooth'
    });
};

export { 
    addProcessNotification 
};