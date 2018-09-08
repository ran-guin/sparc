'use strict'

const Schema = use('Schema')

class InvitationSchema extends Schema {
  up () {
    this.create('invitation', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index('user_id')
      table.foreign('user_id').references('user.id').onDelete('cascade')
      table.integer('event_id').unsigned().notNullable().index('event_id')
      table.foreign('event_id').references('event.id').onDelete('cascade')
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
