/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 

  function createTweetElement(data){

    // let art = document.createElement('article');
    // art.appendChild(document.createTextNode(data.content.text));

    let article = $('<article class="tweet">');
    let img = $('<img>');
    img.attr('src', data.user.avatars.small);
    article.append($('<header>')
                    .append(img)
                    .append($('<span class= "username">').text(data.user.name))
                    .append($('<span class="handle">').text(data.user.handle))
                    );
    article.append($('<div class="body">').append($('<p>').text(data.content.text)));
    article.append($('<footer>')    
                     .append($('<span>').text(data.created_at))
                     .append($('<i class ="fas fa-heart">'))
                     .append($('<i class ="fas fa-retweet">'))
                     .append($('<i class ="fas fa-flag">')))
    
    return article;

    /*
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
      <span>${data["created_at"]}</span>
      <i class="fas fa-heart"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-flag"></i>
    </footer>
  </article>`
  */
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


