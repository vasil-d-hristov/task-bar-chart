/* jshint esversion : 6 */

/**
 * Activate the reading of a file when it is selected.
 * @param {event} event <input "file"> onchange event.
 */
let dataInputOnChange = function (event) {

    if (event.target.files.length) {

        let reader = new FileReader();

        reader.onload = fileReaderOnLoad;

        reader.readAsText(event.target.files[0]);

    }

};

/**
 * Send the file's content for processing once it is loaded.
 * @param {event} event FileReader onload event.
 */
let fileReaderOnLoad = function (event) {

    chart.setData(event.target.result); // selected-file = event.target

};

/**
 * Re-set the HTML-Table (Bar-Chart) each time the 'Data-Settings' are changed.
 */
let dataSettingsOnChange = function () {

    chart.setTable();

};

/**
 * Re-Set the color of the Bar-Columns and the Bar-Chart-Border.
 */
let chartBarColorOnChange = function () {

    let chartBarColor = getChartBarColor();

    let elements = document.getElementsByClassName('bar');

    for (let el = 0; el < elements.length; el++) {

        elements[el].style.backgroundColor = chartBarColor;

    }

    let tables = document.getElementsByTagName('table');

    for (let tb = 0; tb < tables.length; tb++) {

        tables[tb].style.borderColor = chartBarColor;

    }

};

/*
 * Attach event handlers.
 */

document.getElementById("Data-Input").onchange = dataInputOnChange;

document.querySelectorAll('.Data-Settings').forEach(function (selector) {

    selector.onchange = dataSettingsOnChange;

});

document.getElementById("Chart-Bar-Color").onchange = chartBarColorOnChange;