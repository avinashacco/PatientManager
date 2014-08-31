$(document).ready(function() {
	var currentDate = new Date(new Date().getTime());
	$('#visitingdate').pickadate({
            format: 'dd/mm/yyyy',
            formatSubmit: 'dd/mm/yyyy',
            min:currentDate,
            editable: true,
            onStart: function() {
	          this.set('select', currentDate);
	        }
    });

    $('.progress').hide();

    $('.form-control').tooltip();
});