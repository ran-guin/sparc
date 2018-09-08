'use strict'

const Schema = use('Schema')

class UserPreferenceSchema extends Schema {
  up () {
    this.create('user_preference', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('user')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_preference')
  }
}

module.exports = UserPreferenceSchema
