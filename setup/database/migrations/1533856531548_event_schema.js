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
      table.integer('location_id').unsigned().index('location').defaultTo(1)
      table.foreign('location_id').references('location.id')
      table.integer('level').unsigned().default(1)
      table.date('startdate')
      table.time('starttime')
      table.date('enddate')
      table.time('endtime')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('event')
  }
}

module.exports = EventSchema
