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
});