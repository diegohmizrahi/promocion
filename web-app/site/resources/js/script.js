app.moviesModule = angular.module('detailMovieController',[]);

app.moviesModule.controller('detailMovieCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
//	if($routeParams.idMovie != 0) {
//		movieService.getMovie($routeParams.idMovie).then(function(movie){
//			$scope.movie = movie;
//		});
//	};
	
	if($routeParams.idMovie != 0) {
//		$scope.movie = {"name": "Que paso ayer 1", "description": "esta es una breve descripcion de que se trata la pelicula",
//				"url":"http://imdb-poster.b0.upaiyun.com/000/268/380.jpg!cover?_upt=22d38ae31377737331"};
//	
		$scope.movie = {
		    "id": 3,
		    "name": "Metegol",
		    "description": "All Boys espera al ganador entre los Bodegueros y el equipo del Viaducto, en la semifinal. En la otra llave lucharan por un lugar en la final el sorprendente Estudiantes de Buenos Aires milita en la B Metropolitana y es el unico de los cuatro que no es de Primera y San Lorenzo.",
		    "urlImage": "./resources/img/movies/1.jpg",
		    "urlTrailer": "http://www.youtube.com/embed/30v_FQxGmaA",
		    "actors": "Pablo Rago, Miguel Angel Rodriguez, Fabian Gianola, Horacio Fontova",
		    "genre": "Comedy"
		};
	}
});
app.moviesModule = angular.module('moviesController',[]);

app.moviesModule.controller('moviesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.movies = [{"id":1, "name": "Que paso ayer 1", "url":"./resources/img/movies/1.jpg"},
	                 {"id":2, "name":"Metegol", "url": "./resources/img/movies/2.jpg"},
					 {"id":3, "name": "Que paso ayer 2", "url":"./resources/img/movies/3.jpg"},
	                 {"id":4, "name":"Metegol 1", "url": "./resources/img/movies/4.jpg"},
						{"id":5, "name": "Que paso ayer 2", "url":"./resources/img/movies/5.jpg"},
						{"id":6, "name":"Metegol 1", "url": "./resources/img/movies/6.jpg"}];
	
	
//	$scope.moviesList = function(){
//		movieService.getMovies().then(function(movies){
//			$scope.movies = movies;
//		});
//	};
//	
//	$scope.moviesList();
	
});
app.factory('movieService', function($http) {

    return {

	    getMovies:  function(){
	        var status = $http.get(app.constantsGlobal.REST_MOVIE).
	            then(function(response) {
	                return response.data;
	            });
	        return status;
	    },
    
    	getMovie: function(idMovie){
    		 var status = $http.get(app.constantsGlobal.REST_MOVIE + '/'+idMovie).
	            then(function(response) {
	                return response.data;
	            });
	        return status;
    	},
    	
    	getSities: function(){
    		var urlBorrar = "urldespues";
    		var status = $http.get(urlBorrar).
            then(function(response) {
                return response.data;
            });
    		return status;
    	}
    };
});app.moviesModule = angular.module('stepSelectMovieController',[]);
app.moviesModule.controller('reservationMovieCtrl', function($rootScope,$routeParams, $scope, $location, movieService) {

	$scope.theaters = [{"id":1,"name": "Palmares"},{"id":2,"name":"Shopping"}];
	
	$scope.updateTheaterSelected = function(theaterSelected){
		if(theaterSelected.id == 1){
			$scope.movies = [{"id":1,"name": "Jobs",},{"id":2,"name":"Mi villano Favorito 2"}];
		} else {
			$scope.movies = [{"id":3,"name": "Que paso ayer 1"},{"id":4,"name":"Metegol"}];
		}
//		movieService.getMovies().then(function(response) {
//			$scope.movies = response;
//		});
//		theaterService.getMovies($scope.filter.theaterSelected).then(function(){
//			
//		});
		//TODO:28-8 hay que hacer la logica cuando venga del backend
		$scope.description = "Amadeo vive en un pueblo pequeno y anonimo. Trabaja en un bar, juega al metegol mejor que nadie " +
				"y esta enamorado de Laura, aunque ella no lo sabe. Su rutina sencilla se desmorona cuando Parpados, un joven del " +
				"pueblo convertido en el mejor futbolista del mundo, vuelve dispuesto a vengarse de la unica derrota que sufrio " +
				"en su vida. Con el metegol, el bar y hasta su alma destruidas, Amadeo descubre algo magico: los jugadores de su " +
				"querido metegol hablan y mucho. Juntos se embarcaran en un viaje lleno de aventuras para salvar a Laura y al " +
				"pueblo y en el camino convertirse en un verdadero equipo. Pero, hay en el futbol lugar para los milagros.";
	    
		$scope.filter.movieSelected = false;
		$scope.filter.showTimeSelected = false;
	};

	$scope.updateMovieSelected = function(movieSelected){
		if(movieSelected.id == 1 || movieSelected.id == 3){
			$scope.showTimes = [{"name": "miercoles 20:20"},{"name":"miercoles 22"}];
		} else {
			$scope.showTimes = [{"name": "jueves 20:20"},{"name":"sabado 22"}];
		}
		$scope.filter.showTimeSelected = false;
//		movieService.getTime($scope.filter.theaterSelected,$scope.filter.movieSelected).then(function(){
//			
//		});
		
	};
	
});
app.moviesModule = angular.module('stepSelectPaymentController',[]);

