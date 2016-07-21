var $titleInput = $('.title-input');      // call title input field
var $bodyInput = $('.body-input');        // call body input field
var $saveButton = $('.save');             // call save btn

// creates container element
function makeIdeaCard() {
  $('.idea-list').prepend('<article id="#'+idGenerator()+'" class="idea-card"><h2>' + $titleInput.val() + '</h2><button class="remove-idea">REMOVE</button><p>' + $bodyInput.val() + '</p><button class="upvote">UPVOTE</button><button class="downvote">DOWNVOTE</button></article>');
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

// associative array (AKA: hash or dictonary) to hold card-objects
var ideas = {};

// makes each article an object and stores it in 'ideas'
function addIdea() {
  var key = $('article').attr("id");
  ideas[key] = {id: $('article').attr("id"), title: $titleInput.val(), body: $bodyInput.val(), ranking: "swill"}
}

// calls addIdea on click
$($saveButton).on('click', addIdea);

// fxn increases idea's ranking
function upRank() {
  if (ideas[$('article').attr("id")].ranking === "plausible") {return ideas[$('article').attr("id")].ranking = "genius"; }
  else if
    (ideas[$('article').attr("id")].ranking === "genius") {
      return ideas[$('article').attr("id")].ranking = "genius";
  }
  else {
    ideas[$('article').attr("id")].ranking = "plausible";
  }
}

// calls upRank on click
$('.idea-list').on('click', '.upvote', upRank);

// fxn decreases idea's ranking
function downRank() {
  if (ideas[$('article').attr("id")].ranking === "plausible") {return ideas[$('article').attr("id")].ranking = "genius"; }
  else if
    (ideas[$('article').attr("id")].ranking === "genius") {
      return ideas[$('article').attr("id")].ranking = "genius";
  }
  else {
    ideas[$('article').attr("id")].ranking = "plausible";
  }
}

// // calls downRank on click
// $('.idea-list').on('click', '.downvote', downRank);
