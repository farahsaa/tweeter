/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function createTweetElement(data){

    return `<article class = "tweet">
    <header>
      <img src="${data["user"]["avatars"]["small"]}">
      <span>${data["user"]["name"]}</span>
      <span>${data["user"]["handle"]}</span>
    </header>

    <div class= "body">
       <p> ${data["content"]["text"]}</p>
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

loadTweets()
       

      $("form").submit(function(event) {
        event.preventDefault();
        var form = $(this);
        var characterCount = $("textarea").val().length;

        if (characterCount === 0){
            alert("please add tweet")
        }
        else if (characterCount > 140){
            alert("tweet can only be 140 characters or less")

        } 

        else {
         $.ajax({
                type: "POST",
                url: "/tweets",
                data: form.serialize(),
                success: function(){
                    console.log("ajax successful")
                    loadTweets()
              }
        })
        }
      })

  });