'use strict'

const Schema = use('Schema')

class EventSchema extends Schema {
  up () {
    this.create('event', (table) => {
      table.increments()
      table.string('name')
      table.integer('host').unsigned().index('host')
      table.foreign('host').references('user.id')
      table.enu('status', ['cached', 'published', 'confirmed', 'running', 'finished', 'cancelled'])
      table.string('location')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('event')
  }
}

module.exports = EventSchema
