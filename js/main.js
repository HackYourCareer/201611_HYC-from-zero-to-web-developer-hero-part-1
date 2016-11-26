$(document).ready(function() {
    $('.a-checkbox--primary').click(function() {
        let allCheckedOptions = getAllCheckedOptions();
        let filterObject = composeFilterObject(allCheckedOptions);

        if (filterObject) {
            beerStorage.getFilteredBeers(filterObject, appendBeerDivs);
        } else {
            beerStorage.getAllBeers(appendBeerDivs);
        }
    });

    let beerTemplate = undefined;
    grabBeerTemplate();

    $('#beer-tabs').tabs();

    $('.m-filter__item .a-btn').click(function() {
        const $this = $(this);
        const $allButtons = $('.m-filter__item .a-btn');

        $allButtons.removeClass('a-btn--is-active');
        $this.addClass('a-btn--is-active');
    });

    beerStorage.getAllBeers(appendBeerDivs);
});

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

function appendBeerDivs(serverResponse) {
    $('#beers-div').html('');
    serverResponse.forEach(function(beerData) {
        let beerHtml = beerTemplate(beerData);
        $('#beers-div').append(beerHtml);
    });
}

function grabBeerTemplate(beersData) {
    $.ajax({
            url: '../templates/beer-template.hbs',
            cache: true
        })
        .done(function(source) {
            beerTemplate = Handlebars.compile($(source).html());
        });
}
