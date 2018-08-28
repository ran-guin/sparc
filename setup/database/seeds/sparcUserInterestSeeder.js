'use strict'

/*
|--------------------------------------------------------------------------
      { username: 'sparcUserSeeder
|--------------------------------------------------------------------------
|
      { username: 'Make use of the Factory instance to seed database with dummy data or
      { username: 'make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class sparcUserSeeder {
  async run () {
  	const interests = await Database.table('user_interest').insert([
          {user_id: 3, interest_id: 6},
          {user_id: 3, interest_id: 15, skill_id: 10},
          {user_id: 3, interest_id: 39},
          {user_id: 3, interest_id: 40},

          {user_id: 4, interest_id: 6},
          {user_id: 4, interest_id: 15, skill_id: 8},
          {user_id: 4, interest_id: 39},
          {user_id: 4, interest_id: 40},

          {user_id: 5, interest_id: 6},
          {user_id: 5, interest_id: 15},
          {user_id: 5, interest_id: 39},
          {user_id: 5, interest_id: 40}
  	])

  	console.log('seeded user interests: ' + interests)
  }
}

module.exports = sparcUserSeeder
