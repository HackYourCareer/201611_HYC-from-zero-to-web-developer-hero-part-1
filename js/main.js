$(document).ready(function() {
    //init dynamic content
    $('#beer-tabs').tabs();
    let beerTemplate = undefined;
    grabBeerTemplate(function() {
        beerStorage.getAllBeers(appendBeerDivs);        
    });

    //registering event handler
    $('.a-checkbox--primary').click(function() {
        let allCheckedOptions = getAllCheckedOptions();
        let filterObject = composeFilterObject(allCheckedOptions);

        if (!$.isEmptyObject(filterObject)) {
            beerStorage.getFilteredBeers(filterObject, appendBeerDivs);
        } else {
            beerStorage.getAllBeers(appendBeerDivs);
        }
    });

    //active tab colouring
    $('.m-filter__item .a-btn').click(function() {
        const $this = $(this);
        const $allButtons = $('.m-filter__item .a-btn');

        $allButtons.removeClass('a-btn--is-active');
        $this.addClass('a-btn--is-active');
    });
});

//manpiulates the html adding beers coming from server
function appendBeerDivs(serverResponse) {
    $('#beers-div').html('');
    serverResponse.forEach(function(beerData) {
        let beerHtml = beerTemplate(beerData);
        $('#beers-div').append(beerHtml);
    });
}

//no need to deep-dive into these functions
function getAllCheckedOptions() {
    let allCheckboxes = $('#beer-tabs').find('.a-checkbox--primary');
    let checked = [];

    allCheckboxes.each(function(iterator, checkboxElem) {
        if (checkboxElem.checked) checked.push(checkboxElem);
    });

    return checked;
}

function composeFilterObject(checkedOptions) {
    let filterObject = {};
    checkedOptions.forEach(function(checkedElem) {
        let [option, value] = checkedElem.value.split('-');
        if (!isNaN(value)) value = +value;
        if (filterObject[option]) {
            filterObject[option].$in.push(value);
        } else {
            filterObject[option] = {
                $in: [value]
            };
        }
    });
    return filterObject;
}

function grabBeerTemplate(callback) {
    $.ajax({
        url: '../templates/beer-template.hbs',
        cache: true
    })
    .done(function(source) {
         beerTemplate = Handlebars.compile($(source).html());
         callback();
    });
}
