//var url = "https://localhost:8443/cinemark/resources";
//var url = "http://localhost:8080/cinemark/resources";
var url = "https://promocinemark.herokuapp.com/resources";
app.constantsGlobal={

		REST_THEATERS: url +'/theaters',
		REST_MOVIES: url +'/movies',
		REST_SHOW_TIMES: url +'/showTimes',
		REST_PAYMENTS: url +'/payments',
};