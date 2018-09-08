'use strict'

const Schema = use('Schema')

class FeatureSchema extends Schema {
  up () {
    this.create('feature', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('feature')
  }
}

module.exports = FeatureSchema
