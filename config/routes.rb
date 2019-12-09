# frozen_string_literal: true
Bootsy::Engine.routes.draw do
  resources :image_galleries, only: [] do
    resources :images, only: [:index, :create, :destroy]
  end

  file_routes = [:index, :create, :show]

  file_routes << :destroy if Bootsy.allow_destroy

  resources :images, only: file_routes
end
