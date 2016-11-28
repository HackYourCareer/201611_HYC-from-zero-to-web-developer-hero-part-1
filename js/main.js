$(document).ready(function() {
    //init dynamic content
    $('#beer-tabs').tabs(); //jQuery ui plugin

    //active tab colouring
    $('.m-filter__item .a-btn').click(function() {
        const $this = $(this);
        const $allButtons = $('.m-filter__item .a-btn');

        $allButtons.removeClass('a-btn--is-active');
        $this.addClass('a-btn--is-active');
    });
});
