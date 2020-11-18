$('#addReview').submit(function (e) {
  $('.alert.alert-danger').hide();
  if (!('input#name').val() || !('select#rating').val() || !('textarea#review').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div role="alert" class="alert alert-danger">모든 입력이 채워져야 합니다. 입력을 확인해주세요.</div>');
    }
    return false;
  }  
});