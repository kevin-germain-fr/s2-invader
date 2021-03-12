var app = {
    styles: [
        'plain',
        'empty',
        'light',
        'highlight',
        'highlight2'
    ],

    selectedStyle: 'plain',
    customColor: null,

    init: function () {
        app.generateConfigForm();

        app.generatePalette();

        document.getElementById('custom-color').addEventListener('change', function (event) {
            app.customColor = event.target.value;
        });

        app.createGrid(8, 32);
    },

    generateConfigForm: function () {
        var formNode = document.querySelector('.configuration');

        var gridSizeInput = document.createElement('input');
        gridSizeInput.setAttribute('type', 'number');
        gridSizeInput.setAttribute('name', 'gridSize');
        gridSizeInput.required = true;
        gridSizeInput.setAttribute('placeholder', 'Taille de la grille');
        gridSizeInput.id = 'gridSize';

        formNode.appendChild(gridSizeInput);

        var cellSizeInput = document.createElement('input');
        cellSizeInput.setAttribute('type', 'number');
        cellSizeInput.setAttribute('name', 'cellSize');
        cellSizeInput.required = true;
        cellSizeInput.setAttribute('placeholder', 'Taille d\'une cellule');
        cellSizeInput.id = 'cellSize';

        formNode.appendChild(cellSizeInput);

        var submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('config-form-submit');
        submitButton.textContent = 'Valider';
        formNode.appendChild(submitButton);

        var eventName = 'submit';

        formNode.addEventListener(eventName, function (event) {

            event.preventDefault();

            var gridSizeInputNode = document.getElementById('gridSize');
            var cellSizeInputNode = document.getElementById('cellSize');

            app.createGrid(gridSizeInputNode.value, cellSizeInputNode.value);
        });
    },

    generatePalette: function () {

        var paletteNode = document.getElementById('palette');

        app.styles.forEach(function (style) {

            var styleNode = document.createElement('div');
            styleNode.classList.add('style-selector');

            styleNode.setAttribute('data-style-name', style);

            styleNode.addEventListener('click', app.selectStyle)

            paletteNode.appendChild(styleNode);
        });
    },

    selectStyle: function (event) {

        var itemSelectorNode = event.target;

        app.selectedStyle = itemSelectorNode.getAttribute('data-style-name');

        app.customColor = null;
    },

    changeCellColor: function (event) {

        var cellNode = event.target;

        if (app.customColor) {
            console.log('custom', app.customColor);
            cellNode.setAttribute('data-style-name', '');
            cellNode.style.backgroundColor = app.customColor;
        } else {
            console.log('style');

            cellNode.setAttribute('data-style-name', app.selectedStyle);

            cellNode.style.removeProperty('background-color');
        }

    },

    createGrid: function (gridSize, cellSize) {

        var gridNode = document.getElementById('invader');

        while (gridNode.firstChild) {
            gridNode.removeChild(gridNode.lastChild);
        }

        gridNode.style.width = gridSize * cellSize + 'px';

        for (var cellIndex = 0; cellIndex < gridSize * gridSize; cellIndex++) {
            var cellNode = document.createElement('div');
            cellNode.classList.add('cell');
            cellNode.style.width = cellSize + 'px';
            cellNode.style.height = cellSize + 'px';

            var eventName = 'click';
            cellNode.addEventListener(eventName, app.changeCellColor);
            gridNode.appendChild(cellNode);
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    app.init();
})