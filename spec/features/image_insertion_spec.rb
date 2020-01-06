# frozen_string_literal: true
require 'rails_helper'

describe 'image insertion', type: :feature, js: true do
  let(:size_positions) do
    [
      %w(Small Left),
      %w(Small Right),
      %w(Small Inline),
      %w(Medium Left),
      %w(Medium Right),
      %w(Medium Inline),
      %w(Large Left),
      %w(Large Right),
      %w(Large Inline),
      %w(Original Left),
      %w(Original Right),
      %w(Original Inline)
    ]
  end

  it 'can be performed' do
    size_positions.each do |size_position|
      visit new_post_path
      click_on 'Insert image'
      attach_file 'image[content]', Rails.root.to_s + '/public/test.jpg'

      find('.bootsy-gallery img').click
      size = size_position.first
      position = size_position.last
      script = "$('.dropdown-submenu .dropdown-menu').hide(); "\
        "$('a:contains(#{size}):visible').parent()."\
        "find('.dropdown-menu').show()"
      page.execute_script(script)
      find('li.dropdown-submenu ul.dropdown-menu li a', text: position).click

      content = page.evaluate_script(
        'Bootsy.areas.post_content.editor.getValue()'
      )

      image=Bootsy::Image.last
      "//div[contains(@class, 'bootsy-gallery')]//img[contains(@src, "\
      "'/#{image.id}?variant=thumbnail')]"

      img_src = "/#{image.id}?variant=#{size.downcase}"
      expect(content).to include(img_src)
      expect(content).to include("align=\"#{position.downcase}\"")
    end
  end
end
