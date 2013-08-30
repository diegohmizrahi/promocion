var app = angular.module('cinemarkApp',['stepSelectPaymentController','tplStepsController','stepSelectMovieController','tplReservationMovieController','moviesController','detailMovieController','stepSelectSitieController'], function ($routeProvider, $locationProvider, $httpProvider) {

    var interceptor = ['$rootScope', '$q', function (scope, $q) {

        function success(response) {
        	$("#error").html("");
            return response;
        }

        function error(response) {
            var status = response.status;

            if (status == 401) {
                window.location = "./index.html";
                return;
            }
            if (status == 400) {
            	//window.location = "./index.html";
            	$("#error").html(response.data);
            //	return;
            }
            // otherwise
            return $q.reject(response);

        }

        return function (promise) {
            return promise.then(success, error);
        };

    }];
    
    $httpProvider.responseInterceptors.push(interceptor);
});

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider,$locationProvider) {
   //$locationProvider.html5Mode(true);
    $routeProvider
        .when('/movies',
        {
            controller: 'moviesCtrl',
            templateUrl: './resources/tpl/gridMovies.html'
        })
        .when('/xxx',
        {
            controller: 'reservationdddCtrl',
            templateUrl: './resources/tpl/tplSteps.html'
        })
        .when('/movies/:idMovie',
        		{
        	controller: 'detailMovieCtrl',
        	templateUrl: './resources/tpl/detailMovie.html'
       	})
       	.when('/sities', //esto esta de prueba
       			{
       		controller: 'sitiesCtrl',
       		templateUrl: './resources/tpl/stepSelectSitie.html'
       			})
        .when('/reservationMovie', //este es el de los combo box
        		{
        	controller: 'reservationMovieCtrl',
        	templateUrl: './resources/tpl/stepSelectMovie.html'
        })
        .when('/todo', //este es el de los combo box
        		{
        	controller: 'reservationCtrl',
        	templateUrl: './resources/tpl/tplReservationMovie.html'
        })
        .otherwise({ redirectTo: '/todo' });
});