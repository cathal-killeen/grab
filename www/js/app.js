var app = angular.module('myApp', ['ngRoute', 'leaflet-directive']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'views/map.html',
			controller: 'MainController'
		});
}]);
