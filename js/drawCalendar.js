$(document).ready(function() {
  var yearForm = $('.calendar__form');
  var calendarContainer = $('.calendar__container');
  var selectedMonth = 0;
  var cal = new Calendar(); // [month, year]
  var calendarTables;
  var tablesWeekRow;
  var dataValue;
  var mbPressed = false;
  var dragDropElements = [];
  var highlightElements;
  var lastThis;
  var htmlContainers = $('.calendar__container').find('.simple_calendar');
  var currentYear;
  var locationPathName = $(location).attr('pathname');

  $(document).on('mousedown', function() {
    mbPressed = true;
  });

  $(document).on('mouseup', function() {
    mbPressed = false;
  });

  if (htmlContainers.length !== 0) {
    for (var m = 0; m < htmlContainers.length; m++) {
      if ($(htmlContainers[m]).data('year')) {
        // drawing calendar with dataset
        // first is to generate full calendar with selected year
        drawDetailedCalendar($(htmlContainers[m]).data('year'), selectedMonth);
        // second, generate simple calendar based on full calendar
        drawSimpleCalendar(htmlContainers[m]);
      }else {
        console.log('you need to define correct html structure here: ');
        console.log($(htmlContainers[m]));
      }
    }
    calendarOnMouseEvents();
  }

  $(yearForm).on('submit', function(e) {
    e.preventDefault();
    calendarContainer.html("");
    var selectedYear = $(this).find('.year_select').val();

    // drawing calendar with dataset
    // first is to generate full calendar with selected year
    drawDetailedCalendar(selectedYear, selectedMonth);
    // second, generate simple calendar based on full calendar
    drawSimpleCalendar();

    calendarOnMouseEvents();
  });

  // ###########################################################################
  // functions
  // ###########################################################################
  function activateWeek(selector) {
    $(selector).addClass('simple_calendar__week--active');
    $(selector).attr('data-active', true);
  }

  function deactivateWeek(selector) {
    $(selector).removeClass('simple_calendar__week--active');
    $(selector).attr('data-active', false);
  }

  // simple calendar mouse events
  function calendarOnMouseEvents () {
    $(simpleCalendarWeeks).on('click', function() {
      if (!($(this).hasClass('simple_calendar__week--active'))) {
        activateWeek(this);
      } else {
        deactivateWeek(this);
      }
    });

    // drag and drop selecting
    $(simpleCalendarWeeks).on('mousedown', function(e) {
      // add first element to activate
      dragDropElements = []; // clearing elements table
      dragDropElements.push($(this));
    });

    $(simpleCalendarWeeks).on('mouseenter', function(e) {
      if(mbPressed) {
        if ( $(dragDropElements[0]).data('week_nr') <= $(this).data('week_nr') ) {
          for (var i = $(dragDropElements[0]).data('week_nr'); i <= $(this).data('week_nr'); i++) {
            currentYear = $(this).parent().parent();
            highlightElements = ($(currentYear).find('.simple_calendar__week[data-week_nr='+i+']'));
            activateWeek(highlightElements);
          }

          // deactivateweek if last week > this week
          if ( $(lastThis).data('week_nr') > $(this).data('week_nr') ) {
            for (var j = lastThis.data('week_nr'); j > $(this).data('week_nr'); j--) {
              currentYear = $(this).parent().parent();
              highlightElements = ($(currentYear).find('.simple_calendar__week[data-week_nr='+j+']'));
              deactivateWeek(highlightElements);
            }
          }
        }
      }
    });

    $(simpleCalendarWeeks).on('mouseleave', function(e) {
      if(mbPressed) {
        lastThis = $(this);
      }
    });
  }

  function drawDetailedCalendar(selectedYear, selectedMonth) {
    cal.year = selectedYear;
    cal.month = selectedMonth;

    // drawing all months to set dataset attributes
    for (i = selectedMonth; i < 12; i++) {
      cal.month = i;
      cal.generateHTML();
      calendarContainer.append(cal.getHTML());
    }

    calendarTables = $(calendarContainer).find('.calendar__table');
    for (i = 0; i < calendarTables.length; i++) {
      tablesWeekRow = $(calendarTables[i]).find('*[data-week]');

      for (j = 0; j < tablesWeekRow.length; j++) {
        dataValue = $(tablesWeekRow[j]).children('.calendar__week').text();
        $(tablesWeekRow[j]).attr('data-week', dataValue);
      }

      // for each month look for first and last week length
      // and remove week number if necessary
      var firstWeek = $(tablesWeekRow).eq(0).children('td[class="calendar__day"]');
      var lastWeek = $(tablesWeekRow).eq(length-1).children('td[class="calendar__day"]');
      var firstWeekNumber = $(tablesWeekRow).eq(0).children('td[class="calendar__week"]');
      var lastWeekNumber = $(tablesWeekRow).eq(length-1).children('td[class="calendar__week"]');
      var firstWeekLengthCount = 0;
      var lastWeekLengthCount = 0;

      for (var k = 0; k < 7; k++) {
        if ($(firstWeek).eq(k).text().length !== 0) {
          firstWeekLengthCount++;
        }
        if ($(lastWeek).eq(k).text().length !== 0) {
          lastWeekLengthCount++;
        }
      }
      if (firstWeekLengthCount < 4) {
        firstWeekNumber.text('');
      }
      if (lastWeekLengthCount < 4) {
        lastWeekNumber.text('');
      }
    }
  }

  function drawSimpleCalendar(appendTo = calendarContainer) {
    var weeks;
    calendarTables = $('.calendar__table');
    for (var i = 0; i < calendarTables.length; i++) {
      // for every month
      var monthDiv = $("<div class='simple_calendar__month noselect'>");
      $(monthDiv).attr('data-month', $(calendarTables).eq(i).data('month'));
      $(monthDiv).attr('data-year', $(calendarTables).eq(i).data('year'));
      var monthDescription = $("<div class='month__description'><span>" + shortMonthNames[i] + "</span>");
      $(monthDiv).append(monthDescription);
      weeks = $(calendarTables).eq(i).find('td[class="calendar__week"]');
      for (var j = 0; j < weeks.length; j++) {
        // for every week in month
        if ($(weeks).eq(j).text().length !== 0) {
          var weekDivs = $("<div class='simple_calendar__week'>").attr('data-week_nr', $(weeks).eq(j).text());
          $(weekDivs).text($(weekDivs).data('week_nr'));
          $(weekDivs).attr('data-url', locationPathName + '/' + $(calendarTables).eq(i).data('year') + '-' + $(weekDivs).data('week_nr') + '/set');
          $(monthDiv).append(weekDivs);
        }
      }
      $(appendTo).append(monthDiv);
      $(calendarTables).eq(i).remove();
    }
    simpleCalendarWeeks = $(calendarContainer).find('.simple_calendar__week');
  }
});
