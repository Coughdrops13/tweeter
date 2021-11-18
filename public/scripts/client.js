// This is 140 characters long dsfgsdfg sdfg sgs cr gercgwercg wergc werg cwer gcwergcwer gcwer gcw ercgw erwfc rgwerg wergcwe rgcwer ce ecgr e

// makes sure that none of the js runs before the dom is rendered
$(document).ready(function () {  
  $('#error').hide(); // initially hide error since nothing is wrong yet

  // function used to create article element that contains new tweets
  const createTweetElement = function (tweet) {  

    // function to avoid cross-site scripting
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeContent = escape(tweet.content.text) // This is now a safe string to put in our new tweets
    
    const newTweetArticle = $( // This is the html for a new tweet
      `<article class="tweet">
        <header>
          <div>
            <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </div>
          <div class="user-handle">
            <p>${tweet.user.handle}</p>
          </div>
        </header>
          <div class="tweet-content">
            <p>${safeContent}</p>
          </div>
        <footer>
          <p class="tweet-time">${timeago.format(tweet.created_at)}</p>
          <div class="tweet-icons">
            <i class="fas fa-flag icon"></i>
            <i class="fas fa-retweet icon"></i>
            <i class="fas fa-heart icon"></i>
          </div>
        </footer>
      </article>`
    );
    return newTweetArticle;
  }

  const renderTweets = function (data) {// Pulls all tweets from a tweet array
                                        // and put them in the index.html so that they 
                                        // are rendered
    $(data).each(function () {
      const $tweet = createTweetElement(this);
      $('.posted-tweets').prepend($tweet);
    })
  }

  const loadTweets = function() { // calls render tweets after getting tweet data from /tweets
    $.ajax({
      method: 'GET',
      url: '/tweets',
    })
    .then(function(tweets) {
      renderTweets(tweets);
    })
  };
  
  $(function () { // on form submission, if valid tweet, this funciton calls loadTweets() 
                  // which calls renderTweets() which calls createTweetElement()

    const form = $('#tweet-form');
    form.submit(function (event) {
      event.preventDefault();
      const serialized = $('#tweet-form').serialize();
      const textLengthTester = $('#tweet-form textarea').val(); // serializing turns spaces into %20 which is 3 characters
                                                                // representing 1 space (other characters are also changed),
                                                                // so to check a tweet's length the unserialized text must be 
                                                                // evaluated
                                                                
      // handles cases of too many characters input
      if(textLengthTester.length > 140) { 
        $('#error p').text('Your tweet is too long');
        $('#error').show().slideDown();
        return;
      }
      // handles case of no characters input
      if(textLengthTester.length === 0) { 
        $('#error p').text(`!You must tweet at least one character!`);
        $('#error').slideDown().show(); 
        return;
      }
      // if neither of the previous cases, ajax posts new tweet to 
      // /tweets then clears form text and calls load tweets
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized,
      })
      .then(res => {
        // rehide error incase it was triggered earlier
        $('#error').slideUp();
        //clear text field
        $('#tweet-text').val("");
        loadTweets();
      })
      .catch((err)  => { // just in case something unpredictable happens
        return alert(err, 'something went wrong');
      })
    })
  })
  

  loadTweets(); // loads tweets that already exist at /tweets before submitting 
                // the form prepends more
  
});