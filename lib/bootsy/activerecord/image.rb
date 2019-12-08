# frozen_string_literal: true
module Bootsy
  # Public: Model to reference the actual image stored trough Bootsy.
  # It contains the CarrierWave uploader and belongs to a
  # particular image gallery.
  class Image < ActiveRecord::Base
    belongs_to :image_gallery, touch: true

    mount_uploader :image_file, ImageUploader

    has_one_attached :content 

    validates_presence_of :image_file, :image_gallery_id

    SIZES={
      thumb: [60,60],
      small: [160,160],
      medium: [360,360],
      large: [760,760],
    }

    SIZES.each do |size_name, size_values|
      define_method size_name do
        if content.attached?
          content.variant(
            combine_options: {
            gravity: "center",
            resize: "#{size_values[0]}x#{size_values[1]}>",
            crop: "#{size_values[0]}x#{size_values[1]}+0+0"
          })
        end   
      end
    end

  end
end

