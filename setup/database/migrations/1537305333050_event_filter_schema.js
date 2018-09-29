'use strict'

const Schema = use('Schema')

class EventFilterSchema extends Schema {
  up () {
    this.create('event_filter', (table) => {
      table.increments()
      table.integer('event_id').unsigned().notNullable().index('event')
      table.foreign('event_id').references('event.id').onDelete('cascade')
      table.enu('gender', ['M', 'F', 'Non-binary'])
      table.integer('min_age').unsigned()
      table.integer('max_age').unsigned()
      table.integer('min_connections').unsigned().defaultTo(1)
      table.enu('relationship', ['friend', 'friend of friend', 'favourite', 'stranger'])
      table.enu('gender_balance', ['No', 'Loose', 'Strict']).defaultTo('No')
      table.timestamps()
    })
  }

  down () {
    this.drop('event_filter')
  }
}

module.exports = EventFilterSchema
