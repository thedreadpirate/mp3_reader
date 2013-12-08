var mp3Reader = angular.module('mp3Reader', ['ngAutocompleteModule']);

mp3Reader.factory('mp3service', function($http){
	return {
		getFileList: function(filterString, max_results){
			var max = max_results || 500;
			return $http.get('/files/' + filterString + '?max=' + max).then(
				function(result){
					return result.data;
				}
			);
		}
	};
});

mp3Reader.controller('homeCtrl', function($scope, mp3service){
    $scope.selected = [];

    $scope.getFiles = function(input, max_results){
    	return mp3service.getFileList(input, max_results);
    }

	$scope.clicked = function(selected){
		$scope.selected.push(selected);
	};
});