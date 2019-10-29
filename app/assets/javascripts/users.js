$(document).ready(function () {
	console.log("Page is loaded.");

  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

});