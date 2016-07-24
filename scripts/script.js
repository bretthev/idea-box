var $titleInput = $('.title-input');      // call title input field
var $bodyInput = $('.body-input');        // call body input field
var $saveButton = $('.save');

//setup page with ideas from local Storage

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
};

function getIdeas() {
  return JSON.parse(localStorage.getItem("ideas"));
};

//this is what an idea is.

function Idea(id, title, body, quality) {
  this.id = parseInt(id);
  this.title = title;
  this.body = body;
  this.quality = quality;
};

//function for generating a random id
function idGenerator() {
  return Date.now().toString();
};

//grab inputs from the title and body fields

function getTitleInput() {
  var ideaTitle = $titleInput.val();
  return ideaTitle;
};

function getBodyInput() {
  var ideaBody = $bodyInput.val();
  return ideaBody;
};

function getSearchInput() {
  var searchInput = $('.search-field').val();
  return searchInput;
};

//put that input stuff into an idea object, also makes a new idea card in DOM
function makeNewIdea() {
  var newIdea = new Idea(idGenerator(), getTitleInput(), getBodyInput(), 'Swill')
  currentIdeas = getIdeas();
  currentIdeas.push(newIdea);
  localStorage.setItem('ideas', JSON.stringify(currentIdeas));
  makeIdeaCard(newIdea.id, newIdea.title, newIdea.body, 'Swill');
  clearInputFields();
};

$($saveButton).on('click', makeNewIdea);

function clearInputFields() {
  $titleInput.val('');
  $bodyInput.val('');
}

//puts idea cardss in the dom
function makeIdeaCard(id, title, body, quality) {
  $('.idea-list').prepend(`
    <article id="`+ id +`" class="idea-card">
      <h2 class="editable" contenteditable="true">` + title + `</h2>
      <button class="remove-idea"></button>
      <p class="editable" contenteditable="true">` + body + `</p>
      <button class="upvote quality-button"></button>
      <button class="downvote quality-button"></button>
      <p class= "idea-quality ` + quality +`"><span>Quality:</span> <span class = "quality-in-DOM">` + quality + `</span> </p>
    </article>`);
};

//update storage when stuff is edited/clicked in the dom
$('.idea-list').on('keyup', '.editable', updateEverything);

$('.idea-list').on('blur', '.quality-button', updateEverything);

//when a user edits an idea in the dom, this function makes sure those changes are reflected in storage
function updateEverything() {
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

//focuses out when they press enter in the editable fields
$('.idea-card').on('keydown', $('.editable'), function(e) {
   if(e.keyCode == 13)
   {
       e.preventDefault();
       $(':focus').blur();
   };
});

//removes ideas from the DOM AND storage
$('.idea-list').on('click', '.remove-idea', removeParent);

function removeParent() {
  var ideaArticle = $(this).closest('.idea-card');
  var idWeWantToDeleteFromStorage = parseInt(ideaArticle.attr("id"));
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

//search function

$('.search-field').on('keyup', function(){
  var searchInputWithSpaces = $(this).val();
  var searchInput = searchInputWithSpaces.trim();
  search(searchInput);
});

function search(searchInput) {
  if(searchInput !== "") {
    $('.idea-list').find('article:not(:contains('+ searchInput + '))').slideUp();
    $('.idea-list').find('article:contains(' + searchInput + ')').slideDown();
  } else {
    $('.idea-list').find('article').slideDown();
  };
};

//upvote and downvote buttons update quality in the dom and localstorage
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
};
