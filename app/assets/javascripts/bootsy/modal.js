/* Bootsy modal */

window.Bootsy = window.Bootsy || {};

Bootsy.Modal = function(area) {
  var self = this;

  this.$el = area.$el.siblings('.bootsy-modal');
  this.area = area;

  // In order to avoid form nesting
  this.$el.parents('form').after(this.$el);

  // Display image URL input field on 'Use link' button click
  this.$el.on('click', '#image-upload-control .use-link-btn', this.showImageLinkWindow);

  // Display uploaded images back on 'cancel' button click
  this.$el.on('click', '#new_image .cancel-btn', this.showImageUploadWindow);

  // Display gallery on 'Select from gallery' button click
  this.$el.on('click', '#image-upload-control .global-gallery-btn', function(event, xhr, settings) {
    this.showGalleryWindow();

    this.fetchFromBackend({filetype: 'image'})
        .then((data) => {
          this.updateScreen('#global-gallery-window', data)
        });
  }.bind(this));

  // Display videos selection on 'Videos' button click
  this.$el.on('click', '#image-upload-control .videos-btn', function(event, xhr, settings) {
    this.showVideosWindow();

    this.fetchFromBackend({filetype: 'video'})
        .then((data) => {
          this.updateScreen('#videos-window', data)
        });
  }.bind(this));

  // Remove alerts on screen switch
  this.$el.on('click', '.modal-control button', function() {
    this.hideEmptyAlert();
  }.bind(this));

  // Invoke dropdown menu on image click
  this.$el.on('click', '.bootsy-image', function(event) {
    const wrapper = $('#dropdown-menu');
    const menu = $('#dropdown-menu > .dropdown-menu');
    let invokeMenu = false;

    if ($(event.currentTarget).is('img') || $(event.currentTarget).find('img').length > 0) {
      const imgTag = $(event.currentTarget).is('img') ? event.currentTarget : $(event.currentTarget).find('img')[0];
      invokeMenu = true;

      // Update data attributes with image-specific data
      const src = $(imgTag).attr('src').slice(0, $(imgTag).attr('src').indexOf('?variant'));
      wrapper.attr('data-image-src', src);

      // Update delete button's destination
      const imgId = $(imgTag).attr('src').slice($(imgTag).attr('src').lastIndexOf('/')+1, $(imgTag).attr('src').indexOf('?variant'));
      $('#delete-image').attr('href', '/bootsy/images/' + imgId);
    }

    if (invokeMenu) {
      // Reposition the menu under the clicking point
      const offsetX = event.clientX - ($(window).width() - $('.bootsy-modal .modal-dialog').width())/2 + 5;
      const offsetY = event.clientY - ($('.bootsy-modal .modal-dialog').outerHeight(true) - $('.bootsy-modal .modal-dialog').height())/2 - 5;

      wrapper.css({
        'position': 'absolute',
        'left': String(offsetX) + 'px',
        'top': String(offsetY) + 'px'
      })

      // If current screen is select-image-window or link-image-window (i.e. image is being attached to this page only)
      // - display "delete" option. Hide it otherwise.
      if ($(event.currentTarget).closest('#select-image-window, #link-image-window').length > 0) {
        $('#delete-image').show();
      } else {
        $('#delete-image').hide();
      }

      // Appear menu and set focus to it
      wrapper.addClass('show');
      menu.addClass('show');
      wrapper.focus();
    }
  }.bind(this));

  // Invoke dropdown menu on video click
  this.$el.on('click', '.bootsy-video, #insert-external-video-btn', function(event) {
    const wrapper = $('#videos-dropdown');
    const menu = $('#videos-dropdown > .dropdown-menu');
    const srcTag = $(event.currentTarget).find('source')[0];
    const inputTag = $('#video-link-input')[0];

    // If dropdown menu is being invoked by clicking on video:
    // - use src stored in <source> tag;
    // - insert as <video>
    // Otherwise, if menu is being invoked by clicking on "Insert" button:
    // - use src which user has provided in input field;
    // - insert as <iframe>
    if (srcTag) {
      wrapper.attr('data-video-src', $(srcTag).attr('src'));
      wrapper.attr('data-insert-as', 'video');
    } else if (inputTag) {
      const src = $(inputTag).val().trim();
      if (!src) { return; }
      wrapper.attr('data-video-src', src);
      wrapper.attr('data-insert-as', 'iframe');
    }

    if (srcTag || inputTag) {
      // Reposition the menu under the clicking point
      const offsetX = event.clientX - ($(window).width() - $('.bootsy-modal .modal-dialog').width())/2 + 5;
      const offsetY = event.clientY - ($('.bootsy-modal .modal-dialog').outerHeight(true) - $('.bootsy-modal .modal-dialog').height())/2 - 5;

      wrapper.css({
        'position': 'absolute',
        'left': String(offsetX) + 'px',
        'top': String(offsetY) + 'px'
      });

      wrapper.addClass('show');
      menu.addClass('show');
      wrapper.focus();
    }
  }.bind(this));

  // Hide menus on focus lost
  this.$el.on('focusout', '#dropdown-menu, #videos-dropdown', function(event) {
    // Do not hide if user clicked on child element
    if ($(event.relatedTarget).parents('#dropdown-menu, #videos-dropdown').length > 0) { return };

    const wrappers = $('#dropdown-menu, #videos-dropdown');
    const menus = $('#dropdown-menu > .dropdown-menu, #videos-dropdown > .dropdown-menu');

    wrappers.removeClass('show');
    menus.removeClass('show');

    // Clear out data attributes
    wrappers.removeAttr('data-image-src');
    wrappers.removeAttr('data-video-src');
  }.bind(this));

  // Paginate through images/videos in gallery
  this.$el.on('click', '.pagination .page-link', function(event) {
    event.preventDefault();

    const paginationBtns = $('.pagination .page-item');
    let nextActive = event.currentTarget;
    let url = $(event.currentTarget).attr('href');
    let pageId = $(event.currentTarget).text();

    // If text content is arrow - replace it with approprite page number
    if (pageId === '\u2192') {
      pageId = String(Number($('.page-item.active').text()) + 1);
      nextActive = $('.page-item.active').next().children()[0];
      url = $(nextActive).attr('href');
    } else if (pageId === '\u2190') {
      pageId = String(Number($('.page-item.active').text()) - 1);
      nextActive = $('.page-item.active').prev().children()[0];
      url = $(nextActive).attr('href');
    }

    // Make clicked pagination button active
    $('.page-item.active').removeClass('active');
    $(nextActive).parent().addClass('active');

    // Disable/enable arrows
    if (pageId === '1') {
      $(paginationBtns[0]).addClass('disabled');
    } else if (pageId === $(paginationBtns.get(-2)).text()) {
      $(paginationBtns.get(-1)).addClass('disabled');
    } else {
      $(paginationBtns[0]).removeClass('disabled');
      $(paginationBtns.get(-1)).removeClass('disabled');
    }

    // Check whether this page was accessed before
    if ($(`div[data-page-id="${pageId}"]`).length > 0) {
      // If it was - display it and hide all others
      const pages = $('div[data-page-id]');
      this.showPage(pages, pageId);
    } else {
      // Otherwise, fetch images/videos and create new page
      fetch(url)
        .then((response) => {
          return response.json();
        }, (error) => {
          throw error;
        })
        .then((data) => {
          let modal_body, pagination;
          [modal_body, pagination] = this.parseBackendResponse(data);

          modal_body = `<div class="d-flex flex-wrap" data-page-id="${pageId}">`+modal_body+"</div>";
          $(':not(.d-none) > .gallery-wrapper').append(modal_body);
        })
        .then(() => {
          const pages = $('div[data-page-id]');
          this.showPage(pages, pageId);
        });
    }
  }.bind(this));

  // Upload image by URL provided
  this.$el.on('click', '#image-link-control .insert-btn', function(event, xhr, settings) {
    const imageURL = $($('#link-image-window input')[0]).val().trim();

    // Validate image URL
    if (imageURL == '') {
      return;
    }

    fetch(imageURL)
    .then((response) => {
      return response.blob();
    }, (error) => {
      console.log(window.Bootsy.translations['imageFetchFailed']);
      if (window.Bootsy.translations) {
        Bootsy.Modal.prototype.alert(window.Bootsy.translations['imageFetchFailed']);
      }
      throw error;
    })
    // Upload fetched image
    .then((file) => {
      this.uploadImage(event, xhr, settings, file);
      this.showImageUploadWindow();

      $($('#link-image-window input')[0]).val('');
      Bootsy.Modal.prototype.clearAlert();
    });
  }.bind(this));

  this.$el.on('ajax:before', '.destroy-btn', this.showGalleryLoadingAnimation.bind(this));

  this.$el.on('ajax:success', '.destroy-btn', function(_e, data) {
    this.deleteImage(data.id);
  }.bind(this));

  this.$el.on('click', 'a[href="#refresh-gallery"]', this.requestImageGallery.bind(this));

  // Upload image from user's computer
  this.$el.on('submit', '.bootsy-upload-form', function(event, xhr, settings) {
    event.preventDefault();

    const fileSelect = event.target.querySelector('input[type="file"]');
    const file = fileSelect.files[0];

    this.uploadImage(event, xhr, settings, file);
    this.clearAlert();
  }.bind(this));

  this.$el.modal({ show: false });

  this.$el.on('shown.bs.modal', function() {
    if (this.$el.data('gallery-loaded') !== true) {
      this.requestImageGallery();
    }
  }.bind(this));

  // Insert image to post body
  this.$el.on('click', '#dropdown-menu .insert', function(event) {
    let suffix = '?variant=' + $(this).attr('data-image-size');

    event.preventDefault();

    if ($(this).attr('data-image-size') === 'original') {
      suffix = '';
    }

    const image = {
      src: $(this).parents('#dropdown-menu').attr('data-image-src') + suffix
    }

    if ($(this).attr('data-image-size') !== 'full_width') {
      image.align = $(this).attr('data-position');
    } else {
      image.class = 'full-width';
    }

    self.$el.modal('hide');

    insert = self.area.insertImage.bind(self.area);
    insert(image);
  });

  // Insert video to post body
  this.$el.on('click', '#videos-dropdown .insert', function(event) {
    event.preventDefault();

    const video = {
      src: $('#videos-dropdown').attr('data-video-src'),
      class: $(event.currentTarget).attr('data-video-size') == 'full_width' ? 'full-width' : 'video-default-size'
    }
    const tag = $('#videos-dropdown').attr('data-insert-as');

    insert = self.area.insertVideo.bind(self.area, video, tag);
    insert();

    self.$el.modal('hide');
  });

  // Seacrh for images/videos
  this.$el.on('click', '.search-btn', function(event) {
    const keyword = $(this).parents('.input-group').find('.searchbar').first().val();
    const filetype = $(this).data('filetype');

    this.fetchFromBackend({
          filetype: filetype,
          search: keyword
        })
        .then((data) => {
          switch(filetype) {
            case 'image':
              this.updateScreen('#global-gallery-window', data);
              break;
            case 'video':
              this.updateScreen('#videos-window', data);
              break;
          }
        });
  }.bind(this));

  this.hideRefreshButton();
  this.hideEmptyAlert();
};

