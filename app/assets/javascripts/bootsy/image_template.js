window.Bootsy = window.Bootsy || {};

window.Bootsy.imageTemplate = function(locale, options) {
  var size = (options && options.size) ? ' btn-' + options.size : '';

  return  '<li>' +
    '<a id="images-btn" class="btn btn-secondary ' + size + '" data-wysihtml-command="customCommand" title="' + locale.image.insert + '" tabindex="-1">' +
      '<i class="fas fa-image"></i>' +
    '</a>' +
  '</li>';
};
