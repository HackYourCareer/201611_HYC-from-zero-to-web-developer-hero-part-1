let beerStorage = {
    //asks the service for all beers
    getAllBeers: function(callback) {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:2403/piwa'
        })
        .done(function(response) {
            callback(response);
        });
    },
    //asks the service for beers which meet criteria defined in filterObj, syntax:
    //filterObj follows MongoDB query syntax
    getFilteredBeers: function(filterObj, callback) {
        let queryString = JSON.stringify(filterObj);

        $.ajax({
            method: 'GET',
            url: 'http://localhost:2403/piwa?' + queryString 
        })
        .done(function(response) {
            callback(response);
        });
    }
}