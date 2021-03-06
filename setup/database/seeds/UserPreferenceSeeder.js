'use strict'

/*
|--------------------------------------------------------------------------
| UserPreferenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class UserPreferenceSeeder {
  async dependencies() {
    return [
      'sparcUserSeeder'
    ]
  }

  async run () {
  }
}

module.exports = UserPreferenceSeeder
