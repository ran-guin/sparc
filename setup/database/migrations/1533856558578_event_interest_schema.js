'use strict'

const Schema = use('Schema')

class EventInterestSchema extends Schema {
  up () {
    this.create('event_interest', (table) => {
      table.increments()
      table.integer('event_id').notNullable().references('id').inTable('event')
      table.integer('interest_id').notNullable().references('id').inTable('interest')
      table.integer('skill_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('event_interest')
  }
}

module.exports = EventInterestSchema
