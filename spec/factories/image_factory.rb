# frozen_string_literal: true
include ActionDispatch::TestProcess

FactoryBot.define do
  factory :image, class: Bootsy::Image do
    content do
      fixture_file_upload(Rails.root.to_s + '/public/test.jpg', 'image/jpeg')
    end
    image_gallery
  end
end