app.moviesModule.controller('paymentCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.formaPago = "contado";
	
	$scope.methodsPayment = [{"id":1,"name":"contado"},{"id":2,"name":"tarjeta"}];
	
	$scope.updateMethodPayment = function(methodPaymentSelected){
		
	};
});
app.moviesModule = angular.module('stepSelectSitieController',[]);

app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.occupiedSession = 0;
	$scope.quantitySelected = {"id":0,"number":0};
	$scope.sitiesSelected = new Array();
	$scope.quantities = [{"id":1,"number":1},{"id":2,"number":2},{"id":3,"number":3},{"id":4,"number":4}];
	var occupiedOther = "OTHER", occupiedMy = "MY", free = "FREE";  
	
	function renderTypeSection(section, nameSection ){
		var rowSection = section.row;
		var columnSection = section.column;
		var sitiesTemp = new Array();

		// Map chairs occupied for others
		var mapOcuppied = {};
		if(section.occupied) {
			for(var i=0;i<section.occupied.length;i++){
				var row = section.occupied[i].row;
				var column = section.occupied[i].column;
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
			
			if(nameSection == "CENTER") {
				$scope.sizeCenter = columnSection * 24 + "px";
				$scope.sizeCenterNro = columnSection * 24;
			}
			if(nameSection == "LEFT"){
				$scope.sizeLeft = columnSection * 24 + "px";
				$scope.sizeLeftNro =  columnSection * 24;
			}
			if(nameSection == "RIGHT") {
				$scope.sizeRight = columnSection * 24 + "px";
			}
		};
		
		
		return sitiesTemp;
	}
	
	
	//TODO: 27-8 la idea seria mejorarlo lo mejor posible
	// evaluar si conviene tener solo un listado de sities, o por separado
	$scope.sitiesList = function(){
     	var sities ={"movie" : { "id":2304, "title": "lalala" }, "theater": {"id": 30,"name": "cinemark palmares" },"showTime": {"schedule": "17:00","id": 234, "left": [{"row": 20,"column": 4}],"center": [
{"row": 20,"column": 15,"occupied": [{"row": 1,"column": 4},{"row": 1,"column": 5},{"row": 6,"column": 7},{"row": 3,"column": 2}, {"row": 5,"column": 4},    ]}],"right": [{"row": 20,"column": 3,"occupied": [{"row": 1,"column": 3}]}]}};

		//movieService.getSities().then(function(sities){
			
     	sitiesLeftTemp = renderTypeSection(sities.showTime.left[0], "LEFT");
     	sitiesCenterTemp = renderTypeSection(sities.showTime.center[0], "CENTER");
     	sitiesRightTemp = renderTypeSection(sities.showTime.right[0], "RIGHT");
     	//left
//			var showTimeLeftRow = sities.showTime.left[0].row;
//			var showTimeLeftColumn = sities.showTime.left[0].column;
//			
//			var sitiesLeftTemp = new Array();
//			for(var i=0;i<showTimeLeftRow;i++){
//				for(var j=0;j<showTimeLeftColumn;j++){
//					var sitie = new Object();
//					sitie.row = i;
//					sitie.column = j;
//					sitie.url = "resources/img/seat_gray.gif";
//					sitie.occupied = free;
//					sitiesLeftTemp.push(sitie);
//				};
//				$scope.sizeLeft = showTimeLeftColumn * 24 + "px";
//				$scope.sizeLeftNro =  showTimeLeftColumn * 24;
//			};

		//center
//			var showTimeCenterRow = sities.showTime.center[0].row;
//			var showTimeCenterColumn = sities.showTime.center[0].column;
//		
//			var sitiesCenterTemp = new Array();
//			var mapCenter = {};
//			for(var p=0;p<sities.showTime.center[0].occupied.length;p++){
//				var row = sities.showTime.center[0].occupied[p].row;
//				var column = sities.showTime.center[0].occupied[p].column;
//				mapCenter[row+"-"+column] = true;
//			}
//			for(var i=0;i<showTimeCenterRow;i++){
//				for(var j=0;j<showTimeCenterColumn;j++){
//					var sitie = new Object();
//					sitie.row = i;
//					sitie.column = j;
//					if( i+"-"+j in mapCenter){
//						sitie.url = "resources/img/seat_red.gif";
//						sitie.occupied = occupedOther;
//					} else {
//						sitie.url = "resources/img/seat_gray.gif";
//						sitie.occupied = free;
//					}
//					sitiesCenterTemp.push(sitie);
//				};
//				$scope.sizeCenter = showTimeCenterColumn * 24 + "px";
//				$scope.sizeCenterNro = showTimeCenterColumn * 24;
//			};
		
		// right
//			var showTimeRightRow = sities.showTime.right[0].row;
//			var showTimeRightColumn = sities.showTime.right[0].column;
//			
//			var sitiesRightTemp = new Array();
//			for(var i=0;i<showTimeRightRow;i++){
//				for(var j=0;j<showTimeRightColumn;j++){
//					var sitie = new Object();
//					sitie.row = i;
//					sitie.column = j;
//					sitie.url = "resources/img/seat_gray.gif";
//					sitie.occupied = free;
//					sitiesRightTemp.push(sitie);
//				};
//				$scope.sizeRight = showTimeRightColumn * 24 + "px";
//			};
			
			$scope.sitiesLeft = sitiesLeftTemp;
			$scope.sitiesCenter = sitiesCenterTemp;
			$scope.sitiesRight = sitiesRightTemp;
		//});
	};
	
//	$scope.fin1 = function(sitiesSelected){
//		console.log(sitiesSelected);
//	};
	
	/*
	 * Updated site occupied for purchase
	 */
	$scope.updateSitie = function(sitie){
		
		if(sitie.occupied == occupiedMy){
			$scope.occupiedSession -= 1;
			sitie.occupied = free;
			sitie.url = "resources/img/seat_gray.gif";
			return;
		}
		if($scope.quantitySelected.number <= $scope.occupiedSession){
			return;
		}
		if(!(sitie.occupied == occupiedOther)) {
			$scope.occupiedSession += 1;
			sitie.occupied = occupiedMy;
			sitie.url = "resources/img/seat_green.gif";
			$scope.sitiesSelected.push(sitie);
			return;
		}
		
	};
	$scope.sitiesList();
});
app.moviesModule = angular.module('tplReservationMovieController',[]);

