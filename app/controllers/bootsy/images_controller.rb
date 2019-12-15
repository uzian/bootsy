# frozen_string_literal: true
require_dependency 'bootsy/application_controller'

module Bootsy
  class ImagesController < Bootsy::ApplicationController
    before_action :set_gallery, only: [:index, :create]

    def index
      @images = @gallery.images

      respond_to do |format|
        format.html # index.html.erb

        format.json do
          render json: {
            images: @images.map { |image| image_markup(image) },
            form: new_image_markup(@gallery)
          }
        end
      end
    end

    def create
      @gallery.save!
      @image = @gallery.images.new(image_params)

      create_and_respond
    end

    def destroy
      @image = Image.find(params[:id])
      @image.destroy

      respond_to do |format|
        format.json do
          render json: { id: params[:id] }
        end

        format.html { redirect_to images_url }
      end
    end

    def show
      @image = Image.find_by_id(params[:id])
      if @image.nil? || !@image.content.attached?     
        render :text => "404 Not Found", :status => 404
        return
      end

      variant_name=params[:variant].to_s
      filename=@image.content.filename.to_s
      content_type=@image.content.content_type

      if Image::SIZES.keys.map(&:to_s).include?(variant_name)        
        variant=@image.send(variant_name).processed
        filename=variant_name+"_"+filename
        logger.debug "Serving #{variant.inspect} "
        send_data @image.content.blob.service.download(variant.key), filename: filename, content_type: content_type 
      else
        send_data @image.content.blob.download, filename: filename, content_type: content_type
      end         
    end


    private

    def set_gallery
      @gallery = ImageGallery.find(params[:image_gallery_id])
    end

    # Private: Returns the String markup to render
    # an image in the gallery modal.
    #
    # image - The `Bootsy::Image` instance that will
    #         be rendered.
    def image_markup(image)
      render_to_string(
        file: 'bootsy/images/_image',
        formats: [:html],
        locals: { image: image },
        layout: false
      )
    end

    # Private: Returns the String markup to render
    # a form to upload a new image in a given gallery.
    #
    # gallery - The `Bootsy::ImageGallery` instance which
    #           the image will be uploaded to.
    def new_image_markup(gallery)
      render_to_string(
        file: 'bootsy/images/_new',
        formats: [:html],
        locals: { gallery: gallery, image: gallery.images.new },
        layout: false
      )
    end

    def image_params
      #params.require(:image).permit(:image_file, :remote_image_file_url)
      params.require(:image).permit(:content, :remote_image_file_url)
    end

    def create_and_respond
      respond_to do |format|
        if @image.save
          format.json do
            render json: {
              image: image_markup(@image),
              form: new_image_markup(@gallery),
              gallery_id: @gallery.id
            }
          end
        else
          format.json do
            render json: @image.errors, status: :unprocessable_entity
          end
        end
      end
    end
  end
end
