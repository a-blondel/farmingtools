var stopwatchObj;
var pause = false;
var startDate = 0;
var diffDate;

const zeroPad = (num, places) => String(num).padStart(places, '0');

function runStopwatch(){
  var stopwatchMillis = new Date() - startDate;
  diffDate = new Date(stopwatchMillis);

  var millis = zeroPad(diffDate.getMilliseconds(),3);
	var sec = zeroPad(diffDate.getSeconds(), 2);
	var min = zeroPad(diffDate.getMinutes(), 2);
	var hour = zeroPad(diffDate.getHours()-1, 1);
  
  $('#stopwatch').val(hour + ":" + min + ":" + sec + "." + millis);  
}

function resetStopwatch(){
  if(pause) {
    startDate = new Date();
  } else {
    startDate = 0;
  }
  $('#stopwatch').val("0:00:00.000");
}

$(document).ready(function(){
  $('#runCounterDecrement').click(function() {
    var runNumber = parseInt($('#runNumber').val(), 10);
    if(runNumber && runNumber > 0) {
      $('#runNumber').val(runNumber - 1);
    }
	});

	$('#runCounterIncrement').click(function() {
    var runNumber = parseInt($('#runNumber').val(), 10);
    $('#runNumber').val(runNumber + 1);
  });

  $('#startPauseStopwatch').click(function() {
    if(!pause) {
      if(startDate === 0) {
        startDate = new Date();
      } else {
        startDate = new Date(new Date() - diffDate);
      }
      $('#startPauseStopwatch').removeClass("bg-success").addClass("bg-warning");
      $('#startPauseStopwatchIcon').removeClass("bi-play-circle-fill").addClass("bi-pause-circle-fill");
      stopwatchObj = setInterval(runStopwatch, 10);
    } else {
      $('#startPauseStopwatch').removeClass("bg-warning").addClass("bg-success");
      $('#startPauseStopwatchIcon').removeClass("bi-pause-circle-fill").addClass("bi-play-circle-fill");
      clearInterval(stopwatchObj);
    }
    pause = !pause;
  });

  $('#resetStopwatch').click(function() {
    resetStopwatch();
  });

});