!function($, wysi) {
    "use strict";

    var bootstrap_colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'];
    var bootsy_colors = ['default', 'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'orange', 'yellow', 'navy', 'blue', 'teal', 'aqua'];
    var bootsy_fontsizes = ["smaller", "small", "medium", "normal", "large", "larger", "x-large", "xx-large", "xxx-large"];

    var tpl = {
        "font-styles": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li class='dropdown'>" +
              "<a class='btn btn-secondary dropdown-toggle" + size + "' data-toggle='dropdown' href='#' title='" + locale.font_styles.title + "' id='dropdownFontStyleLink'  aria-haspopup='true' aria-expanded='false'>" +
              "<span class='current-font'>" + locale.font_styles.normal + "</span>" +
              "</a>" +
              "<div class='dropdown-menu' aria-labelledby='dropdownFontStyleLink'>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='div' tabindex='-1' role='menuitem'>" + locale.font_styles.normal + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h1' tabindex='-1' role='menuitem'>" + locale.font_styles.h1 + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h2' tabindex='-1' role='menuitem'>" + locale.font_styles.h2 + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h3' tabindex='-1' role='menuitem'>" + locale.font_styles.h3 + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h4' tabindex='-1' role='menuitem'>" + locale.font_styles.h4 + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h5' tabindex='-1' role='menuitem'>" + locale.font_styles.h5 + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h6' tabindex='-1' role='menuitem'>" + locale.font_styles.h6 + "</a>" +
              "</div>" +
            "</li>";
        },

        "font-size": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            var menu = '';
            var i, c;

            for(i = 0; i < bootsy_fontsizes.length; i++) {
              c = bootsy_fontsizes[i];
              menu += "<a class='dropdown-item wysiwyg-font-size-"+c+"' data-wysihtml-command='fontSize' data-wysihtml-command-value='"+c+"' role='menuitem'>" + locale.fontSizes[c] + "</a>"
            }

            return "<li class='dropdown'>" +
              "<a class='btn btn-secondary dropdown-toggle" + size + "' data-toggle='dropdown' href='#' id='dropdownFontSizeLink'  aria-haspopup='true' aria-expanded='false'>" +
              "<i class='fas fa-text-height'></i>" +
              "</a>" +
              "<div class='dropdown-menu' aria-labelledby='dropdownFontSizeLink'>" +
              menu +
              "</div>" +
            "</li>";
        },

        "emphasis": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
              "<div class='btn-group'>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='bold' title='CTRL+B' tabindex='-1'><i class='fas fa-bold'></i></a>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='italic' title='CTRL+I' tabindex='-1'><i class='fas fa-italic'></i></a>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='underline' title='CTRL+U' tabindex='-1'><i class='fas fa-underline'></i></a>" +
              "</div>" +
            "</li>";
        },

        "align": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
              "<div class='btn-group'>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='alignLeftStyle' tabindex='-1'><i class='fas fa-align-left'></i></a>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='alignRightStyle'tabindex='-1'><i class='fas fa-align-right'></i></a>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='alignCenterStyle' tabindex='-1'><i class='fas fa-align-center'></i></a>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='alignJustifyStyle' tabindex='-1'><i class='fas fa-align-justify'></i></a>" +
              "</div>" +
            "</li>";
        },

        "lists": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
              "<div class='btn-group'>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='insertUnorderedList' title='" + locale.lists.unordered + "' tabindex='-1'><i class='fas fa-list-ul'></i></a>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='insertOrderedList' title='" + locale.lists.ordered + "' tabindex='-1'><i class='fas fa-list-ol'></i></a>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='Outdent' title='" + locale.lists.outdent + "' tabindex='-1'><i class='fas fa-outdent'></i></a>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='Indent' title='" + locale.lists.indent + "' tabindex='-1'><i class='fas fa-indent'></i></a>" +
              "</div>" +
            "</li>";
        },

        // "table": function(locale, options) {
        //     var size = (options && options.size) ? ' btn-'+options.size : '';
        //     return "<li>" +
        //       "<div class='btn-group'>" +
        //         "<a class='btn btn-secondary " + size + "' data-wysihtml-action='table' tabindex='-1'><i class='fas fa-table'></i></a>" +
        //       "</div>" +
        //     "</li>";
        // },

        "hr": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
              "<div class='btn-group'>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-command='insertHorizontalRule' tabindex='-1'>⎼</a>" +
              "</div>" +
            "</li>";
        },

        "link": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
              "<div class='bootstrap-wysihtml-insert-link-modal modal fade' tabindex='-1' role='dialog' aria-hidden='true'>" +
                "<div class='modal-dialog'>" +
                  "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                      "<h6 class='modal-title'>" + locale.link.insert + "</h6>" +
                      "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
                    "</div>" +
                    "<div class='modal-body'>" +
                      "<input value='http://' class='bootstrap-wysihtml-insert-link-url form-control input-lg'><br>" +
                      "<div class='form-check'>"+
                        "<input class='form-check-input bootstrap-wysihtml-insert-link-btn' type='checkbox' value='1' name='link_as_button' id='link_as_button'>"+
                        "<label class='form-check-label' for='link_as_button'>" + locale.link.show_as_button + "</label>"+
                      "</div>"+
                    "</div>" +
                    "<div class='modal-footer'>" +
                      "<a href='#' class='btn btn-secondary' data-dismiss='modal'>" + locale.link.cancel + "</a>" +
                      "<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.link.insert + "</a>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              "</div>" +
              "<a class='btn btn-secondary " + size + "' data-wysihtml-command='createLink' title='" + locale.link.insert + "' tabindex='-1'><i class='fas fa-link'></i></a>" +
            "</li>";
        },

        "image": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
              "<div class='bootstrap-wysihtml-insert-image-modal modal fade' tabindex='-1' role='dialog' aria-hidden='true'>" +
                "<div class='modal-dialog'>" +
                  "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                      "<h6 class='modal-title'>" + locale.image.insert + "</h6>" +
                      "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
                    "</div>" +
                    "<div class='modal-body'>" +
                      "<input value='http://' class='bootstrap-wysihtml-insert-image-url form-control input-lg'>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                      "<a href='#' class='btn btn-secondary ' data-dismiss='modal'>" + locale.image.cancel + "</a>" +
                      "<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.image.insert + "</a>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              "</div>" +
              "<a class='btn btn-secondary " + size + "' data-wysihtml-command='insertImage' title='" + locale.image.insert + "' tabindex='-1'><i class='fas fa-image'></i></a>" +
            "</li>";
        },

        "html": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li>" +
              "<div class='btn-group'>" +
                "<a class='btn btn-secondary " + size + "' data-wysihtml-action='change_view' title='" + locale.html.edit + "' tabindex='-1'><i class='fas fa-pencil-alt'></i></a>" +
              "</div>" +
            "</li>";
        },

        "color": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            var menu = '';
            var i, c;

            for(i = 0; i < bootstrap_colors.length; i++) {
              c = bootstrap_colors[i];
              menu += "<div class='wysihtml-colors bg-"+c+"'></div>" +
              "<a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='text-"+c+"' role='menuitem'>" +
              locale.colours[c] + "</a>"
            }
            menu += "<hr class='dropdown-divider'>";
            for(i = 0; i < bootsy_colors.length; i++) {
              c = bootsy_colors[i];
              menu += "<div class='wysihtml-colors wysiwyg-bgcolor-"+c+"'></div>" +
              "<a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='wysiwyg-color-"+c+"' role='menuitem'>" +
               locale.colours[c] + "</a>"
            }

            return "<li class='dropdown'>" +
            "<a class='btn btn-secondary dropdown-toggle" + size + "' data-toggle='dropdown' href='#' title='" + locale.colours.title + "' id='dropdownFontColorLink'  aria-haspopup='true' aria-expanded='false'>" +
              "<i class='fas fa-paint-brush mr-2'></i><span class='current-color wysihtml-colors wysiwyg-bgcolor-default'>" + locale.colours.default + "</span>" +
            "</a>" +
            "<div class='dropdown-menu' aria-labelledby='dropdownFontColorLink'>" +
            menu +
            "</div>" +
            "</li>";
        },

        "bgcolor": function(locale, options) {
          var size = (options && options.size) ? ' btn-'+options.size : '';
          var menu = '';
          var i, c;

          for(i = 0; i < bootstrap_colors.length; i++) {
            c = bootstrap_colors[i];
            menu += "<div class='wysihtml-colors bg-"+c+"'></div>"+
            "<a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='bgColor' data-wysihtml-command-value='bg-"+c+"' role='menuitem'>" + locale.colours[c] + "</a>"
          }
          menu += "<hr class='dropdown-divider'>";
          for(i = 0; i < bootsy_colors.length; i++) {
            c = bootsy_colors[i];
            menu += "<div class='wysihtml-colors wysiwyg-bgcolor-"+c+"'></div>"+
            "<a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='bgColor' data-wysihtml-command-value='wysiwyg-bgcolor-"+c+"' role='menuitem'>" + locale.colours[c] + "</a>"
          }

          return "<li class='dropdown'>" +
          "<a class='btn btn-secondary dropdown-toggle" + size + "' data-toggle='dropdown' href='#' title='" + locale.colours.title + "' id='dropdownFontBgColorLink'  aria-haspopup='true' aria-expanded='false'>" +
            "<i class='fas fa-fill-drip mr-2'></i><span class='current-bgcolor wysihtml-colors wysiwyg-bgcolor-default'>" + locale.colours.default + "</span>" +
          "</a>" +
          "<div class='dropdown-menu' aria-labelledby='dropdownFontBgColorLink'>" +
          menu +
          "</div>" +
          "</li>";
      }

    };

    var templates = function(key, locale, options) {
        return tpl[key](locale, options);
    };


    var Wysihtml= function(el, options) {
        this.el = el;
        var toolbarOpts = options || defaultOptions;
        for(var t in toolbarOpts.customTemplates) {
          tpl[t] = toolbarOpts.customTemplates[t];
        }
        this.toolbar = this.createToolbar(el, toolbarOpts);
        this.editor =  this.createEditor(options);

        window.editor = this.editor;

        $('iframe.wysihtml-sandbox').each(function(i, el){
            $(el.contentWindow).off('focus.wysihtml').on({
                'focus.wysihtml' : function(){
                    $('li.dropdown').removeClass('open');
                }
            });
        });
    };

    Wysihtml.prototype = {

        constructor: Wysihtml,

        createEditor: function(options) {
            options = options || {};

            // Add the toolbar to a clone of the options object so multiple instances
            // of the WYISYWG don't break because "toolbar" is already defined
            options = $.extend(true, {}, options);
            options.toolbar = this.toolbar[0];

            var editor = new wysi.Editor(this.el[0], options);

            if(options && options.events) {
                for(var eventName in options.events) {
                    editor.on(eventName, options.events[eventName]);
                }
            }
            return editor;
        },

        createToolbar: function(el, options) {
            var self = this;
            var toolbar = $("<ul/>", {
                'class' : "wysihtml-toolbar",
                'style': "display:none"
            });
            var culture = options.locale || defaultOptions.locale || "en";
            for(var key in defaultOptions) {
                var value = false;

                if(options[key] !== undefined) {
                    if(options[key] === true) {
                        value = true;
                    }
                } else {
                    value = defaultOptions[key];
                }

                if(value === true) {
                    toolbar.append(templates(key, locale[culture], options));

                    if(key === "html") {
                        this.initHtml(toolbar);
                    }

                    if(key === "link") {
                        this.initInsertLink(toolbar);
                    }

                    if(key === "image") {
                        this.initInsertImage(toolbar);
                    }

                    if(key == "customCommand") {
                        this.initCustomCommand(toolbar, options.customCommandCallback);
                    }
                }
            }

            if(options.toolbar) {
                for(key in options.toolbar) {
                    toolbar.append(options.toolbar[key]);
                }
            }

            toolbar.find("a[data-wysihtml-command='formatBlock']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-font').text(el.html());
            });

            toolbar.find("a[data-wysihtml-command='foreColor']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-color').text(el.html());
            });

            toolbar.find("a[data-wysihtml-command='bgColor']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-bgcolor').text(el.html());
            });

            this.el.before(toolbar);

            return toolbar;
        },

        initHtml: function(toolbar) {
            var changeViewSelector = "a[data-wysihtml-action='change_view']";
            toolbar.find(changeViewSelector).click(function(e) {
                toolbar.find('a.btn').not(changeViewSelector).toggleClass('disabled');
            });
        },

        initInsertImage: function(toolbar) {
            var self = this;
            var insertImageModal = toolbar.find('.bootstrap-wysihtml-insert-image-modal');
            var urlInput = insertImageModal.find('.bootstrap-wysihtml-insert-image-url');
            var insertButton = insertImageModal.find('a.btn-primary');
            var initialValue = urlInput.val();
            var caretBookmark;

            var insertImage = function() {
                var url = urlInput.val();
                urlInput.val(initialValue);
                self.editor.currentView.element.focus();
                if (caretBookmark) {
                  self.editor.composer.selection.setBookmark(caretBookmark);
                  caretBookmark = null;
                }
                self.editor.composer.commands.exec("insertImage", url);
            };

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertImage();
                    insertImageModal.modal('hide');
                }
            });

            insertButton.click(insertImage);

            insertImageModal.on('shown', function() {
                urlInput.focus();
            });

            insertImageModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml-command=insertImage]').click(function() {
                var activeButton = $(this).hasClass("wysihtml-command-active");

                if (!activeButton) {
                    self.editor.currentView.element.focus();
                    caretBookmark = self.editor.composer.selection.getBookmark();
                    insertImageModal.appendTo('body').modal('show');
                    insertImageModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
                        e.stopPropagation();
                    });
                    return false;
                }
                else {
                    return true;
                }
            });
        },

        initCustomCommand: function(toolbar, callback) {
            var self = this;

            toolbar.find('a[data-wysihtml-command=customCommand]').click(function() {
                var activeButton = $(this).hasClass("wysihtml-command-active");

                if (!activeButton) {
                    callback(self.editor);
                    return false;
                }
                else {
                    return true;
                }
            });
        },

        initInsertLink: function(toolbar) {
            var self = this;
            var insertLinkModal = toolbar.find('.bootstrap-wysihtml-insert-link-modal');
            var urlInput = insertLinkModal.find('.bootstrap-wysihtml-insert-link-url');
            var asButton = insertLinkModal.find('.bootstrap-wysihtml-insert-link-btn').prop('checked')
            var insertButton = insertLinkModal.find('a.btn-primary');
            var initialValue = urlInput.val();
            var caretBookmark;

            var insertLink = function() {
                var url = urlInput.val();
                urlInput.val(initialValue);
                self.editor.currentView.element.focus();
                if (caretBookmark) {
                  self.editor.composer.selection.setBookmark(caretBookmark);
                  caretBookmark = null;
                }
                console.log
                self.editor.composer.commands.exec("createLink", {
                    href: url,
                    target: "_blank",
                    rel: "nofollow",
                    class: asButton ? "btn btn-primary mt-1 ml-1" : ""
                });
            };
            var pressedEnter = false;

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertLink();
                    insertLinkModal.modal('hide');
                }
            });

            insertButton.click(insertLink);

            insertLinkModal.on('shown', function() {
                urlInput.focus();
            });

            insertLinkModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml-command=createLink]').click(function() {
                var activeButton = $(this).hasClass("wysihtml-command-active");

                if (!activeButton) {
                    self.editor.currentView.element.focus();
                    caretBookmark = self.editor.composer.selection.getBookmark();
                    insertLinkModal.appendTo('body').modal('show');
                    insertLinkModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
                        e.stopPropagation();
                    });
                    return false;
                }
                else {
                    return true;
                }
            });
        }
    };

    // these define our public api
    var methods = {
        resetDefaults: function() {
            $.fn.wysihtml.defaultOptions = $.extend(true, {}, $.fn.wysihtml.defaultOptionsCache);
        },
        bypassDefaults: function(options) {
            return this.each(function () {
                var $this = $(this);
                $this.data('wysihtml', new Wysihtml($this, options));
            });
        },
        shallowExtend: function (options) {
            var settings = $.extend({}, $.fn.wysihtml.defaultOptions, options || {});
            var that = this;
            return methods.bypassDefaults.apply(that, [settings]);
        },
        deepExtend: function(options) {
            var settings = $.extend(true, {}, $.fn.wysihtml.defaultOptions, options || {});
            var that = this;
            return methods.bypassDefaults.apply(that, [settings]);
        },
        init: function(options) {
            var that = this;
            return methods.shallowExtend.apply(that, [options]);
        }
    };

    $.fn.wysihtml = function ( method ) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.wysihtml' );
        }
    };

    $.fn.wysihtml.Constructor = Wysihtml;

    var wysihtmlParserRulesDefaults = {
        "blockLevelEl": {
            "keep_styles": {
                "textAlign": /^((left)|(right)|(center)|(justify))$/i,
                "float": 1
            },
            "add_style": {
                "align": "align_text"
            },
            "check_attributes": {
                "id": "any"
            }
        },

        "makeDiv": {
            "rename_tag": "div",
            "one_of_type": {
                "alignment_object": 1
            },
            "remove_action": "unwrap",
            "keep_styles": {
                "textAlign": 1,
                "float": 1
            },
            "add_style": {
                "align": "align_text"
            },
            "check_attributes": {
                "id": "any"
            }
        }
    };

    var wysihtmlParserRules = {
        /**
         * CSS Class white-list
         * Following CSS classes won't be removed when parsed by the wysihtml HTML parser
         * If all classes should pass "any" as classes value. Ex: "classes": "any"
         */
        "classes": "any",

        /* blacklist of classes is only available if classes is set to any */
        "classes_blacklist": {
            "Apple-interchange-newline": 1,
            "MsoNormal": 1,
            "MsoPlainText": 1
        },

        "type_definitions": {

            "alignment_object": {
                "classes": {
                    "wysiwyg-text-align-center": 1,
                    "wysiwyg-text-align-justify": 1,
                    "wysiwyg-text-align-left": 1,
                    "wysiwyg-text-align-right": 1,
                    "wysiwyg-float-left": 1,
                    "wysiwyg-float-right": 1
                },
                "styles": {
                    "float": ["left", "right"],
                    "text-align": ["left", "right", "center"]
                }
            },

            "valid_image_src": {
                "attrs": {
                    "src": /^[^data\:]/i
                }
            },

            // "text_color_object": {
            //   "styles": {
            //     "color": true,
            //     "background-color": true
            //   }
            // },
            // "text_fontsize_object": {
            //   "styles": {
            //     "font-size": true
            //   }
            // },

            "text_color_object": {
              "classes": {
                "text-primary": 1,
                "text-secondary": 1,
                "text-success": 1,
                "text-danger": 1,
                "text-warning": 1,
                "text-info": 1,
                "text-light": 1,
                "text-dark": 1,
                "wysiwyg-color-default": 1,
                "wysiwyg-color-black": 1,
                "wysiwyg-color-silver": 1,
                "wysiwyg-color-gray": 1,
                "wysiwyg-color-white": 1,
                "wysiwyg-color-maroon": 1,
                "wysiwyg-color-red": 1,
                "wysiwyg-color-purple": 1,
                "wysiwyg-color-fuchsia": 1,
                "wysiwyg-color-green": 1,
                "wysiwyg-color-lime": 1,
                "wysiwyg-color-olive": 1,
                "wysiwyg-color-orange": 1,
                "wysiwyg-color-yellow": 1,
                "wysiwyg-color-navy": 1,
                "wysiwyg-color-blue": 1,
                "wysiwyg-color-teal": 1,
                "wysiwyg-color-aqua": 1
              }
            },

            "text_bgcolor_object": {
              "classes": {
                  "bg-primary": 1,
                  "bg-secondary": 1,
                  "bg-success": 1,
                  "bg-danger": 1,
                  "bg-warning": 1,
                  "bg-info": 1,
                  "bg-light": 1,
                  "bg-dark": 1,
                  "wysiwyg-bgcolor-default": 1,
                  "wysiwyg-bgcolor-black": 1,
                  "wysiwyg-bgcolor-silver": 1,
                  "wysiwyg-bgcolor-gray": 1,
                  "wysiwyg-bgcolor-white": 1,
                  "wysiwyg-bgcolor-maroon": 1,
                  "wysiwyg-bgcolor-red": 1,
                  "wysiwyg-bgcolor-purple": 1,
                  "wysiwyg-bgcolor-fuchsia": 1,
                  "wysiwyg-bgcolor-green": 1,
                  "wysiwyg-bgcolor-lime": 1,
                  "wysiwyg-bgcolor-olive": 1,
                  "wysiwyg-bgcolor-orange": 1,
                  "wysiwyg-bgcolor-yellow": 1,
                  "wysiwyg-bgcolor-navy": 1,
                  "wysiwyg-bgcolor-blue": 1,
                  "wysiwyg-bgcolor-teal": 1,
                  "wysiwyg-bgcolor-aqua": 1
              }
            },

            "text_fontsize_object": {
              "classes": {
                "wysiwyg-font-size-smaller": 1,
                "wysiwyg-font-size-small": 1,
                "wysiwyg-font-size-medium": 1,
                "wysiwyg-font-size-normal": 1,
                "wysiwyg-font-size-large": 1,
                "wysiwyg-font-size-larger": 1,
                "wysiwyg-font-size-x-large": 1,
                "wysiwyg-font-size-xx-large": 1,
                "wysiwyg-font-size-xxx-large": 1
              }
            },

            // "text_formatting_object": {
            //     "classes": {
            //         "bg-primary": 1,
            //         "bg-secondary": 1,
            //         "bg-success": 1,
            //         "bg-danger": 1,
            //         "bg-warning": 1,
            //         "bg-info": 1,
            //         "bg-light": 1,
            //         "bg-dark": 1,
            //         "wysiwyg-bgcolor-default": 1,
            //         "wysiwyg-bgcolor-black": 1,
            //         "wysiwyg-bgcolor-silver": 1,
            //         "wysiwyg-bgcolor-gray": 1,
            //         "wysiwyg-bgcolor-white": 1,
            //         "wysiwyg-bgcolor-maroon": 1,
            //         "wysiwyg-bgcolor-red": 1,
            //         "wysiwyg-bgcolor-purple": 1,
            //         "wysiwyg-bgcolor-fuchsia": 1,
            //         "wysiwyg-bgcolor-green": 1,
            //         "wysiwyg-bgcolor-lime": 1,
            //         "wysiwyg-bgcolor-olive": 1,
            //         "wysiwyg-bgcolor-orange": 1,
            //         "wysiwyg-bgcolor-yellow": 1,
            //         "wysiwyg-bgcolor-navy": 1,
            //         "wysiwyg-bgcolor-blue": 1,
            //         "wysiwyg-bgcolor-teal": 1,
            //         "wysiwyg-bgcolor-aqua": 1,
            //         "wysiwyg-font-size-large": 1,
            //         "wysiwyg-font-size-larger": 1,
            //         "wysiwyg-font-size-medium": 1,
            //         "wysiwyg-font-size-small": 1,
            //         "wysiwyg-font-size-smaller": 1,
            //         "wysiwyg-font-size-x-large": 1,
            //         "wysiwyg-font-size-x-small": 1,
            //         "wysiwyg-font-size-xx-large": 1,
            //         "wysiwyg-font-size-xx-small": 1
            //     }
            // }
        },
        // ['default', 'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'orange', 'yellow', 'navy', 'blue', 'teal', 'aqua'];
        //"comments": 1, // if set allows comments to pass

        /**
         * Tag list
         *
         * The following options are available:
         *
         *    - add_class:        converts and deletes the given HTML4 attribute (align, clear, ...) via the given method to a css class
         *                        The following methods are implemented in wysihtml.dom.parse:
         *                          - align_text:  converts align attribute values (right/left/center/justify) to their corresponding css class "wysiwyg-text-align-*")
         *                            <p align="center">foo</p> ... becomes ... <p> class="wysiwyg-text-align-center">foo</p>
         *                          - clear_br:    converts clear attribute values left/right/all/both to their corresponding css class "wysiwyg-clear-*"
         *                            <br clear="all"> ... becomes ... <br class="wysiwyg-clear-both">
         *                          - align_img:    converts align attribute values (right/left) on <img> to their corresponding css class "wysiwyg-float-*"
         *
         *    - remove:             removes the element and its content
         *
         *    - unwrap              removes element but leaves content
         *
         *    - rename_tag:         renames the element to the given tag
         *
         *    - set_class:          adds the given class to the element (note: make sure that the class is in the "classes" white list above)
         *
         *    - set_attributes:     sets/overrides the given attributes
         *
         *    - check_attributes:   checks the given HTML attribute via the given method
         *                            - url:            allows only valid urls (starting with http:// or https://)
         *                            - src:            allows something like "/foobar.jpg", "http://google.com", ...
         *                            - href:           allows something like "mailto:bert@foo.com", "http://google.com", "/foobar.jpg"
         *                            - alt:            strips unwanted characters. if the attribute is not set, then it gets set (to ensure valid and compatible HTML)
         *                            - numbers:        ensures that the attribute only contains numeric (integer) characters (no float values or units)
         *                            - dimension:      for with/height attributes where floating point numbrs and percentages are allowed
         *                            - any:            allows anything to pass
         */
        "tags": {
            "tr": {
                "add_style": {
                    "align": "align_text"
                },
                "check_attributes": {
                    "id": "any"
                }
            },
            "strike": {
                "unwrap": 1
            },
            "form": {
                "unwrap": 1
            },
            "rt": {
                "rename_tag": "span"
            },
            "code": {},
            "acronym": {
                "rename_tag": "span"
            },
            "br": {
                "add_class": {
                    "clear": "clear_br"
                }
            },
            "details": {
                "unwrap": 1
            },
            "h4": wysihtmlParserRulesDefaults.blockLevelEl,
            "em": {},
            "title": {
                "remove": 1
            },
            "multicol": {
                "unwrap": 1
            },
            "figure": {
                "unwrap": 1
            },
            "xmp": {
                "unwrap": 1
            },
            "small": {
                "rename_tag": "span",
                "set_class": "wysiwyg-font-size-smaller"
            },
            "area": {
                "remove": 1
            },
            "time": {
                "unwrap": 1
            },
            "dir": {
                "rename_tag": "ul"
            },
            "bdi": {
                "unwrap": 1
            },
            "command": {
                "unwrap": 1
            },
            "ul": {
                "check_attributes": {
                    "id": "any"
                }
            },
            "progress": {
                "rename_tag": "span"
            },
            "dfn": {
                "unwrap": 1
            },
            "iframe": {
                "check_attributes": {
                    "src": "any",
                    "width": "any",
                    "height": "any",
                    "frameborder": "any",
                    "style": "any",
                    "id": "any"
                }
            },
            "figcaption": {
                "unwrap": 1
            },
            "a": {
                "check_attributes": {
                    "href": "href", // if you compiled master manually then change this from 'url' to 'href'
                    "rel": "any",
                    "target": "any",
                    "id": "any",
                    "class": "any"
                }
            },
            "img": {
                "one_of_type": {
                    "valid_image_src": 1
                },
                "check_attributes": {
                    "width": "dimension",
                    "alt": "alt",
                    "src": "src", // if you compiled master manually then change this from 'url' to 'src'
                    "height": "dimension",
                    "id": "any"
                },
                "add_class": {
                    "align": "align_img"
                }
            },
            "rb": {
                "unwrap": 1
            },
            "footer": wysihtmlParserRulesDefaults.makeDiv,
            "noframes": {
                "remove": 1
            },
            "abbr": {
                "unwrap": 1
            },
            "u": {},
            "bgsound": {
                "remove": 1
            },
            "sup": {},
            "address": {
                "unwrap": 1
            },
            "basefont": {
                "remove": 1
            },
            "nav": {
                "unwrap": 1
            },
            "h1": wysihtmlParserRulesDefaults.blockLevelEl,
            "head": {
                "unwrap": 1
            },
            "tbody": wysihtmlParserRulesDefaults.blockLevelEl,
            "dd": {
                "unwrap": 1
            },
            "s": {
                "unwrap": 1
            },
            "li": {},
            "td": {
                "check_attributes": {
                    "rowspan": "numbers",
                    "colspan": "numbers",
                    "valign": "any",
                    "align": "any",
                    "id": "any",
                    "class": "any"
                },
                "keep_styles": {
                    "backgroundColor": 1,
                    "width": 1,
                    "height": 1
                },
                "add_style": {
                    "align": "align_text"
                }
            },
            "object": {
                "remove": 1
            },

            "div": {
                "one_of_type": {
                    "alignment_object": 1
                },
                "remove_action": "unwrap",
                "keep_styles": {
                    "textAlign": 1,
                    "float": 1
                },
                "add_style": {
                    "align": "align_text"
                },
                "check_attributes": {
                    "id": "any",
                    "contenteditable": "any"
                }
            },

            "option": {
                "remove":1
            },
            "select": {
                "remove":1
            },
            "i": {},
            "track": {
                "remove": 1
            },
            "wbr": {
                "remove": 1
            },
            "fieldset": {
                "unwrap": 1
            },
            "big": {
                "rename_tag": "span",
                "set_class": "wysiwyg-font-size-larger"
            },
            "button": {
                "unwrap": 1
            },
            "noscript": {
                "remove": 1
            },
            "svg": {
                "remove": 1
            },
            "input": {
                "remove": 1
            },
            "table": {
                "keep_styles": {
                    "width": 1,
                    "textAlign": 1,
                    "float": 1
                },
                "check_attributes": {
                    "id": "any"
                }
            },
            "keygen": {
                "remove": 1
            },
            "h5": wysihtmlParserRulesDefaults.blockLevelEl,
            "meta": {
                "remove": 1
            },
            "map": {
                "remove": 1
            },
            "isindex": {
                "remove": 1
            },
            "mark": {
                "unwrap": 1
            },
            "caption": wysihtmlParserRulesDefaults.blockLevelEl,
            "tfoot": wysihtmlParserRulesDefaults.blockLevelEl,
            "base": {
                "remove": 1
            },
            "video": {
                "remove": 1
            },
            "strong": {},
            "canvas": {
                "remove": 1
            },
            "output": {
                "unwrap": 1
            },
            "marquee": {
                "unwrap": 1
            },
            "b": {},
            "q": {
                "check_attributes": {
                    "cite": "url",
                    "id": "any"
                }
            },
            "applet": {
                "remove": 1
            },
            "span": {
                // "unwrap": 1,
                "one_of_type": {
                    // "text_formatting_object": 1,
                    "text_color_object": 1,
                    "text_bgcolor_object": 1,
                    "text_fontsize_object": 1
                },
                // "keep_styles": {
                //     "color": 1,
                //     "backgroundColor": 1,
                //     "fontSize": 1
                // },
                "remove_action": "unwrap"
                // "check_attributes": {
                //     "id": "any"
                // }
            },
            "rp": {
                "unwrap": 1
            },
            "spacer": {
                "remove": 1
            },
            "source": {
                "remove": 1
            },
            "aside": wysihtmlParserRulesDefaults.makeDiv,
            "frame": {
                "remove": 1
            },
            "section": wysihtmlParserRulesDefaults.makeDiv,
            "body": {
                "unwrap": 1
            },
            "ol": {},
            "nobr": {
                "unwrap": 1
            },
            "html": {
                "unwrap": 1
            },
            "summary": {
                "unwrap": 1
            },
            "var": {
                "unwrap": 1
            },
            "del": {
                "unwrap": 1
            },
            "blockquote": {
                "keep_styles": {
                    "textAlign": 1,
                    "float": 1
                },
                "add_style": {
                    "align": "align_text"
                },
                "check_attributes": {
                    "cite": "url",
                    "id": "any"
                }
            },
            "style": {
                // "check_attributes": {
                //     "type": "any",
                //     "src": "any",
                //     "charset": "any"
                // }
                "remove": 1
            },
            "device": {
                "remove": 1
            },
            "meter": {
                "unwrap": 1
            },
            "h3": wysihtmlParserRulesDefaults.blockLevelEl,
            "textarea": {
                "unwrap": 1
            },
            "embed": {
                "remove": 1
            },
            "hgroup": {
                "unwrap": 1
            },
            "font": {
                "rename_tag": "span",
                "add_class": {
                    "size": "size_font"
                }
            },
            "tt": {
                "unwrap": 1
            },
            "noembed": {
                "remove": 1
            },
            "thead": {
                "add_style": {
                    "align": "align_text"
                },
                "check_attributes": {
                    "id": "any"
                }
            },
            "blink": {
                "unwrap": 1
            },
            "plaintext": {
                "unwrap": 1
            },
            "xml": {
                "remove": 1
            },
            "h6": wysihtmlParserRulesDefaults.blockLevelEl,
            "param": {
                "remove": 1
            },
            "th": {
                "check_attributes": {
                    "rowspan": "numbers",
                    "colspan": "numbers",
                    "valign": "any",
                    "align": "any",
                    "id": "any"
                },
                "keep_styles": {
                    "backgroundColor": 1,
                    "width": 1,
                    "height": 1
                },
                "add_style": {
                    "align": "align_text"
                }
            },
            "legend": {
                "unwrap": 1
            },
            "hr": {},
            "label": {
                "unwrap": 1
            },
            "dl": {
                "unwrap": 1
            },
            "kbd": {
                "unwrap": 1
            },
            "listing": {
                "unwrap": 1
            },
            "dt": {
                "unwrap": 1
            },
            "nextid": {
                "remove": 1
            },
            "pre": {},
            "center": wysihtmlParserRulesDefaults.makeDiv,
            "audio": {
                "remove": 1
            },
            "datalist": {
                "unwrap": 1
            },
            "samp": {
                "unwrap": 1
            },
            "col": {
                "remove": 1
            },
            "article": wysihtmlParserRulesDefaults.makeDiv,
            "cite": {},
            "link": {
                "remove": 1
            },
            "script": {
                // "check_attributes": {
                //     "type": "any",
                //     "src": "any",
                //     "charset": "any"
                // }
                "remove": 1
            },
            "bdo": {
                "unwrap": 1
            },
            "menu": {
                "rename_tag": "ul"
            },
            "colgroup": {
                "remove": 1
            },
            "ruby": {
                "unwrap": 1
            },
            "h2": wysihtmlParserRulesDefaults.blockLevelEl,
            "ins": {
                "unwrap": 1
            },
            //"p": wysihtmlParserRulesDefaults.blockLevelEl,
            "p": {
              "unwrap": 1
            },
            "sub": {},
            "comment": {
                "remove": 1
            },
            "frameset": {
                "remove": 1
            },
            "optgroup": {
                "unwrap": 1
            },
            "header": wysihtmlParserRulesDefaults.makeDiv
        }
    };


    var defaultOptions = $.fn.wysihtml.defaultOptions = {
        "font-styles": true,
        "font-size": true,
        "color": false,
        "bgcolor": false,
        "emphasis": true,
        "align": true,
        "lists": true,
        //"table": true,
        "hr": true,
        "html": false,
        "link": true,
        "image": true,
        customCommand: false,
        events: {},
        parserRules: wysihtmlParserRules,
        //stylesheets: ["./lib/css/wysiwyg-color.css"], // (path_to_project/lib/css/wysiwyg-color.css)
        locale: "en"
    };

    if (typeof $.fn.wysihtml.defaultOptionsCache === 'undefined') {
        $.fn.wysihtml.defaultOptionsCache = $.extend(true, {}, $.fn.wysihtml.defaultOptions);
    }

    var locale = $.fn.wysihtml.locale = {
        en: {
            font_styles: {
                title: "Font style",
                normal: "Normal text",
                h1: "Heading 1",
                h2: "Heading 2",
                h3: "Heading 3",
                h4: "Heading 4",
                h5: "Heading 5",
                h6: "Heading 6"
            },
            emphasis: {
                bold: "Bold",
                italic: "Italic",
                underline: "Underline"
            },
            lists: {
                unordered: "Unordered list",
                ordered: "Ordered list",
                outdent: "Outdent",
                indent: "Indent"
            },
            link: {
                insert: "Insert link",
                cancel: "Cancel"
            },
            image: {
                insert: "Insert image",
                cancel: "Cancel"
            },
            html: {
                edit: "Edit HTML"
            },
            colours: {
                title: "Text color",
                primary: "Primary",
                secondary: "Secondary",
                success: "Success",
                danger: "Danger",
                warning: "Warning",
                info: "Info",
                black: "Black",
                silver: "Silver",
                gray: "Grey",
                maroon: "Maroon",
                red: "Red",
                purple: "Purple",
                green: "Green",
                olive: "Olive",
                navy: "Navy",
                blue: "Blue",
                orange: "Orange"
            }
        }
    };

    var commonRules = wysihtml.lang.object(wysihtmlParserRules).clone(true);
    commonRules.comments    = false;
    commonRules.selectors   = { "a u": "unwrap"};
    commonRules.tags.style  = { "remove": 1 };
    commonRules.tags.script = { "remove": 1 };
    commonRules.tags.head = { "remove": 1 };

    // Paste cleanup for unindentified source
    var universalRules = wysihtml.lang.object(commonRules).clone(true);
    universalRules.tags.div.one_of_type.alignment_object = 1;
    universalRules.tags.div.remove_action = "unwrap";
    universalRules.tags.div.check_attributes.style = false;
    universalRules.tags.div.keep_styles = {
        "textAlign": /^((left)|(right)|(center)|(justify))$/i,
        "float": 1
    };
    universalRules.tags.span.keep_styles = false;

    // Paste cleanup for MS Office
    // TODO: should be extended to stricter ruleset, as current set will probably not cover all Office bizarreness
    var msOfficeRules = wysihtml.lang.object(universalRules).clone(true);
    msOfficeRules.classes = {};

    window.wysihtmlParserPasteRulesets = [
        {
            condition: /<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument|class="OutlineElement|id="?docs\-internal\-guid\-/i,
            set: msOfficeRules
        },{
            condition: /<meta name="copied-from" content="wysihtml">/i,
            set: commonRules
        },{
            set: universalRules
        }
    ];



}(window.jQuery, window.wysihtml);