// Show modal
Bootsy.Modal.prototype.show = function() {
  this.$el.modal('show');
};

// Gallery loading
Bootsy.Modal.prototype.showGalleryLoadingAnimation = function() {
  this.$el.find('.bootsy-gallery-loader').fadeIn(200);
};

Bootsy.Modal.prototype.hideGalleryLoadingAnimation = function() {
  this.$el.find('.bootsy-gallery-loader').fadeOut(200);
};

// Upload loading animation
Bootsy.Modal.prototype.showUploadLoadingAnimation = function() {
  this.$el.find('.bootsy-upload-loader').fadeIn(200);
};

Bootsy.Modal.prototype.hideUploadLoadingAnimation = function() {
  this.$el.find('.bootsy-upload-loader').fadeOut(200);
};

// Alert for empty gallery
Bootsy.Modal.prototype.showEmptyAlert = function() {
  if (window.Bootsy.translations) {
    this.$el.find('.bootsy-empty-alert').text(window.Bootsy.translations['noImagesUploaded']);
  }
  this.$el.find('.bootsy-empty-alert').fadeIn(200);
};

Bootsy.Modal.prototype.hideEmptyAlert = function() {
  this.$el.find('.bootsy-empty-alert').text('');
  this.$el.find('.bootsy-empty-alert').fadeOut(200);
};