app.moviesModule.controller('reservationCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.templates =
        [ { name: 'filtroSesiones', url: 'resources/tpl/gridMovies.html', state: true}
        , { name: 'tablaSesiones', url: 'resources/tpl/stepSelectMovie.html' , state: true} ];
	
});
app.moviesModule = angular.module('tplStepsController',[]);

app.moviesModule.controller('reservationdddCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	var sitiesSelectedA;
	$scope.filter = {};
	
	//$scope.filter.theaterSelected = false;
	$scope.templates =
        [ { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html', state: true}
        , { name: 'stepSelectSitie', url: 'resources/tpl/stepSelectSitie.html' , state: false} 
        , { name: 'stepSelectPayment', url: 'resources/tpl/stepSelectPayment.html' , state: false}];
	
	$scope.theaters = [{"id":1,"name": "Palmares"},{"id":2,"name":"Shopping"}];
	$scope.movies = [{"id":1,"name": "Que paso ayer 1"},{"id":2,"name":"Metegol"}];
	$scope.showTimes = [{"id":1,"name": "miercoles 20:20"},{"id":2,"name":"miercoles 22"}];
	
	if($routeParams.movie && $routeParams.theater && $routeParams.showTime) {
		
		for(var i=0;i<$scope.theaters.length;i++){
			if($scope.theaters[i].id == $routeParams.theater){
				$scope.filter.theaterSelected = $scope.theaters[0];
				break;
			}
		}

		for(var i=0;i<$scope.movies.length;i++){
			if($scope.movies[i].id == $routeParams.movie){
				$scope.filter.movieSelected = $scope.movies[0];
				break;
			}
		}
		
		for(var i=0;i<$scope.showTimes.length;i++){
			if($scope.showTimes[i].id == $routeParams.showTime){
				$scope.filter.showTimeSelected = $scope.showTimes[0];
				break;
			}
		}
		
		$scope.description = "Amadeo vive en un pueblo pequeno y anonimo. Trabaja en un bar, juega al metegol mejor que nadie " +
		"y esta enamorado de Laura, aunque ella no lo sabe. Su rutina sencilla se desmorona cuando Parpados, un joven del " +
		"pueblo convertido en el mejor futbolista del mundo, vuelve dispuesto a vengarse de la unica derrota que sufrio " +
		"en su vida. Con el metegol, el bar y hasta su alma destruidas, Amadeo descubre algo magico: los jugadores de su " +
		"querido metegol hablan y mucho. Juntos se embarcaran en un viaje lleno de aventuras para salvar a Laura y al " +
		"pueblo y en el camino convertirse en un verdadero equipo. Pero, hay en el futbol lugar para los milagros.";

		$scope.templates[1].state = true;
	};
	
	$scope.fin = function() {
		console.log($rootScope);
		console.log($scope);
		console.log("ddddd");
	};
	
	$scope.fin1 = function(sitiesSelected){
		//console.log(sitiesSelected);
//		var test = " Theater: " + $scope.filter.theaterSelected.name + " Movie: " + $scope.filter.movieSelected.name + " Time: " +
//		$scope.filter.showTimeSelected.name + " Sities: " ;
//		for(var i=0;i<sitiesSelected.length;i++){
//			test = test + "(" + sitiesSelected[i].row + "," + sitiesSelected[i].column + ")";
//		}
//		alert(test);
//		sitiesSelectedA = sitiesSelected;
		
		$scope.sitiesSelectedText = "";
		$scope.quantitySelected = sitiesSelected.length;
		for(var i=0;i<sitiesSelected.length;i++){
			$scope.sitiesSelectedText = $scope.sitiesSelectedText + "(" + sitiesSelected[i].row + "," + sitiesSelected[i].column + ")";
		}
		$scope.templates[2].state = true;
	};
	
	$scope.end = function(methodPaymentSelected){
		
		alert("Method Payment: " + methodPaymentSelected.name);
	};
	
	$scope.updateQuantitySelected = function(quantitySelected){
		$scope.templates[2].state = false;
	};
	
});

