'use strict'
// const Database = use('Database')
const Event = use('App/Models/Event')
const Database = use('Database')

const { validate } = use('Validator')

class EventController {

	async list ({ request, response, session }) {
		console.log("get list of events..")
		// var search = ''
		// if (request.input) {
		// 	search = request.input('search') || ''
		// }

		// search = search + '%'

		var list = yield Event.all()
		console.log(JSON.stringify(list))

		return list
	}
}

module.exports = EventController
