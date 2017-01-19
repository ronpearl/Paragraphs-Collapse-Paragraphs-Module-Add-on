/* ---------------------------------------------
 * Filename:     custom.js
 * Description:  JS for Paragraph Collapse Module
 * Author:       Ron Pearl
 -----------------------------------------------*/

jQuery(document).ready(function($){

    // Getting settings from Drupal admin, check if we should clean Type
    if (drupalSettings.paragraphcollapse.admin.clean_type.yes === 'yes') {
        // Remove the word "Type:" from every type listing to remove clutter
        $('.paragraph-type-title').each(function () {
            var noTypeText = $(this).text().replace("Type: ", "");
            $(this).find('strong').html(noTypeText);
        });
    }

    /**
     * Add button and wrapper div for collapsible subform content
     *
     * @param callback
     */
    function addParagraphCollapse(callback) {
        var subform = $('.paragraphs-subform');

        subform.wrapInner('<div class="paragraphs-subform-collapsable-content"></div>');
        // subform.prepend('<button class="paragraphs-subform-collapsable-button">+/-</button>');
        $('.paragraph-type-title').prepend('<button class="paragraphs-subform-collapsable-button">+/-</button>');

        // Delegation that when the button is clicked, it opens the correct div.
        $('.field-multiple-table').on('click', '.paragraphs-subform-collapsable-button', function(e) {
            e.preventDefault();     // Ignore page load
            e.stopPropagation();    // Stop bubbling up DOM

            // Find the div that we need to expand/close
            var divToFind = $(this).parent().parent().next('.paragraphs-subform').find('.paragraphs-subform-collapsable-content').first();

            // Slide based on current display
            divToFind.css("display") == "none" ? divToFind.slideDown() : divToFind.slideUp();
        });

        // If callback was passed, run it
        callback ? callback() : false;
    }


    /**
     * Checks for ajax completions on the page, and then checks to see if the
     * parts for the paragraph collapse module are already on the page. If not,
     * we add the parts and then slide open the last one (which was just added).
     */
    $(document).ajaxComplete( function() {
        // Check to see if the collapsable divs exist or not
        if ($('.paragraphs-subform-collapsable-content').length == 0) {
            // If not, let's build them. Also send callback to slide the last collapsable
            addParagraphCollapse(slideLastCollapsable);
        }
    });


    /**
     * Open the last collapsable item on the page
     */
    function slideLastCollapsable() {
        $('.paragraphs-subform-collapsable-content').last().slideDown();
    }

    // Process on load
    addParagraphCollapse();

});