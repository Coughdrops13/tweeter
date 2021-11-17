$(document).ready(function() {
  const callback = function() {
    const length = 140 - $(this).val().length;
    const output = $(this).parent().children('div').children('output.counter');
    if(length < 0) {
      output.addClass('red-text');
    } if (length >= 0) {
      output.removeClass('red-text');
    }
    output.text(length);
  };
  $('#tweet-text').on('input', callback);
});