"use strict";

const section = document.querySelector('section');
const form = document.querySelector('form');
const makeShape = document.querySelector('button');
const infoDisplay = document.querySelector('.shape-info');
let count = 0;
const shapesArray = []; 

class Shape {
    constructor(shape, colour, index) {
        this._name = shape;
        this._colour = colour;
        this.index = index;
    }
    get name() {
        return this._name;
    }
    get colour() {
        return this._colour;
    }
    getInfo() {
        return `Unit ${this.index}: ${this.colour} ${this.name}`;
    }
}

function createShapeDiv(shape, colour, index) {
    const div = document.createElement('div');
    div.classList.add(shape, colour);
    div.dataset.index = index;
  //the following is from chatGPT, how to arrange the grid 
    const totalColumns = 6;
    const totalRows = 4;
    const rowIndex = Math.floor((index - 1) / totalColumns); 
    const colIndex = (index - 1) % totalColumns; 
    const gridRow = totalRows - rowIndex; 
    const gridCol = colIndex + 1; 

    div.style.gridRowStart = gridRow;
    div.style.gridColumnStart = gridCol;
    return div;
}

function createShapeObject(shape, colour, index) {
    return new Shape(shape, colour, index);
}

function addShapeEventListener(shapeDiv, shapeObject) {
    shapeDiv.addEventListener('click', () => {
        infoDisplay.textContent = shapeObject.getInfo();
    });
}

function createShape(shape, colour, count) {
    const shapeObject = createShapeObject(shape, colour, count);
    shapesArray.push(shapeObject); 
    const shapeDiv = createShapeDiv(shape, colour, count);
    section.appendChild(shapeDiv);
    addShapeEventListener(shapeDiv, shapeObject);
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); // I asked chatGPT how to stop it from refreshing

    const shape = document.querySelector("#shapes").value;
    const colour = document.querySelector("#colours").value;

    if (shape && colour) { 
        if (count < 24) { 
            count++;
            createShape(shape, colour, count);
        }
    }
});