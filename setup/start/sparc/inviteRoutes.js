'use strict'

/*
|--------------------------------------------------------------------------
| Invite Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|

(existing) Event searching:
scope: (event, interest + interests, participants)

Input options:
- event
- user 
- interests in (list)
- minimum matches (1 = OR; all = AND)
- location + distance (default to home + 10km)
[-? location distance]
- date range (default to next month)

- favourite hosts

[-? connections attended (favourite, friend, or FofF)]

Invite searching:

scope: (event, interests, participant_interests)



*/
const Logger = use('Logger')
const Route = use('Route')
const Database = use('Database')

Route.get('invites', async ( {request} ) => {
	Logger.debug('get list of invites..')
	console.log('get list of invites')
	
	// input options
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

		console.log('search : ' + search)
	}	

	if (search) {
		search = '%' + search + '%'
		conditions.push('event.name like ' + search)
	} else { search = '%' }

	if (condition) { conditions.push(condition) }

	if (interests && interests.length) {
		// const interest = Database
		// 	.from('interest')
		// var joinInterests = ' AND '
		// var addCondition = interests.join(joinInterests) 
		// conditions.push(addCondition)
	}
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

	Logger.info('conditions : ' + finalCondition)
	console.log('final condition : ' + finalCondition)

	var result = Database
		.select(
			// 'event.id',
			// 'event.name',
			// 'event.description',
			'interest.id',
			'interest.name',
			'user_id'
		)
		.distinct('user.id')
		// .from('event')
		// .innerJoin('interests', 'interests.event_id', 'event.id')
		// .innerJoin('event_interest', 'event_interest.event_id', 'event.id')
		// .innerJoin('interest', 'event_interest.interest_id', 'interest.id')
		.from('interest')
		.innerJoin('user_interest', 'user_interest.interest_id', 'interest.id')
		.innerJoin('user', 'user_interest.user_id', 'user.id')
		.innerJoin('user_preference', 'user_preference.user_id', 'user.id')
		// .whereRaw('1=1')
		.where( function() {
			this
				.where('event.name', 'like', search)
				.orWhere('event.description', 'like', search)
		})
		
	if (interests && interests.length) {
		var string = interests.join(',')
		console.log('require interests like %' + string + '%')
		return await result
			.where('interest_ids', 'like', '%' + string + '%')
			.orWhere('interests', 'like', '%' + string + '%')
	} else {
		return await result
	}
})
