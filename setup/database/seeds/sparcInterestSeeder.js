'use strict'

/*
|--------------------------------------------------------------------------
      { name: 'sparcInterestSeeder
|--------------------------------------------------------------------------
|
      { name: 'Make use of the Factory instance to seed database with dummy data or
      { name: 'make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class sparcInterestSeeder {
  async run () {
  	const interests = await Database.table('interest').insert([
          {id: 1, 'name': 'sport', 'parent_id': null},
          {id: 2, 'name': 'social', 'parent_id': null},
          {id: 3, 'name': 'cultural', 'parent_id': null},
          {id: 4, 'name': 'running', 'parent_id': 1},
          {id: 5, 'name': 'biking', 'parent_id': 1},
          {id: 6, 'name': 'climbing', 'parent_id': 1},
          {id: 7, 'name': 'trail', 'parent_id': 4},
          {id: 8, 'name': '5k', 'parent_id': 4},
          {id: 9, 'name': '10k', 'parent_id': 4},
          {id: 10, 'name': 'marathon', 'parent_id': 4},
          {id: 11, 'name': 'touring', 'parent_id': 5},
          {id: 12, 'name': 'road', 'parent_id': 5},
          {id: 13, 'name': 'mountain', 'parent_id': 5},
          {id: 14, 'name': 'trad', 'parent_id': 6},
          {id: 15, 'name': 'sport climbing', 'parent_id': 6},
          {id: 16, 'name': 'gym climbing', 'parent_id': 6},
          {id: 17, 'name': 'dinner parties', 'parent_id': 2},
          {id: 18, 'name': 'potlucks', 'parent_id': 17},
          {id: 19, 'name': 'hosted', 'parent_id': 17},
          {id: 20, 'name': 'board games', 'parent_id': 2},
          {id: 21, 'name': 'Settlers of Cataan', 'parent_id': 20},
          {id: 22, 'name': 'Scrabble', 'parent_id': 20},
          {id: 23, 'name': 'museum', 'parent_id': 3},
          {id: 24, 'name': 'art gallery', 'parent_id': 3},
          {id: 25, 'name': 'ballet', 'parent_id': 3},
          {id: 26, 'name': 'opera', 'parent_id': 3},
          {id: 27, 'name': 'dancing', 'parent_id': 2},
          {id: 28, 'name': 'swing', 'parent_id': 27},
          {id: 29, 'name': 'blues', 'parent_id': 27},
          {id: 30, 'name': 'club', 'parent_id': 27},
          {id: 31, 'name': 'sports (watching)', 'parent_id': 2},
          {id: 32, 'name': 'philosophy', 'parent_id': 3},
          {id: 33, 'name': 'politics', 'parent_id': 3},
          {id: 34, 'name': 'science', 'parent_id': 3},
          {id: 35, 'name': 'hockey', 'parent_id': 31},
          {id: 36, 'name': 'football (American)', 'parent_id': 31},
          {id: 37, 'name': 'football (European)', 'parent_id': 31},
          {id: 38, 'name': 'basketball', 'parent_id': 31},
          {id: 39, 'name': 'book club', 'parent_id': 2},
          {id: 40, 'name': 'singles', 'parent_id': 2},          
  	])

  	console.log('seeded interests: ' + interests)
  }
}

module.exports = sparcInterestSeeder
