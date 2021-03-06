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

		var list = await Event.all()
		console.log(JSON.stringify(list))

		return list
	}

	async test ({ request, response, session }) {
		var input = request.input()
		return await Database
			.select('user.username')
			.from('user')
	}

	// ## get event profile (event, event_interests, invitation, skills) ##

	// ## get current invitation status for event (event, user, invitation, event_interests) ##
	async invitations ({ request, response, session }) {
		console.log('get list of user invitations & status')
		
		var input = request.input()

		console.log('input: ' + JSON.stringify(input))
		// input options
		var event = ''
		var search = ''
		var condition = ''
		var interests = []
		var matches = 2

		var date_from = ''
		var date_until = ''

		var location = ''
		var distance = ''

		var conditions = []
		if (request.input) {
			event = request.input('event') || ''
			search = request.input('search') || ''
			condition = request.input('condition') || ''
			if (request.input('interests')) {
				interests = request.input('interests').split(/,\s?/)
			}
			matches = request.input('matches') || 1;
			date_from = request.input('from') || 'CURDATE()'
			date_until = request.input('until') || 'DATE_ADD(CURDATE(), INTERVAL 1 MONTH)'
			location = request.input('location_id') || ''
			distance = request.input('distance') || '10' 
		}	

		if (event) {
			conditions.push('event.id like ' + event)		
		}

		if (search) {
			search = '%' + search + '%'
			conditions.push('(event.name like \'' + search + '\' or event.description like \'' + search + '\')')
		} else { search = '%' }

		if (condition) { conditions.push(condition) }

		// if (interests && interests.length) {
		// 	const interest = Database
		// 		.from('interest')
		// 	var joinInterests = ' AND '
		// 	var addCondition = interests.join(joinInterests) 
		// 	conditions.push(addCondition)
		// }
		if (matches) {

		}
		if (date_from || date_until) {

		}
		if (location) {

		}
		if (location && distance) {

		}

		var finalCondition = '1'
		if (conditions && conditions.length) {
			finalCondition = conditions.join(' AND ')
		}

		console.log('final condition : ' + finalCondition)

		var result = Database
			.select(
				'user.id',
				'user.username',
				'user.email',
				'event.id',
				'event.name',
				'event.description',
				'interest_ids',
				'interests',
				'invitation.status as invite_status'
			)
			.countDistinct('invitation.user_id as invites')
			.from('event')
			.innerJoin('event_interests', 'event_interests.event_id', 'event.id')
			.leftJoin('invitation', 'invitation.event_id', 'event.id')
			// .whereRaw('1=1')
			.where( function() {
				this
					.where('event.name', 'like', search)
					.orWhere('event.description', 'like', search)
			})

		var finalResult
		if (interests && interests.length) {
			console.log('interests in: ' + interests.join(', '))
			var string = interests.join(',')
			console.log('require interests like %' + string + '%')
			finalResult = result
				.where('interest_ids', 'like', '%' + string + '%')
				.orWhere('interests', 'like', '%' + string + '%')
		} else {
			finalResult = result
		}
		
		return await finalResult
			.whereRaw(finalCondition)
			// .groupBy(['event.id', 'invitation.status'])
	}
}

module.exports = EventController
