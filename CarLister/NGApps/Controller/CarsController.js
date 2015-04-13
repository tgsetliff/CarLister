angular.module('cars')
    .controller('CarsController', ['$scope', 'carFactory', function ($scope, carFactory) {

        //initialize
        $scope.selectedYear = '';
        $scope.years = [];
        $scope.selectedMake = '';
        $scope.makes = [];
        $scope.selectedModel = '';
        $scope.models = [];
        $scope.selectedTrim = '';
        $scope.trims = [];
        $scope.cars = [];

        $scope.getYears = function () {
            $scope.selectedMake = '';
            $scope.makes = [];
            $scope.selectedModel = '';
            $scope.models = [];
            $scope.selectedTrim = '';
            $scope.trims = [];
            $scope.getCars();

            carFactory.getYears().then(function (data) { $scope.years = data; });            
        };

        
        $scope.getMakes = function () {
            $scope.selectedMake = '';
            $scope.makes = [];
            $scope.selectedModel = '';
            $scope.models = [];
            $scope.selectedTrim = '';
            $scope.trims = [];
            $scope.getCars();

            carFactory.getMakes($scope.selectedYear).then(function (data) { $scope.makes = data; });
        };

        $scope.getModels = function () {
            
            $scope.selectedModel = '';
            $scope.models = [];
            $scope.selectedTrim = '';
            $scope.trims = [];
            $scope.getCars();

            carFactory.getModels($scope.selectedYear, $scope.selectedMake).then(function (data) { $scope.models = data; });
            
        };
            
        $scope.getTrims = function () {
            $scope.selectedTrim = '';
            $scope.trims = [];
            $scope.getCars();

            carFactory.getTrims($scope.selectedYear, $scope.selectedMake, $scope.selectedModel).then(function (data) { $scope.trims = data; });
        };

        $scope.getCars = function () {
            carFactory.getCars($scope.selectedYear, $scope.selectedMake, $scope.selectedModel, $scope.selectedTrim).then(function (data) { $scope.cars = data; });            
        };
        
        $scope.getRecall = function () {
            carFactory.getRecall($scope.selectedYear, $scope.selectedMake, $scope.selectedModel).then(function (data) {
                console.log(data)
                $scope.recalls = data;
            });
        };

        // get years
        $scope.getYears();
    }]);