$( document ).ready(function() {
$('.counterArea_counter').countdown('2015/10/23', function(event) {
   $(this).html(event.strftime('%H:%M:%S'));
 });
});

