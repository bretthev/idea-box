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
    makeIdeaCard(idea.id, idea.title, idea.body, idea.quality);
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
  currentIdeas = getIdeas();
  currentIdeas.push(newIdea);
  localStorage.setItem('ideas', JSON.stringify(currentIdeas));
  makeIdeaCard(newIdea.id, newIdea.title, newIdea.body, 'Swill');
};


function getIdeas() {
  return JSON.parse(localStorage.getItem("ideas"));
};

//add the stuff to the dom
function makeIdeaCard(id, title, body, quality) {
  $('.idea-list').prepend(`
    <article id="`+ id +`" class="idea-card">
      <h2 class="editable" contenteditable="true">` + title + `</h2>
      <button class="remove-idea"></button>
      <p class="editable" contenteditable="true">` + body + `</p>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <p class= "idea-quality ` + quality +`"><span>Quality:</span> <span class = "quality-in-DOM">` + quality + `</span> </p>
    </article>`);
}

$('.idea-list').on('keyup', '.editable', updateEverything);
$('.idea-card').on('click', 'button', updateEverything);


function updateEverything() {
  debugger;
  var editedIdeaArticle = $(this).closest('.idea-card');
  var editedIdeaId = parseInt(editedIdeaArticle.attr('id'));
  var editedIdeaTitle = editedIdeaArticle.find('h2.editable').text();
  var editedIdeaBody = editedIdeaArticle.find('p.editable').text();
  var editedIdeaQuality = editedIdeaArticle.find('.quality-in-DOM').text();
  deleteIdeaFromStorage(editedIdeaId);
  var editedIdea = new Idea(editedIdeaId, editedIdeaTitle, editedIdeaBody, editedIdeaQuality);
  var currentIdeas = getIdeas();
  currentIdeas.push(editedIdea);
  localStorage.setItem("ideas", JSON.stringify(currentIdeas));
};

$($saveButton).on('click', makeNewIdea);

function idGenerator() {
  return Date.now().toString();
};

function removeParent() {
  var ideaArticle = $(this).parent();
  var idWeWantToDeleteFromStorage = parseInt($(this).parent().attr("id"));
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

$('.idea-list').on('click', '.upvote', upVote);

$('.idea-list').on('click', '.downvote', downVote)


function upVote() {
  var ideaArticle = $(this).closest('.idea-card');
  var ideaQuality = ideaArticle.find('.quality-in-DOM').text();
  if (ideaQuality === 'Swill') {ideaArticle.find('.quality-in-DOM').text('Plausible')}
  if (ideaQuality === 'Plausible') {ideaArticle.find('.quality-in-DOM').text('Genius')}
};

function downVote() {
  var ideaArticle = $(this).closest('.idea-card');
  var ideaQuality = ideaArticle.find('.quality-in-DOM').text();
  if (ideaQuality === 'Genius') {ideaArticle.find('.quality-in-DOM').text('Plausible')};
  if (ideaQuality === 'Plausible') {ideaArticle.find('.quality-in-DOM').text('Swill')};
  updateEverything();
};

//this needs to grab the text value of the quality-in-DOM field and make it this object's quality attr
// function saveIdeaQuality() {
//     var ideaArticle = $(this).closest('.idea-card');
//     var ideaArticleId = parseInt($(this).closest('article.id'));
//     var currentIdeas = getIdeas();
//     deleteIdeaFromStorage(ideaArticleId);
//
//
// };

// var editedIdeaArticle = $(this).closest('.idea-card');
// var editedIdeaId = parseInt(editedIdeaArticle.attr('id'));
// var editedIdeaTitle = editedIdeaArticle.find('h2.editable').text();
// var editedIdeaBody = editedIdeaArticle.find('p.editable').text();
// deleteIdeaFromStorage(editedIdeaId);
// var editedIdea = new Idea(editedIdeaId, editedIdeaTitle, editedIdeaBody);
// var currentIdeas = getIdeas();
// currentIdeas.push(editedIdea);
// localStorage.setItem("ideas", JSON.stringify(currentIdeas));
