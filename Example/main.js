//load page
$(init);

//global vars

/**
 * initialize our aplication
 */
function init() {
    //load plugin
    $('#content').previewLinks(
        {   appendLiTo: '#siteLoader',
            appendTo: '#iframeHolder',
            height: "600px"
        }
    ).hide().fadeIn('slow');
}
