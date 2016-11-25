let beerStorage = {
    //asks the service for all beers
    getAllBeers: function() {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:2403/piwa'
        })
        .done(function(response) {
            alert(response);
        });
    },
    //asks the service for beers which meet criteria defined in filterObj, syntax:
    //{
    //  {filterName1}: [{value1}, {value2}, ...],    
    //  {filterName2}: [{value1}, {value2}, ...]
    //}
    //
    getFilteredBeers: function(filterObj) {
        let queryString = beerStorageHelper.composeQueryString(filterObj);

        $.ajax({
            method: 'GET',
            url: 'http://localhost:2403/piwa?' + queryString 
        })
        .done(function(response) {
            alert("Data Saved: " + msg);
        });
    }

}

let beerStorageHelper = {
    composeQueryString: function(filterObj) {
        let queryString = '';
        for (filterBy in filterObj) {
            queryString += filterBy + '='
            filterObj[filterBy].forEach(function(filterByValue) {
                queryString += filterByValue + ',';    
            });
            queryString = queryString.slice(0, -1); //deletes last ','
            queryString += '&';
        }
        queryString = queryString.slice(0, -1); //deletes last '&'
        return queryString;
    }
}