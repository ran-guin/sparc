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

Route.post('invites', async ( {request} ) => {
	console.log('post invites test')
	return await Database
		.select('username')
		.from('user')
})

Route.get('invites', async ( {request} ) => {
	Logger.debug('get list of invites..')
	console.log('get list of invites')
	
	var body = request.body
	var all = request.all()

	console.log('body: ' + JSON.stringify(body))
	console.log('all: ' + JSON.stringify(all))

	var condition = ''
	// input options
	var search = ''
	var interests = []
	var interest_ids = []
	var matches = 1
	// user filtering
	var min_age
	var max_age
	var gender
	// user_preference filtering
	var location = '' // may be supplied as coordinates to easily calculate distance (non-trivial)
	var max_distance = '' // may require using google maps api to calculate distance by road (?)

	// general non-event filtering
	var date_from = ''
	var date_until = ''


	var conditions = []
	if (request.input) {
		search = request.input('search') || ''
		if (request.input('interest_ids')) {
			interest_ids = request.input('interest_ids').split(/,\s?/)
		}
		matches = request.input('matches') || 1

		min_age = request.input('min_age') || 0
		max_age = request.input('max_age') || 0
		gender = request.input('gender') || ''

		date_from = request.input('from') || 'CURDATE()'
		date_until = request.input('until') || 'DATE_ADD(CURDATE(), INTERVAL 1 MONTH)'
		// location = request.input('location_id') || ''
		// max_distance = request.input('max_distance') || '20'
	}	

	if (search) {
		search = '%' + search + '%'
		// conditions.push('event.name like ' + search)
	} else { search = '%' }

	if (condition) { conditions.push(condition) }

	if (interest_ids && interest_ids.length) {
		conditions.push('interest.id' + ' IN (' + interest_ids.join(', ') + ')')
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
	if (min_age || max_age) {
		var age = 'DATEDIFF(CURDATE(), user.birthdate)/365'
		if (min_age) {
			conditions.push('user.birthdate IS NOT NULL AND ' + age + ' > ' + min_age)
		}
		if (max_age) {
			conditions.push(age + ' < ' + max_age)
		}
	}
	if (location) {

	}
	if (location && max_distance) {

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
			// 'interest.id',
			// 'interest.name',
			'user.id as userid',
			'user.username',
			'user.birthdate as birthdate'
		)
		.count()
		// .distinct('user.id')
		// .from('event')
		// .innerJoin('interests', 'interests.event_id', 'event.id')
		// .innerJoin('event_interest', 'event_interest.event_id', 'event.id')
		// .innerJoin('interest', 'event_interest.interest_id', 'interest.id')
		.from('interest')
		.innerJoin('user_interest', 'user_interest.interest_id', 'interest.id')
		.innerJoin('user', 'user_interest.user_id', 'user.id')
		.leftJoin('skill', 'user_interest.skill_id', 'skill.id')
		// .innerJoin('user_preference', 'user_preference.user_id', 'user.id')
		.whereRaw(finalCondition)
		.where( function() {
			this
				.where('interest.name', 'like', search)
				.orWhere('interest.description', 'like', search)
				// .orWhere('event.name', 'like', search)
		})
		
		return await result.groupBy('user_id')
			// .havingCount(matches)
		// return await result
	// if (interests && interests.length) {
	// 	var string = interests.join(',')
	// 	console.log('require interests like %' + string + '%')
	// 	return await result
	// 		.where('interest_ids', 'like', '%' + string + '%')
	// 		.orWhere('interests', 'like', '%' + string + '%')
	// } else {
	// 	return await result
	// }
})
