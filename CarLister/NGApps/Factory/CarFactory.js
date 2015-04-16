angular.module('cars')
    .factory('carFactory', ['$http', function ($http) {

        var carFactory = {};

        // get years
        carFactory.getYears = function () {
            return $http.get('api/cars/getYears')
                .then(function (response) { return response.data });
        };

        // get makes
        carFactory.getMakes = function (year) {
            var options = { params: { year: year } };
            return $http.get('api/cars/getMakes', options)
                .then(function (response) { return response.data });
        };

        // get models
        carFactory.getModels = function (year, make) {
            var options = { params: { year: year, make: make } };

            return $http.get('api/cars/getModels', options)
                .then(function (response) { return response.data });
        };

        // get trims
        carFactory.getTrims = function (year, make, model) {
            var options = { params: { year: year, make: make, model: model } };

            return $http.get('api/cars/getTrims', options)
                .then(function (response) { return response.data });
        };

        // get cars
        carFactory.getCars = function (year, make, model, trim) {
            var options = { params: { year: year, make: make, model: model, trim: trim } };

            return $http.get('api/cars/getCars', options)
                .then(function (response) { return response.data });
        };

        // get car by id
        carFactory.getCar = function (id) {
            var options = { params: { id: id } };

            return $http.get('api/cars/getCar', options)
                .then(function (response) {
                    response.data.recall = JSON.parse(response.data.recall)
                    return response.data
                });
        };
        
        //carFactory.getRecall = function (year, make, model) {
        //    var options = { params: { year: year, make: make, model: model } }

        //    return $http.get('api/cars/getRecall',options)
        //        .then(function (response) {return JSON.parse(response.data)});
        //}

        return carFactory;
    }]);

