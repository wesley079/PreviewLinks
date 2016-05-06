/**
 *
 */
(function ($) {
    //global vars
    var createdIframe = 0;  //line 32
    //settings
    var settings = {
        width: '100%',
        height: '500px',
        appendTo: 'body',
        appendLiTo: 'body',
        frameborder: '1',
        scrolling: 'auto',
        appendAllLinkTitles: true,
        alwaysDisplay: true,
        onlyHoverList: false
    };

    //methods
    var methods = {
        /**
         * Initialize plugin
         * Place items that need working event handlers
         * Check settings for creating the content for user
         * @param $items
         */
        init: function ($items) {
            //create a close tag for the user to close the hovered iFrame (only when first time visit)
            if (createdIframe == 0) {
                $(settings.appendTo).append('<p id="closeCurrentIframe">X Close item X</p>');
                createdIframe++;
            }
            //save items to append in list
            if (settings.appendAllLinkTitles == true) {
                methods.saveAllItems($items);
            }
            //prevent showing when nothing is selected
            $('#closeCurrentIframe').hide();
        },
        /**
         * Get all found items + append them in a list
         *
         * @param $items
         */
        saveAllItems: function ($items) {
            $(settings.appendLiTo).append('<p class="showPreviewLinksTitle">List of all links on this webpage for a preview</p>');
            $($items).find('a').each(function () {
                var name = this.innerHTML;
                var link = $(this).attr('href');
                methods.appendLinksToContent(name, link);
            });
        },
        appendLinksToContent: function (name, link) {
            //directly show the <a> tags
            if (settings.alwaysDisplay == true) {
                $(settings.appendLiTo).append('<li class="showPreviewLinkLi" ><a class="showPreviewLinksList" href="' + link + '">' + name + '</a></li>').fadeIn();
            }
            else {
                $(settings.appendLiTo).append('<li class="showPreviewLinkLi" ><a class="showPreviewLinksList" href="' + link + '">' + name + '</a></li>');
            }
            //prevent item to directly load if always display is false
            if (settings.alwaysDisplay == false) {
                $('.showPreviewLinkLi').hide();
                $('.showPreviewLinksTitle').hide();
            }

        },
        appendItemsTo: function () {
            $('#closeCurrentIframe').fadeIn();

            //if settings doesnt always display fade in when appending
            if (settings.alwaysDisplay == false) {
                $('.showPreviewLinkLi').fadeIn();
                $('.showPreviewLinksList').fadeIn();
                $('.showPreviewLinksTitle').fadeIn();
            }


            var source = $(this).attr('href');
            $('.previewLinks').remove();

            //append the new iFrame to directed place
            $(settings.appendTo).append('' +
            '<iFrame ' +
            'id="iFramePreviewLinksPlugin" ' +
            'src="' + source + '' + '"' +
            'width="' + settings.width + '"' +
            'height="' + settings.height + '"' +
            'frameborder="' + settings.frameborder + '"' +
            'scrolling="' + settings.scrolling + '"' +
            'class="previewLinks">').fadeIn();
        },
        /**
         * Delete all items when clicked on the 'close item' text
         */
        deleteItemFrom: function () {
            //hide the text + iFrame
            $('#closeCurrentIframe').fadeOut();
            $(settings.appendTo).find('iFrame').remove();

            if (settings.alwaysDisplay == false) {
                //remove list with all links
                $('.showPreviewLinksList').parent().fadeOut();
                $('.showPreviewLinksTitle').fadeOut();
            }
        }
    };
    $.fn.previewLinks = function (options) {
        if (options) {
            settings = $.extend(settings, options);
        }
        if ((settings.onlyHoverList == true && settings.appendAllLinkTitles == false) || (settings.onlyHoverList == true && settings.alwaysDisplay == false)) {
            alert('These settings make the plugin useless, please remove this plugin or change your settings!')
        }
        //initialize plugin methods
        methods.init(this);

        //add event handler
        $('#disablePreviewLinksPlugin').on('click', methods.pluginStatus);


        if (settings.onlyHoverList == true) {
            $(settings.appendLiTo).find('.showPreviewLinksList').on('mouseover', methods.appendItemsTo);
        }
        else {
            $(this).find('a').on('mouseover', methods.appendItemsTo);
            $(settings.appendLiTo).find('.showPreviewLinksList').on('mouseover', methods.appendItemsTo);
        }
        $('#closeCurrentIframe').on('click', methods.deleteItemFrom);


        //return for chaining
        return this;

    }
})(jQuery);