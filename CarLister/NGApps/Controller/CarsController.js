angular.module('cars')
    .controller('CarsController', ['$scope', 'carFactory', '$modal', '$log', function ($scope, carFactory,$modal, $log) {

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
            // initialize
            $scope.selectedMake = '';
            $scope.makes = [];
            $scope.selectedModel = '';
            $scope.models = [];
            $scope.selectedTrim = '';
            $scope.trims = [];
            $scope.getCars();

            // call stored procedure to load years
            carFactory.getYears().then(function (data) { $scope.years = data; });            
        };

        
        $scope.getMakes = function () {
            // initialize
            $scope.selectedMake = '';
            $scope.makes = [];
            $scope.selectedModel = '';
            $scope.models = [];
            $scope.selectedTrim = '';
            $scope.trims = [];
            $scope.getCars();

            // call stored procedure to get makes for selected year
            carFactory.getMakes($scope.selectedYear).then(function (data) { $scope.makes = data; });
        };

        $scope.getModels = function () {
            // initialize
            $scope.selectedModel = '';
            $scope.models = [];
            $scope.selectedTrim = '';
            $scope.trims = [];
            $scope.getCars();

            // call stored procedure to get models based on selected year and make
            carFactory.getModels($scope.selectedYear, $scope.selectedMake).then(function (data) { $scope.models = data; });
            
        };
            
        $scope.getTrims = function () {
            //initialize
            $scope.selectedTrim = '';
            $scope.trims = [];
            $scope.getCars();

            // call stored procedure to get trims basaed on selected year, make and model
            carFactory.getTrims($scope.selectedYear, $scope.selectedMake, $scope.selectedModel).then(function (data) { $scope.trims = data; });
        };

        $scope.getCars = function () {
            // call stored procedure to get cars matching selected year, make, model and trim
            carFactory.getCars($scope.selectedYear, $scope.selectedMake, $scope.selectedModel, $scope.selectedTrim).then(function (data) { $scope.cars = data; });            
        };
        
        // call stored procedure to get car by id
        $scope.getCar = function () {
            carFactory.getCar($scope.id).then(function (data) { $scope.car = data; });
            Console.log($scope.car.recall);
        };


        // modal handling
        $scope.open = function (id) {

            var modalInstance = $modal.open({
                templateUrl: 'detailsModal.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    car: function () {
                        return carFactory.getCar(id);
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // inital load for years
        $scope.getYears();
    }]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('cars').controller('ModalInstanceCtrl', function ($scope, $modalInstance, car) {

    $scope.car = car;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});