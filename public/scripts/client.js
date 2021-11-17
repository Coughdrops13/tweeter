
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giantsIf I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function () {  // makes sure that none of the js runs before the dom is rendered
  const createTweetElement = function (tweet) {  // function used to create article element that contains new tweets
    const newTweetArticle = $(
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
        <p class="tweet-content">${tweet.content.text}</p>
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

  const renderTweets = function (data) {
    $(data).each(function () {
      const $tweet = createTweetElement(this);
      $('.posted-tweets').append($tweet);
    })
    // for (const tweet of data) {
    //   const $tweet = createTweetElement(tweet);
    //   $('.posted-tweets').append($tweet);
    // }
  }

  renderTweets(data);

  $(function () {
    const form = $('#tweet-form');
    form.submit(function (event) {
      event.preventDefault();
      const serialized = $('#tweet-form').serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serialized,
      })
    })
  })

});