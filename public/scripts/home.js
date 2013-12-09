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

mp3Reader.directive('ngAudio', ['$timeout', function($timeout){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
//	    scope: {
//            selectedSongs: '='
//        }, // {} = isolate, true = child, false/undefined = no change
		// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        replace: true,
		// template: '',
		// templateUrl: '',
        template: '<div><audio controls>' +
                  '    <source src="{{ currently_playing }}" /> Your browser does not support the audio element. ' +
                  '</audio>' +
                  '<div> Now playing: {{playlist[0].title}} by {{ playlist[0].artist }}</div>' +
                  '<div> Upcoming:' +
                  '   <div ng-repeat="item in playlist" ng-if="$index !== 0"></div>' +
                  '</div></div>',
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, element, attrs) {
            var audio = element.find('audio');

			element.bind('ended', $scope.setSong);

            var playlist = [];

            $scope.$watch('selected', function(newVal, oldVal){
                if(newVal !== undefined && newVal !== oldVal){
                    playlist.push(newVal);
                    setSong();
                }
            }, true);

            var setSong = function(){


                $timeout(function(){
                    audio.load();
                    audio.play();
                    playing = true;
                }, 250);
            }
		}
	};
}]);

mp3Reader.controller('homeCtrl', function($scope, $timeout, mp3service){

    $sc
    $scope.getFiles = function(input, max_results){
    	return mp3service.getFileList(input, max_results);
    }

	$scope.clicked = function(selected){
		$scope.selected = selected;

        var removed = playlist.splice(0,1);
        playlist.push(removed);

        var selected = playlist[0];

        $scope.currently_playing = selected.path;
	};
});