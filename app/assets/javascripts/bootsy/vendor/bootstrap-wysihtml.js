!function($, wysi) {
    "use strict";

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
            return "<li class='dropdown'>" +
              "<a class='btn btn-secondary dropdown-toggle" + size + "' data-toggle='dropdown' href='#' id='dropdownFontSizeStyleLink'  aria-haspopup='true' aria-expanded='false'>" +
              "<i class='fas fa-text-height'></i>" +
              "</a>" +
              "<div class='dropdown-menu' aria-labelledby='dropdownFontSizeStyleLink'>" +
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='75%' tabindex='-1' role='menuitem' style='font-size:50%'> 75% </a>" +                            
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='90%' tabindex='-1' role='menuitem' style='font-size:80%'> 90% </a>" +              
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='100%' tabindex='-1' role='menuitem' style='font-size:100%'> 100% </a>" +                              
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='110%' tabindex='-1' role='menuitem' style='font-size:110%'> 110% </a>" +
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='120%' tabindex='-1' role='menuitem' style='font-size:120%'> 120% </a>" +
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='150%' tabindex='-1' role='menuitem' style='font-size:150%'> 150% </a>" +
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='200%' tabindex='-1' role='menuitem' style='font-size:200%'> 300% </a>" +
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='300%' tabindex='-1' role='menuitem' style='font-size:300%'> 300% </a>" +
                "<a class='dropdown-item' data-wysihtml-command='fontSizeStyle' data-wysihtml-command-value='400%' tabindex='-1' role='menuitem' style='font-size:400%'> 400% </a>" +
              "</div>" +
            "</li>";
        },        

        // "font-size": function(locale, options) {
        //     var size = (options && options.size) ? ' btn-'+options.size : '';
        //     return "<li>" +
        //       "<div class='btn-group'>" +
        //         "<a class='btn btn-secondary " + size + "' data-wysihtml-command='fontSizeStyle' tabindex='-1'>" +
        //             "<i class='fas fa-text-height'></i>" +
        //         "</a>" +
        //       "</div>" +
        //         "<div data-wysihtml-dialog='fontSizeStyle' style='display: none;' class='p-2'>" +
        //             "<input type='text' data-wysihtml-dialog-field='size' style='width: 60px;' value='' />" +
        //             "&nbsp;<a data-wysihtml-dialog-action='save'><i class='fas fa-check text-green'></i></a>"+
        //             "&nbsp;<a data-wysihtml-dialog-action='cancel'><i class='fas fa-times text-red'></i></a>&nbsp;" +
        //         "</div>" +                

        //     "</li>";
        // },              

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
                      "<input value='http://' class='bootstrap-wysihtml-insert-link-url form-control input-lg'>" +
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
            return "<li class='dropdown'>" +
              "<a class='btn btn-secondary dropdown-toggle" + size + "' data-toggle='dropdown' href='#' title='" + locale.colours.title + "' id='dropdownFontColorLink'  aria-haspopup='true' aria-expanded='false'>" +
                "<span class='current-color'>" + locale.colours.black + "</span>" +
              "</a>" +
              "<div class='dropdown-menu' aria-labelledby='dropdownFontColorLink'>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='black'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='black' role='menuitem'>" + locale.colours.black + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='silver'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='silver' role='menuitem'>" + locale.colours.silver + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='gray'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='gray' role='menuitem'>" + locale.colours.gray + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='maroon'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='maroon' role='menuitem'>" + locale.colours.maroon + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='red'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='red' role='menuitem'>" + locale.colours.red + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='purple'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='purple' role='menuitem'>" + locale.colours.purple + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='green'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='green' role='menuitem'>" + locale.colours.green + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='olive'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='olive' role='menuitem'>" + locale.colours.olive + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='navy'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='navy' role='menuitem'>" + locale.colours.navy + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='blue'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='blue' role='menuitem'>" + locale.colours.blue + "</a>" +
                "<div class='wysihtml-colors' data-wysihtml-command-value='orange'></div><a class='dropdown-item wysihtml-colors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='orange' role='menuitem'>" + locale.colours.orange + "</a>" +
              "</div>" +
            "</li>";
        },
        // "bgcolor": function(locale, options) {
        //     var size = (options && options.size) ? ' btn-'+options.size : '';
        //     return "<li class='dropdown'>" +
        //       "<a class='btn btn-secondary dropdown-toggle" + size + "' data-toggle='dropdown' href='#' title='" + locale.colours.title + "' id='dropdownFontBgColorLink'  aria-haspopup='true' aria-expanded='false'>" +
        //         "<span class='current-color'><i class='fas fa-paint-roller'></i></span>" +
        //       "</a>" +
        //       "<div class='dropdown-menu' aria-labelledby='dropdownBgFontColorLink'>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='black'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='black' role='menuitem'>" + locale.colours.black + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='silver'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='silver' role='menuitem'>" + locale.colours.silver + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='gray'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='gray' role='menuitem'>" + locale.colours.gray + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='maroon'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='maroon' role='menuitem'>" + locale.colours.maroon + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='red'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='red' role='menuitem'>" + locale.colours.red + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='purple'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='foreColor' data-wysihtml-command-value='purple' role='menuitem'>" + locale.colours.purple + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='green'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='green' role='menuitem'>" + locale.colours.green + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='olive'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='olive' role='menuitem'>" + locale.colours.olive + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='navy'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='navy' role='menuitem'>" + locale.colours.navy + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='blue'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='blue' role='menuitem'>" + locale.colours.blue + "</a>" +
        //         "<div class='wysihtml-bgcolors' data-wysihtml-command-value='orange'></div><a class='dropdown-item wysihtml-bgcolors-title' data-wysihtml-command='bgColorStyle' data-wysihtml-command-value='orange' role='menuitem'>" + locale.colours.orange + "</a>" +
        //       "</div>" +
        //     "</li>";
        // }        
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

            // toolbar.find("a[data-wysihtml-command='bgColor']").click(function(e) {
            //     var target = e.target || e.srcElement;
            //     var el = $(target);
            //     self.toolbar.find('.current-color').text(el.html());
            // });

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
                self.editor.composer.commands.exec("createLink", {
                    href: url,
                    target: "_blank",
                    rel: "nofollow"
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

    var defaultOptions = $.fn.wysihtml.defaultOptions = {
        "font-styles": true,
        "font-size": true,
        "color": false,
        //"bgcolor": true,
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
        parserRules: {
            "classes": {
                "wysiwyg-clear-both": 1,
                "wysiwyg-clear-left": 1,
                "wysiwyg-clear-right": 1,
                "wysiwyg-color-aqua": 1,
                "wysiwyg-color-black": 1,
                "wysiwyg-color-blue": 1,
                "wysiwyg-color-fuchsia": 1,
                "wysiwyg-color-gray": 1,
                "wysiwyg-color-green": 1,
                "wysiwyg-color-lime": 1,
                "wysiwyg-color-maroon": 1,
                "wysiwyg-color-navy": 1,
                "wysiwyg-color-olive": 1,
                "wysiwyg-color-purple": 1,
                "wysiwyg-color-red": 1,
                "wysiwyg-color-silver": 1,
                "wysiwyg-color-teal": 1,
                "wysiwyg-color-white": 1,
                "wysiwyg-color-yellow": 1,
                "wysiwyg-float-left": 1,
                "wysiwyg-float-right": 1,
                "wysiwyg-font-size-large": 1,
                "wysiwyg-font-size-larger": 1,
                "wysiwyg-font-size-medium": 1,
                "wysiwyg-font-size-small": 1,
                "wysiwyg-font-size-smaller": 1,
                "wysiwyg-font-size-x-large": 1,
                "wysiwyg-font-size-x-small": 1,
                "wysiwyg-font-size-xx-large": 1,
                "wysiwyg-font-size-xx-small": 1,
                "wysiwyg-text-align-center": 1,
                "wysiwyg-text-align-justify": 1,
                "wysiwyg-text-align-left": 1,
                "wysiwyg-text-align-right": 1
            },
            
            
            "type_definitions": {

                "visible_content_object": {
                    "methods": {
                        "has_visible_contet": 1
                    }
                },
                
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
                
                "text_color_object": {
                  "styles": {
                    "color": true,
                    "background-color": true
                  }
                },
                
                "text_fontsize_object": {
                  "styles": {
                    "font-size": true
                  }
                },
                
                "text_formatting_object": {
                    "classes": {
                        "wysiwyg-color-aqua": 1,
                        "wysiwyg-color-black": 1,
                        "wysiwyg-color-blue": 1,
                        "wysiwyg-color-fuchsia": 1,
                        "wysiwyg-color-gray": 1,
                        "wysiwyg-color-green": 1,
                        "wysiwyg-color-lime": 1,
                        "wysiwyg-color-maroon": 1,
                        "wysiwyg-color-navy": 1,
                        "wysiwyg-color-olive": 1,
                        "wysiwyg-color-purple": 1,
                        "wysiwyg-color-red": 1,
                        "wysiwyg-color-silver": 1,
                        "wysiwyg-color-teal": 1,
                        "wysiwyg-color-white": 1,
                        "wysiwyg-color-yellow": 1,
                        "wysiwyg-font-size-large": 1,
                        "wysiwyg-font-size-larger": 1,
                        "wysiwyg-font-size-medium": 1,
                        "wysiwyg-font-size-small": 1,
                        "wysiwyg-font-size-smaller": 1,
                        "wysiwyg-font-size-x-large": 1,
                        "wysiwyg-font-size-x-small": 1,
                        "wysiwyg-font-size-xx-large": 1,
                        "wysiwyg-font-size-xx-small": 1
                    }
                }
            },

            "comments": 1, // if set allows comments to pass
            
            /**
             * Tag list
             *
             * The following options are available:
             *
             *    - add_class:        converts and deletes the given HTML4 attribute (align, clear, ...) via the given method to a css class
             *                        The following methods are implemented in wysihtml.dom.parse:
             *                          - align_text:  converts align attribute values (right/left/center/justify) to their corresponding css class "wysiwyg-text-align-*")
             *                            <p align="center">foo</p> ... becomes ... <p class="wysiwyg-text-align-center">foo</p>
             *                          - clear_br:    converts clear attribute values left/right/all/both to their corresponding css class "wysiwyg-clear-*"
             *                            <br clear="all"> ... becomes ... <br class="wysiwyg-clear-both">
             *                          - align_img:    converts align attribute values (right/left) on <img> to their corresponding css class "wysiwyg-float-*"
             *
             *    - add_style:        converts and deletes the given HTML4 attribute (align) via the given method to a css style
             *                        The following methods are implemented in wysihtml.dom.parse:
             *                          - align_text:  converts align attribute values (right/left/center) to their corresponding css style)
             *                            <p align="center">foo</p> ... becomes ... <p style="text-align:center">foo</p>
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
                    "add_class": {
                        "align": "align_text"
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
                "h4": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
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
                "ul": {},
                "progress": {
                    "rename_tag": "span"
                },
                "dfn": {
                    "unwrap": 1
                },
                "iframe": {
                    "remove": 1
                },
                "figcaption": {
                    "unwrap": 1
                },
                "a": {
                    "check_attributes": {
                        "href": "href", // if you compiled master manually then change this from 'url' to 'href'
                        "target": "any"
                    },
                    "set_attributes": {
                        "rel": "nofollow"
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
                        "height": "dimension"
                    },
                    "add_class": {
                        "align": "align_img"
                    }
                },
                "rb": {
                    "unwrap": 1
                },
                "footer": {
                    "rename_tag": "div"
                },
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
                "h1": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
                "head": {
                    "unwrap": 1
                },
                "tbody": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
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
                        "align": "any"
                    },
                    "add_class": {
                        "align": "align_text"
                    }
                },
                "object": {
                    "remove": 1
                },
                
                "div": {
                    "one_of_type": {
                        "visible_content_object": 1
                    },
                    "remove_action": "unwrap",
                    "keep_styles": {
                        "textAlign": 1,
                        "float": 1
                    },
                    "add_class": {
                        "align": "align_text"
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
                "table": {},
                "keygen": {
                    "remove": 1
                },
                "h5": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
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
                "caption": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
                "tfoot": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
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
                        "cite": "url"
                    }
                },
                "applet": {
                    "remove": 1
                },
                "span": {
                    "one_of_type": {
                        "text_formatting_object": 1,
                        "text_color_object": 1,
                        "text_fontsize_object": 1
                    },
                    "keep_styles": {
                        "color": 1,
                        "backgroundColor": 1,
                        "fontSize": 1
                    },
                    "remove_action": "unwrap"
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
                "aside": {
                    "rename_tag": "div"
                },
                "frame": {
                    "remove": 1
                },
                "section": {
                    "rename_tag": "div"
                },
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
                    "check_attributes": {
                        "cite": "url"
                    }
                },
                "style": {
                    "remove": 1
                },
                "device": {
                    "remove": 1
                },
                "meter": {
                    "unwrap": 1
                },
                "h3": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
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
                    "add_class": {
                        "align": "align_text"
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
                "h6": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
                "param": {
                    "remove": 1
                },
                "th": {
                    "check_attributes": {
                        "rowspan": "numbers",
                        "colspan": "numbers"
                    },
                    "add_class": {
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
                "center": {
                    "rename_tag": "div",
                    "set_class": "wysiwyg-text-align-center"
                },
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
                "article": {
                    "rename_tag": "div"
                },
                "cite": {},
                "link": {
                    "remove": 1
                },
                "script": {
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
                "h2": {
                    "add_class": {
                        "align": "align_text"
                    }
                },
                "ins": {
                    "unwrap": 1
                },
                "p": {
                    "add_class": {
                        "align": "align_text"
                    }
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
                "header": {
                    "rename_tag": "div"
                }
            }
        },
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

}(window.jQuery, window.wysihtml);
