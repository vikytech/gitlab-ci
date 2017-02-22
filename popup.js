$(document).ready(function() {
  $.getJSON("https://api.myjson.com/bins/69r6d", function(userInfo) {
    $.ajax({
      url: userInfo.base_url + '?private_token=' + userInfo.private_token,
      type: 'GET',
      success: function(res) {
        renderDashboard(res);
      }
    });
  });
});

loadCssFile = function() {
  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", "popup.css");
  if (typeof fileref != "undefined")   document.getElementsByTagName("head")[0].appendChild(fileref)
}

renderDashboard = function(res) {
  var data = $.parseHTML(res);
  $('body').append('<div class="temp"></div>');
  $('.temp').append(data);
  $('body').append('<div class="CI_Build"></div>');
  $('.CI_Build').append($('.ci-status-link').parents('.project-row'));
  if ($('.ci-status-icon-failed').length > 0) {
    $('.CI_Build').css('background', 'rosybrown');
  }
  loadCssFile();
  $('.temp').remove();
  $('.CI_Build a').each(function(index, anchor) {
    anchor.href = ''
  });
}