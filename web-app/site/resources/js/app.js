var app = angular.module('cinemarkApp',['stepPaymentConfirmationController','utilsDirective','stepSelectPaymentController',
                                        'tplStepsController','stepSelectMovieController','tplReservationMovieController',
                                        'moviesController','detailMovieController','stepSelectSitieController'], 
                                        function ($routeProvider, $locationProvider, $httpProvider) {

    var interceptor = ['$rootScope', '$q', function (scope, $q) {

        function success(response) {
            return response;
        }

        function error(response) {
            var status = response.status;

            if (status == 0) {
            	alert("SERVICIO NO DISPONIBLE");
            }
            if (status == 401) {
                window.location = "./index.html";
                return;
            }
            if (status == 400) {
            	$("#error").html(response.data);
            }
            if (status == 404) {
            	alert("SERVICIO NO DISPONIBLE");
            }
            if (status == 500) {
            	alert("Se produjo un error interno");
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


//app.config(['$httpProvider', function ($httpProvider) {
//    $httpProvider.defaults.useXDomain = true;
//    delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }]);



//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider,$locationProvider) {
   //$locationProvider.html5Mode(true);
    $routeProvider
	    .when('/index', 
	   	{
	    	controller: 'reservationCtrl',
	    	templateUrl: './resources/tpl/tplReservationMovie.html'
	    })
        .when('/steps',
        {
            controller: 'stepsCtrl',
            templateUrl: './resources/tpl/tplSteps.html'
        })
        .when('/movies/:idMovie',
        		{
        	controller: 'detailMovieCtrl',
        	templateUrl: './resources/tpl/detailMovie.html'
       	})
        .otherwise({ redirectTo: '/index' });
});