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
							).save(flush:true)		
					def schedule2 = new Schedule(
							time: "22:00",
							showTime: showTime2,
							takenSeats: [seat]
							).save(flush:true)
					def schedule3 = new Schedule(
							time: "22:00",
							showTime: showTime3,
							takenSeats: [seat]
							).save(flush:true)
										
										
					showTime.addToSchedules(schedule).save(flush:true)				
					showTime2.addToSchedules(schedule2).save(flush:true)
					showTime3.addToSchedules(schedule3).save(flush:true)

	}
	
}
