!function($, wysi) {
    "use strict";

    var tpl = {
        "font-styles": function(locale, options) {
            var size = (options && options.size) ? ' btn-'+options.size : '';
            return "<li class='dropdown'>" +
              "<a class='btn btn-secondary dropdown-toggle" + size + "' data-toggle='dropdown' href='#' title='" + locale.font_styles.title + "' id='dropdownFontStyleLink'  aria-haspopup='true' aria-expanded='false'>" +
              "<i class='fas fa-text-height'></i>&nbsp;<span class='current-font'>" + locale.font_styles.normal + "</span>" +
              "</a>" +
              "<div class='dropdown-menu' aria-labelledby='dropdownFontStyleLink'>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='div' tabindex='-1' role='menuitem'>" + locale.font_styles.normal + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h1' tabindex='-1' role='menuitem'>" + locale.font_styles.h1 + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h2' tabindex='-1' role='menuitem'>" + locale.font_styles.h2 + "</a>" +
                "<a class='dropdown-item' data-wysihtml-command='formatBlock' data-wysihtml-command-value='h3' tabindex='-1' role='menuitem'>" + locale.font_styles.h3 + "</a>" +
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

            toolbar.find("a[data-wysihtml-command='bgColor']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-color').text(el.html());
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
            classes: {
                // (path_to_project/lib/css/wysiwyg-color.css)
                "wysiwyg-color-silver" : 1,
                "wysiwyg-color-gray" : 1,
                "wysiwyg-color-white" : 1,
                "wysiwyg-color-maroon" : 1,
                "wysiwyg-color-red" : 1,
                "wysiwyg-color-purple" : 1,
                "wysiwyg-color-fuchsia" : 1,
                "wysiwyg-color-green" : 1,
                "wysiwyg-color-lime" : 1,
                "wysiwyg-color-olive" : 1,
                "wysiwyg-color-yellow" : 1,
                "wysiwyg-color-navy" : 1,
                "wysiwyg-color-blue" : 1,
                "wysiwyg-color-teal" : 1,
                "wysiwyg-color-aqua" : 1,
                "wysiwyg-color-orange" : 1
            },
            tags: {
                "b":  {},
                "i":  {},
                "br": {},
                "ol": {},
                "ul": {},
                "li": {},
                "h1": {},
                "h2": {},
                "h3": {},
                "blockquote": {},
                "u": 1,
                "img": {
                    "check_attributes": {
                        "width": "numbers",
                        "alt": "alt",
                        "src": "url",
                        "height": "numbers"
                    }
                },
                "a":  {
                    set_attributes: {
                        target: "_blank",
                        rel:    "nofollow"
                    },
                    check_attributes: {
                        href:   "url" // important to avoid XSS
                    }
                },
                "span": 1,
                "div": 1,
                "hr": 1,
                // to allow save and edit files with code tag hacks
                "code": 1,
                "pre": 1
            }
        },
        stylesheets: ["./lib/css/wysiwyg-color.css"], // (path_to_project/lib/css/wysiwyg-color.css)
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
                h3: "Heading 3"
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
