'use strict'

/*
|--------------------------------------------------------------------------
| SkillSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class SkillSeeder {
  async dependencies() {
    return [
      'sparcInterestSeeder'
    ]
  }
  async run () {
  	const skills = await Database.table('skill').insert([
          {id: 1, name: 'complete newbie', interest_id: 4, level: 1},
          {id: 2, name: 'beginner', interest_id: 4, level: 2},
          {id: 3, name: 'intermediate', interest_id: 4, level: 3},
          {id: 4, name: 'advanced', interest_id: 4, level: 4},
          {id: 5, name: 'elite', interest_id: 4, level: 5},
          {id: 6, name: '< 5.9', interest_id: 15, level: 1},
          {id: 7, name: '5.10', interest_id: 15, level: 1},
          {id: 8, name: '< 5.11', interest_id: 15, level: 1},
          {id: 9, name: '< 5.12', interest_id: 15, level: 1},
          {id: 10, name: '< 5.13+', interest_id: 15, level: 1},
          {id: 11, name: 'top rope', interest_id: 15, level: 1},
          {id: 12, name: 'lead', interest_id: 15, level: 1}
     ])
  }
}

module.exports = SkillSeeder
