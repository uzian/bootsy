# Bootsy

[![Gem Version](https://badge.fury.io/rb/bootsy.svg)](http://badge.fury.io/rb/bootsy)
[![Build Status](https://secure.travis-ci.org/volmer/bootsy.svg?branch=master)](http://travis-ci.org/volmer/bootsy)

### Disclaimer: this is a fork of the original [bootsy](https://github.com/volmer/bootsy) project which is no longer maintained. 

Bootsy users who could not find a suitable alternative to replace bootsy in their own application, can try this fork, which in which bootsy has been kept on "life support" for the very same reason: no viable alternative. Latest rails version this fork has been used with is Rails 6.1.1

The *Bootsy* is a WYSIWYG editor for Rails based on
[wysihtml](https://github.com/Voog/wysihtml). Originally image uploads were using CarrierWave. This fork uses ActiveStorage instead

## Requirements

* Rails 6.
* ImageMagick or GraphicsMagick (for MiniMagick).
* [Bootstrap 4](http://getbootstrap.com/) fully installed in your app.


## Installation

1. Add Bootsy to your Gemfile and `bundle install` it:
  ```ruby
  gem 'bootsy'
  ```

  ```console
  bundle install
  ```

2. Mount Bootsy at the beginning of your `config/routes.rb`:
  ```ruby
  Rails.application.routes.draw do
    mount Bootsy::Engine => '/bootsy', as: 'bootsy'

    ...

  end
  ```

3. Require Bootsy in the asset pipeline:

  In your `app/assets/javascripts/application.js`, put this **after**
  requiring jQuery and Bootstrap:

  ```javascript
  //= require bootsy
  ```

  In your `app/assets/stylesheets/application.css`, put this line **after**
  requiring Bootstrap:

  ```css
  *= require bootsy
  ```

4. Add and run migrations:
  ```console
  bundle exec rake bootsy:install:migrations
  bundle exec rake db:migrate
  ```


## Usage

Just call `bootsy_area` in your `FormBuilder` instances, the
same way you'd call `textarea`. Example:
```erb
<%= form_for(@post) do |f| %>
  <%= f.label :title %>
  <%= f.text_field :title %>

  <%= f.label :content %>
  <%= f.bootsy_area :content %>

  <%= f.submit %>
<% end %>
```

Bootsy will group the uploaded images as galleries and associate them to one of
your models. For instance, if you have a `Post` model and you want to use `bootsy_area`
with it, you must include the `Bootsy::Container` module:
```ruby
class Post < ActiveRecord::Base
  include Bootsy::Container
end
```

Don't forget to ensure the association between your model objects with Bootsy
image galleries. For `strong_parameters`, you must whitelist the `bootsy_image_gallery_id` parameter
in your controller:
```ruby
private

def post_params
  params.require(:post).permit(:title, :content, :bootsy_image_gallery_id)
end
```


## Bootsy with [Simple Form](https://github.com/plataformatec/simple_form) builders

You can use `bootsy` as an input type in `SimpleForm::FormBuilder` instances. Example:
```erb
<%= simple_form_for @post do |f| %>
  <%= f.input :title %>

  <%= f.input :content, as: :bootsy %>

  <%= f.button :submit %>
<% end %>
```


## Editor options

You can customize Bootsy through a hash of `editor_options`:


### Enable/disable features

You can enable and disable features as you like. For instance, if you don't want link and color features:
```erb
<%= f.bootsy_area :my_attribute, editor_options: { link: false, color: false } %>
```
Available options are: `:blockquote`, `:font_styles`, `:emphasis`, `:lists`, `:html`, `:link`, `:image` and `:color`.


### Alert of unsaved changes

By default Bootsy alerts the user about unsaved changes if the page is closed or reloaded. You can disable
this feature with:
```erb
<%= f.bootsy_area :my_attribute, editor_options: { alert_unsaved: false } %>
```

## Uploads

If you don't want to have image uploads, just call `bootsy_area` in a form builder not
associated to a `Bootsy::Container` model. This way users will still be able to insert
images in the text area using an external image URL.


## Configuration

You can set the default editor options, image sizes available (small, medium,
large and/or its original), dimensions and more. Create a copy of [Bootsy's initalizer
file](https://github.com/volmer/bootsy/tree/master/config/initializers/bootsy.rb)
in your `config/initializers` and feel free to uncomment and change the options
as you like.


## I18n

You can translate Bootsy to your own language. Simply create a locale file for
it in your `config/locales` directory similar to [Bootsy's master English file](https://github.com/volmer/bootsy/tree/master/config/locales/bootsy.en.yml).

You also need to translate Bootsy on the JavaScript side. Just follow
[this example](https://github.com/volmer/bootsy/blob/master/app/assets/javascripts/bootsy/locales/en.js).
Bootsy will try to guess the locale based on the `lang` attribute of the page's `<html>` tag.
You can set the locale directly by setting a `data-bootsy-locale` attribute on your `<textarea>`.


## License

MIT License. Copyright 2012-2017 Volmer Campos Soares
