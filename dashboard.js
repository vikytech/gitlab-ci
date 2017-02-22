loadCssFile = function() {
  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", "dashboard.css");
  if (typeof fileref != "undefined")   document.getElementsByTagName("head")[0].appendChild(fileref)
};

cleanUpDOM = function() {
  $('.temp').remove();
  $('.CI_Build a').each(function(index, anchor) {
    anchor.href = ''
  });
};

resetDOM = function(){
  $('.CI_Build').remove();
};

prepareDOM = function(res) {
  var data = $.parseHTML(res);
  $('body').append('<div class="temp"></div>');
  $('.temp').append(data);
  resetDOM();
  $('body').append('<div class="CI_Build"></div>');
  $('.CI_Build').append($('.ci-status-link').parents('.project-row'));
  if ($('.ci-status-icon-failed').length > 0) {
    $('.CI_Build').css('background', 'rosybrown');
  }
  loadCssFile();
  cleanUpDOM();
};

renderDashboard = function(res) {
  $.getJSON("https://api.myjson.com/bins/69r6d", function(userInfo) {
    $.ajax({
      url: userInfo.base_url + '?private_token=' + userInfo.private_token,
      type: 'GET',
      success: function(res) {
        prepareDOM(res);
      }
    });
  });
};

$(document).ready(function() {
  setInterval(function() {
    renderDashboard();
  }, 30000);
});