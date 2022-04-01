var stopwatchObj;
var pause = false;
var startDate = 0;
var diffDate;
var stopwatchMillis;

const zeroPad = (num, places) => String(num).padStart(places, '0');

function formatDate(date) {
  var millis = zeroPad(date.getMilliseconds(),3);
	var sec = zeroPad(date.getSeconds(), 2);
	var min = zeroPad(date.getMinutes(), 2);
	var hour = zeroPad(date.getHours()-1, 1);
  return hour + ":" + min + ":" + sec + "." + millis;
}

function runStopwatch(){
  stopwatchMillis = new Date() - startDate;
  diffDate = new Date(stopwatchMillis);
  $('#stopwatch').val(formatDate(diffDate));  
}

function resetStopwatch(){
  if(pause) {
    startDate = new Date();
  } else {
    startDate = 0;
  }
  stopwatchMillis = 0;
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

  $('#calc').click(function() {
    var runNumber = parseInt($('#runNumber').val(), 10);
    var ptsBefore = parseInt($('#ptsBefore').val(), 10);
    var ptsAfter = parseInt($('#ptsAfter').val(), 10);
    var goal = parseInt($('#goal').val(), 10);

    var earnedPoints = ptsAfter - ptsBefore;
    var avgTimePerRun = stopwatchMillis / runNumber;
    var avgPtsPerRun = earnedPoints / runNumber;
    var runsRequired = goal/avgPtsPerRun;

    earnedPoints ? $('#earnedPoints').text(earnedPoints) : $('#earnedPoints').html('<i class="bi bi-question-circle"></i>');
    isFinite(avgTimePerRun) ? $('#avgTimePerRun').text(formatDate(new Date(avgTimePerRun))) : $('#avgTimePerRun').html('<i class="bi bi-question-circle"></i>');
    isFinite(avgPtsPerRun) ? $('#avgPtsPerRun').text(Math.round(avgPtsPerRun*1000)/1000) : $('#avgPtsPerRun').html('<i class="bi bi-question-circle"></i>');
    runsRequired ? $('#runsRequired').text(Math.round(runsRequired)) : $('#runsRequired').html('<i class="bi bi-question-circle"></i>');
    runsRequired && avgTimePerRun ? $('#timeRequired').text(formatDate(new Date(runsRequired*avgTimePerRun))) : $('#timeRequired').html('<i class="bi bi-question-circle"></i>');
  });

});