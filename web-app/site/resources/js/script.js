app.moviesModule = angular.module('detailMovieController',[]);

app.moviesModule.controller('detailMovieCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	//Only if the url have parameters
	if($routeParams.idMovie != 0) {
		movieService.getMovie($routeParams.idMovie).then(function(movie){
			$scope.movie = movie;
		});
	};
});

app.directivesModule = angular.module('utilsDirective',[])

.directive('makeChairs', function () {
    return {
      restrict: 'A',
      template: '<ul class="chair">' +
      			  '<li class="chairValue">{{chairValue}}</li>' +
                  '<li ng-repeat="chair in chairs" ng-class="chair" ng-click="toggle($index)">' +
                  '</li>' +
                  
                '</ul>',
      scope: {
    	chairValue: '=',
        max: '=',
        onChairSelected: '&'
        
      },
      link: function (scope, elem, attrs) {
    	  
        var updateChairs = function() {
          scope.chairs = [];
          for (var  i = 0; i < scope.max; i++) {
        	  scope.chairs.push({filled: i < scope.chairValue, empty: i >= scope.chairValue});
          }
        };

        scope.toggle = function(index) {
	        if(index == 0){
	        	return;
	        }
			if(scope.chairValue == (index + 1)){
				scope.chairValue = index;
				scope.onChairSelected({chair: index});
			} else {
				scope.chairValue = index + 1;
				scope.onChairSelected({chair: index + 1});
			}
        };

        scope.$watch('chairValue', function(oldVal, newVal) {
        	if (newVal) {
        		updateChairs();
          }
        });
      }
    };
  });

/**
  describe('$httpBasedService', function () {
  var svc,
      httpBackend;
  
  beforeEach(function (){  
    //load the module.
    module('theaterService');
    
    //get your service, also get $httpBackend
    //$httpBackend will be a mock, thanks to angular-mocks.js
    inject(function($httpBackend, $httpBasedService) {
      svc = $httpBasedService;      
      httpBackend = $httpBackend;
    });
  });
  
  //make sure no expectations were missed in your tests.
  //(e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should send the msg and return the response.', function (){
    //set up some data for the http call to return and test later.
    var returnData =  [{"id":1 }] ;
    
    //expectGET to make sure this is called once.
    //httpBackend.expectGET('somthing.json?msg=wee').respond(returnData);
    httpBackend.expectGET('./resources/json/mock.json').respond(returnData);
    
    //create an object with a functio to spy on.
    var test = {
      handler: function() {}
    };
    
    //set up a spy for the callback handler.
    spyOn(test, 'handler');
    
    //make the call.
    var returnedPromise = svc.getTheaters();
    
    //use the handler you're spying on to handle the resolution of the promise.
    returnedPromise.then(test.handler);
    
    //flush the backend to "execute" the request to do the expectedGET assertion.
    httpBackend.flush();
    
    //check your spy to see if it's been called with the returned value.  
    expect(test.handler).toHaveBeenCalledWith(returnData);
  });
  
}); */app.moviesModule = angular.module('moviesController',[]);

app.moviesModule.controller('moviesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	/**
	 * Get movies
	 */
	$scope.moviesList = function(){
		movieService.getMovies().then(function(movies){
			$scope.movies = movies;
		});
	};
	
	$scope.moviesList();
	
});
app.factory('movieService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Get all movies
    	 */
	    getMovies:  function(){
	        var status = $http.get(app.constantsGlobal.REST_MOVIES).
	            then(function(response) {
	               return response.data;
	            });
	        return status;
	    },
    
	    /**
	     * Get detail of movie passed as argument
	     */
    	getMovie: function(idMovie){
    		 var status = $http.get(app.constantsGlobal.REST_MOVIES+ "/"+idMovie).
	            then(function(response) {
	                return response.data;
	            });
	        return status;
    	}
    };
});app.factory('paymentsService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Confirm cinema ticket
    	 */
    	paymentReservation:  function(info){

    		var stringSities = "";
    		for (var key in info.sitiesSelected) {
    			stringSities = stringSities + "&seat="+info.sitiesSelected[key].row+","+
    							info.sitiesSelected[key].column + "," + info.sitiesSelected[key].nameSection;
    		}
    		
    		var status = $http.post(app.constantsGlobal.REST_PAYMENTS  +
    				"?schedule="+info.showTimeSelected.id +
    				"&email="+ info.email +
    				"&dni="+info.dni +
    				stringSities).
            then(function(response) {
            	return response.data;
            });
	        return status;
	    }
    };
});
app.factory('showTimeService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Get showTimes for theater and movie selected
    	 */
    	getShowTimeofMovies:  function(theaterId,movieId){
	    	var status = $http.get(app.constantsGlobal.REST_SHOW_TIMES + "?movie="+ movieId +"&theater="+theaterId).
	    	then(function(response) {
	    		return response.data;
	    	});
	    	return status;
	    }
    };
});
app.moviesModule = angular.module('stepPaymentConfirmationController',[]);

