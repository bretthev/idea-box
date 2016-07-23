var $titleInput = $('.title-input');      // call title input field
var $bodyInput = $('.body-input');        // call body input field
var $saveButton = $('.save');             // call save btn

onLoad();

function onLoad() {
  checkLocalOrMakeLocal();
  populateDOM();
};

function checkLocalOrMakeLocal() {
  if (localStorage.getItem("ideas") === null) {
    localStorage.setItem("ideas", JSON.stringify([]))
  };
};

function populateDOM() {
  var ideas = getIdeas();
  ideas.forEach(function(idea) {
    makeIdeaCard(idea.id, idea.title, idea.body);
  });
}

function Idea(id, title, body, quality) {
  this.id = parseInt(id);
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
};

//put that input stuff into an idea object;
function makeNewIdea() {
  var newIdea = new Idea(idGenerator(), getTitleInput(), getBodyInput(), 'Swill')
  //push that idea object into the idea array
  currentIdeas = getIdeas();
  currentIdeas.push(newIdea);
  //stringify the ideas array and store it locally
  localStorage.setItem('ideas', JSON.stringify(currentIdeas));
  //finally, add that thing to the dom
  makeIdeaCard(newIdea.id, newIdea.title, newIdea.body);
};


function getIdeas() {
  return JSON.parse(localStorage.getItem("ideas"));
};

//add the stuff to the dom
function makeIdeaCard(id, title, body) {
  $('.idea-list').prepend(`
    <article id="${this.id}" class="idea-card">
      <section class="title-removeBtn">
        <h2 class="editable" contenteditable="true">${this.title}</h2>
        <button class="remove-idea"></button>
      </section>

      <p class="editable" contenteditable="true">${this.body}</p>

      <section class="vote-panel">
        <button class="upvote"></button>
        <button class="downvote"></button>
        <p class= "idea-quality">Quality: Swill</p>
      </section>
    </article>`);
}

$('.idea-list').on('focusout', '.editable', function() {
  debugger;
  var editedIdeaArticle = $(this).closest('.idea-card');
  var editedIdeaId = parseInt(editedIdeaArticle.attr('id'));
  var editedIdeaTitle = editedIdeaArticle.find('h2.editable').text();
  var editedIdeaBody = editedIdeaArticle.find('p.editable').text();
  deleteIdeaFromStorage(editedIdeaId);
  var editedIdea = new Idea(editedIdeaId, editedIdeaTitle, editedIdeaBody);
  var currentIdeas = getIdeas();
  currentIdeas.push(editedIdea);
  localStorage.setItem("ideas", JSON.stringify(currentIdeas));
});


$($saveButton).on('click', makeNewIdea);

// creates unique ID (millisecond time-stamp)
function idGenerator() {
  return Date.now().toString();
};

// removes container, but we also need it to remove the idea with this particular id from the ideas array
function removeParent() {
  var ideaArticle = $(this).parent();
  var idWeWantToDeleteFromStorage = parseInt($(this).parent().attr("id"));
  // grab id and shove into function -> deleteStuff(idea.id)
  deleteIdeaFromStorage(idWeWantToDeleteFromStorage);
  ideaArticle.remove();
};

function deleteIdeaFromStorage(toBeDeleteID) {
  var currentIdeas = getIdeas();
  currentIdeas = currentIdeas.filter(function(idea, index) {
    return idea.id !== parseInt(toBeDeleteID)
  });
  localStorage.setItem("ideas", JSON.stringify(currentIdeas));
};

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
  if (ideas[$('article').attr("id")].ranking === "genius") {return ideas[$('article').attr("id")].ranking = "plausible"; }
  else if
    (ideas[$('article').attr("id")].ranking === "plausible") {
      return ideas[$('article').attr("id")].ranking = "swill";
  }
  else {
    ideas[$('article').attr("id")].ranking = "swill";
  }
}

// calls downRank on click
$('.idea-list').on('click', '.downvote', downRank);
