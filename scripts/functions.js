/* jshint esversion : 6 */

/**
 * Get the current value of 'Chart-Bar-Color' settings panel.
 * Returned value is used for the Bar-Columns and the Bar-Chart-Border.
 * @returns {string} Property value to be used for setting the color style.
 */
let getChartBarColor = function () {

    let chartBarColor = '';

    switch (document.getElementById('Chart-Bar-Color').value) {
        case 'Chart-Bar-Color-Green':
            chartBarColor = 'green';
            break;
        case 'Chart-Bar-Color-Blue':
            chartBarColor = 'blue';
            break;
        case 'Chart-Bar-Color-Pink':
            chartBarColor = '#990099';
            break;
        default:
            chartBarColor = '#990099';
            break;
    }

    return chartBarColor;

};

/**
 * Calculates the respective Max Value for the Chart.
 * For example, if we have Max-Bar-Height 8 the Table-Height should be 10.
 * @param {number} value Zero or any positive integer.
 * @returns {number} Value up to next decade.
 */
let getUpperLimit = function (value) {

    return Math.ceil(value / 10) * 10;

};

/**
 * Converts ISO String Date to Number.
 * For example, '2020-12-31' to 20201231.
 * @param {string} value ISO String Date.
 * @returns {number} Number with 8 digits.
 */
let getDateNumberFromISO = function (value) {

    return Number(value.replace(/[^\d]/g, ''));

};

/**
 * Converts Array Date (['YYYY', 'MM', 'DD']) into (js) new Date.
 * If 'add' parameter is provided, it is added as Days to the Date.
 * @param {Array} array Array Date (['YYYY', 'MM', 'DD']).
 * @param {number} [add] Optiona. Any positive integer.
 * @returns {Date} new Date.
 */
let getDateValueFromArray = function (array, add) {

    return new Date(Number(array[0]), Number(array[1]) - 1, Number(array[2]) + (add || 0));

};

/**
 * Returns the provided Date like 'YYYY-MM-DD'.
 * @param {Date} value Any (js) Date value.
 * @returns {string} Date like 'YYYY-MM-DD'.
 */
let getDateByDays = function (value) {

    let year = getDateYear(value);
    let month = getDateMonth(value);
    let day = getDateDay(value);

    return year + '-' + month + '-' + day;

};

/**
 * Returns the provided Date like 'YYYY-WW'.
 * @param {Date} value Any (js) Date value.
 * @returns {string} Date like 'YYYY-WW'.
 */
let getDateByWeeks = function (value) {

    let year = getDateYear(value);
    let week = getDateWeek(value);

    return year + '-' + week;

};

/**
 * Returns the provided Date like 'YYYY-MM'.
 * @param {Date} value Any (js) Date value.
 * @returns {string} Date like 'YYYY-MM'.
 */
let getDateByMonths = function (value) {

    let year = getDateYear(value);
    let month = getDateMonth(value);

    return year + '-' + month;

};

/**
 * Returns the Date's Year as 'YYYY'.
 * @param {Date} value Any (js) Date value.
 * @returns {string} FullYear as numeric-string ('YYYY').
 */
let getDateYear = function (value) {

    return ('' + value.getFullYear());

};

/**
 * Returns the Date's Month as 'MM'.
 * @param {Date} value Any (js) Date value.
 * @returns {string} Month as numeric-string ('MM').
 */
let getDateMonth = function (value) {

    return ('00' + (value.getMonth() + 1)).slice(-2);

};

/**
 * Returns the Date's Week as 'WW'.
 * @param {Date} value Any (js) Date value.
 * @returns {string} Week as numeric-string ('WW').
 */
let getDateWeek = function (value) {

    return ('00' + value.getWeek()).slice(-2);

};

/**
 * Returns the Date's Day as 'DD'.
 * @param {Date} value Any (js) Date value.
 * @returns {string} Day as numeric-string ('DD').
 */
let getDateDay = function (value) {

    return ('00' + value.getDate()).slice(-2);

};

// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.com/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
    let date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    // [VH] '(date.getDay() + 6) % 7' finds the offset of the date in the week.
    // [VH] for example, Tuesday, 2021-08-03 is computed to 1 as offset from Monday.
    // [VH] '+ 3 - (date.getDay() + 6) % 7' caluclates the adjustment to the respective Thursday.
    // [VH] '2021-08-03'.getDate() is 3 as it is Day 3 in the Month.
    // [VH] '2021-08-03'.getDay() is 2 as it is Tuesday.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    // [VH] get time difference from the current January 04 to the Current Thursday,
    // [VH] then calculate this time in days, adjust the days based on the First Thursday,
    // [VH] finds the number of the weeks, rounds and adds 1 so to get 1 based measurement.
    // [VH] '86400000' is 24*60*60*1000 or 24 hours * 60 minutes * 60 seconds * 1000 milliseconds.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};