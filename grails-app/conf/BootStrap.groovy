import com.globallogic.cinemark.security.PasswordChange
import com.globallogic.cinemark.security.Role
import com.globallogic.cinemark.security.User
import com.globallogic.cinemark.security.UserRole
import com.globallogic.cinemark.Theater
import com.globallogic.cinemark.Cinema
import com.globallogic.cinemark.Seat
import com.globallogic.cinemark.Movie
import com.globallogic.cinemark.SeatSection
import com.globallogic.cinemark.ShowTime
import com.globallogic.cinemark.Schedule
import com.globallogic.cinemark.enums.CinemaType
import com.globallogic.cinemark.enums.SeatsSectionType;
class BootStrap {
	
	def roleCinemark
	def springSecurityService
	def grailsApplication

    def init = { servletContext ->
		if (grailsApplication.config.dataSource.dbCreate.contains( "create")) {
			
						//START CREATE BACKOFFICE ADMINS
						def cinemarkUser = User.findByUsername("juan.cugnini") ?: new User(
								username: "juan.cugnini",
								password: "administrator1@",
								confirmPassword: "administrator1@",
								email: "juan.cugnini@globallogic.com",
								accountExpired: false,
								accountLocked: false,
								enabled: true,
								superAdmin: true,
								passwordExpired: false).save(failOnError: true, flush: true)
			
						PasswordChange passwordChange = new PasswordChange()
						passwordChange.changeDate = new Date()
						passwordChange.password = springSecurityService.encodePassword("administrator1@")
						passwordChange.user = cinemarkUser
			
						cinemarkUser.addToPasswordChange(passwordChange)
			
						roleCinemark = Role.findByAuthority("ROLE_ADMIN") ?: new Role(authority:"ROLE_ADMIN").save(failOnError: true, flush: true)
						UserRole.create(cinemarkUser, roleCinemark, true)
					def theater = Theater.findByName("Palmares") ?: new Theater(
							name: "Palmares",
							address: "panamericana S/N",
							phone: 94983498349
						).save(flush: true)


					def theater2 = new Theater(
							name: "Shopping",
							address: "panamericana S/N",
							phone: 55555555559
						).save(flush: true)

						
					def cinema = new Cinema(
						cinemaNumber: 1,
						cinemaType: CinemaType.XD,
						theater: theater
						).save(flush: true)


					def cinema2 = new Cinema(
						cinemaNumber: 2,
						cinemaType: CinemaType.XD,
						theater: theater
						).save(flush: true)


					def cinema3 = Cinema.findAllByTheater(theater2)?: new Cinema(
						cinemaNumber: 1,
						cinemaType: CinemaType.XD,
						theater: theater2
						).save(flush: true)

						
					def section1 = new SeatSection(
						type: SeatsSectionType.CENTER,
						rows: 20,
						columns: 10,
						cinema: cinema
						).save(flush:true)
					

					def section2 = new SeatSection(
							type: SeatsSectionType.RIGHT,
							rows: 20,
							columns: 10,
							cinema: cinema
							).save(flush:true)
							
					def section3 = new SeatSection(
							type: SeatsSectionType.LEFT,
							rows: 20,
							columns: 10,
							cinema: cinema
							).save(flush:true)

					def section1p = new SeatSection(
						type: SeatsSectionType.CENTER,
						rows: 20,
						columns: 10,
						cinema: cinema2
						).save(flush:true)
					

					def section2p = new SeatSection(
							type: SeatsSectionType.RIGHT,
							rows: 20,
							columns: 10,
							cinema: cinema2
							).save(flush:true)
							
					def section3p = new SeatSection(
							type: SeatsSectionType.LEFT,
							rows: 20,
							columns: 10,
							cinema: cinema2
							).save(flush:true)


							
							
					def section1a = new SeatSection(
						type: SeatsSectionType.CENTER,
						rows: 10,
						columns: 10,
						cinema: cinema3
						).save(flush:true)
					

					def section2a = new SeatSection(
							type: SeatsSectionType.RIGHT,
							rows: 10,
							columns: 10,
							cinema: cinema3
							).save(flush:true)
							
					def section3a = new SeatSection(
							type: SeatsSectionType.LEFT,
							rows: 10,
							columns: 10,
							cinema: cinema3
							).save(flush:true)

							
					def movie = Movie.findByTitle("Los Indestructibles")?: new Movie(
						title: "Los indestructibles",
						imdbId: "220002",
						summary:"La primera parte del filme parte con una operacion de rescate de The Expendables contra piratas somalies que toman como rehenes a la tripulacion de un barco estadounidense.",
						actors:"Jet Li, Bruce Willis, etc",
						picUrl:"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Expendables_Comic-Con_Panel.jpg/800px-The_Expendables_Comic-Con_Panel.jpg",
						trailerUrl:"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Expendables_Comic-Con_Panel.jpg/800px-The_Expendables_Comic-Con_Panel.jpg",
						genre:"Accion",
						director:"Sylvester Stallone",
						year: 2010
					).save(flush:true)



					def movie2 = new Movie(
						title: "Los indestructibles 2",
						imdbId: "1110011",
						summary:"En Los mercenarios 2, Barney Ross (Sylvester Stallone) y su equipo se vuelven a unir cuando el sr Church (Bruce Willis) los recluta para encargarse de un trabajo aparentemente sencillo. Sin embargo, pese a parecer dinero facil......",
						actors:"Jet Li, Bruce Willis, etc",
						picUrl:"http://notieste.com.ar/wp-content/uploads/2012/08/los-indestructibles-2-1680x1050.jpg",
						trailerUrl:"http://notieste.com.ar/wp-content/uploads/2012/08/los-indestructibles-2-1680x1050.jpg",
						genre:"Accion",
						director:"Sylvester Stallone",
						year: 2012
					).save(flush:true)

					
					def movie3 = new Movie(
						title: "En la Oscuridad",
						imdbId: "1110022",
						summary:"Cuando a la tripulacion de la nave Enterprise le ordenan que regrese a casa, en la Tierra se enfrentan a una terrorifica fuerza que, aparentemente desde dentro....",
						actors:"Chris Pine, Zachary Quinto, Zoe Saldana, etc",
						picUrl:"http://columnazero.com/wp-content/uploads/2013/06/star-trek-en-la-oscuridad.jpg",
						trailerUrl:"https://youtube.googleapis.com/v/FFAiOtL_rNo%26autoplay=%26loop=0%26rel=0",
						genre:"Ciencia Ficcion",
						director:"-",
						year: 2012
					).save(flush:true)

					def movie4 = new Movie(
						title: "Asalto al Poder",
						imdbId: "1110099",
						summary:"Narra el asalto de la Casa Blanca por parte de un grupo de paramilitares.",
						actors:"Channing Tatum y Jamie Foxx, etc",
						picUrl:"http://daysmovie.files.wordpress.com/2013/09/white_house_down_theatrical_poster.jpg?w=202&h=300",
						trailerUrl:"http://daysmovie.files.wordpress.com/2013/09/white_house_down_theatrical_poster.jpg?w=202&h=300",
						genre:"Accion",
						director:"Rolan Emmerich",
						year: 2010
					).save(flush:true)
					
					
					def showTime = new ShowTime(
						price: 12,
						movie: movie,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime()+10,
						cinema: cinema
						).save(flush:true)
					
					def showTime2 = new ShowTime(
						price: 14,
						movie: movie3,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime()+10,
						cinema: cinema2
						).save(flush:true)
					
					def showTime3 = new ShowTime(
						price: 11,
						movie: movie4,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime()+10,
						cinema: cinema3
						).save(flush:true)

					def showTime4 = new ShowTime(
						price: 12,
						movie: movie2,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime()+10,
						cinema: cinema
						).save(flush:true)
					
					def showTime5 = new ShowTime(
						price: 14,
						movie: movie3,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime()+10,
						cinema: cinema2
						).save(flush:true)
					
					def showTime6 = new ShowTime(
						price: 11,
						movie: movie4,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime()+10,
						cinema: cinema3
						).save(flush:true)
						
					
					def seat = new Seat(
							row: 2,
							seatSection: SeatsSectionType.LEFT,
							column: 3,
							email: "tetin@te.com",
							confirmationCode:"aslhj399",
							identificationNumber:39939493).save(flush:true)

					def seat2 = new Seat(
							row: 3,
							seatSection: SeatsSectionType.CENTER,
							column: 4,
							email: "testin@test.com",
							confirmationCode:"asxxx399",
							identificationNumber:39444493).save(flush:true)

							
					def schedule = new Schedule(
							time: "22:00",
							showTime: showTime,
							takenSeats: [seat]
							)
							
					def schedule2 = new Schedule(
							time: "22:30",
							showTime: showTime2,
							takenSeats: [seat]
							)
							
					def schedule3 = new Schedule(
							time: "21:00",
							showTime: showTime3,
							takenSeats: [seat]
							)
							
					def schedule4 = new Schedule(
							time: "23:00",
							showTime: showTime4,
							takenSeats: [seat2]
							)
							
					def schedule5 = new Schedule(
							time: "23:30",
							showTime: showTime5,
							takenSeats: [seat2]
							)
							
					def schedule6 = new Schedule(
							time: "20:00",
							showTime: showTime6,
							takenSeats: [seat2]
							)
																	
					showTime.addToSchedules(schedule).save(flush:true)				
					showTime2.addToSchedules(schedule2).save(flush:true)
					showTime3.addToSchedules(schedule3).save(flush:true)					
					showTime4.addToSchedules(schedule4).save(flush:true)				
					showTime5.addToSchedules(schedule5).save(flush:true)
					showTime6.addToSchedules(schedule6).save(flush:true)


						
		}
						
    }
    def destroy = {
    }
}
