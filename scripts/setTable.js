/* jshint esversion : 6 */

/**
 * Built and apply the HTML Table for visualizing the Bar-Chart
 * (based on the the aggregated data processed from the raw data).
 */
chart.setTable = function () {

    if (!this.isDataSet) {
        return; // abort
    }

    // Get all Chart-Settings.

    let dataColumn = '';

    switch (document.getElementById('Data-Column').value) {
        case 'Data-Column-Created-At':
            dataColumn = 'byCreatedAt';
            break;
        case 'Data-Column-Start-Date':
            dataColumn = 'byStartDate';
            break;
        default:
            dataColumn = 'byStartDate';
            break;
    }

    let dataTimeSpan = '';

    switch (document.getElementById('Data-Time-Span').value) {
        case 'Data-Time-Span-Days':
            dataTimeSpan = 'byDays';
            break;
        case 'Data-Time-Span-Weeks':
            dataTimeSpan = 'byWeeks';
            break;
        case 'Data-Time-Span-Months':
            dataTimeSpan = 'byMonths';
            break;
        default:
            dataTimeSpan = 'byDays';
            break;
    }

    let dataTimeGaps;

    switch (document.getElementById('Data-Time-Gaps').value) {
        case 'Data-Time-Gaps-True':
            dataTimeGaps = true;
            break;
        case 'Data-Time-Gaps-False':
            dataTimeGaps = false;
            break;
        default:
            dataTimeGaps = true;
            break;
    }

    let maxValue = this.data[dataColumn].markers.maxValue[dataTimeSpan];

    let chartColor = getChartBarColor();

    // Get aggregated data and sort it chronologically.

    let aggregatedData = this.data[dataColumn][dataTimeSpan];

    let aggregatedKeys = Object.keys(aggregatedData);

    aggregatedKeys.sort(function (a, b) {

        return getDateNumberFromISO(a) - getDateNumberFromISO(b);

    });

    // Start building the Table's main content.

    // Row 1 - Stores the Bar-Values.
    // Row 2 - Stores the Bar-Columns.
    // Row 3 - Stores the Bar-Names.

    let barChartRow1 = '<td>' + maxValue + '</th>';

    let barChartRow2 = '<td style="height: ' + maxValue + 'em;">0</td>';

    let barChartRow3 = '<td></td>';

    for (let i = 0; i < aggregatedKeys.length; i++) {

        let currentKey = aggregatedKeys[i];

        let currentValue = aggregatedData[currentKey];

        let currentStyle = 'height: ' + currentValue + 'em; background-color: ' + chartColor + ';';

        if (currentValue || dataTimeGaps) {

            barChartRow1 += '<td>(' + currentValue + ')</th>';

            barChartRow2 += '<td>';
            barChartRow2 += '<div class="bar" style="' + currentStyle + '"></div>';
            barChartRow2 += '</td>';

            barChartRow3 += '<td>' + currentKey + '</td>';

        }

    }

    // Assembling the Table.

    let tableStyle = 'border-color: ' + chartColor + ';';

    let captionStyle = 'text-align: left;';

    let barChartTable = '<table style="' + tableStyle + '">';

    barChartTable += '<caption style="' + captionStyle + '">';
    barChartTable += 'Table' + ' ' + dataColumn + ' ' + dataTimeSpan;
    barChartTable += '</caption>';

    barChartTable += '<thead>';
    barChartTable += '<tr>';
    barChartTable += barChartRow1;
    barChartTable += '</tr>';
    barChartTable += '</thead>';

    barChartTable += '<tbody>';
    barChartTable += '<tr>';
    barChartTable += barChartRow2;
    barChartTable += '</tr>';
    barChartTable += '</tbody>';

    barChartTable += '<tfoot>';
    barChartTable += '<tr>';
    barChartTable += barChartRow3;
    barChartTable += '</tr>';
    barChartTable += '</tfoot>';

    barChartTable += '</table>';

    // Applying the Table.

    document.getElementById('Bar-Chart').innerHTML = barChartTable;

};