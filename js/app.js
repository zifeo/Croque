$(document).ready(function() {
  $('.ui.accordion').accordion();
  $('.ui.radio.checkbox').checkbox();
  $('.lang.selector').on('click', function() {
    window.location.href = 'lang/' + $(this).attr('rel');
  });
});