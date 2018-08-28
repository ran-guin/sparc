'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('user', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60)
      table.enu('status', ['guest', 'member', 'verified member', 'host', 'verified host', 'admin'])
      table.timestamps()
    })
  }

  down () {
    this.drop('user')
  }
}

module.exports = UserSchema