app.moviesModule.controller('paymentConfirmationCtrl', function($rootScope,$scope) {

	
	/**
	 * Show payment confirmation
	 */
	$rootScope.showPaymentConfirmation = function(information){
		$scope.info = information;
	};
	
});
app.moviesModule = angular.module('stepSelectMovieController',[]);

app.moviesModule.controller('reservationMovieCtrl', function($rootScope,$routeParams, $scope, $location, theaterService,showTimeService) {

	$scope.filter = {};
	$scope.showButton = true;
	
	/**
	 * Get all theaters
	 */ 
	$scope.getTheaters = function() {
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
		});
	};

	/**
	 * Get Movies for theater selected
	 */
	$scope.updateTheaterSelected = function(){
		theaterService.getMovies($scope.filter.theaterSelected.id).then(function(movies){
			$scope.movies = movies;
		});
		$scope.filter.movieSelected = false;
		$scope.filter.showTimeSelected = false;
	};
	
	/**
	 * Get showTimes for theater and movie selected
	 */
	$scope.updateMovieSelected = function(){
		
		var theaterId = $scope.filter.theaterSelected.id;
		var movieId = $scope.filter.movieSelected.id;

		showTimeService.getShowTimeofMovies(theaterId,movieId).then(function(showTimes){
			
			$scope.showTimes = new Array();
			
			for(var i=0;i<showTimes.length;i++){
				$scope.showTimes.push(showTimes[i]);
			}
		});

		for(var i=0;i<$scope.movies.length;i++){
			if(movieId == $scope.movies[i].id){
				$scope.summary = $scope.movies[i].summary;
				break;
			}
		}
		
		$scope.filter.showTimeSelected = false;
	};
	
	/**
	 * Make url to switch screens
	 */
	$scope.updateShowTimeSelected = function(){
	};
	
	/**
	 * Replace and navigate url browser
	 */
	$scope.navigateUrl = function(){
		var urlParams = "/steps?theater="+$scope.filter.theaterSelected.id +
						"&movie="+$scope.filter.movieSelected.id +
						"&showTime="+$scope.filter.showTimeSelected.id;
		$location.url(urlParams);
	};
	
	$scope.getTheaters();
});
app.moviesModule = angular.module('stepSelectPaymentController',[]);

app.moviesModule.controller('paymentCtrl', function($rootScope,$routeParams, $scope, $location,paymentsService) {
	
	$scope.methodsPayment = [{"id":1,"name":"Amex"},
	                         {"id":2,"name":"Cabal"},
	                         {"id":3,"name":"Mastercard"},
	                         {"id":4,"name":"Visa"}];
	
	
	/**
	 * After select method payment then call service paymentReservation
	 */
	$scope.lastStep = function () {
		paymentsService.paymentReservation($scope.filter).then(function(confirmation){
			
			$scope.filter.confirmation = new Object();
			$scope.filter.confirmationCode = confirmation.code;
			if($scope.$parent.lastStep){
				$scope.$parent.lastStep($scope.filter);
			}
		});
	};
});
app.moviesModule = angular.module('stepSelectSitieController',[]);

