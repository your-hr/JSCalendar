// ##################################################################
// global variables used to build calendar
// these are labels for the days of the week
var cal_days_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// these are human-readable month name labels, in order
var cal_months_labels = ['January', 'February', 'March', 'April',
                         'May', 'June', 'July', 'August', 'September',
                         'October', 'November', 'December'];
var shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// these are the days of the week for each month, in order
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
var cal_current_date = new Date();

// starging week indicator
var weekNumber;

// simple weeks table, used for event listeners
var simpleCalendarWeeks;