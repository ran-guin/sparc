'use strict'

const Schema = use('Schema')

class EventInterestSchema extends Schema {
  up () {
    this.create('user_interest', (table) => {
      table.increments()
      table.integer('interest_id').notNullable().index()
      table.integer('user_id').notNullable().index()
      table.integer('skill_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_interest')
  }
}

module.exports = EventInterestSchema
