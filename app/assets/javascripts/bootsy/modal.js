/*
  This file contains scripts related to the Bootsy modal, the one which is invoked when user clicks on
  image or video icon on the toolbar.

  Using the modal, user can browse and insert media files into the Bootsy area,
  can find media files in the internet and insert them into the area by providing URL,
  and can upload media files from own device.
*/

window.Bootsy = window.Bootsy || {};
Bootsy.constants = Bootsy.constants || {};

Bootsy.constants.menuTypes = {
  images: Symbol('images'),
  videos: Symbol('videos')
}
Bootsy.constants.filesources = {
  local: 'filesource-local',
  foreign: 'filesource-foreign'
}

Bootsy.Modal = function(area) {
  this.$el = area.$el.siblings('.bootsy-modal');
  this.area = area;

  // In order to avoid form nesting
  this.$el.parents('form').after(this.$el);

  // Invoke dropdown menu on image click
  this.$el.on("click", ".selector-area:has(.bootsy-image)", function(event) {
    const imgTag = $(event.currentTarget).is("img") ? event.currentTarget : $(event.currentTarget).find("img")[0];

    if (imgTag) {
      const attrs = {
        "data-url": $(imgTag).attr("src").slice(0, $(imgTag).attr("src").indexOf("?variant")),
        "data-source": Bootsy.constants.filesources.local
      }

      this.invokeMenu(Bootsy.constants.menuTypes.images, attrs, event);
    }
  }.bind(this));

  // Invoke dropdown menu on video click
  this.$el.on("click", ".selector-area:has(.bootsy-video)", function(event) {
    const srcTag = $(event.currentTarget).find("source")[0];

    if (srcTag) {
      const attrs = {
        "data-url": $(srcTag).attr("src"),
        "data-source": Bootsy.constants.filesources.local
      }

      this.invokeMenu(Bootsy.constants.menuTypes.videos, attrs, event);
    }
  }.bind(this));

  // Invoke dropdown menu when linking images/videos
  this.$el.on('click', '#link-image-btn, #link-video-btn', function(event) {
    const filetype = $(event.currentTarget).attr('id').split('-')[1];
    const url = $(`#${filetype}-url-input`).val().trim();
    const attrs = {
      'data-url': url,
      'data-source': Bootsy.constants.filesources.foreign
    }

    let menuType;
    switch (filetype) {
      case 'image':
        menuType = Bootsy.constants.menuTypes.images;
        break;
      case 'video':
        menuType = Bootsy.constants.menuTypes.videos;
        break;
    }

    this.invokeMenu(menuType, attrs, event);
  }.bind(this));

  // Hide menus on focus lost
  this.$el.on('focusout', '#images-menu, #videos-menu', function(event) {
    // Do not hide if user clicked on child element
    if ($(event.relatedTarget).parents('#images-menu, #videos-menu').length > 0) { return };

    const wrappers = $('#images-menu, #videos-menu');
    const menus = $('#images-menu > .dropdown-menu, #videos-menu > .dropdown-menu');

    wrappers.removeClass('show');
    menus.removeClass('show');

    // Clear out data attributes
    wrappers.removeAttr('data-url');
    wrappers.removeAttr('data-source');
  }.bind(this));

  // Paginate through images/videos
  this.$el.on('click', '.pagination .page-link', function(event) {
    event.preventDefault();

    const targetPage = event.currentTarget;
    const modal = $(targetPage).parents('.bootsy-modal').first();
    const url = $(targetPage).attr('href');

    fetch(url)
      .then((response) => {
        return response.json();
      }, (error) => {
        throw error;
      })
      .then((data) => {
        let modal_body, pagination;
        [modal_body, pagination] = this.parseBackendResponse(data);

        modal_body = `<div class="d-flex flex-wrap">${modal_body}</div>`;
        modal.find('.gallery-wrapper').html(modal_body);
        modal.find('.pagination-wrapper').html(pagination);
      });
  }.bind(this));

  // Display uploaded file's name in input field
  this.$el.on('change', '#image-file-input, #video-file-input', function(event) {
    const input = event.currentTarget;
    const label = $(`label[for="${$(input).attr('id')}"]`);
    $(label).text(input?.files[0]?.name || Bootsy.translations['chooseFile'] || 'Choose file');
  }.bind(this));

  // Insert image to post body
  this.$el.on('click', '#images-menu .insert', function(event) {
    const elem = event.currentTarget;
    const filesource = $('#images-menu').attr('data-source');
    let suffix = '?variant=' + $(elem).attr('data-image-size');

    if ($(elem).attr('data-image-size') === 'original') {
      suffix = '';
    }

    const image = {
      src: $('#images-menu').attr('data-url') + suffix
    }

    if ($(elem).attr('data-image-size') !== 'full_width') {
      image.align = $(elem).attr('data-position');
    } else {
      image.class = 'full-width';
    }

    this.$el.modal('hide');

    insert = this.area.insertImage.bind(this.area);
    insert(image, filesource);
  }.bind(this));

  // Insert video to post body
  this.$el.on("click", "#videos-menu .insert", function(event) {
    event.preventDefault();

    const video = {
      src: $("#videos-menu").attr("data-url"),
      class: $(event.currentTarget).attr("data-video-size") == "full_width" ? "full-width" : "video-default-size"
    }
    const filesource = $("#videos-menu").attr("data-source");

    insert = this.area.insertVideo.bind(this.area);
    insert(video, filesource);

    this.$el.modal('hide');
  }.bind(this));

  // Search for images/videos
  this.$el.on('click', '.search-btn', function(event) {
    const keyword = $(event.currentTarget).parents('.input-group').find('.searchbar').first().val();
    const filetype = $(event.currentTarget).parent().data('filetype');

    this.fetchFromBackend({
          filetype: filetype,
          search: keyword
        })
        .then((data) => {
          switch(filetype) {
            case 'image':
              this.updateGallery('#images-modal', data);
              break;
            case 'video':
              this.updateGallery('#videos-modal', data);
              break;
          }
        });
  }.bind(this));

  // Reset searchbar and show all images/videos
  this.$el.on('click', '.reset-search', function(event) {
    $(event.currentTarget).parents('.input-group').find('.searchbar').first().val('');
    const filetype = $(event.currentTarget).parent().data('filetype');

    this.fetchFromBackend({filetype: filetype})
        .then((data) => {
          switch(filetype) {
            case 'image':
              this.updateGallery('#images-modal', data);
              break;
            case 'video':
              this.updateGallery('#videos-modal', data);
              break;
          }
        });
  }.bind(this));

  // Upload image/video
  this.$el.on('click', '.user-file-form button', function(event) {
    const form = $(event.currentTarget).parents('.user-file-form');
    const filetype = form.find('input[type="hidden"]').val();
    const file = form.find('input[type="file"]').prop('files')[0];
    const label = form.find('label');
    const fdata = new FormData();

    fdata.append('user_file[filetype]', filetype);
    fdata.append('user_file[content]', file);

    this.clearAlert();
    this.showUploadLoadingAnimation();

    $.ajax({
      type: 'POST',
      url: `${Bootsy.config.backendURL}/user_files`,
      data: fdata,
      dataType: 'json',
      processData: false,
      contentType: false,

      success: () => {
        // Refresh gallery and clear file input
        this.fetchFromBackend({filetype})
          .then((data) => {
            this.updateGallery(`#${filetype}s-modal`, data);
          });

        label.text(Bootsy.translations['chooseFile'] || 'Choose file');
        label.val('');
      },

      error: () => {
        this.alert( Bootsy.translations['uploadError'] || `Couldn't upload the file`);
      },

      complete: () => {
        this.hideUploadLoadingAnimation();
      }
    });
  }.bind(this));

  this.$el.modal({ show: false });
  this.hideRefreshButton();
  this.hideEmptyAlert();
};

