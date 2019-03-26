/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  /********* used stackoverflow for this function ****** */
// function timesince deals with timestamp for each tweet

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  // function does not allow to inject javascript scripts in tweet.
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// function that generates tweets per user for each tweet
  function createTweetElement(data){
  
    return `<article class = "tweet">
    <header>
      <img src="${data["user"]["avatars"]["small"]}">
      <span class = "username">${data["user"]["name"]}</span>
      <span class = "handle">${data["user"]["handle"]}</span>
    </header>

    <div class= "body">
       <p> ${escape(data["content"]["text"])}</p>
    </div>
    <footer>
      <span>${timeSince(data["created_at"])}</span>
      <i class="fas fa-heart"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-flag"></i>
    </footer>
  </article>`

  }
  // function renders tweets
  function renderTweets(tweets) {
    $(".tweets-container").empty()
    for (var tweet of tweets){
        var $tweet = createTweetElement(tweet);
        $(".tweets-container").prepend($tweet); 
    }
   }
   
  //  function deals with get requests from /tweets URL
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
// function posts data to /tweets URL 

      $("form").submit(function(event) {
        event.preventDefault();
        var form = $(this);
        var characterCount = $("textarea").val().length;

        if (characterCount === 0){
            $(".error").text("field is empty").show();



          }else if (characterCount > 140){
            $(".error").text("tweet must be 140 characters or less").show();

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
                    $("textarea").val("")
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


