package com.globallogic.cinemark

import org.springframework.dao.DataIntegrityViolationException
import com.globallogic.cinemark.utils.ValidatorUtils
import com.globallogic.cinemark.utils.DateUtils
import com.globallogic.cinemark.constants.Codes
import com.globallogic.cinemark.exceptions.CinemarkException
import com.globallogic.cinemark.Theater
import com.globallogic.cinemark.Cinema
import com.globallogic.cinemark.Seat
import com.globallogic.cinemark.Movie
import com.globallogic.cinemark.SeatSection
import com.globallogic.cinemark.ShowTime
import com.globallogic.cinemark.Schedule
import com.globallogic.cinemark.enums.CinemaType
import com.globallogic.cinemark.enums.SeatsSectionType;




class CinemaController extends CinemarkController {

    static allowedMethods = [create: ['GET', 'POST'], edit: ['GET', 'POST'], delete: 'POST', moviesByTheater: 'GET']
	def cinemaService
	
    def index() {
        redirect action: 'list', params: params
    }

    def list() {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [cinemaInstanceList: Cinema.list(params), cinemaInstanceTotal: Cinema.count()]
    }

    def create() {
		switch (request.method) {
		case 'GET':
        	[cinemaInstance: new Cinema(params)]
			break
		case 'POST':
	        def cinemaInstance = new Cinema(params)
	        if (!cinemaInstance.save(flush: true)) {
	            render view: 'create', model: [cinemaInstance: cinemaInstance]
	            return
	        }

			flash.message = message(code: 'default.created.message', args: [message(code: 'cinema.label', default: 'Cinema'), cinemaInstance.id])
	        redirect action: 'show', id: cinemaInstance.id
			break
		}
    }

    def show() {
        def cinemaInstance = Cinema.get(params.id)
        if (!cinemaInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'cinema.label', default: 'Cinema'), params.id])
            redirect action: 'list'
            return
        }

        [cinemaInstance: cinemaInstance]
    }

    def edit() {
		switch (request.method) {
		case 'GET':
	        def cinemaInstance = Cinema.get(params.id)
	        if (!cinemaInstance) {
	            flash.message = message(code: 'default.not.found.message', args: [message(code: 'cinema.label', default: 'Cinema'), params.id])
	            redirect action: 'list'
	            return
	        }

	        [cinemaInstance: cinemaInstance]
			break
		case 'POST':
	        def cinemaInstance = Cinema.get(params.id)
	        if (!cinemaInstance) {
	            flash.message = message(code: 'default.not.found.message', args: [message(code: 'cinema.label', default: 'Cinema'), params.id])
	            redirect action: 'list'
	            return
	        }

	        if (params.version) {
	            def version = params.version.toLong()
	            if (cinemaInstance.version > version) {
	                cinemaInstance.errors.rejectValue('version', 'default.optimistic.locking.failure',
	                          [message(code: 'cinema.label', default: 'Cinema')] as Object[],
	                          "Another user has updated this Cinema while you were editing")
	                render view: 'edit', model: [cinemaInstance: cinemaInstance]
	                return
	            }
	        }

	        cinemaInstance.properties = params

	        if (!cinemaInstance.save(flush: true)) {
	            render view: 'edit', model: [cinemaInstance: cinemaInstance]
	            return
	        }

			flash.message = message(code: 'default.updated.message', args: [message(code: 'cinema.label', default: 'Cinema'), cinemaInstance.id])
	        redirect action: 'show', id: cinemaInstance.id
			break
		}
    }

    def delete() {
        def cinemaInstance = Cinema.get(params.id)
        if (!cinemaInstance) {
			flash.message = message(code: 'default.not.found.message', args: [message(code: 'cinema.label', default: 'Cinema'), params.id])
            redirect action: 'list'
            return
        }

        try {
            cinemaInstance.delete(flush: true)
			flash.message = message(code: 'default.deleted.message', args: [message(code: 'cinema.label', default: 'Cinema'), params.id])
            redirect action: 'list'
        }
        catch (DataIntegrityViolationException e) {
			flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'cinema.label', default: 'Cinema'), params.id])
            redirect action: 'show', id: params.id
        }
    }
	
	def moviesByTheater = {
		def resp = checkedOperation {
			def cinemas = cinemaService.getCinemas(params)
			if (!cinemas) {
				response.setStatus(204)
				return []
			}
			return cinemas
		}
		render resp
	}
	
	
	def altas = {
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


					
					def showTime = new ShowTime(
						price: 12,
						movie: movie,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime(),
						cinema: cinema
						
						).save(flush:true)
					
					def showTime2 = new ShowTime(
						price: 14,
						movie: movie,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime(),
						cinema: cinema2
						
						).save(flush:true)
					
					def showTime3 = new ShowTime(
						price: 11,
						movie: movie,
						fromDate: new Date().clearTime(),
						untilDate: new Date().clearTime(),
						cinema: cinema3
						
						).save(flush:true)

					
					def seat = new Seat(
							row: 2,
							seatSection: SeatsSectionType.LEFT,
							column: 3,
							email: "tetin@te.com",
							confirmationCode:"aslhj399",
							identificationNumber:39939493).save(flush:true)
					
					def schedule = new Schedule(
							time: "22:00",
							showTime: showTime,
							takenSeats: [seat]
							)
						showTime.addToSchedules(schedule).save(flush:true)
					def schedule2 = new Schedule(
							time: "22:00",
							showTime: showTime2,
							takenSeats: [seat]
							)
						showTime2.addToSchedules(schedule2).save(flush:true)
					def schedule3 = new Schedule(
							time: "22:00",
							showTime: showTime3,
							takenSeats: [seat]
							)
						showTime3.addToSchedules(schedule3).save(flush:true)

	}
	
}