// Manual refresh button
Bootsy.Modal.prototype.showRefreshButton = function() {
  this.$el.find('.refresh-btn').fadeIn(200);
};

Bootsy.Modal.prototype.hideRefreshButton = function() {
  this.$el.find('.refresh-btn').fadeOut(200);
};

// Set upload form
Bootsy.Modal.prototype.setUploadForm = function(html) {
  var uploadInput;

  this.$el.find('.modal-footer').html(html);
  this.hideUploadLoadingAnimation();
  this.$el.find('.bootsy-upload-form input[type="file"]').bootstrapFileInput();

  uploadInput = this.$el.find('.bootsy-upload-form input[type="file"]');

  uploadInput.change(function() {
    this.showUploadLoadingAnimation();
    uploadInput.closest('form').submit();
  }.bind(this));
};

// Upload image
Bootsy.Modal.prototype.uploadImage = function(event, xhr, settings, file) {
  const form = document.getElementById('new_image');
  const fileURLInputName = 'image[remote_image_file_url]';
  const fileURLInput = form.querySelector(
  'input[name="' + fileURLInputName + '"]');
  const token = form.querySelector('input[name="authenticity_token"]').value;
  const formData = new FormData();
  let fileURL;

  formData.append('authenticity_token', token);

  if (file) {
    formData.append('image[content]', file, file.name);
  }

  if (fileURLInput) {
    fileURL = fileURLInput.value;
  } else {
    fileURL = '';
  }

  formData.append(fileURLInputName, fileURL);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', form.action, true);
  xhr.onload = function () {
    var data = JSON.parse(xhr.response);
    if (xhr.status === 200) {
      this.area.setImageGalleryId(data.gallery_id);
      this.addImage(data.image);
      this.setUploadForm(data.form);
    } else {
      this.imageUploadFailed(xhr, data);
    }
  }.bind(this);
  xhr.send(formData);
};

