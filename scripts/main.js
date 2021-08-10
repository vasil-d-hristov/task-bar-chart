/* jshint esversion : 6 */

/**
 * 'chart' is the Main Object.
 * 
 * @property {Object} data Store the aggregated data.
 * @property {boolean} isDataSet Flag do we have aggregated data.
 *
 * @method setData (setData.js) Set the aggregated data from the raw data.
 * @method setTable (setTable.js) Built and apply the HTML-Table for the Bar-Chart.
 */
let chart = {

    isDataSet: false,

    data: {}

};