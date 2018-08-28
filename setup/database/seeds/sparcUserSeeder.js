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
          {id: 3, username: 'DemoGuest', email: 'demoGuest@sparc.com'},
          {id: 4, username: 'DemoMember', email: 'demoMember@sparc.com'},
          {id: 5, username: 'DemoHost', email: 'demoHost@sparc.com'},
          {id: 6, username: 'DemoAdmin', email: 'demoAdmin@sparc.com'},
          {id: 7, username: 'DemoMember2', email: 'demoMember2@sparc.com'}
  	])

  	console.log('seeded users: ' + users)
  }
}

module.exports = sparcUserSeeder