// The image upload failed
Bootsy.Modal.prototype.imageUploadFailed = function(xhr, invalidErrors) {
  if (Number(xhr.status) === 422 && invalidErrors.content) {
    this.hideUploadLoadingAnimation();

    if (this.validation) this.validation.remove();

    this.validation = $("<p class='text-danger'>");
    this.validation.text(invalidErrors.content[0]);
    this.$el.find('.bootsy-upload-form').append(this.validation);
  } else {
    this.hideGalleryLoadingAnimation();
    alert($.fn.wysihtml.locale[this.area.locale].bootsy.error);
  }

  this.showRefreshButton();
};

// Add image to gallery
Bootsy.Modal.prototype.addImage = function(html) {
  $(html).hide().appendTo(this.$el.find('.bootsy-gallery')).fadeIn(200);
};

// Set image gallery
Bootsy.Modal.prototype.requestImageGallery = function() {
  this.hideRefreshButton();
  this.showGalleryLoadingAnimation();

  $.ajax({
    url: '/bootsy/images',
    type: 'GET',
    cache: false,
    data: {
      image_gallery_id: this.area.$el.data('gallery-id')
    },
    dataType: 'json',
    success: function(data) {
      this.hideRefreshButton();
      this.hideGalleryLoadingAnimation();
      this.$el.find('.bootsy-gallery .bootsy-image').remove();

      $.each(data.images, function(index, value) {
        this.addImage(value);
      }.bind(this));

      if (data.images.length === 0) this.showEmptyAlert();

      this.setUploadForm(data.form);

      this.$el.data('gallery-loaded', true);
    }.bind(this),
    error: this.imageUploadFailed.bind(this)
  });
};

// Delete image
Bootsy.Modal.prototype.deleteImage = function(id) {
  var image = this.$el.find('.bootsy-image[data-id="' + id + '"]');

  this.hideGalleryLoadingAnimation();

  image.hide(200, function() {
    image.remove();

    if (this.$el.find('.bootsy-image').length === 0 ) this.showEmptyAlert();
  }.bind(this));
};

Bootsy.Modal.prototype.clearModal = function() {
  $('#select-image-window').addClass('d-none');
  $('#link-image-window').addClass('d-none');
  $('#global-gallery-window').addClass('d-none');
  $('#videos-window').addClass('d-none');
  $('#image-upload-control').addClass('d-none');
  $('#image-link-control').addClass('d-none');
  $('#global-gallery-control').addClass('d-none');
  $('#videos-control').addClass('d-none');
}

Bootsy.Modal.prototype.showImageUploadWindow = function() {
  Bootsy.Modal.prototype.clearModal();
  $('#select-image-window').removeClass('d-none');
  $('#image-upload-control').removeClass('d-none');
};

Bootsy.Modal.prototype.showImageLinkWindow = function() {
  Bootsy.Modal.prototype.clearModal();
  $('#link-image-window').removeClass('d-none');
  $('#image-link-control').removeClass('d-none');
};

Bootsy.Modal.prototype.showGalleryWindow = function() {
  Bootsy.Modal.prototype.clearModal();
  $('#global-gallery-window').removeClass('d-none');
  $('#global-gallery-control').removeClass('d-none');
};

