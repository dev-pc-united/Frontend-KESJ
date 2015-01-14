/** Component display controller **/
app.controller("DisplayComponent", ["$scope","$http", function($scope, $http) {    
	$http.get("data/components.json").success (function(data){
		$scope.components = data;
	});
 }]);
 
/** Date controller **/ 
app.controller( 'Date', ['$scope', function($scope) {
    $scope.date = new Date();
}]);

 /** Display list of chosen component **/
 app.controller("ListComponents", ["$scope", "$http", "$routeParams", "$filter", function($scope, $http, $routeParams, $filter) {
	var component = $routeParams.componentName;
	$("#loader").show();
	$http.get("http://95.85.57.61/results/"+component).success (function(data){
	//$http.get("data/"+component+".json").success (function(data){
		$scope.list = data;
		$scope.currentPage = 0;
		$scope.pageSize = 30;
		$scope.data = [];

		console.log(data.length);
		$scope.numberOfPages=function(){
			return Math.ceil($scope.data.length/$scope.pageSize);                
		}
		$scope.range = function(n) {
			return new Array(n);
		};
		for (var i=0; i<data.length; i++) {
			if(data[i].id !== null || data[i].id !== 'undefined') {
				$scope.data.push(data[i].id);
			}
		}
		$("#loader").hide();
	});
	
	/** Get Selectables **/
	$http.get("data/component_selectables.json").success (function(data){
		$.each(data, function(i, v) {
			if(v.type == component) {
				$scope.selectables = v.selectables;
			}
		});
	});
	
	$http.get("data/components.json").success (function(data){
		$scope.components = data;
		$.each(data, function(i, v) {
			if (v.type == component) {
				$scope.title = v.name;
				$scope.description = v.description;
			}
		});
	});
 }]);
 
 /** Display detail of product **/
 app.controller("DetailComponent", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
	var componentName = $routeParams.componentName;
	var componentId   = $routeParams.componentId;
	
	$http.get("data/"+componentName+".json").success (function(data){
		$scope.list = data;
		$scope.componentId = componentId;
	});
 }]);
 
 
//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int

		if(!isNaN(start)){
			return input.slice(start);
		}
    }
});

app.filter('alwayDigits', function() {
    return function(input) {
		input = parseFloat(Math.round(input) / 100).toFixed(2);
		if(!isNaN(input)){
			return input;
		}
    }
});

app.controller ('myCtrl', ['$scope', '$http', 'ngCart', function($scope, $http, ngCart) {
    ngCart.setTaxRate(21);
    ngCart.setShipping(2.99);
    console.log (ngCart);
        
    $scope.checkout = function() {
           $scope.summary = ngCart.toObject();
           
         // Post your cart to your resource
         //$http.post('cart/', ngCart.toObject());
    }
    
}]);

function toComponents() {
	setTimeout(function(){
		window.location.href = "#/components";
	}, 1000);
}

app.directive('imageSwitch', function() {
    return function(scope, element, attrs) {
        var imageUrl = '';
        
        scope.$watch(attrs.imageSwitch, function(value) {
            imageUrl = value;
            setImage();
        });

        function setImage() {
            element.text('rad: ' + imageUrl);
        };

    };
});
