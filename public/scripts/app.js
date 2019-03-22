/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


  function createTweetElement(data){

    return `<article class = "tweet">
    <header>
      <img src="${data["user"]["avatars"]["small"]}">
      <span>${data["user"]["name"]}</span>
      <span>${data["user"]["handle"]}</span>
    </header>

    <div class= "body">
       <p> ${escape(data["content"]["text"])}</p>
    </div>
    <footer>
      <span>${data["created_at"]}</span>
      <i class="fas fa-heart"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-flag"></i>
    </footer>
  </article>`
  }
  
  function renderTweets(tweets) {
    for (var tweet of tweets){
        var $tweet = createTweetElement(tweet);
        $(".tweets-container").prepend($tweet); 
    }
   }
   
   function loadTweets (){
    $.ajax({
        url:"/tweets",
        success: function(data){
            renderTweets(data)
      },
      });
}
$(document).ready(function() {
loadTweets()
       

      $("form").submit(function(event) {
        event.preventDefault();
        var form = $(this);
        var characterCount = $("textarea").val().length;

        if (characterCount === 0){
            $(".error").addClass(".errormessage").text("field is empty").show();



          }else if (characterCount > 140){
            $(".error").addClass(".errormessage").text("tweet must be 140 characters or less").show();

        } 

        else {
         $.ajax({
                type: "POST",
                url: "/tweets",
                data: form.serialize(),
                success: function(){
                    console.log("ajax successful")
                    loadTweets()
                    $(".error").hide();
              }
        })
        }
      })

      $( ".compose" ).click(function() {
        $(".new-tweet").slideToggle( "slow", function() {
            $("textarea").focus();
        });
    });
  });


