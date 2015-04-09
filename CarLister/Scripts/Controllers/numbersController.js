angular.module('app').controller('numbersCtrl',

function numbersCtrl() {
    // this refers to numbersCtrl
    var scope = this;
    scope.numbers = [1, 2, 3, 4, 5];
    scope.current = 0;
    scope.other = [['a', 'b', 'c', 'd'], ['A', 'B', 'C', 'D'], ['Red', 'Blue', 'Green', 'Yellow'], ['Block', 'Circle', 'Oval', 'Line'], ['@', '#', '$', '%'], ['Stop', 'Yield', 'Merge', 'Speed']];
    scope.pickRandom = function () {
        scope.current = Math.floor((Math.random() * 5) + 1);
    }
});