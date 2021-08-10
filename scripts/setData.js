/* jshint esversion : 6 */

/**
 * Set the aggregated data from the raw data
 * (that will be used for creating the Bar-Chart).
 */
chart.setData = function (rawData) {

    this.isDataSet = false;

    // Set initial aggregated data structure.

    // The aggregated data does not depends on the Chart-Settings.

    this.data = {

        byCreatedAt: {
            byDays: {},
            byWeeks: {},
            byMonths: {},
            markers: {
                startDate: '',
                endDate: '',
                maxValue: {
                    byDays: 0,
                    byWeeks: 0,
                    byMonths: 0
                }
            }
        },

        byStartDate: {
            byDays: {},
            byWeeks: {},
            byMonths: {},
            markers: {
                startDate: '',
                endDate: '',
                maxValue: {
                    byDays: 0,
                    byWeeks: 0,
                    byMonths: 0
                }
            }
        }

    };

    // Read the raw data.

    let dataColumnCreatedAt = 0;
    let dataColumnStartDate = 0;

    let rows = rawData.split(/\r\n/g);

    for (let r = 0; r < rows.length; r++) { // for each row

        let row = rows[r].split(',');

        for (let c = 0; c < row.length; c++) { // for each cell

            if (r === 0) { // data header

                // Find 'Created At' and 'Start Date'

                if (row[c] === 'Created At') {
                    dataColumnCreatedAt = c;
                }

                if (row[c] === 'Start Date') {
                    dataColumnStartDate = c;
                }

            } else { // data content

                if ((c === dataColumnCreatedAt || c === dataColumnStartDate) && row[c]) {

                    // Extract cell content.

                    let cellDateArray = row[c].split(/\s/g)[0].split('-');

                    let cellDateValue = getDateValueFromArray(cellDateArray);

                    let cellDate = {
                        byDays: getDateByDays(cellDateValue),
                        byWeeks: getDateByWeeks(cellDateValue),
                        byMonths: getDateByMonths(cellDateValue)
                    };

                    // Check the current Column so to find the right agreagted data sheet.

                    let dataColumn = '';

                    switch (c) {
                        case dataColumnCreatedAt:
                            dataColumn = 'byCreatedAt';
                            break;
                        case dataColumnStartDate:
                            dataColumn = 'byStartDate';
                            break;
                    }

                    let dataSheet = this.data[dataColumn];

                    let dataProperties = Object.keys(dataSheet);

                    // Calculate and populate all needed Properties,
                    // for the respective data sheet, based on the cell.

                    for (let p = 0; p < dataProperties.length; p++) {

                        // 'markers' and 'byDays', 'byWeeks', 'byMonths'

                        if (dataProperties[p] === 'markers') {

                            // Set the earliest date.

                            if (dataSheet.markers.startDate) {
                                if (getDateNumberFromISO(dataSheet.markers.startDate) > getDateNumberFromISO(cellDate.byDays)) {
                                    dataSheet.markers.startDate = cellDate.byDays;
                                }
                            } else {
                                dataSheet.markers.startDate = cellDate.byDays;
                            }

                            // Set the latest date.

                            if (dataSheet.markers.endDate) {
                                if (getDateNumberFromISO(dataSheet.markers.endDate) < getDateNumberFromISO(cellDate.byDays)) {
                                    dataSheet.markers.endDate = cellDate.byDays;
                                }
                            } else {
                                dataSheet.markers.endDate = cellDate.byDays;
                            }

                        } else {

                            // 'byDays', 'byWeeks', 'byMonths'

                            let dataTimeSpan = dataProperties[p];

                            let dataColumn = dataSheet[dataTimeSpan];

                            let dataCell = cellDate[dataTimeSpan];

                            // Set the respective counter.

                            if (dataColumn[dataCell]) {
                                dataColumn[dataCell] += 1;
                            } else {
                                dataColumn[dataCell] = 1;
                            }

                            // Set the Max Value.

                            let cellMaxValue = getUpperLimit(dataColumn[dataCell]);

                            if (dataSheet.markers.maxValue[dataTimeSpan]) {
                                if (dataSheet.markers.maxValue[dataTimeSpan] < cellMaxValue) {
                                    dataSheet.markers.maxValue[dataTimeSpan] = cellMaxValue;
                                }
                            } else {
                                dataSheet.markers.maxValue[dataTimeSpan] = cellMaxValue;
                            }

                        }

                    }

                }

            }

        }

    }

    // (for each data sheet) Populate (with 0) all missing dates,
    // from the earliest date (startDate) to the latest date (endDate).

    let midDataSheets = Object.keys(this.data);

    for (let s = 0; s < midDataSheets.length; s++) {

        // i is used for adding Days from startDate till endDate is reached.

        let i = 0;

        // 'byCreatedAt', 'byStartDate'

        let midDataSheet = this.data[midDataSheets[s]];

        let startDateArray = midDataSheet.markers.startDate.split('-');

        let midDateValue = getDateValueFromArray(startDateArray);

        let midDateNumber = getDateNumberFromISO(getDateByDays(midDateValue));

        let endDateNumber = getDateNumberFromISO(midDataSheet.markers.endDate);

        while (midDateNumber < endDateNumber - 1) {

            // Get next mid-Date.

            i += 1;

            midDateValue = getDateValueFromArray(startDateArray, i);

            let midCellDate = {
                byDays: getDateByDays(midDateValue),
                byWeeks: getDateByWeeks(midDateValue),
                byMonths: getDateByMonths(midDateValue)
            };

            let midProperties = Object.keys(midDataSheet);

            for (let m = 0; m < midProperties.length; m++) {

                // 'markers' and 'byDays', 'byWeeks', 'byMonths'

                if (midProperties[m] !== 'markers') {

                    // 'byDays', 'byWeeks', 'byMonths'

                    let midDataTimeSpan = midProperties[m];

                    let midDataColumn = midDataSheet[midDataTimeSpan];

                    let midDataCell = midCellDate[midDataTimeSpan];

                    if (midDataColumn[midDataCell] === undefined) {
                        midDataColumn[midDataCell] = 0;
                    }

                }

            }

            midDateNumber = getDateNumberFromISO(midCellDate.byDays);

        }

    }

    // Call setTable.

    this.isDataSet = true;

    this.setTable();

};