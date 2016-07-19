var $titleInput = $('.title-input');  // grab title input
var $bodyInput = $('.body-input'); //grabs idea body
var $saveButton = $('.save');



function makeIdeaCard() {
  $('.idea-list').prepend('<article class="idea-card"><h2>' + $titleInput.val() + '</h2><p>' + $bodyInput.val() + '</p></article>');
}

$($saveButton).on('click', makeIdeaCard);





// submit button function
// $(document).ready(function() {
// $('#submit').on('click', function() {
//   count++;
//   $('#bookmark-tally').html(count);
//   $('#unread-tally').html(count);
//   var title = $('#bookmark-title').val();
//   var urlGrab = $('#url').val();
//   var listItem =  'id=bookmark' + count.toString();
//
//   function bookmarkTemplate(urlGrab, title) {
//     return "<article " + listItem + ">" + "<li>" + title + "<a href='" + urlGrab + "'>" + ' ' + urlGrab + "</a>" + ' ' + '<input class="readButton" type="button" value="Mark as Read">' + ' ' + '<input class="removeButton" type="button" value="Remove">' + "</li>" + "</article>";
//   };
