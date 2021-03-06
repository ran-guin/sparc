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
  async dependencies() {
    return [
      'sparcUserSeeder',
      'sparcLocationSeeder'
    ]
  }
  async run () {
  	const events = await Database.table('event').insert([
          {id: 1, name: 'Potluck', description: 'description of potluck', location_id: 1},
          {id: 2, name: 'Swing Dancing', description: 'description of dance', location_id: 2},
          {id: 3, name: 'Dinner Party', description: 'description of art gallery event', location_id: 2},
          {id: 4, name: 'Bike Ride', description: 'description of art gallery event'},
          {id: 5, name: 'Art Gallery', description: 'description of art gallery event', location_id: 2},
          {id: 6, name: 'Flash Mob', description: 'description of dance', location_id: 1},
          {id: 7, name: 'Singles book club', description: 'description of dance', location_id: 2}
  	])

  	console.log('seeded events: ' + events)
  }
}

module.exports = sparcEventSeeder
