angular.module('ngAutocompleteModule', []).
directive('ngAutocomplete', function(){
	return {
		restrict: 'EA',
		scope: {
			onSelect: '&',
			retrievalMethod: '&'
		},
		link: function(scope, something, attrs){
			scope.$watch('ngModel', function(newVal, oldVal) {
				if(!(oldVal == undefined && newVal == undefined) && newVal !== ""){
					scope.retrievalMethod()(scope.ngModel, max_results)
					.then(function(data){
						scope.items = data;
					});
				}else{
					scope.items = [];
				}
			});

			var value_property = attrs.valueProperty;
			var advanced_display = attrs.advancedDisplay;
			var max_results = attrs.maxResults;

			scope.itemSelected = function(item){
				scope.onSelect()(item);
			}

			scope.getItemTemplate = function(item){
				if(value_property != undefined){
					return item[value_property];
				}else if(advanced_display != undefined){
					return eval(advanced_display);
				}else{
					return item;
				}
			};
		},
		template: '<div class="ac-wrapper"><input type="text" ng-model="ngModel" />' +
		'<div class="ac-items"><div class="ac-item" ng-click="itemSelected(item)" ng-repeat="item in items">{{getItemTemplate(item)}}</div>'
	};	
});