'use strict'

const Schema = use('Schema')

class EventInterestSchema extends Schema {
  up () {
    this.create('event_interest', (table) => {
      table.increments()
      table.integer('event_id').unsigned().notNullable().index('event_id')
      table.foreign('event_id').references('event.id').onDelete('cascade')
      table.integer('interest_id').unsigned().notNullable().index('interest_id')
      table.foreign('interest_id').references('interest.id').onDelete('cascade')
      table.integer('skill_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('event_interest')
  }
}

module.exports = EventInterestSchema
