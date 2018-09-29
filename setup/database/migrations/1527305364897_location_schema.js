'use strict'

const Schema = use('Schema')

class LocationSchema extends Schema {
  up () {
    this.create('location', (table) => {
      table.increments()
      table.string('name', 255)
      table.string('address', 255)
      table.string('latitude', 15)
      table.string('longitude', 15)
      table.timestamps()
    })
  }

  down () {
    this.drop('location')
  }
}

module.exports = LocationSchema
