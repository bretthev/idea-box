var $titleInput = $('.title-input');  // grab title input
var $bodyInput = $('.body-input'); //grabs idea body
var $saveButton = $('.save');

function makeIdeaCard() {
  $('.idea-list').prepend('<article class="idea-card"><h2>' + $titleInput.val() + '</h2><button class="remove-idea">REMOVE</button><p>' + $bodyInput.val() + '</p><button class="upvote">UPVOTE</button><button class="downvote">DOWNVOTE</button></article>');
}

function removeParent() {
  $(this).parent().remove();
}

$('.idea-list').on('click', '.remove-idea', removeParent);


$($saveButton).on('click', makeIdeaCard);
