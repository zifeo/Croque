jQuery(document).ready(function() {
  jQuery('.app .ui.accordion').accordion();
  jQuery('.app .ui.radio.checkbox').checkbox();
  jQuery('.popup').popup();
  jQuery('.app .lang.selector').on('click', function() {
    window.location.href = 'lang/' + jQuery(this).attr('rel');
  });
  jQuery('.app .type.selector').on('click', function() {
    window.location.href = 'type/' + jQuery(this).attr('rel');
  });
});