app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {

	$scope.quantity = 1;
	var occupiedOther = "OTHER", occupiedMy = "MY", free = "FREE";  
	var sectionLeft = "Left", sectionCenter = "Center", sectionRight = "Right";
	
	/**
	 * Create areas of theater
	 */
	$rootScope.createSections = function(sections){
		
		$scope.sections = new Array();
		$scope.sizeScreen = 0;
		$scope.occupiedSession = 0;
		$scope.quantity = 1;
		$scope.sitiesSelected = new Array();
		$scope.mapSitiesSelected = {};
		if(sections.left) {
			renderTypeSection(sections.left, sectionLeft);
		}
		if(sections.center) {
			renderTypeSection(sections.center, sectionCenter);
		}
		if(sections.right) {
			renderTypeSection(sections.right, sectionRight);
		}
 
     	$scope.sizeScreen = $scope.sizeScreen + ($scope.sections.length * 20 ) - 20 ;
	};

	/**
	 * Updated site occupied for purchase
	 */
	$scope.updateSitie = function(sitie){
		
		if(sitie.occupied == occupiedMy){
			$scope.occupiedSession -= 1;
			sitie.occupied = free;
			sitie.url = "resources/img/seat_gray.gif";
			delete $scope.mapSitiesSelected[sitie.row+"-"+sitie.column+"-"+sitie.nameSection];
			return;
		}
		if($scope.quantity <= $scope.occupiedSession){
			return;
		}
		if(!(sitie.occupied == occupiedOther)) {
			$scope.occupiedSession += 1;
			sitie.occupied = occupiedMy;
			sitie.url = "resources/img/seat_green.gif";
			$scope.sitiesSelected.push(sitie);
			$scope.mapSitiesSelected[sitie.row+"-"+sitie.column+"-"+sitie.nameSection] = sitie;
			return;
		}
		
	};

	/**
	 * Render section in the teather
	 */
	function renderTypeSection(section, nameSection ){
		var rowSection = section.rows;
		var columnSection = section.cols;
		var sitiesTemp = new Array();

		// Map chairs occupied for others
		var mapOcuppied = {};
		if(section.takenSeats) {
			for(var i=0;i<section.takenSeats.length;i++){
				var row = section.takenSeats[i].row;
				var column = section.takenSeats[i].column;
				mapOcuppied[row+"-"+column] = true;
			}
		}
		
		for(var i=0;i<rowSection;i++){
			for(var j=0;j<columnSection;j++){
				var sitie = new Object();
				sitie.row = i;
				sitie.column = j;
				sitie.nameSection = nameSection;
				if( i+"-"+j in mapOcuppied){
					sitie.url = "resources/img/seat_red.gif";
					sitie.occupied = occupiedOther;
				} else {
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occupied = free;
				}
				sitiesTemp.push(sitie);
			};
		};
		
		var section = new Object();
		section.nameSection = nameSection;
		section.sities = sitiesTemp;
		section.size = columnSection * 24;
		
		$scope.sizeScreen += section.size;
		$scope.sections.push(section);
	}
	
});
app.factory('theaterService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Get all theaters
    	 */ 
	    getTheaters:  function(){
    		var status = $http.get(app.constantsGlobal.REST_THEATERS). 
            then(function(response) {
            	return response.data;
            });
	        return status;
	    },
	    
	    /**
		 * Get Movies for theater parameters
		 */
	    getMovies:  function(theaterId){
	    	var status = $http.get(app.constantsGlobal.REST_THEATERS + "/" + theaterId + "/movies").
	    	then(function(response) {
	    		return response.data;
	    	});
	    	return status;
	    }
    };
});app.moviesModule = angular.module('tplReservationMovieController',[]);

app.moviesModule.controller('reservationCtrl', function($rootScope,$routeParams, $scope, $location,theaterService) {
	
	$scope.templates =
        [ { name: 'gridMovies', url: 'resources/tpl/gridMovies.html', state: true}
        , { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html' , state: true} ];
	
	$scope.updateTheaterSelected = function(){
		$scope.$$childHead.movies = [{"id":1, "name": "Que paso ayer 1", "url":"./resources/img/movies/1.jpg"},
		                 {"id":2, "name":"Metegol", "url": "./resources/img/movies/2.jpg"}];
	};
	
	/**
	 * Get all theaters
	 */ 
	$scope.getTheaters = function() {
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
		});
	};
	
	$scope.getTheaters();
});
app.moviesModule = angular.module('tplStepsController',[]);


