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
  async run () {
  	const skills = await Database.table('skill').insert([
          {name: 'complete newbie', interest_id: 4, level: 1},
          {name: 'beginner', interest_id: 4, level: 2},
          {name: 'intermediate', interest_id: 4, level: 3},
          {name: 'advanced', interest_id: 4, level: 4},
          {name: 'elite', interest_id: 4, level: 5},
          {name: '< 5.9', interest_id: 15, level: 1},
          {name: '5.10', interest_id: 15, level: 1},
          {name: '< 5.11', interest_id: 15, level: 1},
          {name: '< 5.12', interest_id: 15, level: 1},
          {name: '< 5.13+', interest_id: 15, level: 1},
          {name: 'top rope', interest_id: 15, level: 1},
          {name: 'lead', interest_id: 15, level: 1}
     ])
  }
}

module.exports = SkillSeeder
