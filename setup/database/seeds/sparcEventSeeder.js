'use strict'

/*
|--------------------------------------------------------------------------
      { name: 'sparcEventSeeder
|--------------------------------------------------------------------------
|
      { name: 'Make use of the Factory instance to seed database with dummy data or
      { name: 'make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class sparcEventSeeder {
  async run () {
  	const events = await Database.table('event').insert([
          {id: 1, name: 'Potluck', description: 'description of potluck', location: 'Toronto, ON', interest_id: 18},
          {id: 2, name: 'Swing Dancing', description: 'description of dance', location: 'Vancouver', interest_id: 28},
          {id: 3, name: 'Dinner Party', description: 'description of art gallery event', location: 'Toronto, ON', interest_id: 17},
          {id: 4, name: 'Bike Ride', description: 'description of art gallery event', location: 'Toronto, ON', interest_id: 11},
          {id: 5, name: 'Art Gallery', description: 'description of art gallery event', location: 'Toronto, ON', interest_id: 24},
          {id: 6, name: 'Flash Mob', description: 'description of dance', location: 'Vancouver', interest_id: 27},
          {id: 7, name: 'Singles book club', description: 'description of dance', location: 'Vancouver', interest_id: 39}
  	])

  	console.log('seeded events: ' + events)
  }
}

module.exports = sparcEventSeeder
