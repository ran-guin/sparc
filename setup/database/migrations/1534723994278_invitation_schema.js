'use strict'

const Schema = use('Schema')

class InvitationSchema extends Schema {
  up () {
    this.create('invitation', (table) => {
      table.increments()
      table.integer('user_id').notNullable().references('id').inTable('user')
      table.integer('event_id').notNullable().references('id').inTable('event')
      table.enu('status', ['invited', 'declined', 'accepted', 'waiting list']).notNullable()
      table.enu('attendance', ['no show', 'attended'])
      table.timestamps()
    })
  }

  down () {
    this.drop('invitation')
  }
}

module.exports = InvitationSchema
