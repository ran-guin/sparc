'use strict'

/*
|--------------------------------------------------------------------------
      { name: 'sparcEventInterestSeeder
|--------------------------------------------------------------------------
|
      { name: 'Make use of the Factory instance to seed database with dummy data or
      { name: 'make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class sparcEventInterestSeeder {
  async dependencies() {
    return [
      'sparcEventSeeder',
      'sparcInterestSeeder'
    ]
  }

  async run () {
  	const events = await Database.table('event_interest').insert([
          {event_id: 1, interest_id: 17},
          {event_id: 1, interest_id: 18},
          {event_id: 1, interest_id: 32},
          {event_id: 1, interest_id: 33},

          {event_id: 2, interest_id: 28},

          {event_id: 3, interest_id: 33},
          {event_id: 3, interest_id: 20},
          {event_id: 3, interest_id: 17},

          {event_id: 4, interest_id: 11},

          {event_id: 5, interest_id: 24}, // Gallery

          {event_id: 6, interest_id: 28}, // Flash Mob

          {event_id: 7, interest_id: 39}, // Singles book club
          {event_id: 7, interest_id: 39}, // Singles book club
          {event_id: 7, interest_id: 15, skill_id: 9} // Singles book club
  	])

  	console.log('seeded events: ' + events)
  }
}

module.exports = sparcEventInterestSeeder
