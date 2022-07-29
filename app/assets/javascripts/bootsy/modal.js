/* Bootsy modal */

window.Bootsy = window.Bootsy || {};

Bootsy.Modal = function(area) {
  var self = this;

  this.$el = area.$el.siblings('.bootsy-modal');
  this.area = area;

  // Display image URL input field on 'Use link' button click
  this.$el.on('click', '#image-upload-control .use-link-btn', this.showImageLinkWindow);

  // Display uploaded images back on 'cancel' button click
  this.$el.on('click', '#new_image .cancel-btn', this.showImageUploadWindow);

  // Display gallery on 'Select from gallery' button click
  this.$el.on('click', '#image-upload-control .remote-gallery-btn', function(event, xhr, settings) {
    this.showGalleryWindow();

    // Fetch images from remote gallery and insert them into view
    fetch(Bootsy.config.remoteGalleryURL + '/user_files.json?filetype=image&page=1&per_page=10&school_id=2')
      .then((response) => {
        return response.json();
      }, (error) => {
        throw error;
      })
      .then((data) => {
        const images = data['files'];
        let modal_body = "";
        const urls = [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zMuIeTFropt9beUgjjkKjc9igWGovztRrg&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg_aM1BI6N2NZg3614bk5IXppVXljCG6opNA&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9E-GvowImZUUUgQjUiJyrZvGdyVMGpVB5w&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ucNwuI-IociftFkxEr11n7D2J2HjKhqBEA&usqp=CAU',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAZx1OCKhKPv9f3FWex5qEgy8-cQgfaowHPw&usqp=CAU'
        ]

        // For every image filename, fetch actual image file
        //for (let i=0; i<images.length; i++) {
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

        this.showImageUploadWindow();
        $('#remote-gallery-window .gallery').html(modal_body);
        $('#remote-gallery-window .pagination').html(data['pagination']);
      });
  }.bind(this));

  // In order to avoid form nesting
  this.$el.parents('form').after(this.$el);

  // Insert image to post body from image gallery
  this.$el.on('click', '.bootsy-image .insert', function(event) {
    var img, imageObject;
    var imageSuffix = '?variant=' + $(this).attr('data-image-size');

    event.preventDefault();

    if ($(this).data('image-size') === 'original') {
      imagePrefix = '';
    }

    img = $(this).parents('.bootsy-image').find('img');

    imageObject = {
      src: img.attr('src').replace('?variant=thumbnail', imageSuffix)/*,
      alt: img.attr('alt').replace('Thumb_', '')*/
    };

    if ($(this).data('image-size') !== 'full_width') {
      imageObject.align = $(this).data('position');
    } else {
      imageObject.class = 'full-width';
    }

    self.$el.modal('hide');

    insert = self.area.insertImage.bind(self.area);
    insert(imageObject);
  });

  // Insert image to post body by URL provided
  this.$el.on('click', '#image-link-control .insert-btn', function(event, xhr, settings) {
    const imageURL = $($('#link-image-window input')[0]).val().trim();

    // Validate image URL
    if (imageURL == '') {
      Bootsy.Modal.prototype.alert('Image URL cannot be empty.');
      return;
    }

    fetch(imageURL)
    .then((response) => {
      return response.blob();
    }, (error) => {
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
  }.bind(this));

  this.$el.modal({ show: false });

  this.$el.on('shown.bs.modal', function() {
    if (this.$el.data('gallery-loaded') !== true) {
      this.requestImageGallery();
    }
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
  this.$el.find('.bootsy-empty-alert').fadeIn(200);
};

Bootsy.Modal.prototype.hideEmptyAlert = function() {
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
  this.hideEmptyAlert();

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
  $('#remote-gallery-window').addClass('d-none');
  $('#image-upload-control').addClass('d-none');
  $('#image-link-control').addClass('d-none');
  $('#remote-gallery-control').addClass('d-none');
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
  $('#remote-gallery-window').removeClass('d-none');
  $('#remote-gallery-control').removeClass('d-none');
};

Bootsy.Modal.prototype.alert = function(text) {
  const alert = $('.bootsy-empty-alert');

  alert.removeClass('alert-info');
  alert.addClass('alert-danger');
  alert.text(text);
  alert.addClass('d-block');
}

Bootsy.Modal.prototype.clearAlert = function() {
  const alert = $('.bootsy-empty-alert');

  alert.removeClass('alert-danger');
  alert.addClass('alert-info');
  alert.text('')
  alert.removeClass('d-block');
  alert.addClass('d-none');
}