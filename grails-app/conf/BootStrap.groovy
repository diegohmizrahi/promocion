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

					def theater2 = Theater.findByName("Palmares") ?: new Theater(
							name: "Shopping",
							address: "panamericana S/N",
							phone: 55555555559
						).save(flush: true)

						
						
					def cinema = Cinema.findAllByTheater(theater)?: new Cinema(
						cinemaNumber: 1,
						cinemaType: CinemaType.XD,
						theater: theater
						).save(flush: true)

					def cinema2 = Cinema.findAllByTheater(theater)?: new Cinema(
						cinemaNumber: 2,
						cinemaType: CinemaType.XD,
						theater: theater
						).save(flush: true)

					def cinema3 = Cinema.findAllByTheater(theater)?: new Cinema(
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
							rows: 20,
							columns: 20,
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
						imdbId: "aksdjfk",
						summary:"La primera parte del filme parte con una operación de rescate de The Expendables contra piratas somalíes que toman como rehenes a la tripulación de un barco estadounidense.",
						actors:"Jet Li, Bruce Willis, etc",
						picUrl:"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Expendables_Comic-Con_Panel.jpg/800px-The_Expendables_Comic-Con_Panel.jpg",
						trailerUrl:"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Expendables_Comic-Con_Panel.jpg/800px-The_Expendables_Comic-Con_Panel.jpg",
						genre:"Accion",
						director:"Sylvester Stallone",
						year: 2010
					).save(flush:true)



					def movie2 = Movie.findByTitle("Los Indestructibles")?: new Movie(
						title: "Los indestructibles",
						imdbId: "aksdjfk",
						summary:"La primera parte del filme parte con una operación de rescate de The Expendables contra piratas somalíes que toman como rehenes a la tripulación de un barco estadounidense.",
						actors:"Jet Li, Bruce Willis, etc",
						picUrl:"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Expendables_Comic-Con_Panel.jpg/800px-The_Expendables_Comic-Con_Panel.jpg",
						trailerUrl:"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Expendables_Comic-Con_Panel.jpg/800px-The_Expendables_Comic-Con_Panel.jpg",
						genre:"Accion",
						director:"Sylvester Stallone",
						year: 2010
					).save(flush:true)

					


						}
    }
    def destroy = {
    }
}