// Initialization logic
Bootsy.Modal.prototype.init = function() {
  // Toggle between modals, depending on which button invoked it
  $('#images-btn').on('click', () => {
    $('#images-modal').removeClass('d-none');
    $('#videos-modal').addClass('d-none');
  });

  $('#videos-btn').on('click', () => {
    $('#videos-modal').removeClass('d-none');
    $('#images-modal').addClass('d-none');
  });

  // When one of modals is closed - close another one automatically
  $('#images-modal, #videos-modal').on('hidden.bs.modal', () => {
    $('#images-modal').modal('hide');
    $('#videos-modal').modal('hide');
  });


  // Fetch images' gallery when modal is opened for the first time.
  $('#images-modal').on('shown.bs.modal', function() {
    if ($('#images-modal .gallery-wrapper').children().length == 0) {
      this.fetchFromBackend({filetype: 'image'})
          .then((data) => {
            this.updateGallery('#images-modal', data)
          });
    }
  }.bind(this));

  // Fetch videos' gallery when modal is opened for the first time.
  $('#videos-modal').on('shown.bs.modal', function() {
    if ($('#videos-modal .gallery-wrapper').children().length == 0) {
      this.fetchFromBackend({filetype: 'video'})
          .then((data) => {
            this.updateGallery('#videos-modal', data)
          });
    }
  }.bind(this));
};

// Show modal
Bootsy.Modal.prototype.show = function() {
  this.$el.modal('show');
};

Bootsy.Modal.prototype.showGalleryLoadingAnimation = function() {
  this.$el.find('.bootsy-gallery-loader').fadeIn(200);
};

