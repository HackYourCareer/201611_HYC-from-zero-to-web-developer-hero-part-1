let beerStorage = {    //nowy obiekt
    getAllBeers: function(callback) {   //funkcja, będąca składową obiektu
        $.ajax({
            method: 'GET',
            url: 'http://localhost:2403/piwa'
        })
        .done(function(response) {
            callback(response);
        });
    },
    getFilteredBeers: function(filterObj, callback) {//funkcja, będąca składową obiektu
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