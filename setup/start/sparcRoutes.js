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
*/
const Logger = use('Logger')
const Route = use('Route')
const Database = use('Database')

Route.get('events', async ( {request} ) => {
	Logger.debug('get list of events..')
	var search = ''
	if (request.input) {
		search = request.input('search') || ''
	}	

	if (search) {
		search = '%' + search + '%'
	} else { search = '%' }

	Logger.info('search : ' + search)

	return await 
		Database
		.select(
			'event.name',
			'event.description',
			'interest.name' 
		)
		.from('event')
		.innerJoin('interest', 'interest_id', 'interest.id')
		.where('event.name', 'like', search)
		.orWhere('event.description', 'like', search)
		.orWhere('interest.name', 'like', search)
})
