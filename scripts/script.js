var $titleInput = $('.title-input');      // call title input field
var $bodyInput = $('.body-input');        // call body input field
var $saveButton = $('.save');             // call save btn
var ideas = {};

//When the page loads, document.ready, we need a function to check for stored ideas from the ideas array and put them up

function Idea(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
};
//when they click the save button, we have to
//get the input stuff;
function getTitleInput() {
  var ideaTitle = $titleInput.val();
  return ideaTitle;
};

function getBodyInput() {
  var ideaBody = $bodyInput.val();
  return ideaBody;
}

//put that input stuff into an idea object;
function makeNewIdea() {
  debugger;
  var newIdea = new Idea(idGenerator(), getTitleInput(), getBodyInput(), 'Swill')
  var id = newIdea.id
  //change that idea object into a storable string and set in local storage
  // storeNewIdeaAsString();
  // function storeNewIdeaAsString() {
  // localStorage.setItem('stringifiedNewIdea', JSON.stringify(newIdea))};
  //we also have to push them to the ideas array

  //finally, add that thing to the dom
  makeIdeaCard(id);
};


//add the stuff to the dom
function makeIdeaCard(id) {
  $('.idea-list').prepend('<article id="#'+id+'" class="idea-card"><h2>' + $titleInput.val() + '</h2><button class="remove-idea">REMOVE</button><p>' + $bodyInput.val() + '</p><button class="upvote">UPVOTE</button><button class="downvote">DOWNVOTE</button><p class = "idea-quality">Quality: Swill</p></article>');
}


// calls addIdea on click
// $($saveButton).on('click', addIdea);

// calls makeIdeaCard which creates element
$($saveButton).on('click', makeNewIdea);

// creates unique ID (millisecond time-stamp)
function idGenerator() {
  return Date.now().toString();
}

// makes each article an object and stores it in 'ideas'
// function addIdea() {
//   var key = $('article').attr("id");
//   ideas[key] = {id: $('article').attr("id"), title: $titleInput.val(), body: $bodyInput.val(), ranking: "swill"}
// }

// removes container
function removeParent() {
  $(this).parent().remove();
}
// calls removeParent when clicked
$('.idea-list').on('click', '.remove-idea', removeParent);

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
