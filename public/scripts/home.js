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

mp3Reader.directive('ngAudio', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, element, iAttrs, controller) {
			element.bind('ended', $scope.setSong);	
		}
	};
}]);

mp3Reader.controller('homeCtrl', function($scope, $timeout, mp3service){
	$scope.selected = [];
	$scope.playing = false;

    $scope.getFiles = function(input, max_results){
    	return mp3service.getFileList(input, max_results);
    }

    $scope.setSong = function(){
    	$scope.selected.splice(0,1);
    	var selected = $scope.selected[0];

        $scope.currently_playing = selected.path;
        
        $timeout(function(){
    	        var audio = document.getElementById('audio');
	            audio.load();
            	audio.play();
            	$scope.playing = true;
        	}, 250);

    }
	$scope.clicked = function(selected){
		$scope.selected.push(selected);
        $scope.currently_playing = selected.path;
        if(!$scope.playing){
        $timeout(function(){
    	        var audio = document.getElementById('audio');
	            audio.load();
            	audio.play();
            	$scope.playing = true;
        	}, 250);
    	}
	};

});