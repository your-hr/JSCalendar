# JSCalendar
YourHR calendar

You need a html structure like this to use calendar:

    <header>
      src="../jquery/dist/jquery.min.js"
      src="js/calendarVariables.js"
      src="js/buildCalendarV2.js"
      src="js/drawCalendar.js"
      src="js/sendData.js"
      href="css/main.css"
    </header>


    <form class="calendar__form">
      <label>Select year</label>
      <select class="year_select" name="year_select">
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        ...
        ...
      </select>
      <input type="submit" value="Submit">
    </form>

    <div class="calendar__container">
      you may use select form to draw calendars by selected year or simply add containers here:
      <p>2017</p>
      <div class="simple_calendar" data-year="2017"></div>
      like in demo.html
    </div>
