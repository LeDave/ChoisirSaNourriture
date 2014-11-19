'use strict';
/**
 * @ngdoc function
 * @name workspaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp').controller('MainCtrl', function($scope, fbutil, $timeout, Crossfilter) {
    // synchronize a read-only, synchronized array of products, limit to most recent 10
    $scope.products = fbutil.syncArray('products', {
        limit: 500
    });
    
    // display any errors
    $scope.products.$loaded().catch(alert);
    // provide a method for adding a message
    $scope.addProduct = function(newProduct) {
        if(newProduct) {
            // push a product to the end of the array
            $scope.products.$add(JSON.parse(newProduct))
          // display any errors
          .catch(alert);
        }
    };
    $scope.filterOptions = {
        filterText: ''
      };

    function alert(msg) {
        $scope.err = msg;
        $timeout(function() {
            $scope.err = null;
        }, 5000);
    }
});