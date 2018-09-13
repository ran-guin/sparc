'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('user', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('address', 254)
      table.string('postal_code', 254)
      table.string('lat_long', 254)
      table.date('birthdate')
      table.enu('gender', ['M', 'F', 'non-binary'])
      table.string('password', 60)
      table.enu('status', ['guest', 'member', 'verified member', 'host', 'verified host', 'super host', 'admin'])
      table.timestamps()
    })
  }

  down () {
    this.drop('user')
  }
}

module.exports = UserSchema
