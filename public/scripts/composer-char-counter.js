$(document).ready(function() {
  //  this event handler is counting down the characters being tweeted. If character count is greater than 140, font will be red. otherwise tweet
$('textarea').keyup(function(){


  var length = 140 -  $(this).val().length;
  $('.counter').text(length);
  if (length < 0){
    $(".counter").css("color", "red");
  }
  else {
    $(".counter").css("color", "black");
  }
  
  });
  
  });