app.moviesModule.controller('stepsCtrl', function($rootScope,$routeParams, $scope, $location,theaterService,showTimeService) {

	$scope.templates =
        [ { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html', state: true}
        , { name: 'stepSelectSitie', url: 'resources/tpl/stepSelectSitie.html' , state: false} 
        , { name: 'stepSelectPayment', url: 'resources/tpl/stepSelectPayment.html' , state: false}
        , { name: 'stepPaymentConfirmation', url: 'resources/tpl/stepPaymentConfirmation.html' , state: false}];
	$scope.filter = {};
	$scope.showButton = false;
	
	//Only if the url does not have parameters
	if (!$routeParams.movie) { 
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
		});
	};
	
	
	//Running when called through the browser url with parameters.
    //Make the combo box with data
	if($routeParams.movie && $routeParams.theater && $routeParams.showTime) {
		
		$scope.filter = {};
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
			
			for(var i=0;i<$scope.theaters.length;i++){
				if($scope.theaters[i].id == $routeParams.theater){
					$scope.filter.theaterSelected = $scope.theaters[i];
					break;
				}
			}
			theaterService.getMovies($routeParams.theater).then(function(movies){
				$scope.movies = movies;
				
				for(var i=0;i<$scope.movies.length;i++){
					if($scope.movies[i].id == $routeParams.movie){
						$scope.filter.movieSelected = $scope.movies[i];
						$scope.summary = $scope.movies[i].summary;
						break;
					}
				}

				showTimeService.getShowTimeofMovies($routeParams.theater,$routeParams.movie).then(function(showTimes){
					
					$scope.showTimes = new Array();
					
					for(var i=0;i<showTimes.length;i++){
						$scope.showTimes.push(showTimes[i]);
					}
					
					for(var i=0;i<$scope.showTimes.length;i++){
						if($scope.showTimes[i].id == $routeParams.showTime){
							$scope.filter.showTimeSelected = $scope.showTimes[i];
							break;
						}
					}
					
					$scope.templates[1].state = true;
					$rootScope.createSections($scope.filter.showTimeSelected);
				});
			});
		});
	}
	
	/**
	 * Replace and navigate url browser
	 */
	$scope.navigateUrl = function(){
		$scope.templates[1].state = true;
		$rootScope.createSections($scope.filter.showTimeSelected);
	};

	/**
	 * Get Movies for theater selected
	 */
	$scope.updateTheaterSelected = function(){
		theaterService.getMovies($scope.filter.theaterSelected.id).then(function(movies){
			$scope.movies = movies;
		});
		$scope.filter.movieSelected = false;
		$scope.filter.showTimeSelected = false;
		$scope.templates[1].state = false;
		$scope.templates[2].state = false;
	};
	
	/**
	 * Get showTimes for theater and movie selected
	 */
	$scope.updateMovieSelected = function(){
		
		var theaterId = $scope.filter.theaterSelected.id;
		var movieId = $scope.filter.movieSelected.id;

		showTimeService.getShowTimeofMovies(theaterId,movieId).then(function(showTimes){
			
			$scope.showTimes = new Array();
			
			for(var i=0;i<showTimes.length;i++){
				$scope.showTimes.push(showTimes[i]);
			}
			
		});

		for(var i=0;i<$scope.movies.length;i++){
			if(movieId == $scope.movies[i].id){
				$scope.summary = $scope.movies[i].summary;
				break;
			}
		}
		
		$scope.filter.showTimeSelected = false;
		$scope.templates[1].state = false;
		$scope.templates[2].state = false;
	};
	
	/**
	 * Make url to switch screens
	 */
	$scope.updateShowTimeSelected = function(){
		$scope.navigateUrl();
	};
	
	/**
	 * Next step is Select Method Payment
	 */
	$scope.nextStep = function(sitiesSelected){
		$scope.filter.sitiesSelectedText = "";
		$scope.filter.quantitySelected = 0;
		$scope.filter.sitiesSelected = sitiesSelected;
		for (var key in sitiesSelected) {
			$scope.filter.sitiesSelectedText = $scope.filter.sitiesSelectedText + sitiesSelected[key].nameSection  + ": " +  
				"(" + (sitiesSelected[key].row + 1)+ "," + (sitiesSelected[key].column + 1) + ") ";
			$scope.filter.quantitySelected++;
		}
		$scope.templates[2].state = true;
	};
	
	/**
	 * Last step is Payment
	 */
	$scope.lastStep = function(info) {
		$scope.templates[0].state = false;
		$scope.templates[1].state = false;
		$scope.templates[2].state = false;
		$scope.templates[3].state = true;
		$rootScope.showPaymentConfirmation(info);
	};
	
});
