var $titleInput = $('.title-input');      // call title input field
var $bodyInput = $('.body-input');        // call body input field
var $saveButton = $('.save');             // call save btn

// creates container element
function makeIdeaCard() {
  $('.idea-list').prepend('<article id="'+idGenerator()+'" class="idea-card"><h2>' + $titleInput.val() + '</h2><button class="remove-idea">REMOVE</button><p>' + $bodyInput.val() + '</p><button class="upvote">UPVOTE</button><button class="downvote">DOWNVOTE</button></article>');
}

// removes container
function removeParent() {
  $(this).parent().remove();
}
// calls removeParent when clicked
$('.idea-list').on('click', '.remove-idea', removeParent);

// calls makeIdeaCard which creates element
$($saveButton).on('click', makeIdeaCard);

// creates unique ID (millisecond time-stamp)
function idGenerator() {
  return Date.now().toString();
}
