angular.module('ngAutocompleteModule', []).
directive('ngAutocomplete', function(){
	return {
		restrict: 'EA',
		scope: {
			onSelect: '&',
			retrievalMethod: '&'
		},
		link: function(scope, something, attrs){

			var value_property = attrs.valueProperty;
			var advanced_display = attrs.advancedDisplay;
			var max_results = attrs.maxResults;
			var min_length = parseInt(attrs.minLength) || 1;

			var retrieve_list = function(newVal, oldVal){
				return !(oldVal == undefined && newVal == undefined)
					&& newVal !== '' && newVal.length >= min_length;
			}

			scope.$watch('ngModel', function(newVal, oldVal) {
				if(retrieve_list(newVal, oldVal)){
					scope.retrievalMethod()(scope.ngModel, max_results)
					.then(function(data){
						scope.items = data;
					});
				}else{
					scope.items = [];
				}
			});

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