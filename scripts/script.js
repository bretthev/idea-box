var $titleInput = $('.title-input');      // call title input field
var $bodyInput = $('.body-input');        // call body input field
var $saveButton = $('.save');             // call save btn
var ideas = [];

//When the page loads, we need a function to check for stored ideas from the ideas array and put them up
function setUpPage() {
  debugger;
  var ideasFromStorage = JSON.parse(localStorage.getItem('ideasArray'));
  ideas.push(ideasFromStorage);
};

setUpPage();

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
  var newId = newIdea.id;
  var newTitle = newIdea.title;
  var newBody = newIdea.body;
  //push that idea object into the idea array
  ideas.push(newIdea);
  //stringify the ideas array and store it locally
  localStorage.setItem('ideasArray', JSON.stringify(ideas));
  //finally, add that thing to the dom
  makeIdeaCard(newId, newTitle, newBody);
};



//add the stuff to the dom
function makeIdeaCard(x, y, z) {
  $('.idea-list').prepend('<article id="#'+ x +'" class="idea-card"><h2>' + y + '</h2><button class="remove-idea">REMOVE</button><p>' + z + '</p><button class="upvote">UPVOTE</button><button class="downvote">DOWNVOTE</button><p class = "idea-quality">Quality: Swill</p></article>');
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

// removes container, but we also need it to remove the idea with this particular id from the ideas array, also
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
