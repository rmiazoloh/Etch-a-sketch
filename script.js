// constants
const DEFAULT_GRID_SIZE = 24;

const elements = {
    square : null,
    gridContainer : document.querySelector('.grid-container'),
    buttonSize : document.querySelector('.btn-size'),
    sizeDialog : document.getElementById('size-dialog'),
    sizeInput : document.getElementById('size-input'),
    confirmButton : document.getElementById('confirm-size'),
    gridNotification : document.querySelector('.grid-notifications')
}

const elementsProperties = {
    gridContainerWidth : parseFloat(window.getComputedStyle(elements.gridContainer).width)
};

function isValidValue(value){
    if (value && !isNaN(value)){
        return true;
    }
}

function handleGridSizeUpdate(event) {
    const newSizeValue = elements.sizeInput.value;
    
    if (isValidValue(newSizeValue) && newSizeValue != '') {
        const parsedValue = parseInt(newSizeValue);
        const limitedValue = Math.min(parsedValue, 100);
        
        elements.gridContainer.innerHTML = ''; // Clear the existing grid
        createGrid(limitedValue);
        elements.sizeInput.value = '';
        
        elements.gridNotification.classList.add('success');
        elements.gridNotification.innerHTML = 'Grid size updated !';
    } else {
        elements.gridNotification.innerHTML = 'Please enter a valid number.';
        elements.gridNotification.classList.add('wrong');
    }
}

function setupListenerDrawEvents(){
    let mouseDown = false;
    document.addEventListener('mousedown', () => {
        mouseDown = true;
    })
    document.addEventListener('mouseup', () => {
        mouseDown = false;
    })

    elements.square = document.querySelectorAll('.square');
    elements.square.forEach(square => square.addEventListener('mousedown', (event) => {
        event.target.classList.add('colored-background');
    }));

    elements.square.forEach(square => square.addEventListener('mouseover', (event) => {
        if (mouseDown) {
            event.target.classList.add('colored-background');
        }
    }));

    elements.confirmButton.addEventListener("click", handleGridSizeUpdate);
}

function createGrid(size) {
    //console.log(size);
    const numberSquare = size * size;
    for (let i = 0; i < numberSquare; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = elementsProperties.gridContainerWidth / size + 'px';
        square.style.height = elementsProperties.gridContainerWidth / size + 'px';
        elements.gridContainer.appendChild(square);
        //console.log(square.style.width);
    }
    setupListenerDrawEvents();
}
createGrid(DEFAULT_GRID_SIZE);












