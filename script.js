// CONSTANTS
const DEFAULT_GRID_SIZE = 24;

// GLOBAL
let nbSquareColored = 0;

const elements = {
    square: null,
    gridContainer: document.querySelector('.grid-container'),
    buttonSize: document.querySelector('.btn-size'),
    sizeDialog: document.getElementById('size-dialog'),
    sizeInput: document.getElementById('size-input'),
    confirmButton: document.getElementById('confirm-size'),
    gridNotification: document.querySelector('.grid-notifications'),
    clearGrid: document.getElementById('clear'),
    randomColor: document.getElementById('random-color-input'),
    darkerModeInput: document.getElementById('darker-color-input')
}

const elementsProperties = {
    gridContainerWidth: parseFloat(window.getComputedStyle(elements.gridContainer).width)
};

function isValidValue(value) {
    if (value && !isNaN(value)) {
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

function setupListenerDrawEvents() {

    let mouseDown = false;
    document.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Clic gauche uniquement
            mouseDown = true;
        }
    })
    document.addEventListener('mouseup', (e) => {
        if (e.button === 0) { // Clic gauche uniquement
            mouseDown = false;
            nbSquareColored = 0;
        }
    })

    let isRandomColor = false;
    elements.randomColor.addEventListener('click', () => {
        if (elements.randomColor.checked) {
            isRandomColor = true;
        } else {
            isRandomColor = false;
        }
    })

    let isDarkerMode = false;
    elements.darkerModeInput.addEventListener('click', () => {
        if (elements.darkerModeInput.checked) {
            isDarkerMode = true;
        } else {
            isDarkerMode = false;
        }
    });

    elements.square = document.querySelectorAll('.square');
    elements.square.forEach(square => square.addEventListener('mousedown', (event) => {
        if(isDarkerMode){
            event.target.classList.add('colored-background-light');
        }else{
            event.target.classList.add('colored-background');
            if (isRandomColor) {
                event.target.style.backgroundColor = generateRandomColor();
            }
        }


    }));

    elements.square.forEach(square => square.addEventListener('mouseover', (event) => {
        if (mouseDown) {
            if (isDarkerMode) {
                let element = event.target;
                if(element.classList.contains('colored-background')){
                    event.target.style.opacity = addOpacity(element);
                }else {
                    event.target.classList.add('colored-background');
                    event.target.style.opacity = 0.1;
                }
            }else {
                event.target.classList.add('colored-background');
                if (isRandomColor) {
                    event.target.style.backgroundColor = generateRandomColor();
                }
            }
            nbSquareColored++;
        }
    }));

    elements.confirmButton.addEventListener("click", handleGridSizeUpdate);
    elements.clearGrid.addEventListener('click', () => {
        elements.gridContainer.innerHTML = '';
        createGrid(DEFAULT_GRID_SIZE);
        elements.randomColor.checked = false;
        elements.darkerModeInput.checked = false;
        elements.gridNotification.innerHTML = 'Grid cleaned !';
        elements.gridNotification.classList.add('infos');
    })
}

function generateRandomColor() {
    const hex = '0123456789ABCDEF'
    let output = '#';
    for (let i = 0; i < 6; i++) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}

function addOpacity(element) {
   
    const opacity = window.getComputedStyle(element).opacity;
    let newOpacity = parseFloat(opacity);
    if (newOpacity < 1){
        newOpacity = Math.min(newOpacity + 0.1, 1);
    }else{
        newOpacity = 1;
    }
     // Convertir en nombre (parseFloat) et augmenter de 10%
    //let newOpacity = Math.min(parseFloat(opacity) + (0.1 * nbSquareColored), 1);
    return newOpacity;

}

function createGrid(size) {
    const numberSquare = size * size;
    for (let i = 0; i < numberSquare; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = elementsProperties.gridContainerWidth / size + 'px';
        square.style.height = elementsProperties.gridContainerWidth / size + 'px';
        elements.gridContainer.appendChild(square);

    }
    setupListenerDrawEvents();
}
createGrid(DEFAULT_GRID_SIZE);