Bootsy.Modal.prototype.showVideosWindow = function() {
  Bootsy.Modal.prototype.clearModal();
  $('#videos-window').removeClass('d-none');
  $('#videos-control').removeClass('d-none');
};

Bootsy.Modal.prototype.alert = function(text, add=false) {
  const alert = $('.bootsy-empty-alert');

  alert.removeClass('alert-info');
  alert.addClass('alert-danger');

  if (add) {
    alert.html(alert.html() + '<br>' + text);
  } else {
    alert.text(text);
  }
  alert.fadeIn(200);
}

Bootsy.Modal.prototype.clearAlert = function() {
  const alert = $('.bootsy-empty-alert');

  alert.removeClass('alert-danger');
  alert.addClass('alert-info');
  alert.html('')
  alert.removeClass('d-block');
  alert.fadeOut(200);
}

Bootsy.Modal.prototype.showPage = function(pages, pageId) {
  pages.each((i, page) => {
    if ($(page).attr('data-page-id') === pageId) {
      $(page).removeClass('d-none');
      $(page).addClass('d-flex');
    } else {
      $(page).addClass('d-none');
      $(page).removeClass('d-flex');
    }
  });
}

Bootsy.Modal.prototype.parseBackendResponse = function(data) {
  const files = data['files'];
  const filetype = files[0]['filetype'] || 'image';
  let pagination = data['pagination'];
  let modal_body = '';

  for (let i=0; i<files.length; i++) {
    const user_file_id = files[i]['id'];
    const filename = files[i]['filename'];
    let tag;

    if (filetype === 'image') {
      tag = `<img class="bootsy-image" src="${Bootsy.config.galleryURL}/user_files/${user_file_id}?variant=tiny" \
              data-toggle="tooltip" title="${filename}">`;
    } else if (filetype === 'video') {
      tag = `<div class="col">
              <video class="bootsy-video" muted playsinline preload="metadata" width="100" height="100">
                <source src="${Bootsy.config.galleryURL}/user_files/${user_file_id}" />
                Your browser doesn't support videos
              </video>
              <div class="bg-light">
                <small>${filename}</small>
              </div>
            </div>`;
    }
    modal_body += `<div class="mr-1 mb-1 p-1 border" id="selector_image_${user_file_id}">
                    <a class="thumbnail" href="javascript:;">
                      ${tag}
                    </a>
                  </div>`;
  }

  // Update pagination hrefs
  let start = pagination.indexOf('href="');
  let end = pagination.indexOf('"', start+6);

  while (start > -1) {
    const src = Bootsy.config.galleryURL + pagination.substring(start+6, end);
    pagination = pagination.substring(0, start+6) + src + pagination.substring(end);

    start = pagination.indexOf('href="', end);
    end = pagination.indexOf('"', start+6);
  }

  return [modal_body, pagination];
}

Bootsy.Modal.prototype.fetchFromBackend = function(opts) {
  let url = Bootsy.config.galleryURL + `/user_files.json?filetype=${opts.filetype}&page=${Bootsy.config.page}&per_page=${Bootsy.config.perPage}&school_id=${Bootsy.config.schoolId}`;
  if (opts.search) { url += `&search=${opts.search}`; }

  return  fetch(url).then((response) => {
            return response.json();
          }, (error) => {
            throw error;
          });
}

// Function to fetch multiple images from API and upload them into the system
// Currently not in use!
Bootsy.Modal.prototype.fetchAll = function(urls) {
  for (let i=0; i<urls.length; i++) {
    fetch(urls[i])
      .then((response) => {
        return response.blob();
      }, (error) => {
        throw error;
      })
      .then((file) => {
        // Give server some time to upload previous image
        setTimeout(() => {
          this.uploadImage(event, xhr, settings, file);
        }, i*500);
      });
  }
}

// Updates screen with new data fetched from server.
// Normally is used after fetchFromBackend() function like so:
// this.fetchFromBackend().then((data) => { this.updateScreen('#screen-id', data) })
// Note that the screen you want to update should have div.gallery-wrapper and div.pagination-wrapper
Bootsy.Modal.prototype.updateScreen = function(selector, data) {
  let modal_body, pagination;
  [modal_body, pagination] = this.parseBackendResponse(data);

  modal_body = '<div class="d-flex flex-wrap" data-page-id="1">'+modal_body+"</div>";
  $(`${selector} .gallery-wrapper`).html(modal_body);
  $(`${selector} .pagination-wrapper`).html(pagination);
}