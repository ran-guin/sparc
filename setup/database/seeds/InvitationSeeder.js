'use strict'

/*
|--------------------------------------------------------------------------
| InvitationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class InvitationSeeder {
  async dependencies() {
    return [
      'sparcUserSeeder',
      'sparcEventSeeder'
    ]
  }
  async run () {
  	const invites = await Database.table('invitation').insert([
          {user_id: 5, event_id: 2, status: 'invited'},
          {user_id: 5, event_id: 3, status: 'invited'},
          {user_id: 5, event_id: 4, status: 'accepted'},
          {user_id: 5, event_id: 5, status: 'declined'},
          {user_id: 5, event_id: 6, status: 'waiting list'},
          {user_id: 5, event_id: 7, status: 'accepted', attendance: 'no show'},
          {user_id: 5, event_id: 1, status: 'accepted', attendance: 'attended'},
          {user_id: 4, event_id: 2},
          {user_id: 4, event_id: 4},
          {user_id: 7, event_id: 6}
    ])
  }
}

module.exports = InvitationSeeder
