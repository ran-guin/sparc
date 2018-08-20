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
  	const users = await Database.table('user').insert([
          {id: 1, username: 'Admin', email: 'admin@sparc.com'},
          {id: 2, username: 'Guest', email: 'guest@sparc.com'},
          {id: 3, username: 'DemoUser', email: 'demo@sparc.com'},
          {id: 4, username: 'DemoUser2', email: 'demo2@sparc.com'},
          {id: 5, username: 'DemoUser3', email: 'demo3@sparc.com'},
          {id: 6, username: 'DemoUser4', email: 'demo4@sparc.com'},
          {id: 7, username: 'DemoUser5', email: 'demo5@sparc.com'}
  	])

  	console.log('seeded users: ' + users)
  }
}

module.exports = sparcUserSeeder
