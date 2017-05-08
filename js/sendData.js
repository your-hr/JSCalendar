$(document).ready(function() {
  var sendTo = $(location).attr('pathname'); // url used to send ajax data
  var sendBtn = $('.send_availability');

  $(sendBtn).on('click', function() {
    console.log('sending data to ' + sendTo);

    function loadCalendars() {
      
    }
  });
});
