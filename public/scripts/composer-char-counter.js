$(document).ready(function() {
console.log(document)
$('textarea').keyup(function(){
  console.log('')

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