Bootsy.Modal.prototype.hideGalleryLoadingAnimation = function() {
  this.$el.find('.bootsy-gallery-loader').fadeOut(200);
};

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
  if (!files || files.length == 0) { return ['', '']; }
  const filetype = files[0]['filetype'] || 'image';
  let pagination = data['pagination'];
  let modal_body = '';

  for (let i=0; i<files.length; i++) {
    const user_file_id = files[i]['id'];
    const filename = files[i]['filename'];
    let tag;

    if (filetype === 'image') {
      tag = `<img class="bootsy-image" src="${Bootsy.config.backendURL}/user_files/${user_file_id}?variant=tiny" \
              data-toggle="tooltip" title="${filename}">`;
    } else if (filetype === 'video') {
      tag = `<div class="col w-100 p-0">
              <video class="bootsy-video" muted playsinline preload="metadata" width="100" height="100">
                <source src="${Bootsy.config.backendURL}/user_files/${user_file_id}" />
                Your browser doesn't support videos
              </video>
              <div class="bg-light text-truncate">
                <small>${filename}</small>
              </div>
            </div>`;
    }
    modal_body += `<div class="mr-1 mb-1 p-1 border selector-area" id="selector_image_${user_file_id}">
                    <a class="thumbnail" href="javascript:;">
                      ${tag}
                    </a>
                  </div>`;
  }

  // Update pagination hrefs
  let start = pagination.indexOf('href="');
  let end = pagination.indexOf('"', start+6);

  while (start > -1) {
    const src = Bootsy.config.backendURL + pagination.substring(start+6, end);
    pagination = pagination.substring(0, start+6) + src + pagination.substring(end);

    start = pagination.indexOf('href="', end);
    end = pagination.indexOf('"', start+6);
  }

  return [modal_body, pagination];
}

/* Arguments:
  {
    filetype [image/video],
    page?: Integer,
  }
*/
Bootsy.Modal.prototype.fetchFromBackend = function(opts) {
  const pageNum = opts.page || Bootsy.config.page || 1;
  const filetype = opts.filetype || 'image';
  let perPage = 6;

  switch (filetype) {
    case 'image':
      perPage = Bootsy.config.imagesPerPage;
      break;
    case 'video':
      perPage = Bootsy.config.videosPerPage;
      break;
  }

  let url = Bootsy.config.backendURL + `/user_files.json?filetype=${filetype}&page=${pageNum}&per_page=${perPage}`;

  if (opts.search) { url += `&search=${opts.search}`; }
  this.showGalleryLoadingAnimation();

  return  fetch(url).then((response) => {
            return response.json();
          }, (error) => {
            throw error;
          })
          .finally(() => {
            this.hideGalleryLoadingAnimation();
          });
}

/*
  Updates modal's gallery with new data fetched from the server.
  Normally is used after fetchFromBackend() function like so:
  this.fetchFromBackend().then((data) => { this.updateGallery('#modal-id', data); })
  Note that the modal you want to update should have div.gallery-wrapper and div.pagination-wrapper
*/
Bootsy.Modal.prototype.updateGallery = function(selector, data) {
  try {
    let [modal_body, pagination] = this.parseBackendResponse(data);

    modal_body = '<div class="d-flex flex-wrap" data-page-id="1">'+modal_body+"</div>";
    $(`${selector} .gallery-wrapper`).html(modal_body);
    $(`${selector} .pagination-wrapper`).html(pagination);

    this.clearAlert();
  } catch (error) {
    console.error("Couldn't update modal's gallery. Error: ", error);
  }
}

// Invokes dropdown menus for inserting images and videos
Bootsy.Modal.prototype.invokeMenu = function(menuType, attrs, event) {
  let menu, modal;

  switch (menuType) {
    case Bootsy.constants.menuTypes.images:
      menu = $("#images-menu");
      modal = $("#images-modal .modal-dialog");
      break;
    case Bootsy.constants.menuTypes.videos:
      menu = $("#videos-menu");
      modal = $("#videos-modal .modal-dialog");
      break;
    default:
      throw new Error("First argument passed to invokeMenu() should be one of Bootsy.constants.menuTypes values");
  }

  // Add data attributes to menu
  for (const [key, value] of Object.entries(attrs)) {
    $(menu).attr(key, value);
  }

  // Reposition the menu under the clicking point
  const offsetX = event.clientX - ($(window).width() - modal.width())/2 + 5;
  const offsetY = event.clientY - (modal.outerHeight(true) - modal.height())/2 - 5;

  menu.css({
    position: "absolute",
    left: `${offsetX}px`,
    top: `${offsetY}px`
  });

  menu.addClass("show");
  menu.children(".dropdown-menu").addClass("show");
  menu.focus();
}