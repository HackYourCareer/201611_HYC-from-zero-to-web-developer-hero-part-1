$(document).ready(function() {
    //obsługuje kliknięcia na elementach z klasą a-checkbox--primary
    $('.a-checkbox--primary').click(function() {
        let allCheckedOptions = getAllCheckedOptions();
        let filterObject = composeFilterObject(allCheckedOptions);

        if (!$.isEmptyObject(filterObject)) {
            beerStorage.getFilteredBeers(filterObject, appendBeerDivs);
        } else {
            beerStorage.getAllBeers(appendBeerDivs);
        }
    });

    let beerTemplate = undefined;
    grabBeerTemplate(function() {  //pobieramy szkielet (ten z wąsatymi nawiasami)
        beerStorage.getAllBeers(appendBeerDivs);        
    });

    $('#beer-tabs').tabs(); //jQuery ui plugin, nie zaprzątajmy sobie tym głowy

    //kolorowanie aktywnej zakładki
    $('.m-filter__item .a-btn').click(function() {
        const $this = $(this);
        const $allButtons = $('.m-filter__item .a-btn');

        $allButtons.removeClass('a-btn--is-active');
        $this.addClass('a-btn--is-active');
    });
});

//zmienia strukturę html, dodając szkielet z danymi z serwera
function appendBeerDivs(serverResponse) {
    $('#beers-div').html('');
    serverResponse.forEach(function(beerData) {
        let beerHtml = beerTemplate(beerData);
        $('#beers-div').append(beerHtml);
    });
}

//nie będziemy patrzeć co tu się dzieje - nic waznego ;)
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
            filterObject[option] = { $in: [value] };
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
