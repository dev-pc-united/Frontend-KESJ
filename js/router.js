app.config(/*['$routeProvider', $locationProvider*/
	function($routeProvider/*, $locationProvider*/) {
		//$locationProvider.html5Mode(true);
		$routeProvider.
			when('/components', {
				templateUrl: 'partials/components.html',
				controller: 'DisplayComponent'
			}).
			when('/components/list/:componentName', {
				templateUrl: 'partials/components/list.html',
				controller: 'ListComponents',
				title: 'test'
			}).
			when('/components/detail/:componentName/:componentId', {
				templateUrl: 'partials/components/detail.html',
				controller: 'DetailComponent'
			}).
			when('/components/cart', {
				templateUrl: 'partials/components/cart.html',
				controller: 'CartController'
			}).
			otherwise({
				redirectTo: '/components'
			});
	}
);