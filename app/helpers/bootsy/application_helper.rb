# frozen_string_literal: true
module Bootsy
  module ApplicationHelper
    def refresh_btn
      link_to t('bootsy.action.refresh'),
              '#refresh-gallery',
              class: 'btn btn-secondary btn-sm refresh-btn'
    end

    def resource_or_nil(resource)
      resource if resource.present? && resource.persisted?
    end

    def current_translations
      @translations ||= I18n.backend.send(:translations)
      @translations[I18n.locale].with_indifferent_access
    end
  end
end
