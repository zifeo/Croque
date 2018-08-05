jQuery(document).ready(function() {
  jQuery('.app .ui.accordion').accordion();
  jQuery('.app .ui.radio.checkbox').checkbox();
  jQuery('.app .lang.selector').on('click', function() {
    window.location.href = 'lang/' + $(this).attr('rel');
  });
});


