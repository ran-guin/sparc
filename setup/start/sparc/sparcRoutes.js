'use strict'

/*
|--------------------------------------------------------------------------
| sparc Routes
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

require('./eventRoutes')
require('./inviteRoutes')

Route.get('sparc', async ( {request} ) => {
	// requires configuration of searchable tables in database.custom 
	Logger.debug('accessed SPARC')
	console.log('accessed SPARC')
	return 'FOUND IT!'
})

Route.get('verify', 'AuthController.verify')
Route.get('getUser', 'AuthController.getUser')

Route.get('interests', async ( {request} ) => {
	console.log('retrieve interests from database')
	var fields = [
		'interest.id as id',
		'interest.name as name',
		'interest.parent_id as parent_id'
	]

	var userid 
	if (request.input && request.input('userid')) {
		userid = request.input('userid')
	} 

	var result = Database
		.select(fields)
		.from('interest')

	if (userid) {
		return await result
			.innerJoin('user_interest', 'user_interest.interest_id', 'interest.id')
			.where('user_interest.user_id', 'like', userid)
	} else {
		return await result
	}
})

Route.get('skills', async ( {request} ) => {
	console.log('retrieve skills from database')
	var result = Database
	.select(
		'interest.name as interest',
		'interest.id as interest_id',
		'skill.id',
		'skill.name as skill',
		'skill.level'
	)
	.from('interest')
	.innerJoin('skill', 'skill.interest_id', 'interest.id')

	// .where( function() {
	// 	this
	// 		.where('event.name', 'like', search)
	// 		.orWhere('event.description', 'like', search)
	// })

	return await result
})

