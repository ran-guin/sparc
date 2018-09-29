'use strict'

const Schema = use('Schema')

class UserPreferenceSchema extends Schema {
  up () {
    this.create('user_preference', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('user').onDelete('cascade')
      table.integer('min_connections').unsigned()
      table.integer('min_attendance').unsigned()
      table.integer('max_attendance').unsigned()
      table.integer('max_distance').unsigned().defaultTo(10)
      table.enu('host', ['friend', 'friend of friend', 'favourite', 'stranger'])
      table.string('availability',16)
      table.integer('advance_notice').unsigned()
      table.enu('invitation_format', ['automatic', 'weekly', 'off']).defaultTo('automatic')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_preference')
  }
}

module.exports = UserPreferenceSchema
