$('.alert.alert-danger').hide();
$('#addReview').submit(function (event) {
  $('.alert.alert-danger').hide();
  if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
    $('.alert.alert-danger').show();
    event.preventDefault();
    return false;
  }  
});