// to inspect variables see calendarVariables.js file
// ##################################################################
// Calendar constructor
function Calendar(month, year) {
  this.month = (isNaN(month) || month === null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year === null) ? cal_current_date.getFullYear() : year;
  this.html = '';
}

// ##################################################################
// HTML Generator
Calendar.prototype.generateHTML = function(){
  // get first day of month
  var firstDay = new Date(this.year, this.month, 0);
  var startingDay = firstDay.getDay() +1;

  // find number of days in month
  var monthLength = cal_days_in_month[this.month];

  // compensate for leap year
  if (this.month === 1) { // February only!
    if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0){
      monthLength = 29;
    }
  }

  // Constructing calendar view
  // --------------------------
  // do the header
  var monthName = cal_months_labels[this.month];
  var html = '<table class="calendar__table hidden" data-month=' + (this.month + 1) + ' data-year=' + (this.year) + '>';
  html += '<tr><th colspan="8">';
  html +=  monthName + "&nbsp;" + this.year;
  html += '</th></tr>';
  html += '<tr class="calendar__header">';
  for (var i = 0; i <= 7; i++ ){
    if (i === 0) { // if first column add week namespace
      html += '<td class="calendar__header__week">';
      html += 'Week';
      html += '</td>';
    }else {
      html += '<td class="calendar__header__day">';
      html += cal_days_labels[i-1];
      html += '</td>';
    }
  }
  html += '</tr><tr data-week="">';

  // fill in the days
  var day = 1;

  // this loop is for is weeks (rows)
  for (i = 0; i < 9; i++) {
    // this loop is for weekdays (cells)
    for (var j = 0; j <= 7; j++) {
      if (j === 0) { // week cell
        html += '<td class="calendar__week">';
        if (this.month === 0) { // generating January
          if (i === 0) { // first row
            // calculate and append starting week number
            if (startingDay > 4) {
              weekNumber = 0;
            } else {
              weekNumber = 1;
            }
            if (weekNumber !== 0) {
              html += weekNumber;
            }
            if (weekNumber === 0) {
              weekNumber = 1;
            } else {
              weekNumber++;
            }
          } else {
            html += weekNumber;
            weekNumber++;
          }
        } else { // other months
          if (i === 0 && startingDay > 1) {
            weekNumber--;
          }
          html += weekNumber;
          weekNumber++;
        }
      }else {
        html += '<td class="calendar__day">';
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          html += day;
          day++;
        }
        html += '</td>';
      }

    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    } else {
      html += '</tr><tr data-week="">';
    }
  }
  html += '</tr></table>';
  this.html = html;
};

// Return calendar
Calendar.prototype.getHTML = function() {
  return this.html;
};
